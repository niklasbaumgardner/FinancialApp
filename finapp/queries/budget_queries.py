from finapp.models import Budget
from finapp.queries import shared_budget_queries, transaction_queries
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import or_


##
## Budget queries
##


def create_budget(name):
    budg = Budget(
        name=name.strip(),
        total=0,
        user_id=current_user.id,
        is_active=True,
        is_shared=False,
    )
    db.session.add(budg)
    db.session.commit()
    return budg


def get_budget_for_id(id):
    # do not call this method unless absolutely needed
    return Budget.query.filter_by(id=id).first()


def get_budget(id, shared=True, query=False):
    budget_query = Budget.query.where(
        Budget.id == id,
        or_(
            Budget.user_id == current_user.id,
            (
                shared_budget_queries.get_shared_budgets_query_by_budget().exists()
                if shared
                else False
            ),
        ),
    )

    if query:
        return budget_query

    return budget_query.first()


def get_budgets(separate=False, active_only=False, inactive_only=False):
    budgets = Budget.query.where(
        or_(
            Budget.user_id == current_user.id,
            shared_budget_queries.get_shared_budgets_query_by_budget().exists(),
        )
    )

    if active_only:
        active = budgets.filter_by(is_active=True).all()
        active.sort(key=lambda x: x.name.lower())
        return active

    elif inactive_only:
        inactive = budgets.filter_by(is_active=False).all()
        inactive.sort(key=lambda x: x.name.lower())
        return inactive

    elif separate:
        active = budgets.filter_by(is_active=True).all()
        inactive = budgets.filter_by(is_active=False).all()
        active.sort(key=lambda x: x.name.lower())
        inactive.sort(key=lambda x: x.name.lower())
        return active, inactive

    else:
        budgets = budgets.all()
        budgets.sort(key=lambda x: x.name.lower())
        return budgets


def get_duplicate_budget_by_name(name):
    return Budget.query.filter_by(name=name.strip(), user_id=current_user.id).first()


def update_budget(id, name=None, is_active=None):
    budget = get_budget(id)
    if budget:
        if name is not None:
            budget.name = name.strip()
        if is_active is not None:
            budget.is_active = is_active
        db.session.commit()


def update_budget_total(b_id, budget=None):
    budget = get_budget(b_id) if budget is None else budget

    if budget:
        total = transaction_queries.get_transactions_sum(budget_id=budget.id)
        budget.total = round(total, 2)
        db.session.commit()


def set_budget_shared(budget_id):
    budget = get_budget_for_id(id=budget_id)
    budget.is_shared = True
    db.session.commit()


def delete_budget(id):
    budget = get_budget(id, shared=False)
    _delete_budget(budget)


def _delete_budget(budget):
    if budget:
        db.session.delete(budget)
        db.session.commit()
