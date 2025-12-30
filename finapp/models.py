from flask import url_for
from flask_login import UserMixin
from itsdangerous import URLSafeTimedSerializer
import os
from finapp import db, login_manager
from sqlalchemy.orm import relationship, mapped_column, Mapped
from sqlalchemy import ForeignKey, UniqueConstraint, BigInteger, Identity
from typing import List, Optional, Any
from datetime import date as date_type, datetime as datetime_type
from typing_extensions import Annotated
from finapp.utils.Serializer import SerializerMixin
from cryptography.fernet import Fernet
from enum import IntFlag
from sqlalchemy.dialects.postgresql import JSONB
from finapp.utils.Sqids import sqids


FERNET_KEY: bytes = os.environ.get("FERNET_KEY").encode()


int_pk = Annotated[
    int, mapped_column(BigInteger, Identity(always=True), primary_key=True)
]
str_pk = Annotated[str, mapped_column(primary_key=True)]
user_fk = Annotated[int, mapped_column(ForeignKey("user.id"))]


class AccountAccess(IntFlag):
    NOT_SET = -1
    NONE = 1
    BALANCE = 2
    TRANSACTION = 4
    ALL = BALANCE | TRANSACTION


class SqidSerializerMixin(SerializerMixin):
    custom_mappings = {"id": "sqid_id", "user_id": "sqid_user_id"}

    def sqid_id(self):
        return sqids.encode_one(self.id)

    def sqid_user_id(self):
        return sqids.encode_one(self.user_id)


@login_manager.user_loader
def load_user(id):
    return db.session.get(User, int(id))


class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = "user"

    serialize_only = (
        "id",
        "username",
        "email",
        "credentials",
    )

    id: Mapped[int_pk]
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]

    credentials: Mapped["SimpleFINCredentials"] = relationship(
        lazy="joined", viewonly=True
    )

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

    custom_mappings = {"id": "sqid_id"}

    def sqid_id(self):
        return sqids.encode_one(self.id)


class Theme(db.Model, SqidSerializerMixin):
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


class UserSettings(db.Model, SqidSerializerMixin):
    __tablename__ = "user_settings"

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    settings: Mapped[dict[str, Any]] = mapped_column(
        JSONB, default=dict, nullable=False
    )


class Budget(db.Model, SqidSerializerMixin):
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
        return url_for("viewbudget_bp.view_budget", sqid=self.sqid_id(), name=self.name)

    def edit_url(self):
        return url_for("editbudget_bp.edit_budget", sqid=self.sqid_id(), name=self.name)

    def toggle_active_url(self):
        return url_for(
            "editbudget_bp.toggle_budget", sqid=self.sqid_id(), name=self.name
        )

    def add_transaction_url(self):
        return url_for(
            "transaction_bp.add_transaction", sqid=self.sqid_id(), name=self.name
        )

    def delete_url(self):
        return url_for(
            "editbudget_bp.delete_budget", sqid=self.sqid_id(), name=self.name
        )

    def share_budget_url(self):
        return url_for(
            "sharebudget_bp.share_budget", sqid=self.sqid_id(), name=self.name
        )

    # I don't think this will work because of the shared_budget model
    # transactions = relationship("Transaction", uselist=False)

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


class SharedBudget(db.Model, SqidSerializerMixin):
    __tablename__ = "shared_budget"

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    budget_id: Mapped[int] = mapped_column(ForeignKey("budget.id"))

    budget: Mapped["Budget"] = relationship(lazy="joined", viewonly=True)

    custom_mappings = {
        "id": "sqid_id",
        "user_id": "sqid_user_id",
        "budget_id": "sqid_budget_id",
    }

    def sqid_budget_id(self):
        return sqids.encode_one(self.budget_id)


