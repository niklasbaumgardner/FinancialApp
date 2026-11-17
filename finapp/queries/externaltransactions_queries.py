import os
from datetime import date, timedelta

from flask_login import current_user
from sqlalchemy import (
    FLOAT,
    Date,
    String,
    cast,
    delete,
    extract,
    insert,
    select,
    update,
)
from sqlalchemy.orm import noload
from sqlalchemy.sql import and_, func, or_
from sqlalchemy.sql.elements import ColumnElement
from sqlalchemy.sql.selectable import Select

from finapp import db
from finapp.models import (
    Budget,
    Category,
    CompletedTransaction,
    PendingTransaction,
    SimpleFINTransaction,
    Transaction,
    TransactionCategory,
    User,
)
from finapp.queries import (
    budget_queries,
    category_queries,
    user_queries,
)
from finapp.utils.Sqids import sqids


def paginate_query(stmt, page, page_size: int = 10):
    # transactions = transactions.paginate(page=page, per_page=10)
    total = db.session.execute(
        select(func.count()).select_from(stmt.subquery())
    ).scalar_one()

    subq = stmt.subquery()
    total_sum = db.session.execute(
        select(func.sum(cast(subq.c.amount, FLOAT)))
    ).scalar_one()

    num_pages = max(1, ((total - 1) // page_size) + 1)

    page = min(num_pages, max(page, 1))
    stmt = stmt.limit(page_size).offset((page - 1) * page_size)
    transactions = db.session.scalars(stmt).unique().all()
    return (transactions, total, page, num_pages, total_sum)


def data_grid(sort, filters, search, page, page_size):
    shared_user_ids: set[int] = {
        u.id for u in user_queries.get_shared_users_for_all_budgets()
    }

    sort_date = func.coalesce(
        SimpleFINTransaction.transacted_at, func.nullif(SimpleFINTransaction.posted, 0)
    )

    stmt = (
        select(SimpleFINTransaction)
        .where(SimpleFINTransaction.user_id.in_(shared_user_ids))
        .order_by(
            sort_date.desc().nulls_last(),
        )
    )

    return paginate_query(stmt=stmt, page=page, page_size=20)

    def is_number(str_num):
        try:
            float(str_num)
            return True
        except ValueError:
            return False

    def is_date_string(string):
        # TODO: format in db is YYYY-MM-DD
        nums = string.replace("-", "/").split("/")
        for num in nums:
            if not num.isdigit():
                return False
        return True

    if len(sort) > 0:
        for o in sort:
            # TODO: sort by categgory names
            if o["id"] == "budget":
                stmt = join_once(
                    stmt,
                    Budget,
                    Transaction.budget_id == Budget.id,
                )
                if o["desc"]:
                    stmt = stmt.order_by(Budget.name.desc())
                else:
                    stmt = stmt.order_by(Budget.name.asc())
            elif o["id"] == "user":
                stmt = join_once(
                    stmt,
                    User,
                    Transaction.user_id == User.id,
                )
                if o["desc"]:
                    stmt = stmt.order_by(User.username.desc())
                else:
                    stmt = stmt.order_by(User.username.asc())
            else:
                if o["desc"]:
                    stmt = stmt.order_by(getattr(Transaction, o["id"]).desc())
                else:
                    stmt = stmt.order_by(getattr(Transaction, o["id"]).asc())
    else:
        stmt = stmt.order_by(Transaction.date.desc(), Transaction.id.desc())

    for o in filters:
        value = o["value"]
        if type(value) == str:
            if o["id"] == "budget":
                stmt = join_once(
                    stmt,
                    Budget,
                    Transaction.budget_id == Budget.id,
                ).where(Budget.name.ilike(f"%{value}%"))

            elif o["id"] == "user":
                stmt = join_once(
                    stmt,
                    User,
                    Transaction.user_id == User.id,
                ).where(User.username.ilike(f"%{value}%"))

            else:
                stmt = stmt.where(getattr(Transaction, o["id"]).ilike(f"%{value}%"))
        elif o["id"] == "amount":
            first, second = value
            if first is not None:
                stmt = stmt.where(getattr(Transaction, o["id"]) >= first)
            if second is not None:
                stmt = stmt.where(getattr(Transaction, o["id"]) <= second)

        elif o["id"] == "date":
            first, second = value
            if first is not None:
                stmt = stmt.where(getattr(Transaction, o["id"]) >= cast(first, Date))
            if second is not None:
                stmt = stmt.where(getattr(Transaction, o["id"]) <= cast(second, Date))

        elif o["id"] == "categories":
            stmt = join_once(
                stmt,
                TransactionCategory,
                Transaction.id == TransactionCategory.transaction_id,
            ).where(
                TransactionCategory.category_id.in_(sqids.decode_list(value)),
            )

    if search:
        search_list = [Transaction.name.ilike(f"%{search}%")]

        if is_number(search):
            search_list.append(Transaction.amount.cast(String).ilike(f"%{search}%"))
        if search.isdigit() or is_date_string(search):
            search_list.append(Transaction.date.cast(String).ilike(f"%{search}%"))

        stmt = stmt.where(
            or_(
                *search_list,
                Budget.name.ilike(f"%{search}%"),
                User.username.ilike(f"%{search}%"),
                category_stmt,
            )
        )

    return paginate_query(stmt=stmt, page=page, page_size=20)
