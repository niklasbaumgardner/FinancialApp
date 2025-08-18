from dataclasses import asdict, dataclass
import re
from flask import url_for
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
import os
from finapp import db, login_manager
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship, mapped_column, Mapped
from sqlalchemy import ForeignKey, UniqueConstraint
from typing import List, Optional
from datetime import date as date_type
from typing_extensions import Annotated


int_pk = Annotated[int, mapped_column(primary_key=True)]
user_fk = Annotated[int, mapped_column(ForeignKey("user.id"))]


@login_manager.user_loader
def load_user(id):
    return db.session.get(User, int(id))


@dataclass(kw_only=True)
class BaseDataclass:
    serialize_only: Optional[tuple[str, ...]] = None
    serialize_rules: Optional[tuple[str, ...]] = None

    def dict_factory(self, x):
        # print(x)
        # print()
        if self.serialize_only is not None and len(self.serialize_only) > 0:
            d = dict()
            for k, v in x:
                if k not in self.serialize_only:
                    continue

                print(k, v, isinstance(v, BaseDataclass))
                if isinstance(v, BaseDataclass):
                    print(v, type(v))
                    d[k] = v.to_dict()
                elif callable(v):
                    d[k] = v()
                else:
                    d[k] = str(v)
            return d

        rules = (
            "-serialize_rules",
            "-serialize_only",
        )

        if self.serialize_rules is not None and len(self.serialize_rules) > 0:
            rules += self.serialize_rules

        exclude_fields = [ex[1:] for ex in rules if ex.startswith("-")]
        include_fields = [inc for inc in rules if not inc.startswith("-")]

        # d = {k: v for (k, v) in x if (k not in exclude_fields)}
        d = dict()
        for k, v in x:
            if k in exclude_fields:
                continue

            # print(k, v)
            print(k, type(v), isinstance(v, BaseDataclass))
            if isinstance(v, BaseDataclass):
                print(v, type(v))
                d[k] = v.to_dict()
            elif callable(v):
                d[k] = v()
            else:
                d[k] = str(v)

        # print(d)

        for field in include_fields:
            if field not in d:
                attr = getattr(self, field)
                # print(attr)
                print(field, type(attr), isinstance(attr, BaseDataclass))
                if isinstance(attr, BaseDataclass):
                    print(attr, type(attr))
                    d[field] = attr.to_dict()
                elif callable(attr):
                    d[field] = attr()
                else:
                    d[field] = str(attr)
        return d

    def to_dict(self):
        # print(self)
        print(type(self), "When are we here?")
        d = asdict(self, dict_factory=self.dict_factory)
        # print(d)
        return d


@dataclass
class User(db.Model, UserMixin, BaseDataclass):
    __tablename__ = "user"

    serialize_only = (
        "id",
        "username",
        "email",
    )

    id: Mapped[int_pk]
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]

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
        return db.session.get(User, user_id)


@dataclass
class Theme(db.Model, BaseDataclass):
    __tablename__ = "theme"

    serialize_rules = (
        "-id",
        "-user_id",
    )

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    theme: Mapped[Optional[str]]  # default, classic, custom, etc...
    mode: Mapped[Optional[str]]  # light, dark
    primary_color: Mapped[Optional[str]]  # red, blue, green, etc...
    background_color: Mapped[Optional[str]]
    color_contrast: Mapped[Optional[str]]  # web-awesome values
    color_palette: Mapped[Optional[str]]  # web-awesome values


