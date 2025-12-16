from finapp.models import (
    AccountBalance,
    Budget,
    PendingTransaction,
    SharedBudget,
    Transaction,
    TransactionCategory,
    CompletedTransaction,
    SimpleFINTransaction,
)
from finapp.queries import (
    budget_queries,
    category_queries,
    user_queries,
)
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import func, or_, and_
from sqlalchemy.orm import noload, aliased
from sqlalchemy import delete, exists, extract, insert, update, select, cast, FLOAT
from datetime import date, timedelta
import os


def get_line_chart_data():
    T1 = aliased(Transaction)
    T2 = aliased(Transaction)

    budgets = budget_queries.get_budgets(active_only=True)

    budgets_dict = {b.id: b for b in budgets}
    budget_ids = budgets_dict.keys()

    sub_stmt = (
        select(func.sum(T2.amount))
        .where(T1.budget_id == T2.budget_id, T2.date <= T1.date)
        .label("amount")
    )

    stmt = (
        select(T1.date, T1.budget_id, sub_stmt)
        .select_from(T1)
        .where(T1.budget_id.in_(budget_ids))
        .group_by(T1.date, T1.budget_id)
        .order_by(T1.budget_id, T1.date)
    )

    result = db.session.execute(stmt).all()
    data = {}
    start_date = None
    end_date = None
    for row in result:
        date_, b_id, amount = row
        if b_id not in data:
            data[b_id] = {"budget": budgets_dict[b_id].to_dict(), "line_data": []}

        data[b_id]["line_data"].append((str(date_), round(amount, 2)))
        # print(str(date_), b_id, round(amount, 2))
        if not start_date or date_ < start_date:
            start_date = date_
        if not end_date or date_ > end_date:
            end_date = date_
        # print(row)

    return data, str(start_date), str(end_date)


def get_net_worth_data():
    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]
    stmt = (
        select(AccountBalance)
        .where(AccountBalance.user_id.in_(shared_user_ids))
        .order_by(AccountBalance.date)
    )

    result = db.session.scalars(stmt).all()

    nw_stmt = (
        select(func.sum(AccountBalance.balance), AccountBalance.date)
        .where(AccountBalance.user_id.in_(shared_user_ids))
        .group_by(AccountBalance.date)
        .order_by(AccountBalance.date)
    )

    nw_result = db.session.execute(nw_stmt).all()

    return [{"amount": round(a, 2), "date": str(d)} for a, d in nw_result]
    print(len(nw_result))
    for a in nw_result:
        print(a)

    print(len(result))
    for ab in result:
        print(ab.to_dict())

    return result


def get_spending_by_budget_and_month():
    budgets = budget_queries.get_budgets(active_only=True)
    budget_ids = [b.id for b in budgets]
    month_label = extract("month", Transaction.date)
    year_label = extract("year", Transaction.date)
    twelve_months_ago = date.today() - timedelta(days=365)
    spending_stmt = (
        select(
            func.sum(Transaction.amount),
            Transaction.budget_id,
            month_label,
            year_label,
        )
        .where(
            Transaction.amount < 0,
            Transaction.budget_id.in_(budget_ids),
            Transaction.date >= twelve_months_ago,
        )
        .group_by(Transaction.budget_id, month_label, year_label)
        .order_by(month_label.desc(), year_label.desc(), Transaction.budget_id)
    )
    income_stmt = (
        select(
            func.sum(Transaction.amount),
            Transaction.budget_id,
            month_label,
            year_label,
        )
        .where(
            Transaction.amount > 0,
            Transaction.budget_id.in_(budget_ids),
            Transaction.date >= twelve_months_ago,
        )
        .group_by(Transaction.budget_id, month_label, year_label)
        .order_by(month_label.desc(), year_label.desc(), Transaction.budget_id)
    )

    spending_results = db.session.execute(spending_stmt).all()
    spending_results = [
        dict(amount=s[0], budget_id=s[1], month=int(s[2]), year=int(s[3]))
        for s in spending_results
    ]

    income_results = db.session.execute(income_stmt).all()
    income_results = [
        dict(amount=i[0], budget_id=i[1], month=int(i[2]), year=int(i[3]))
        for i in income_results
    ]

    return budgets, income_results, spending_results
