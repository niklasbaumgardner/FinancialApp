from finapp.models import Budget, SharedBudget, User
from finapp.queries import shared_budget_queries, transaction_queries
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import or_, and_
from sqlalchemy import select
from sqlalchemy.orm import joinedload


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


def get_budget(budget_id, shared=True, query=False, first_or_404=True):
    budget_query = (
        Budget.query.join(
            SharedBudget, Budget.id == SharedBudget.budget_id, isouter=True
        )
        .where(
            and_(
                Budget.id == budget_id,
                or_(
                    Budget.user_id == current_user.id,
                    SharedBudget.user_id == current_user.id,
                ),
            ),
        )
        .options(joinedload(Budget.shared_users))
    )

    # budget_query = Budget.query.filter_by(id=budget_id)

    if query:
        return budget_query
    elif first_or_404:
        return budget_query.first_or_404()

    return budget_query.first()


def can_modify_budget(budget_id):
    budget_count = Budget.query.filter_by(id=budget_id, user_id=current_user.id).count()
    shared_budget_count = SharedBudget.query.filter_by(
        budget_id=budget_id, user_id=current_user.id
    ).count()

    return (budget_count + shared_budget_count) > 0


def get_budgets(separate=False, active_only=False, inactive_only=False):
    budgets = Budget.query.join(
        SharedBudget, Budget.id == SharedBudget.budget_id, isouter=True
    ).where(
        or_(
            Budget.user_id == current_user.id,
            SharedBudget.user_id == current_user.id,
        ),
    )

    if active_only:
        active = budgets.where(Budget.is_active == True).all()
        active.sort(key=lambda x: x.name.lower())
        return active

    elif inactive_only:
        inactive = budgets.where(Budget.is_active == False).all()
        inactive.sort(key=lambda x: x.name.lower())
        return inactive

    elif separate:
        active = budgets.where(Budget.is_active == True).all()
        inactive = budgets.where(Budget.is_active == False).all()
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
    budget = get_budget(budget_id=id)
    if budget:
        if name is not None:
            budget.name = name.strip()
        if is_active is not None:
            budget.is_active = is_active
        db.session.commit()


def update_budget_total(b_id, budget=None, commit=True):
    budget = get_budget(budget_id=b_id) if budget is None else budget

    if budget:
        total = transaction_queries.get_transactions_sum(budget_id=budget.id)
        budget.total = round(total, 2)
        if commit:
            db.session.commit()


def set_budget_shared(budget_id):
    budget = get_budget_for_id(id=budget_id)
    budget.is_shared = True
    db.session.commit()


def delete_budget(id):
    budget = get_budget(budget_id=id, shared=False)
    _delete_budget(budget)


def _delete_budget(budget):
    if budget:
        db.session.delete(budget)
        db.session.commit()
