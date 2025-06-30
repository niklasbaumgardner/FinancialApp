import re
from finapp.models import Budget, SharedBudget, User
from sqlalchemy.sql import or_, and_
from flask_login import current_user
from finapp import bcrypt, db
from sqlalchemy import func, select, update


##
## User queries
##


def create_user(email, username, password):
    hash_ = hash_password(password=password)
    new_user = User(email=email, username=username, password=hash_)
    db.session.add(new_user)
    db.session.commit()


def get_user_by_id(id):
    stmt = select(User).where(User.id == id)
    return db.session.scalars(stmt.limit(1)).first()


def get_user_by_email(email):
    stmt = select(User).where(User.email == email)
    return db.session.scalars(stmt.limit(1)).first()


def update_user(username, email):
    update_dict = dict()
    if username is not None:
        update_dict["username"] = username.strip()
    if email is not None:
        update_dict["email"] = email.strip()

    stmt = update(User).where(User.id == current_user.id).values(update_dict)

    db.session.execute(stmt)
    db.session.commit()


def update_user_password(id, password):
    if not password or not id:
        return

    user = get_user_by_id(id=id)
    if not user:
        return
    hash_ = hash_password(password=password)

    stmt = update(User).where(User.id == user.id).values(password=hash_)

    db.session.execute(stmt)
    db.session.commit()


def hash_password(password):
    return bcrypt.generate_password_hash(password=password).decode("utf-8")


def is_email_unique(email):
    stmt = select(func.count()).where(User.email == email)
    count = db.session.execute(stmt).scalar_one()
    return count == 0


def is_username_unique(username):
    stmt = select(func.count()).where(User.username == username)
    count = db.session.execute(stmt).scalar_one()
    return count == 0


def get_shared_users_for_all_budgets(include_current_user=False):
    budget_shared_query = select(Budget, SharedBudget).where(
        and_(
            or_(
                Budget.user_id == current_user.id,
                SharedBudget.user_id == current_user.id,
            ),
            SharedBudget.budget_id == Budget.id,
            or_(User.id == SharedBudget.user_id, Budget.user_id == User.id),
        )
    )

    if include_current_user:
        return db.session.scalars(
            select(User).where(budget_shared_query.exists())
        ).all()

    return db.session.scalars(
        select(User).where(
            and_(User.id != current_user.id, budget_shared_query.exists())
        )
    ).all()
