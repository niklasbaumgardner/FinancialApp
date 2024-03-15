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


def get_shared_budget_for_user_id(budget_id, user_id):
    return SharedBudget.query.filter_by(user_id=user_id, budget_id=budget_id).first()


def get_shared_budgets_query_by_budget():
    return SharedBudget.query.filter_by(user_id=current_user.id, budget_id=Budget.id)


def get_shared_budgets_query_by_transaction():
    return SharedBudget.query.filter_by(
        user_id=current_user.id, budget_id=Transaction.budget_id
    )


def get_shared_transactions_query(budegt_id, transactionsQuery=None):
    if transactionsQuery:
        return transactionsQuery.where(
            Transaction.budget_id == budegt_id,
            or_(
                current_user.id == Transaction.user_id,
                get_shared_budgets_query_by_transaction().exists(),
            ),
        )

    return Transaction.query.where(
        Transaction.budget_id == budegt_id,
        or_(
            current_user.id == Transaction.user_id,
            get_shared_budgets_query_by_transaction().exists(),
        ),
    )
