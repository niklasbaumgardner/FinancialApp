from finapp.models import (
    CompletedTransaction,
    PendingTransaction,
    SimpleFINAccount,
    SimpleFINCredentials,
    SimpleFINOrganization,
)
from flask_login import current_user
from finapp import db
from sqlalchemy.sql import or_, and_
from sqlalchemy import delete, insert, select, update
from datetime import datetime, date
from finapp.queries import transaction_queries, user_queries
from sqlalchemy.dialects.postgresql import insert as pg_insert


# TODO: make upsert
def create_simplefin_credentials(username, password):
    encrypted_username, encrypted_password = SimpleFINCredentials.encrypt_credentials(
        username=username, password=password
    )
    stmt = insert(SimpleFINCredentials).values(
        user_id=current_user.id,
        username=encrypted_username,
        password=encrypted_password,
    )
    result = db.session.execute(stmt)
    db.session.commit()

    credentials_id = result.inserted_primary_key[0]
    return credentials_id


def get_simplefin_credentials():
    stmt = select(SimpleFINCredentials).where(
        SimpleFINCredentials.user_id == current_user.id
    )
    return db.session.scalars(stmt.limit(1)).first()


def update_simplefin_credentials_last_synced(accounts=False, transactions=False):
    if not accounts and not transactions:
        return

    values_dict = dict()

    now = datetime.now()
    if accounts:
        values_dict["last_synced_accounts"] = now
    if transactions:
        values_dict["last_synced_transactions"] = now

    stmt = (
        update(SimpleFINCredentials)
        .where(SimpleFINCredentials.user_id == current_user.id)
        .values(values_dict)
    )
    db.session.execute(stmt)
    db.session.commit()


def delete_simplefin_credentials():
    stmt = delete(SimpleFINCredentials).where(
        SimpleFINCredentials.user_id == current_user.id
    )
    db.session.execute(stmt)
    db.session.commit()


def create_simplefin_organization(simplefin_id, name, domain, sfin_url, url):
    stmt = insert(SimpleFINOrganization).values(
        simplefin_id=simplefin_id,
        name=name,
        domain=domain,
        sfin_url=sfin_url,
        url=url,
    )
    result = db.session.execute(stmt)
    db.session.commit()

    organization_id = result.inserted_primary_key[0]
    return organization_id


def get_simplefin_organization(simplefin_id, domain, name):
    stmt = select(SimpleFINOrganization).where(
        or_(
            SimpleFINOrganization.simplefin_id == simplefin_id,
            SimpleFINOrganization.domain == domain,
            SimpleFINOrganization.name == name,
        )
    )
    return db.session.scalars(stmt.limit(1)).first()


def get_or_create_simplefin_organization(org):
    sf_org = get_simplefin_organization(
        simplefin_id=org.get("id"), domain=org.get("domain"), name=org.get("name")
    )

    if sf_org:
        return sf_org

    create_simplefin_organization(
        simplefin_id=org.get("id"),
        name=org.get("name"),
        domain=org.get("domain"),
        sfin_url=org.get("sfin-url"),
        url=org.get("url"),
    )

    return get_simplefin_organization(
        simplefin_id=org.get("id"), domain=org.get("domain"), name=org.get("name")
    )


def upsert_simplefin_account(account, organization_id):
    stmt = pg_insert(SimpleFINAccount).values(
        id=account["id"],
        user_id=current_user.id,
        organization_id=organization_id,
        name=account["name"],
        currency=account["currency"],
        balance=float(account["balance"]),
        available_balance=float(account["available-balance"]),
        balance_date=date.fromtimestamp(account["balance-date"]),
    )
    upsert_stmt = stmt.on_conflict_do_update(
        index_elements=["id"],
        set_={
            "balance": stmt.excluded.balance,
            "available_balance": stmt.excluded.available_balance,
            "balance_date": stmt.excluded.balance_date,
        },
    )
    result = db.session.execute(upsert_stmt)
    db.session.commit()

    account_id = result.inserted_primary_key[0]
    return account_id


