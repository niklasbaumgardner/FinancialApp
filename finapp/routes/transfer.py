from flask import Blueprint, request, redirect, render_template, url_for
from flask_login import login_required
from finapp.utils import queries, helpers


transfer_bp = Blueprint("transfer_bp", __name__)


@transfer_bp.route("/transfer", methods=["GET", "POST"])
@login_required
def transfer():
    if request.method == "POST":
        name = request.form.get("name")
        try:
            amount = float(request.form.get("amount"))
        except:
            amount = None

        str_date = request.form.get("date")
        date = helpers.get_date_from_string(str_date)

        source_budget = request.form.get("source_budget")
        dest_budget = request.form.get("dest_budget")

        if name and amount and source_budget and dest_budget:
            queries.create_transaction(
                name=name,
                amount=-amount,
                date=date,
                budget_id=source_budget,
                is_transfer=True,
            )
            queries.create_transaction(
                name=name,
                amount=amount,
                date=date,
                budget_id=dest_budget,
                is_transfer=True,
            )

        return redirect(url_for("home.index"))

    budgets = queries.get_budgets(active_only=True)
    return render_template("transfer.html", budgets=budgets, str=str)
