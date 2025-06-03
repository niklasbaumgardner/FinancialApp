from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user
from finapp.utils import helpers
from finapp.queries import (
    budget_queries,
    paycheck_queries,
    prefill_queries,
    transaction_queries,
)

paycheck_bp = Blueprint("paycheck_bp", __name__)


@paycheck_bp.get("/paycheck")
@login_required
def add_paycheck():
    budgets = budget_queries.get_budgets(active_only=True)
    paychecks = paycheck_queries.get_paycheck_prefills()

    return render_template(
        "addpaycheck.html",
        budgets=budgets,
        str=str,
        prefills=paychecks,
        enumerate=enumerate,
        showPrefills=len(paychecks) > 0,
    )


@paycheck_bp.post("/paycheck")
@login_required
def paycheck():
    budgets = budget_queries.get_budgets(active_only=True)

    name = request.form.get("name")
    amount = request.form.get("amount", type=float)
    date = helpers.get_date_from_string(request.form.get("date"))

    if name and amount:
        paycheck = paycheck_queries.create_paycheck(date=date, total=amount)

        for budget in budgets:
            b_amt = request.form.get(budget.name + str(budget.id), type=float)
            if b_amt:
                transaction_queries.create_transaction(
                    user_id=current_user.id,
                    name=name,
                    amount=b_amt,
                    date=date,
                    budget_id=budget.id,
                    paycheck_id=paycheck.id,
                )

    return redirect(url_for("viewbudgets_bp.viewbudgets"))


@paycheck_bp.route("/delete_prefill/<float:amount>", methods=["GET"])
@login_required
def delete_prefill(amount):
    prefills = prefill_queries.get_prefills_by_total_amount(amount)

    for prefill in prefills:
        prefill_queries._delete_prefill(prefill)

    return {"success": True}
