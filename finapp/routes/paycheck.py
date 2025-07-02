from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user
from finapp.utils import helpers
from finapp.queries import (
    budget_queries,
    paycheck_queries,
)

paycheck_bp = Blueprint("paycheck_bp", __name__)


@paycheck_bp.get("/paycheck")
@login_required
def add_paycheck():
    budgets = budget_queries.get_budgets(active_only=True)
    paychecks = paycheck_queries.get_paycheck_prefills()

    budgets = [b.to_dict() for b in budgets]

    return render_template(
        "addpaycheck.html",
        budgets=budgets,
        paychecks=paychecks,
    )


@paycheck_bp.post("/paycheck")
@login_required
def paycheck():
    budgets = budget_queries.get_budgets(active_only=True)

    name = request.form.get("name")
    amount = request.form.get("amount", type=float)
    date = helpers.get_date_from_string(request.form.get("date"))

    if name and amount:
        transactions = []
        for budget in budgets:
            b_amt = request.form.get(f"{budget.id}", type=float)
            if b_amt:
                transactions.append(
                    dict(
                        user_id=current_user.id,
                        name=name,
                        amount=b_amt,
                        date=date,
                        budget_id=budget.id,
                    )
                )

        paycheck_queries.create_paycheck(
            date=date, total=amount, transactions=transactions
        )

    return redirect(url_for("viewtransactions_bp.view_transactions"))
