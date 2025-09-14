from finapp.models import (
    PendingTransaction,
    SimpleFINAccount,
    SimpleFINCredential,
    SimpleFINOrganization,
)
from flask_login import current_user
from finapp import db
from sqlalchemy.sql import or_, and_
from sqlalchemy.orm import joinedload
from sqlalchemy import delete, func, insert, select, update
from datetime import datetime, date


# TODO: make upsert
def create_simplefin_credential(username, password):
    encrypted_username, encrypted_password = SimpleFINCredential.encrypt_credentials(
        username=username, password=password
    )
    stmt = insert(SimpleFINCredential).values(
        user_id=current_user.id,
        username=encrypted_username,
        password=encrypted_password,
    )
    result = db.session.execute(stmt)
    db.session.commit()

    credential_id = result.inserted_primary_key[0]
    return credential_id


def get_simplefin_credential():
    stmt = select(SimpleFINCredential).where(
        SimpleFINCredential.user_id == current_user.id
    )
    return db.session.scalars(stmt.limit(1)).first()


def update_simplefin_credential_last_synced():
    stmt = (
        update(SimpleFINCredential)
        .where(SimpleFINCredential.user_id == current_user.id)
        .values(last_synced=datetime.now())
    )
    db.session.execute(stmt)
    db.session.commit()


def create_simplefin_organization(sfin_id, name, domain, sfin_url, url):
    stmt = insert(SimpleFINOrganization).values(
        simplefin_id=sfin_id,
        name=name,
        domain=domain,
        sfin_url=sfin_url,
        url=url,
    )
    result = db.session.execute(stmt)
    db.session.commit()

    organization_id = result.inserted_primary_key[0]
    return organization_id


def get_simplefin_organization(id, domain, name):
    stmt = select(SimpleFINOrganization).where(
        or_(
            SimpleFINOrganization.id == id,
            SimpleFINOrganization.domain == domain,
            SimpleFINOrganization.name == name,
        )
    )
    return db.session.scalars(stmt.limit(1)).first()


def upsert_simplefin_account(account, organization_id):
    stmt = (
        insert(SimpleFINAccount)
        .values(
            id=account["id"],
            user_id=current_user.id,
            organization_id=organization_id,
            name=account["name"],
            currency=account["currency"],
            balance=float(account["balance"]),
            available_balance=float(account["available-balance"]),
            balance_date=date.fromtimestamp(account["balance-date"]),
        )
        .on_conflict_do_update(
            index_elements=[SimpleFINAccount.id],
            set_=dict(
                organization_id=organization_id,
            ),
        )
    )
    result = db.session.execute(stmt)
    db.session.commit()

    account_id = result.inserted_primary_key[0]
    return account_id


def get_simplefin_account(id):
    stmt = select(SimpleFINAccount).where(
        and_(SimpleFINAccount.id == id, SimpleFINAccount.user_id == current_user.id)
    )
    return db.session.scalars(stmt.limit(1)).first()


def create_pending_transactions(account, transactions):
    pending_transactions = []
    for t in transactions:
        pt = dict(
            simplefin_id=t["id"],
            account_id=account.id,
            user_id=current_user.id,
            name=t["description"],
            amount=round(float(t["amount"]), 2),
            date=date.fromtimestamp(t["transacted_at"] or t["posted"]),
        )
        pending_transactions.append(pt)

    stmt = insert(PendingTransaction).values(transactions)
    db.session.execute(stmt)
