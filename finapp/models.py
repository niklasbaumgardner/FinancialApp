from flask import url_for
import json
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
import os
from finapp import db, login_manager
from finapp.queries import user_queries
from sqlalchemy_serializer import SerializerMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin, SerializerMixin):
    serialize_only = ("id", "username", "email")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def get_reset_token(self):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        return s.dumps({"user_id": self.id})

    @staticmethod
    def verify_reset_token(token, expire_sec=600):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        try:
            user_id = s.loads(token, max_age=expire_sec).get("user_id")
        except:
            return None
        return User.query.get(user_id)


class Theme(db.Model, SerializerMixin):
    serialize_rules = (
        "-id",
        "-user_id",
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    theme = db.Column(db.String, nullable=True)  # default, classic, custom, etc...
    mode = db.Column(db.String, nullable=True)  # light, dark
    primary_color = db.Column(db.String, nullable=True)  # red, blue, green, etc...
    color_contrast = db.Column(db.String, nullable=True)  # web-awesome values
    color_palette = db.Column(db.String, nullable=True)  # web-awesome values


class Budget(db.Model, SerializerMixin):
    serialize_rules = (
        "url",
        "edit_url",
        "toggle_active_url",
        "add_transaction_url",
        "shared_users",
        "delete_url",
        "share_budget_url",
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    total = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(60), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)
    is_shared = db.Column(db.Boolean, nullable=False)

    def url(self):
        return url_for("viewbudget_bp.view_budget", id=self.id)

    def edit_url(self):
        return url_for("editbudget_bp.edit_budget", id=self.id)

    def toggle_active_url(self):
        return url_for("editbudget_bp.toggle_budget")

    def add_transaction_url(self):
        return url_for("viewbudget_bp.add_transaction", budget_id=self.id)

    def delete_url(self):
        return url_for("editbudget_bp.delete_budget", b_id=self.id)

    def share_budget_url(self):
        return url_for("sharebudget_bp.share_budget", budget_id=self.id)

    def shared_users(self):
        users = user_queries.get_shared_users_for_budget_id(budget_id=self.id)
        users = [u.to_dict() for u in users]
        return users

    # I don't think this will work because of the shared_budget model
    # transactions = db.relationship("Transaction", uselist=False)

    def __str__(self):
        return f"{self.name: <30s}|{self.total: >10.2f}"

    def get_share_token(self, recipient_id):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        return s.dumps({"budget_id": self.id, "recipient_id": recipient_id})

    @staticmethod
    def verify_share_token(token, expire_sec=3600 * 24):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))

        obj = s.loads(token, max_age=expire_sec)

        return obj


class SharedBudget(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.id"), nullable=False)

    budget = db.relationship("Budget", lazy="joined")


class Transaction(db.Model, SerializerMixin):
    serialize_rules = (
        "categories",
        "user",
        "edit_url",
        "move_transaction_url",
        "delete_url",
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.id"), nullable=False)
    name = db.Column(db.String(60), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    is_transfer = db.Column(db.Boolean, nullable=True)
    paycheck_id = db.Column(db.Integer, db.ForeignKey("paycheck.id"), nullable=True)

    categories = db.relationship(
        "TransactionCategory", lazy="joined", passive_deletes=True
    )
    user = db.relationship("User", lazy="joined")

    def edit_url(self):
        return url_for(
            "viewbudget_bp.edit_transaction", b_id=self.budget_id, t_id=self.id
        )

    def move_transaction_url(self):
        return url_for(
            "viewbudget_bp.move_transaction", sb_id=self.budget_id, t_id=self.id
        )

    def delete_url(self):
        return url_for(
            "viewbudget_bp.delete_transaction", b_id=self.budget_id, t_id=self.id
        )


class PaycheckPrefill(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)


class Paycheck(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    total = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)

    # I don't know if I want this
    transactions = db.relationship("Transaction", lazy="joined")


class Category(db.Model, SerializerMixin):
    __table_args__ = (db.UniqueConstraint("user_id", "name"),)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    color = db.Column(db.String, nullable=False)


class TransactionCategory(db.Model, SerializerMixin):
    __table_args__ = (db.UniqueConstraint("transaction_id", "category_id"),)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    transaction_id = db.Column(
        db.Integer, db.ForeignKey("transaction.id", ondelete="CASCADE"), nullable=False
    )
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)

    category = db.relationship("Category", lazy="joined")
