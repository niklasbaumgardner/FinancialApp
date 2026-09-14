from flask import Blueprint, render_template
from flask_login import login_required

from finapp.queries import budget_queries

viewbudgets_bp = Blueprint("viewbudgets_bp", __name__)


@viewbudgets_bp.get("/budgets")
@login_required
def viewbudgets() -> str:
    active, inactive = budget_queries.get_budgets(separate=True)

    total = round(sum([x.total for x in active + inactive]), 2)

    active = [b.to_dict() for b in active]
    inactive = [b.to_dict() for b in inactive]

    return render_template(
        "viewbudgets.html",
        budgets=[active, inactive],
        total=total,
    )


@viewbudgets_bp.get("/api/get_budgets")
@login_required
def api_get_budgets():
    budgets = [b.to_dict() for b in budget_queries.get_budgets()]

    active = [b for b in budgets if b["is_active"]]
    inactive = [b for b in budgets if not b["is_active"]]

    return {"budgets": budgets, "active": active, "inactive": inactive}
