from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required
from finapp.utils import helpers, queries

paycheck_bp = Blueprint("paycheck_bp", __name__)


@paycheck_bp.route("/add_paycheck", methods=["GET"])
@login_required
def add_paycheck():
    budgets = queries.get_budgets()
    prefills = queries.get_prefill_paycheck()
    for k, v in prefills.items():
        for item in v:
            for budget in budgets:
                if budget.id == item[0]:
                    item.insert(1, budget.name)
                    break

    prefills = [[k, v] for k, v in prefills.items()]
    prefills.sort(key=lambda x: x[0])

    return render_template(
        "addpaycheck.html",
        budgets=budgets,
        str=str,
        prefills=prefills,
        enumerate=enumerate,
        showPrefills=len(prefills) > 0,
    )


@paycheck_bp.route("/paycheck", methods=["POST"])
@login_required
def paycheck():
    budgets = queries.get_budgets()

    name = request.form.get("name")
    amount = request.form.get("amount")
    is_percentage = request.form.get("isPercentage")

    is_percentage = True if is_percentage == "True" else False

    if name and amount:
        total_amount = 100 if is_percentage else amount
        temp = {}
        for budget in budgets:
            try:
                b_amt = float(request.form.get(budget.name + str(budget.id)))
                if b_amt:
                    str_date = request.form.get("date")
                    date = helpers.get_date_from_string(str_date)
                    if is_percentage:
                        temp[budget.id] = [b_amt, name, date]
                    else:
                        queries.create_transaction(
                            name=name, amount=b_amt, date=date, budget_id=budget.id
                        )
            except:
                b_amt = 0

            queries.create_or_update_prefill(
                b_id=budget.id,
                total_amount=total_amount,
                amount=b_amt,
            )

        if is_percentage:
            helpers.confirmBudgetsForPercentages(temp, float(amount))

    return redirect(url_for("index_bp.index"))


@paycheck_bp.route("/delete_prefill/<float:amount>", methods=["GET"])
@login_required
def delete_prefill(amount):
    prefills = queries.get_prefills_by_total_amount(amount)

    for prefill in prefills:
        queries._delete_prefill(prefill)

    return {"success": True}
