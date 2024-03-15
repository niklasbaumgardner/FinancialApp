from finapp.models import Budget, SharedBudget, User
from sqlalchemy.sql import or_, and_
from flask_login import current_user
from finapp import bcrypt, db


##
## User queries
##


def create_user(email, username, password):
    hash_ = hash_password(password=password)
    new_user = User(email=email, username=username, password=hash_)
    db.session.add(new_user)
    db.session.commit()


def get_user_by_id(id):
    return User.query.filter_by(id=id).first()


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()


def update_user(id, username, email):
    user = get_user_by_id(id=id)

    username = username if is_username_unique(username=username) else None
    email = email if is_email_unique(email=email) else None

    if username:
        user.username = username

    if email:
        user.email = email

    db.session.commit()


def update_user_password(id, password):
    if not password or not id:
        return

    user = get_user_by_id(id=id)
    hash_ = hash_password(password=password)
    user.password = hash_

    db.session.commit()


def hash_password(password):
    return bcrypt.generate_password_hash(password=password).decode("utf-8")


def is_email_unique(email):
    return not User.query.filter_by(email=email).first()


def is_username_unique(username):
    return not User.query.filter_by(username=username).first()


def get_shared_users_for_budget_id(budget_id):
    shared_budget_query = SharedBudget.query.filter_by(
        budget_id=budget_id, user_id=User.id
    )
    budget_owner_query = Budget.query.filter_by(id=budget_id, user_id=User.id)

    return User.query.where(
        and_(
            current_user.id != User.id,
            or_(shared_budget_query.exists(), budget_owner_query.exists()),
        )
    ).all()


def get_shared_users_for_all_budgets():
    shared_budget_query = SharedBudget.query.filter_by(
        budget_id=Budget.id, user_id=User.id
    )
    budget_shared_query = Budget.query.where(
        or_(
            and_(Budget.is_shared == True, Budget.user_id == User.id),
            shared_budget_query.exists(),
        )
    )

    return User.query.where(
        and_(current_user.id != User.id, budget_shared_query.exists())
    ).all()
