from finapp.models import Budget, SharedBudget, Transaction
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import or_


##
## SharedBudget queries
##


def create_shared_budget(budget):
    maybe = get_shared_budget(budget_id=budget.id)
    if maybe:
        return maybe

    shared_budget = SharedBudget(user_id=current_user.id, budget_id=budget.id)
    db.session.add(shared_budget)
    budget.is_shared = True
    db.session.commit()
    return shared_budget


def get_shared_budget(budget_id):
    return SharedBudget.query.filter_by(
        user_id=current_user.id, budget_id=budget_id
    ).first()


def get_shared_budgets_by_budget_id(budget_id):
    return SharedBudget.query.filter_by(budget_id=budget_id).all()


def get_shared_budget_for_user_id(budget_id, user_id):
    return SharedBudget.query.filter_by(user_id=user_id, budget_id=budget_id).first()


def get_shared_budgets_query_by_budget():
    return SharedBudget.query.filter_by(user_id=current_user.id, budget_id=Budget.id)


def get_shared_budgets_query_by_transaction(budget_id):
    return SharedBudget.query.where(
        budget_id == SharedBudget.budget_id,
        SharedBudget.budget_id == Transaction.budget_id,
    )


def get_shared_transactions_query(budget_id, transactionsQuery=None):
    if not transactionsQuery:
        transactionsQuery = Transaction.query

    return transactionsQuery.where(
        or_(
            Transaction.budget_id == budget_id,
            get_shared_budgets_query_by_transaction(budget_id).exists(),
        ),
    )


def update_shared_budgets(shared_budgets, new_budget_id):
    for sb in shared_budgets:
        sb.budget_id = new_budget_id

    db.session.commit()


def delete_shared_budgets(shared_budgets):
    for sb in shared_budgets:
        db.session.delete(sb)

    db.session.commit()
