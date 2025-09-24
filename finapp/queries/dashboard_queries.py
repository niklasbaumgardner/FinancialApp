from finapp.models import (
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

    shared_user_ids = [u.id for u in user_queries.get_shared_users_for_all_budgets()]
    budget_ids = [b.id for b in budget_queries.get_budgets(active_only=True)]

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

    # stmt = (
    #     select(T1.date, T1.budget_id, func.sum(T2.amount))
    #     .select_from(T1)
    #     .join(
    #         T2,
    #         and_(T1.budget_id == T2.budget_id, T2.date <= T1.date),
    #         isouter=True,
    #     )
    #     .where(
    #         T1.budget_id == 243
    #         # and_(
    #         #     T1.budget_id.in_(budget_ids),
    #         #     # T1.user_id.in_(shared_user_ids),
    #         #     # T2.user_id.in_(shared_user_ids),
    #         # )
    #     )
    #     .group_by(T1.date, T1.budget_id)
    #     .order_by(T1.budget_id, T1.date)
    # )

    result = db.session.execute(stmt).all()
    for row in result:
        date_, b_id, amount = row
        print(str(date_), b_id, round(amount, 2))
        # print(row)