class Transaction(db.Model, SqidSerializerMixin):
    __tablename__ = "transaction"

    serialize_rules = (
        "categories",
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

    def sqid_ids(self):
        return sqids.encode([self.budget_id, self.id])

    def edit_url(self):
        return url_for("transaction_bp.edit_transaction", sqid=self.sqid_ids())

    def move_transaction_url(self):
        return url_for("transaction_bp.move_transaction", sqid=self.sqid_ids())

    def delete_url(self):
        return url_for("transaction_bp.delete_transaction", sqid=self.sqid_ids())

    custom_mappings = {
        "id": "sqid_id",
        "user_id": "sqid_user_id",
        "budget_id": "sqid_budget_id",
    }

    def sqid_budget_id(self):
        return sqids.encode_one(self.budget_id)


class Paycheck(db.Model, SqidSerializerMixin):
    __tablename__ = "paycheck"

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    total: Mapped[float]
    date: Mapped[date_type]

    transactions: Mapped[List["Transaction"]] = relationship(
        lazy="joined", viewonly=True
    )


class Category(db.Model, SqidSerializerMixin):
    __tablename__ = "category"
    __table_args__ = (UniqueConstraint("user_id", "name"),)

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    name: Mapped[str]
    color: Mapped[str]


class TransactionCategory(db.Model, SqidSerializerMixin):
    __tablename__ = "transaction_category"
    __table_args__ = (UniqueConstraint("transaction_id", "category_id"),)

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    transaction_id: Mapped[int] = mapped_column(
        ForeignKey("transaction.id", ondelete="CASCADE")
    )
    category_id: Mapped[int] = mapped_column(ForeignKey("category.id"))

    category: Mapped["Category"] = relationship(lazy="joined", viewonly=True)

    custom_mappings = {
        "id": "sqid_id",
        "user_id": "sqid_user_id",
        "transaction_id": "sqid_transaction_id",
        "category_id": "sqid_category_id",
    }

    def sqid_transaction_id(self):
        return sqids.encode_one(self.transaction_id)

    def sqid_category_id(self):
        return sqids.encode_one(self.category_id)


class SimpleFINCredentials(db.Model, SqidSerializerMixin):
    __tablename__ = "simplefin_credentials"

    serialize_only = (
        "id",
        "user_id",
        "exists",
    )

    id: Mapped[int_pk]
    user_id: Mapped[user_fk]
    username: Mapped[str]  # encrypted
    password: Mapped[str]  # encrypted

    # TODO: Add an option to keep or delete old transactions
    # keep_old_transactions: Mapped[bool]
    # @property
    # def delete_old_transactions(self):
    #     return not self.keep_old_transactions

    @property
    def exists(self):
        return len(self.username) > 0 and len(self.password) > 0

    @staticmethod
    def encrypt_credentials(username, password) -> tuple[str, str]:
        f = Fernet(FERNET_KEY)

        username_bytes = username.encode()
        password_bytes = password.encode()

        encrypted_username = f.encrypt(username_bytes)
        encrypted_password = f.encrypt(password_bytes)

        return encrypted_username.decode(), encrypted_password.decode()

    def decrypt_credentials(self) -> tuple[str, str]:
        f = Fernet(FERNET_KEY)

        username_decrypted = f.decrypt(self.username)
        password_decrypted = f.decrypt(self.password)

        return username_decrypted.decode(), password_decrypted.decode()


class SimpleFINOrganization(db.Model, SerializerMixin):
    __tablename__ = "simplefin_organization"

    id: Mapped[int_pk]
    simplefin_id: Mapped[str] = mapped_column(unique=True, index=True)
    name: Mapped[str]
    domain: Mapped[str]
    sfin_url: Mapped[str]
    url: Mapped[str]


class SimpleFINAccount(db.Model, SerializerMixin):
    __tablename__ = "simplefin_account"

    serialize_rules = (
        "update_account_access_type_url",
        "update_account_name",
    )

    id: Mapped[str_pk]
    user_id: Mapped[user_fk]
    organization_id: Mapped[str] = mapped_column(
        ForeignKey("simplefin_organization.id")
    )
    name: Mapped[str]
    currency: Mapped[str]
    balance: Mapped[float]
    available_balance: Mapped[Optional[float]]
    balance_date: Mapped[date_type]

    type: Mapped[
        Optional[int]
    ]  # this is for me to define the account. CC, checking, savings, etc.
    access_type: Mapped[
        Optional[int]
    ]  # this is for me to maybe include transactions or only balance data, etc.

    last_synced_account: Mapped[Optional[datetime_type]]
    last_synced_transactions: Mapped[Optional[datetime_type]]

    organization: Mapped["SimpleFINOrganization"] = relationship(
        lazy="joined", viewonly=True
    )

    @property
    def access(self):
        return AccountAccess(self.access_type)

    @access.setter
    def access(self, value):
        self.access_type = int(value)

    def update_account_access_type_url(self):
        return url_for("simplefin_bp.update_account_access_type", id=self.id)

    def update_account_name(self):
        return url_for("simplefin_bp.update_account_name", id=self.id)


class PendingTransaction(db.Model, SqidSerializerMixin):
    __tablename__ = "pending_transaction"

    serialize_rules = (
        "convert_pending_transaction_url",
        "delete_pending_transaction_url",
    )

    id: Mapped[int_pk]
    simplefin_id: Mapped[str] = mapped_column(unique=True, index=True)
    account_id: Mapped[str] = mapped_column(ForeignKey("simplefin_account.id"))
    user_id: Mapped[user_fk]
    name: Mapped[str]
    amount: Mapped[float]
    date: Mapped[date_type]

    account: Mapped["SimpleFINAccount"] = relationship(lazy="joined", viewonly=True)

    def convert_pending_transaction_url(self):
        return url_for("simplefin_bp.convert_pending_transaction", id=self.id)

    def delete_pending_transaction_url(self):
        return url_for("simplefin_bp.delete_pending_transaction", id=self.id)


class CompletedTransaction(db.Model, SerializerMixin):
    __tablename__ = "completed_transaction"

    id: Mapped[int_pk]

    simplefin_id: Mapped[str] = mapped_column(unique=True, index=True)
    transaction_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("transaction.id")
    )  # do i need this?

    account_id: Mapped[str] = mapped_column(ForeignKey("simplefin_account.id"))
    user_id: Mapped[user_fk]
    name: Mapped[str]
    amount: Mapped[float]
    date: Mapped[date_type]


class SimpleFINTransaction(db.Model, SerializerMixin):
    __tablename__ = "simplefin_transaction"

    id: Mapped[str] = mapped_column(primary_key=True)

    posted: Mapped[int]  # UNIX epoch timestamp
    amount: Mapped[str]  # numeric string
    description: Mapped[str]

    transacted_at: Mapped[Optional[int]]  # UNIX epoch timestamp
    pending: Mapped[Optional[bool]]

    account_id: Mapped[str] = mapped_column(ForeignKey("simplefin_account.id"))
    user_id: Mapped[user_fk]


class AccountBalance(db.Model, SqidSerializerMixin):
    __tablename__ = "simplefin_account_balance"
    __table_args__ = (UniqueConstraint("account_id", "date"),)

    id: Mapped[int_pk]
    account_id: Mapped[str] = mapped_column(ForeignKey("simplefin_account.id"))
    user_id: Mapped[user_fk]
    balance: Mapped[float]
    date: Mapped[date_type]
