from finapp.models import Category, TransactionCategory
from flask_login import current_user
from finapp import db


##
## Category queries
##


def get_cetegories():
    return Category.query.filter_by(user_id=current_user.id).all()


def create_category(name, color):
    category = Category(user_id=current_user.id, name=name, color=color)
    db.session.add(category)
    db.session.commit()

    return category


def add_transaction_category(transaction_id, category_id):
    t_category = TransactionCategory(
        user_id=current_user.id, transaction_id=transaction_id, category_id=category_id
    )

    db.session.add(t_category)
    db.session.commit()

    return t_category
