from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user
from finapp.utils import helpers
from finapp.queries import (
    budget_queries,
    paycheck_queries,
)
from finapp.utils.Sqids import sqids

paycheck_bp = Blueprint("paycheck_bp", __name__)


@paycheck_bp.get("/paycheck")
@login_required
def add_paycheck():
    budgets = budget_queries.get_budgets(active_only=True)
    paychecks = paycheck_queries.get_distinct_paychecks()

    budgets = [b.to_dict() for b in budgets]

    return render_template(
        "addpaycheck.html",
        budgets=budgets,
        paychecks=paychecks,
    )


@paycheck_bp.post("/paycheck")
@login_required
def paycheck():
    name = request.form.get("name")
    amount = request.form.get("amount", type=float)
    date = helpers.get_date_from_string(request.form.get("date"))

    if name and amount:
        keys = [*request.form]
        transactions = []

        for key in keys:
            if key == "name" or key == "amount" or key == "date":
                continue
            else:
                t_amount = request.form.get(key, type=float)
                budget_id = sqids.decode_one(key)

                transactions.append(
                    dict(
                        user_id=current_user.id,
                        name=name,
                        amount=t_amount,
                        date=date,
                        budget_id=budget_id,
                    )
                )

        paycheck_queries.create_paycheck(
            date=date, total=amount, transactions=transactions
        )

    return redirect(url_for("viewtransactions_bp.view_transactions"))
