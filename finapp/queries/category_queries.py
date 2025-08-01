from finapp.models import Category, TransactionCategory
from finapp.queries import user_queries
from flask_login import current_user
from finapp import db
from sqlalchemy.sql import and_
from sqlalchemy import delete, insert, select


##
## Category queries
##


def create_category(name, color):
    stmt = insert(Category).values(
        user_id=current_user.id, name=name.strip(), color=color
    )
    db.session.execute(stmt)
    db.session.commit()


def get_shared_categories(user_ids):
    return db.session.scalars(
        select(Category).where(Category.user_id.in_(user_ids))
    ).all()


def get_categories():
    users = user_queries.get_shared_users_for_all_budgets()

    return get_shared_categories([u.id for u in users])


##
## TransactionCategory queries
##


def bulk_add_transaction_categories(user_id, transaction_id, category_ids, commit=True):
    t_categories = [
        dict(user_id=user_id, transaction_id=transaction_id, category_id=c_id)
        for c_id in category_ids
    ]

    stmt = insert(TransactionCategory).values(t_categories)
    db.session.execute(stmt)

    if commit:
        db.session.commit()


def bulk_delete_transaction_categories(transaction_id, category_ids, commit=True):
    stmt = delete(TransactionCategory).where(
        and_(
            TransactionCategory.transaction_id == transaction_id,
            TransactionCategory.category_id.in_(category_ids),
        ),
    )

    db.session.execute(stmt)

    if commit:
        db.session.commit()
