from datetime import datetime

from sqlalchemy import (
    FLOAT,
    cast,
    select,
)
from sqlalchemy.sql import func
from sqlalchemy.sql.elements import ColumnElement

from finapp import db
from finapp.models import (
    SimpleFINAccount,
    SimpleFINTransaction,
    User,
)
from finapp.queries import user_queries


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

    joined = set()

    def join_once(
        stmt,
        model: type[SimpleFINAccount] | type[User],
        join_condition: ColumnElement[bool],
    ):
        if model in joined:
            return stmt
        joined.add(model)

        return stmt.join(model, join_condition)

    shared_user_ids: set[int] = {
        u.id for u in user_queries.get_shared_users_for_all_budgets()
    }

    column_date = func.coalesce(
        SimpleFINTransaction.transacted_at, func.nullif(SimpleFINTransaction.posted, 0)
    )

    stmt = select(SimpleFINTransaction).where(
        SimpleFINTransaction.user_id.in_(shared_user_ids)
    )

    if len(sort) > 0:
        for o in sort:
            if o["id"] == "date":
                if o["desc"]:
                    stmt = stmt.order_by(column_date.desc().nulls_last())
                else:
                    stmt = stmt.order_by(column_date.asc().nulls_last())
            elif o["id"] == "account":
                stmt = join_once(
                    stmt,
                    SimpleFINAccount,
                    SimpleFINTransaction.account_id == SimpleFINAccount.id,
                )
                if o["desc"]:
                    stmt = stmt.order_by(SimpleFINAccount.name.desc())
                else:
                    stmt = stmt.order_by(SimpleFINAccount.name.asc())
            elif o["id"] == "user":
                stmt = join_once(
                    stmt,
                    User,
                    SimpleFINTransaction.user_id == User.id,
                )
                if o["desc"]:
                    stmt = stmt.order_by(User.username.desc())
                else:
                    stmt = stmt.order_by(User.username.asc())
            elif o["id"] == "amount":
                if o["desc"]:
                    stmt = stmt.order_by(
                        cast(SimpleFINTransaction.amount, FLOAT).desc()
                    )
                else:
                    stmt = stmt.order_by(cast(SimpleFINTransaction.amount, FLOAT).asc())
            else:
                if o["desc"]:
                    stmt = stmt.order_by(getattr(SimpleFINTransaction, o["id"]).desc())
                else:
                    stmt = stmt.order_by(getattr(SimpleFINTransaction, o["id"]).asc())

    else:
        stmt = stmt.order_by(
            column_date.desc().nulls_last(),
        )

    for o in filters:
        value = o["value"]

        if type(value) == str:
            if o["id"] == "account":
                stmt = join_once(
                    stmt,
                    SimpleFINAccount,
                    SimpleFINTransaction.account_id == SimpleFINAccount.id,
                ).where(SimpleFINAccount.name.ilike(f"%{value}%"))

            elif o["id"] == "user":
                stmt = join_once(
                    stmt,
                    User,
                    SimpleFINTransaction.user_id == User.id,
                ).where(User.username.ilike(f"%{value}%"))

            else:
                stmt = stmt.where(
                    getattr(SimpleFINTransaction, o["id"]).ilike(f"%{value}%")
                )
        elif o["id"] == "amount":
            first, second = value
            if first is not None:
                stmt = stmt.where(cast(SimpleFINTransaction.amount, FLOAT) >= first)
            if second is not None:
                stmt = stmt.where(cast(SimpleFINTransaction.amount, FLOAT) <= second)

        elif o["id"] == "date":
            first, second = value
            if first is not None:
                year, month, day = list(map(int, first.split("-")))
                dt = datetime(year, month, day)
                stmt = stmt.where(column_date >= dt.timestamp())
            if second is not None:
                year, month, day = list(map(int, second.split("-")))
                dt = datetime(year, month, day)
                stmt = stmt.where(column_date <= dt.timestamp())

    return paginate_query(stmt=stmt, page=page, page_size=20)
