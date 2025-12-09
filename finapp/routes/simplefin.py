from flask import Blueprint, request, render_template, redirect, url_for, flash
from flask_login import current_user, login_required
from finapp.queries import simplefin_queries, transaction_queries
from finapp.utils import simplefin as simplefin_helpers, helpers
import os


simplefin_bp = Blueprint("simplefin_bp", __name__)


@simplefin_bp.get("/simplefin")
@login_required
def simplefin():
    force = request.args.get("force", type=bool, default=False)

    credentials = simplefin_queries.get_simplefin_credentials()

    if force:
        return render_template(
            "simplefin.html", credentials=credentials.to_dict() if credentials else {}
        )

    if credentials:
        return redirect(url_for("simplefin_bp.simplefin_accounts"))

    return render_template(
        "simplefin.html", credentials=credentials.to_dict() if credentials else {}
    )


@simplefin_bp.get("/simplefin_accounts")
@login_required
def simplefin_accounts():
    accounts = simplefin_queries.get_simplefin_accounts()
    credentials = simplefin_queries.get_simplefin_credentials()

    return render_template(
        "simplefin_accounts.html",
        accounts=[a.to_dict() for a in accounts],
        credentials=credentials.to_dict() if credentials else {},
    )


@simplefin_bp.get("/api/get_pending_transaction")
@login_required
def api_get_pending_transaction():
    pending_transactions = [
        pt.to_dict() for pt in simplefin_queries.get_pending_transactions()
    ]

    return dict(pending_transactions=pending_transactions)


@simplefin_bp.post("/delete_pending_transaction/<int:id>")
@login_required
def delete_pending_transaction(id):
    simplefin_queries.delete_pending_transaction(id=id)

    pending_transactions = [
        pt.to_dict() for pt in simplefin_queries.get_pending_transactions()
    ]

    return dict(pending_transactions=pending_transactions)


@simplefin_bp.post("/convert_pending_transtion/<int:id>")
@login_required
def convert_pending_transaction(id):
    user_id = request.form.get("user", type=int, default=current_user.id)
    budget_id = request.form.get("budget", type=int)
    name = request.form.get("name")
    amount = request.form.get("amount", type=float, default=0.0)
    str_date = request.form.get("date")
    date = helpers.get_date_from_string(str_date)
    return_transactions = request.form.get("return-transactions")
    return_transactions = return_transactions and return_transactions == "True"

    return_transaction = request.form.get("return-transaction")
    return_transaction = return_transaction and return_transaction == "True"

    categories = request.form.getlist("categories")

    transaction_id = simplefin_queries.convert_pending_transaction(
        user_id=user_id,
        name=name,
        amount=amount,
        t_date=date,
        budget_id=budget_id,
        categories=categories,
        pending_transaction_id=id,
    )

    transaction = transaction_queries.get_transaction(
        transaction_id=transaction_id, include_budget=True
    )
    pending_transactions = [
        pt.to_dict() for pt in simplefin_queries.get_pending_transactions()
    ]

    return dict(
        transaction=transaction.to_dict(), pending_transactions=pending_transactions
    )


@simplefin_bp.post("/claim_simplefin_token")
@login_required
def claim_simplefin_token():
    setup_token = request.form.get("setup_token")

    username, password = simplefin_helpers.claim_simplefin_token(setup_token)

    simplefin_queries.create_simplefin_credentials(username=username, password=password)
    credentials = simplefin_queries.get_simplefin_credentials()

    simplefin_helpers.sync_simplefin(credentials=credentials)

    return redirect(url_for("simplefin_bp.simplefin"))


@simplefin_bp.post("/delete_simplefin_credentials")
@login_required
def delete_simplefin_credentials():
    simplefin_queries.delete_simplefin_credentials()

    return redirect(url_for("simplefin_bp.simplefin"))


@simplefin_bp.get("/sync_simplefin_transactions")
@login_required
def sync_simplefin_transactions():
    credentials = simplefin_queries.get_simplefin_credentials()
    if not credentials:
        flash("No SimpleFIN Credentials", "danger")
        return redirect(url_for("simplefin_bp.simplefin"))
    else:
        simplefin_helpers.sync_simplefin_transactions(credentials=credentials)

    return redirect(url_for("simplefin_bp.simplefin_accounts"))


@simplefin_bp.get("/sync_simplefin_account_balances")
@login_required
def sync_simplefin_account_balances():
    credentials = simplefin_queries.get_simplefin_credentials()
    if not credentials:
        flash("No SimpleFIN Credentials", "danger")
        return redirect(url_for("simplefin_bp.simplefin"))
    else:
        simplefin_helpers.sync_simplefin_account_balances(credentials=credentials)

    return redirect(url_for("simplefin_bp.simplefin_accounts"))


@simplefin_bp.get("/sync_simplefin")
@login_required
def sync_simplefin():
    credentials = simplefin_queries.get_simplefin_credentials()
    if not credentials:
        flash("No SimpleFIN Credentials", "danger")
        return redirect(url_for("simplefin_bp.simplefin"))
    else:
        simplefin_helpers.sync_simplefin(credentials=credentials)

    return redirect(url_for("simplefin_bp.simplefin_accounts"))


@simplefin_bp.get("/api/sync_simplefin_transactions")
@login_required
def api_sync_simplefin_transactions():
    credentials = simplefin_queries.get_simplefin_credentials()
    if not credentials:
        simplefin_helpers.sync_simplefin_transactions(credentials=None)
    else:
        simplefin_helpers.sync_simplefin_transactions(credentials=credentials)

    pending_transactions = [
        pt.to_dict() for pt in simplefin_queries.get_pending_transactions()
    ]

    return dict(pending_transactions=pending_transactions)


@simplefin_bp.post("/update_account_access_type/<string:id>")
@login_required
def update_account_access_type(id):
    should_sync_transactions = request.form.get(
        "sync_transactions", type=int, default=2
    )

    simplefin_queries.update_account_access_type(
        id=id, access_type=should_sync_transactions
    )

    account = simplefin_queries.get_simplefin_account(id=id)

    return dict(access_type=account.access_type)


@simplefin_bp.post("/update_account_name/<string:id>")
@login_required
def update_account_name(id):
    name = request.form.get("name", type=str)

    simplefin_queries.update_account_name(id=id, name=name)

    account = simplefin_queries.get_simplefin_account(id=id)

    return dict(name=account.name)


@simplefin_bp.get("/api/update_all_accounts_and_transactions")
def update_all_accounts_and_transactions():
    key = request.args.get("key")
    if key != os.environ.get("SIMPLEFIN_KEY"):
        return dict(success=False)

    simplefin_helpers.update_all_accounts_and_transactions(key=key)

    return dict(success=True)
