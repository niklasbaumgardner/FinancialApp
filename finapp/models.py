from flask import url_for
import json
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
import os
from finapp import db, login_manager
from finapp.utils import queries


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def to_dict(self):
        return dict(
            id=self.id,
            username=self.username,
        )

    def to_json(self):
        return json.dumps(self.to_dict())

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


class Theme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    theme = db.Column(db.String, nullable=True)
    backgroundColor = db.Column(db.String, nullable=True)
    color = db.Column(db.String, nullable=True)


class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    total = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(60), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)
    is_shared = db.Column(db.Boolean, nullable=False)

    def to_json(self):
        obj = dict(
            id=self.id,
            user_id=self.user_id,
            total=self.total,
            name=self.name,
            isActive=self.is_active,
            isShared=self.is_shared,
            url=url_for("viewbudget_bp.view_budget", id=self.id),
            editUrl=url_for("index_bp.edit_budget", id=self.id),
            toggleActiveUrl=url_for("index_bp.toggle_budget"),
        )

        if self.is_shared:
            obj["sharedUserIds"] = [
                u.id for u in queries.get_shared_users_for_budget_id(budget_id=self.id)
            ]
        return json.dumps(obj)

    def __str__(self):
        return f"{self.name : <30s}|{self.total : >10.2f}"

    def get_share_token(self, recipient_id):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        return s.dumps({"budget_id": self.id, "recipient_id": recipient_id})

    @staticmethod
    def verify_share_token(token, expire_sec=3600 * 24):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))

        obj = s.loads(token, max_age=expire_sec)

        return obj


class SharedBudget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.id"), nullable=False)


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.id"), nullable=False)
    name = db.Column(db.String(60), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    is_transfer = db.Column(db.Boolean, nullable=True)

    def to_json(self):
        return json.dumps(
            dict(
                id=self.id,
                userId=self.user_id,
                name=self.name,
                budgetId=self.budget_id,
                amount=self.amount,
                date=self.date.strftime("%Y-%m-%d"),
                isTransfer=self.is_transfer,
                editUrl=url_for(
                    "viewbudget_bp.edit_transaction", b_id=self.budget_id, t_id=self.id
                ),
            )
        )


class PaycheckPrefill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey("budget.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
