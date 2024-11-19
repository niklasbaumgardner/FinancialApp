from finapp.models import Category, TransactionCategory
from flask_login import current_user
from finapp import db


##
## Category queries
##


def get_cetegories(sort=True):
    query = Category.query.filter_by(user_id=current_user.id)
    if sort:
        query = query.order_by(Category.name)
    return query.all()


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
        user_id=current_user.id, transaction_id=transaction_id, category_id=category_id
    ).first()


def add_transaction_category(transaction_id, category_id):
    t_category = get_transaction_category_by_transaction_and_category_id(
        transaction_id=transaction_id, category_id=category_id
    )
    if t_category:
        return t_category

    t_category = TransactionCategory(
        user_id=current_user.id, transaction_id=transaction_id, category_id=category_id
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
