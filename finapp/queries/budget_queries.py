from finapp.models import Budget, SharedBudget
from finapp.queries import transaction_queries
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import or_, and_
from sqlalchemy.orm import joinedload
from sqlalchemy import delete, func, insert, select, update


##
## Budget queries
##


def create_budget(name):
    stmt = insert(Budget).values(
        name=name.strip(),
        total=0,
        user_id=current_user.id,
        is_active=True,
        is_shared=False,
    )
    result = db.session.execute(stmt)
    db.session.commit()

    budget_id = result.inserted_primary_key[0]
    return budget_id


def get_budget_for_id(id):
    # do not call this method unless absolutely needed
    return db.session.scalars(select(Budget).where(Budget.id == id).limit(1)).first()


def get_budget_query(budget_id, join_shared_users=True):
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


def get_budgets_query():
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


def get_budget(budget_id, shared=True, query=False, first_or_404=True):
    stmt = get_budget_query(budget_id=budget_id)

    if query:
        return stmt

    return db.session.scalars(stmt.limit(1)).first()


def can_modify_budget(budget_id):
    return can_user_modify_budget(budget_id=budget_id, user_id=current_user.id)


def can_modify_budgets(budget_ids):
    stmt = (
        select(func.count(Budget.id))
        .outerjoin(SharedBudget, Budget.id == SharedBudget.budget_id)
        .where(
            and_(
                Budget.id.in_(budget_ids),
                or_(
                    Budget.user_id == current_user.id,
                    SharedBudget.user_id == current_user.id,
                ),
            ),
        )
    )
    budget_count = db.session.execute(stmt).scalar_one()
    return budget_count == len(budget_ids)


def can_user_modify_budget(budget_id, user_id):
    stmt = (
        select(func.count(Budget.id))
        .outerjoin(SharedBudget, Budget.id == SharedBudget.budget_id)
        .where(
            and_(
                Budget.id == budget_id,
                or_(
                    Budget.user_id == user_id,
                    SharedBudget.user_id == user_id,
                ),
            ),
        )
    )
    budget_count = db.session.execute(stmt).scalar_one()

    return budget_count > 0


def get_budgets(separate=False, active_only=False, inactive_only=False):
    query = get_budgets_query()

    if active_only:
        active = db.session.scalars(query.where(Budget.is_active)).unique().all()
        active.sort(key=lambda x: x.name.lower())
        return active

    elif inactive_only:
        inactive = db.session.scalars(query.where(not Budget.is_active)).unique().all()
        inactive.sort(key=lambda x: x.name.lower())
        return inactive

    elif separate:
        active = db.session.scalars(query.where(Budget.is_active)).unique().all()
        inactive = db.session.scalars(query.where(not Budget.is_active)).unique().all()
        active.sort(key=lambda x: x.name.lower())
        inactive.sort(key=lambda x: x.name.lower())
        return active, inactive

    else:
        budgets = db.session.scalars(query).unique().all()
        budgets.sort(key=lambda x: x.name.lower())
        return budgets


def get_duplicate_budget_by_name(name):
    return db.session.scalars(
        get_budgets_query().where(Budget.name == name.strip()).limit(1)
    ).first()


def update_budget(budget_id, name=None, is_active=None):
    if can_modify_budget(budget_id=budget_id):
        update_dict = dict()
        if name is not None:
            update_dict["name"] = name.strip()
        if is_active is not None:
            update_dict["is_active"] = is_active

        stmt = update(Budget).where(Budget.id == budget_id).values(update_dict)

        db.session.execute(stmt)
        db.session.commit()


def update_budget_total(budget_id, budget=None, commit=True):
    if can_modify_budget(budget_id=budget_id):
        total = transaction_queries.get_transactions_sum(budget_id=budget_id)
        stmt = (
            update(Budget).where(Budget.id == budget_id).values(total=round(total, 2))
        )

        db.session.execute(stmt)
        if commit:
            db.session.commit()


def set_budget_shared(budget_id):
    if can_modify_budget(budget_id=budget_id):
        stmt = update(Budget).where(Budget.id == budget_id).values(is_shared=True)

        db.session.execute(stmt)
        db.session.commit()


def delete_budget(budget_id):
    stmt = delete(Budget).where(Budget.id == budget_id)
    db.session.execute(stmt)
    db.session.commit()
