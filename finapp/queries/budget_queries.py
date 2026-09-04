from sqlalchemy.sql.elements import ColumnElement
from sqlalchemy.orm.attributes import InstrumentedAttribute
from finapp.models import SharedBudget
from collections.abc import Sequence

from flask_login import current_user
from sqlalchemy import delete, func, insert, select, update
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import and_, or_
from sqlalchemy.sql.selectable import Select

from finapp import db
from finapp.models import Budget, SharedBudget
from finapp.queries import transaction_queries

##
## Budget queries
##


def create_budget(name: ColumnElement[bool]):
    stmt = insert(Budget).values(
        name=name.strip(),
        total=0,
        user_id=current_user.id,
        is_active=True,
        is_shared=False,
    )
    result = db.session.execute(stmt)

    budget_id = result.inserted_primary_key.id

    db.session.commit()
    return budget_id


def get_budget_for_id(id) -> Budget | None:
    # do not call this method unless absolutely needed
    return db.session.scalars(select(Budget).where(Budget.id == id).limit(1)).first()


def get_budget_query(
    budget_id, join_shared_users: bool = True
) -> Select[tuple[Budget]]:
    budget_query = (
        select(Budget)
        .outerjoin(SharedBudget, Budget.id == SharedBudget.budget_id)
        .where(
            and_(
                Budget.id == budget_id,
                or_(
                    Budget.user_id == current_user.id,
                    SharedBudget.user_id == current_user.id,
                ),
            ),
        )
    )

    if join_shared_users:
        budget_query = budget_query.options(joinedload(Budget.shared_users))

    return budget_query


def get_budgets_query() -> Select[tuple[Budget]]:
    return (
        select(Budget)
        .outerjoin(SharedBudget, Budget.id == SharedBudget.budget_id)
        .where(
            or_(
                Budget.user_id == current_user.id,
                SharedBudget.user_id == current_user.id,
            ),
        )
    )


def get_budget(
    budget_id: type[SharedBudget], shared: bool = True, query: bool = False, first_or_404: bool = True
) -> Budget | Select[tuple[Budget]] | None:
    stmt = get_budget_query(budget_id=budget_id)

    if query:
        return stmt

    return db.session.scalars(stmt.limit(1)).first()


def can_user_modify_budgets(budget_ids, user_id) -> bool:
    if type(budget_ids) is not set:
        budget_ids = set(budget_ids)

    stmt = (
        select(func.count(Budget.id))
        .outerjoin(SharedBudget, Budget.id == SharedBudget.budget_id)
        .where(
            and_(
                Budget.id.in_(budget_ids),
                or_(
                    Budget.user_id == user_id,
                    SharedBudget.user_id == user_id,
                ),
            ),
        )
    )
    budget_count = db.session.execute(stmt).scalar_one()

    return budget_count == len(budget_ids)


def can_modify_budgets(budget_ids: InstrumentedAttribute[str]) -> bool:
    return can_user_modify_budgets(budget_ids=budget_ids, user_id=current_user.id)


def can_user_modify_budget(budget_id, user_id) -> bool:
    return can_user_modify_budgets(budget_ids=[budget_id], user_id=user_id)


def can_modify_budget(budget_id) -> bool:
    return can_user_modify_budget(budget_id=budget_id, user_id=current_user.id)


def get_budgets(
    separate: bool = False, active_only: bool = False, inactive_only: bool = False
) -> Sequence[Budget] | tuple[Sequence[Budget], Sequence[Budget]]:
    query = get_budgets_query()

    if active_only:
        active = (
            db.session.scalars(
                query.where(Budget.is_active.is_(True)).order_by(
                    func.lower(Budget.name)
                )
            )
            .unique()
            .all()
        )
        return active

    elif inactive_only:
        inactive = (
            db.session.scalars(
                query.where(Budget.is_active.is_(False)).order_by(
                    func.lower(Budget.name)
                )
            )
            .unique()
            .all()
        )
        return inactive

    elif separate:
        active = (
            db.session.scalars(
                query.where(Budget.is_active.is_(True)).order_by(
                    func.lower(Budget.name)
                )
            )
            .unique()
            .all()
        )
        inactive = (
            db.session.scalars(
                query.where(Budget.is_active.is_(False)).order_by(
                    func.lower(Budget.name)
                )
            )
            .unique()
            .all()
        )
        return active, inactive

    else:
        budgets = (
            db.session.scalars(query.order_by(func.lower(Budget.name))).unique().all()
        )
        return budgets


def get_budgets_for_user(user_id) -> Sequence[Budget]:
    stmt = (
        select(Budget)
        .where(Budget.is_active.is_(True))
        .outerjoin(SharedBudget, Budget.id == SharedBudget.budget_id)
        .where(
            or_(
                Budget.user_id == user_id,
                SharedBudget.user_id == user_id,
            ),
        )
        .order_by(func.lower(Budget.name))
    )

    return db.session.scalars(stmt).unique().all()


def get_duplicate_budget_by_name(name) -> Budget | None:
    return db.session.scalars(
        get_budgets_query().where(Budget.name == name.strip()).limit(1)
    ).first()


def update_budget(budget_id, name=None, is_active=None) -> None:
    if can_modify_budget(budget_id=budget_id):
        update_dict = {}
        if name is not None:
            update_dict["name"] = name.strip()
        if is_active is not None:
            update_dict["is_active"] = is_active

        stmt = update(Budget).where(Budget.id == budget_id).values(update_dict)

        db.session.execute(stmt)
        db.session.commit()


def update_budget_total(budget_id: InstrumentedAttribute[str], budget=None, commit: bool = True) -> None:
    if can_modify_budget(budget_id=budget_id):
        total = transaction_queries.get_transactions_sum(budget_id=budget_id)
        stmt = (
            update(Budget).where(Budget.id == budget_id).values(total=round(total, 2))
        )

        db.session.execute(stmt)
        if commit:
            db.session.commit()


def set_budget_shared(budget_id) -> None:
    if can_modify_budget(budget_id=budget_id):
        stmt = update(Budget).where(Budget.id == budget_id).values(is_shared=True)

        db.session.execute(stmt)
        db.session.commit()


def delete_budget(budget_id) -> None:
    stmt = delete(Budget).where(Budget.id == budget_id)
    db.session.execute(stmt)
    db.session.commit()
