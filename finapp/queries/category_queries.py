from finapp.models import Budget, Category, SharedBudget, TransactionCategory
from finapp.queries import user_queries
from flask_login import current_user
from finapp import db
from sqlalchemy.sql import or_, and_


##
## Category queries
##


def get_shared_categories(user_ids):
    return Category.query.where(Category.user_id.in_(user_ids)).all()


def get_categories(sort=True):
    query = Category.query.filter_by(user_id=current_user.id)
    if sort:
        query = query.order_by(Category.name)
    return query.all()


def get_categories_shared():
    users = user_queries.get_shared_users_for_all_budgets(include_current_user=True)

    return get_shared_categories([u.id for u in users])


def create_category(name, color):
    category = Category(user_id=current_user.id, name=name.strip(), color=color)
    db.session.add(category)
    db.session.commit()

    return category


##
## TransactionCategory queries
##


def get_transaction_category_by_transaction_and_category_id(
    transaction_id, category_id
):
    return TransactionCategory.query.filter_by(
        transaction_id=transaction_id, category_id=category_id
    ).first()


def add_transaction_category(user_id, transaction_id, category_id):
    t_category = get_transaction_category_by_transaction_and_category_id(
        transaction_id=transaction_id, category_id=category_id
    )
    if t_category:
        return t_category

    t_category = TransactionCategory(
        user_id=user_id, transaction_id=transaction_id, category_id=category_id
    )

    db.session.add(t_category)
    db.session.commit()

    return t_category


def delete_transaction_category(transaction_id, category_id):
    t_category = get_transaction_category_by_transaction_and_category_id(
        transaction_id=transaction_id, category_id=category_id
    )
    if not t_category:
        return

    db.session.delete(t_category)
    db.session.commit()
