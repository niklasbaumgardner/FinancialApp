from flask import Blueprint, request, render_template, redirect, url_for, flash
from flask_login import current_user, login_required
from finapp.queries import simplefin_queries
from finapp.utils import simplefin as simplefin_helpers, helpers
from datetime import datetime
import requests


simplefin_bp = Blueprint("simplefin_bp", __name__)


@simplefin_bp.get("/simplefin")
@login_required
def simplefin():
    credentials = simplefin_queries.get_simplefin_credentials()
    accounts = simplefin_queries.get_simplefin_accounts()
    if credentials and len(accounts) == 0:
        simplefin_helpers.sync_simplefin(credentials)

        # hopefully accounts exist now
        accounts = simplefin_queries.get_simplefin_accounts()

        return render_template(
            "simplefin.html", accounts=[a.to_dict() for a in accounts]
        )
    elif len(accounts) > 0:
        return render_template(
            "simplefin.html", accounts=[a.to_dict() for a in accounts]
        )

    return render_template("simplefin.html", accounts=[])


@simplefin_bp.get("/pending_transaction")
@login_required
def pending_transactions():
    pending_transactions = [
        pt.to_dict() for pt in simplefin_queries.get_pending_transactions()
    ]

    return {"pending_transactions": pending_transactions}


@simplefin_bp.post("/delete_pending_transaction/<int:id>")
@login_required
def delete_pending_transaction(id):
    simplefin_queries.delete_pending_transaction(id=id)

    # TODO: what to return?
    return True


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

    simplefin_queries.convert_pending_transaction(
        user_id=user_id,
        name=name,
        amount=amount,
        t_date=date,
        budget_id=budget_id,
        categories=categories,
        pending_transaction_id=id,
    )

    # TODO: what to return?
    return True


@simplefin_bp.post("/claim_simplefin_token")
@login_required
def claim_simplefin_token():
    setup_token = request.form.get("setup_token")

    username, password = simplefin_helpers.claim_simplefin_token(setup_token)

    simplefin_queries.create_simplefin_credentials(username=username, password=password)
    credentials = simplefin_queries.get_simplefin_credentials()

    simplefin_helpers.sync_simplefin(credentials=credentials)

    return redirect(url_for("simplefin_bp.simplefin"))


@simplefin_bp.get("/sync_simplefin")
@login_required
def sync_simplefin():
    credentials = simplefin_queries.get_simplefin_credentials()
    if not credentials:
        flash("No SimpleFIN Credentials", "danger")
    # elif (
    #     credentials.last_synced
    #     and (datetime.now() - credentials.last_synced).total_seconds() < 3600
    # ):
    #     pass
    else:
        simplefin_helpers.sync_simplefin(credentials)

    return redirect(url_for("simplefin_bp.simplefin"))


@simplefin_bp.post("/sync_simplefin_account/<string:id>")
@login_required
def sync_simplefin_account(id):
    should_sync_transactions = request.form.get(
        "sync_transactions", type=int, default=0
    )

    simplefin_queries.toggle_simplefin_account_sync(
        id=id, sync=should_sync_transactions
    )

    return "True"
