from finapp.queries import (
    category_queries,
    budget_queries,
    transaction_queries,
)
from flask import Blueprint, render_template
from flask_login import login_required


viewtransactions_bp = Blueprint("viewtransactions_bp", __name__)


@viewtransactions_bp.get("/")
@viewtransactions_bp.get("/view_transactions")
@login_required
def view_transactions():
    transactions = transaction_queries.get_recent_transactions()
    transactions = [t.to_dict() for t in transactions]

    budgets = budget_queries.get_budgets(active_only=True)
    budgets = [b.to_dict() for b in budgets]

    categories = category_queries.get_categories_shared()
    categories = [c.to_dict() for c in categories]

    return render_template(
        "viewtransactions.html",
    )


@viewtransactions_bp.get("/api/view_transactions")
@login_required
def api_view_transactions():
    transactions = transaction_queries.get_recent_transactions()
    transactions = [t.to_dict() for t in transactions]

    budgets = budget_queries.get_budgets(active_only=True)
    budgets = [b.to_dict() for b in budgets]

    categories = category_queries.get_categories_shared()
    categories = [c.to_dict() for c in categories]

    return dict(transactions=transactions, budgets=budgets, categories=categories)
