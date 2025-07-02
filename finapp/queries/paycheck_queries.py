from finapp.models import Paycheck, Transaction
from flask_login import current_user
from finapp import db
from finapp.queries import transaction_queries
from sqlalchemy.sql import and_
from sqlalchemy import insert, select


##
## Paycheck queries
##


def create_paycheck(date, total, transactions):
    stmt = insert(Paycheck).values(date=date, total=total, user_id=current_user.id)
    result = db.session.execute(stmt)

    paycheck_id = result.inserted_primary_key[0]

    for t in transactions:
        t["paycheck_id"] = paycheck_id

        transaction_queries.create_transaction(**t, commit=False)

    db.session.commit()

    return paycheck_id


def get_paycheck_by_id(id):
    stmt = select(Paycheck).where(and_(Paycheck.id == id))

    return db.session.scalars(stmt.limit(1)).first()


def get_paychecks(sort=False):
    stmt = select(Paycheck).where(Paycheck.user_id == current_user.id)

    if sort:
        stmt = stmt.order_by(Paycheck.date.desc(), Paycheck.total)

    return db.session.scalars(stmt).unique().all()


def get_shared_paychecks():
    transactions = transaction_queries.get_paycheck_transactions()
    paycheck_ids = set([t.paycheck_id for t in transactions])

    stmt = (
        select(Paycheck)
        .where(Paycheck.id.in_(paycheck_ids))
        .order_by(Paycheck.date.desc(), Paycheck.total)
    )

    return db.session.scalars(stmt).unique().all()


def get_paychecks_by_distinct_amount():
    paychecks = get_shared_paychecks()

    lst = []
    unique_paychecks = set()
    for p in paychecks:
        if p.total in unique_paychecks:
            continue

        lst.append(p)

        unique_paychecks.add(p.total)

    return lst


def get_paycheck_prefills():
    paychecks = get_paychecks_by_distinct_amount()
    paychecks = [p.to_dict() for p in paychecks]

    for p in paychecks:
        p["transactions"] = sorted(
            p["transactions"], key=lambda t: t["budget"]["name"].casefold()
        )

    return paychecks


def update_paycheck(paycheck_id, commit=True):
    paycheck = get_paycheck_by_id(id=paycheck_id)
    if not paycheck:
        return

    stmt = transaction_queries.get_transactions_sum_query().where(
        Transaction.paycheck_id == paycheck.id
    )
    total = db.session.execute(stmt).scalar_one()

    if total is None:
        total = 0

    paycheck.total = total
    if commit:
        db.session.commit()
