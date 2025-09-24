from finapp.models import SharedBudget
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import and_
from sqlalchemy import insert, select
from finapp.utils.cache import TIMED_CACHE


##
## SharedBudget queries
##


def create_shared_budget(budget):
    maybe = get_shared_budget(budget_id=budget.id)
    if maybe:
        return maybe

    stmt = insert(SharedBudget).values(user_id=current_user, budget_id=budget.id)
    db.session.execute(stmt)

    budget.is_shared = True
    db.session.commit()

    cache = TIMED_CACHE.get("get_shared_users_for_all_budgets")
    if cache:
        cache.invalidate()


def get_shared_budget(budget_id):
    stmt = select(SharedBudget).where(
        and_(
            SharedBudget.user_id == current_user.id, SharedBudget.budget_id == budget_id
        )
    )

    db.session.scalars(stmt.limit(1)).first()


def get_shared_budgets_by_budget_id(budget_id):
    stmt = select(SharedBudget).where(SharedBudget.budget_id == budget_id)

    return db.session.scalars(stmt).all()


def get_shared_budget_for_user_id(budget_id, user_id):
    stmt = (
        select(SharedBudget)
        .where(
            and_(SharedBudget.budget_id == budget_id, SharedBudget.user_id == user_id)
        )
        .limit(1)
    )

    return db.session.scalars(stmt).first()


# TODO: Refactor to bulk update
def update_shared_budgets(shared_budgets, new_budget_id):
    for sb in shared_budgets:
        sb.budget_id = new_budget_id

    db.session.commit()


# TODO: Refactor to bulk delete
def delete_shared_budgets(shared_budgets):
    for sb in shared_budgets:
        db.session.delete(sb)

    db.session.commit()
