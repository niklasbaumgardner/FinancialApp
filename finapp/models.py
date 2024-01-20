from flask import url_for
import json
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
import os
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    ForeignKey,
    Float,
    Boolean,
    Date,
)
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
from finapp import app, login_manager


engine = create_engine(
    app.config["SQLALCHEMY_DATABASE_URI"],
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)
db_session = scoped_session(sessionmaker(bind=engine))


def init_db():
    Model.metadata.create_all(bind=engine)


Model = declarative_base(name="Model")
Model.query = db_session.query_property()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(Model, UserMixin):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    username = Column(String(60), unique=True, nullable=False)
    email = Column(String(60), unique=True, nullable=False)
    password = Column(String(60), nullable=False)

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


class Theme(Model):
    __tablename__ = "theme"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    theme = Column(String, nullable=True)
    backgroundColor = Column(String, nullable=True)
    color = Column(String, nullable=True)


class Budget(Model):
    __tablename__ = "budget"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    total = Column(Float, nullable=False)
    name = Column(String(60), nullable=False)
    is_active = Column(Boolean, nullable=False)

    def to_json(self):
        return json.dumps(
            dict(
                id=self.id,
                user_id=self.user_id,
                total=self.total,
                name=self.name,
                isActive=self.is_active,
                url=url_for("viewbudget_bp.view_budget", id=self.id),
                editUrl=url_for("index_bp.edit_budget", id=self.id),
                toggleActiveUrl=url_for("index_bp.toggle_budget"),
            )
        )

    def __str__(self):
        return f"{self.name : <30s}|{self.total : >10.2f}"


class Transaction(Model):
    __tablename__ = "transaction"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    budget_id = Column(Integer, ForeignKey("budget.id"), nullable=False)
    name = Column(String(60), nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    is_transfer = Column(Boolean, nullable=True)

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


class PaycheckPrefill(Model):
    __tablename__ = "paycheck_prefill"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    budget_id = Column(Integer, ForeignKey("budget.id"), nullable=False)
    amount = Column(Float, nullable=False)