@dataclass
class Budget(db.Model, BaseDataclass):
    __tablename__ = "budget"

    serialize_rules = (
        "url",
        "edit_url",
        "toggle_active_url",
        "add_transaction_url",
        "shared_users",
        "delete_url",
        "share_budget_url",
    )

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    total: Mapped[float]
    name: Mapped[str]
    is_active: Mapped[bool]
    is_shared: Mapped[bool]

    user: Mapped["User"] = relationship(lazy="joined", viewonly=True)

    shared_users: Mapped[List["User"]] = relationship(
        lazy="joined",
        secondary="shared_budget",
        primaryjoin="SharedBudget.budget_id == Budget.id",
        secondaryjoin="User.id == SharedBudget.user_id",
        uselist=True,
        viewonly=True,
    )

    def url(self):
        return url_for("viewbudget_bp.view_budget", id=self.id)

    def edit_url(self):
        return url_for("editbudget_bp.edit_budget", id=self.id)

    def toggle_active_url(self):
        return url_for("editbudget_bp.toggle_budget")

    def add_transaction_url(self):
        return url_for("transaction_bp.add_transaction", budget_id=self.id)

    def delete_url(self):
        return url_for("editbudget_bp.delete_budget", b_id=self.id)

    def share_budget_url(self):
        return url_for("sharebudget_bp.share_budget", budget_id=self.id)

    # I don't think this will work because of the shared_budget model
    # transactions = relationship("Transaction", uselist=False)

    # def __str__(self):
    #     return f"{self.name: <30s}|{self.total: >10.2f}"

    def get_share_token(self, recipient_id):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))
        return s.dumps({"budget_id": self.id, "recipient_id": recipient_id})

    @staticmethod
    def verify_share_token(token, expire_sec=3600 * 24):
        s = URLSafeTimedSerializer(os.environ.get("SECRET_KEY"))

        obj = s.loads(token, max_age=expire_sec)

        return obj


@dataclass
class SharedBudget(db.Model, BaseDataclass):
    __tablename__ = "shared_budget"

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    budget_id: Mapped[int] = mapped_column(ForeignKey("budget.id"))

    budget: Mapped["Budget"] = relationship(lazy="joined", viewonly=True)


@dataclass
class Transaction(db.Model, BaseDataclass):
    __tablename__ = "transaction"

    serialize_rules = (
        # "categories",
        "user",
        "budget",
        "edit_url",
        "move_transaction_url",
        "delete_url",
    )

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    budget_id: Mapped[int] = mapped_column(ForeignKey("budget.id"))
    name: Mapped[str]
    amount: Mapped[float]
    date: Mapped[date_type]
    is_transfer: Mapped[Optional[bool]]
    paycheck_id: Mapped[Optional[int]] = mapped_column(ForeignKey("paycheck.id"))

    categories: Mapped[List["TransactionCategory"]] = relationship(
        lazy="joined", passive_deletes=True
    )
    user: Mapped["User"] = relationship(lazy="joined", viewonly=True)
    budget: Mapped["Budget"] = relationship(lazy="joined", viewonly=True)

    def edit_url(self):
        return url_for(
            "transaction_bp.edit_transaction", b_id=self.budget_id, t_id=self.id
        )

    def move_transaction_url(self):
        return url_for(
            "transaction_bp.move_transaction", sb_id=self.budget_id, t_id=self.id
        )

    def delete_url(self):
        return url_for(
            "transaction_bp.delete_transaction", b_id=self.budget_id, t_id=self.id
        )


@dataclass
class Paycheck(db.Model, BaseDataclass):
    __tablename__ = "paycheck"

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    total: Mapped[float]
    date: Mapped[date_type]

    transactions: Mapped[List["Transaction"]] = relationship(
        lazy="joined", viewonly=True
    )


@dataclass
class Category(db.Model, BaseDataclass):
    __tablename__ = "category"
    __table_args__ = (UniqueConstraint("user_id", "name"),)

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    name: Mapped[str]
    color: Mapped[str]


@dataclass
class TransactionCategory(db.Model, BaseDataclass):
    __tablename__ = "transaction_category"
    __table_args__ = (UniqueConstraint("transaction_id", "category_id"),)

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    transaction_id: Mapped[int] = mapped_column(
        ForeignKey("transaction.id", ondelete="CASCADE")
    )
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))

    category: Mapped["Category"] = relationship(lazy="joined", viewonly=True)
