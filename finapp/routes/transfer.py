from flask import Blueprint, request, redirect, render_template, url_for
from flask_login import login_required, current_user
from finapp.utils import helpers
from finapp.queries import budget_queries, transaction_queries


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
            transaction_queries.create_transaction(
                user_id=current_user.id,
                name=name,
                amount=-amount,
                date=date,
                budget_id=source_budget,
                is_transfer=True,
            )
            transaction_queries.create_transaction(
                user_id=current_user.id,
                name=name,
                amount=amount,
                date=date,
                budget_id=dest_budget,
                is_transfer=True,
            )

        return redirect(url_for("viewbudgets_bp.recent_transactions"))

    budgets = budget_queries.get_budgets(active_only=True)
    budgets = [b.to_dict() for b in budgets]
    return render_template("transfer.html", budgets=budgets)
