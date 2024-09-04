from finapp.models import Category
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
