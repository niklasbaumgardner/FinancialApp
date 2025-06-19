from finapp.queries import (
    category_queries,
    budget_queries,
    prefill_queries,
    shared_budget_queries,
    transaction_queries,
    user_queries,
)
from flask import Blueprint, render_template, request, abort, redirect, url_for
from flask_login import login_required
from finapp.utils import helpers


viewbudgets_bp = Blueprint("viewbudgets_bp", __name__)


@viewbudgets_bp.route("/budgets", methods=["GET"])
@login_required
def viewbudgets():
    active, inactive = budget_queries.get_budgets(separate=True)

    total = round(sum([x.total for x in active + inactive]), 2)

    active = [b.to_dict() for b in active]
    inactive = [b.to_dict() for b in inactive]

    return render_template(
        "viewbudgets.html",
        budgets=[active, inactive],
        total=total,
    )


@viewbudgets_bp.get("/")
@login_required
def recent_transactions():
    transactions = transaction_queries.get_recent_transactions()
    transactions = [t.to_dict() for t in transactions]

    budgets = budget_queries.get_budgets()
    budgets = [b.to_dict() for b in budgets]

    categories = category_queries.get_categories_shared()
    categories = [c.to_dict() for c in categories]

    return render_template(
        "index.html", transactions=transactions, budgets=budgets, categories=categories
    )
