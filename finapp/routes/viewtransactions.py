from finapp.queries import (
    category_queries,
    budget_queries,
    transaction_queries,
)
from flask import Blueprint, render_template, request
from flask_login import login_required


viewtransactions_bp = Blueprint("viewtransactions_bp", __name__)


@viewtransactions_bp.get("/")
@viewtransactions_bp.get("/view_transactions")
@login_required
def view_transactions():
    transactions, total = transaction_queries.get_recent_transactions(
        limit=100, include_total=True
    )
    transactions = [t.to_dict() for t in transactions]

    budgets = budget_queries.get_budgets(active_only=True)
    budgets = [b.to_dict() for b in budgets]

    categories = category_queries.get_categories()
    categories = [c.to_dict() for c in categories]

    return render_template(
        "viewtransactions.html",
        transactions=transactions,
        budgets=budgets,
        categories=categories,
        total=total,
    )


@viewtransactions_bp.get("/api/get_transactions")
@login_required
def api_get_transactions():
    include_budgets = request.args.get("includeBudgets")
    include_budgets = include_budgets and include_budgets == "True"

    transactions, _ = transaction_queries.get_recent_transactions()
    transactions = [t.to_dict() for t in transactions]

    if include_budgets:
        budgets = [b.to_dict() for b in budget_queries.get_budgets()]

        return dict(transactions=transactions, budgets=budgets)

    return dict(transactions=transactions)
