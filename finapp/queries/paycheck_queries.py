from finapp.models import Paycheck, Transaction
from flask_login import current_user
from finapp import db
from finapp.queries import budget_queries, transaction_queries
from sqlalchemy.sql import func


##
## Paycheck queries
##


def create_paycheck(date, total):
    paycheck = Paycheck(date=date, total=total, user_id=current_user.id)

    db.session.add(paycheck)
    db.session.commit()

    return paycheck


def get_paycheck_by_id(id):
    return Paycheck.query.filter_by(id=id, user_id=current_user.id).first()


def get_paychecks(sort=False):
    query = Paycheck.query.filter_by(user_id=current_user.id)

    if sort:
        query = query.order_by(Paycheck.date.desc(), Paycheck.total)

    return query.all()


def get_paychecks_by_distinct_amount():
    paychecks = get_paychecks(sort=True)

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
        transactions = [
            t.to_dict()
            for t in transaction_queries.get_transactions_for_paycheck_id(
                paycheck_id=p["id"]
            )
        ]

        for t in transactions:
            budget = budget_queries.get_budget_for_id(id=t["budget_id"]).to_dict()
            t["budget"] = budget

        p["transactions"] = sorted(
            transactions, key=lambda t: t["budget"]["name"].casefold()
        )

    return paychecks


def update_paycheck(paycheck_id, commit=True):
    paycheck = get_paycheck_by_id(id=paycheck_id)
    if not paycheck:
        return

    transactions = transaction_queries.get_transactions_for_paycheck_id(
        paycheck_id=paycheck.id, query=True
    )
    total = transactions.with_entities(func.sum(Transaction.amount)).first()[0]

    paycheck.total = total
    if commit:
        db.session.commit()