def get_simplefin_account(id):
    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]

    stmt = select(SimpleFINAccount).where(
        and_(SimpleFINAccount.id == id, SimpleFINAccount.user_id.in_(shared_user_ids))
    )
    return db.session.scalars(stmt.limit(1)).first()


def get_simplefin_accounts():
    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]

    stmt = select(SimpleFINAccount).where(SimpleFINAccount.user_id.in_(shared_user_ids))
    return db.session.scalars(stmt).unique().all()


def toggle_simplefin_account_sync(id, sync):
    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]

    stmt = (
        update(SimpleFINAccount)
        .where(
            and_(
                SimpleFINAccount.id == id, SimpleFINAccount.user_id.in_(shared_user_ids)
            )
        )
        .values(type=sync or 0)
    )

    db.session.execute(stmt)
    db.session.commit()


def create_pending_transactions(transactions):
    if len(transactions) < 1:
        return

    pending_transactions = []
    for t in transactions:
        pt = dict(
            simplefin_id=t["id"],
            account_id=t["simplefin_account_id"],
            user_id=current_user.id,
            name=t["description"],
            amount=round(float(t["amount"]), 2),
            date=date.fromtimestamp(t["transacted_at"] or t["posted"]),
        )
        pending_transactions.append(pt)

    stmt = pg_insert(PendingTransaction).values(pending_transactions)
    stmt = stmt.on_conflict_do_nothing(index_elements=["simplefin_id"])
    db.session.execute(stmt)
    db.session.commit()


def get_pending_transactions():
    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]

    stmt = (
        select(PendingTransaction)
        .where(PendingTransaction.user_id.in_(shared_user_ids))
        .order_by(PendingTransaction.date)
    )

    return db.session.scalars(stmt).unique().all()


def get_pending_transaction_by_id(id):
    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]

    stmt = select(PendingTransaction).where(
        and_(
            PendingTransaction.id == id, PendingTransaction.user_id.in_(shared_user_ids)
        )
    )

    return db.session.scalars(stmt.limit(1)).first()


def delete_pending_transaction(id, create_completed=True):
    p_transaction = get_pending_transaction_by_id(id=id)

    if create_completed:
        create_completed_transaction(
            simplefin_id=p_transaction.simplefin_id,
            user_id=p_transaction.user_id,
            account_id=p_transaction.account_id,
            name=p_transaction.name,
            amount=p_transaction.amount,
            t_date=p_transaction.date,
        )

    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]

    stmt = delete(PendingTransaction).where(
        and_(
            PendingTransaction.id == id, PendingTransaction.user_id.in_(shared_user_ids)
        )
    )

    db.session.execute(stmt)
    db.session.commit()


def create_completed_transaction(
    simplefin_id, user_id, account_id, name, amount, t_date, transaction_id=None
):
    t_dict = dict(
        simplefin_id=simplefin_id,
        user_id=user_id,
        account_id=account_id,
        name=name,
        amount=amount,
        date=t_date,
    )

    if transaction_id is not None:
        t_dict["transaction_id"] = transaction_id

    stmt = insert(CompletedTransaction).values(t_dict)

    db.session.execute(stmt)
    db.session.commit()


def get_completed_transactions():
    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]

    stmt = (
        select(CompletedTransaction)
        .where(CompletedTransaction.user_id.in_(shared_user_ids))
        .order_by(CompletedTransaction.date)
    )

    return db.session.scalars(stmt).unique().all()


def convert_pending_transaction(
    user_id, name, amount, t_date, budget_id, categories, pending_transaction_id
):
    p_transaction = get_pending_transaction_by_id(id=pending_transaction_id)

    transaction_id = transaction_queries.create_transaction(
        user_id=user_id,
        name=name,
        amount=amount,
        date=t_date,
        budget_id=budget_id,
        categories=categories,
    )

    create_completed_transaction(
        simplefin_id=p_transaction.simplefin_id,
        user_id=user_id,
        account_id=p_transaction.account_id,
        name=p_transaction.name,
        amount=p_transaction.amount,
        t_date=p_transaction.date,
        transaction_id=transaction_id,
    )

    delete_pending_transaction(id=p_transaction.id, create_completed=False)

    return transaction_id
