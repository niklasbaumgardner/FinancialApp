from finapp.queries import (
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


@viewbudgets_bp.route("/", methods=["GET"])
@login_required
def viewbudgets():
    active, inactive = budget_queries.get_budgets(separate=True)

    total = round(sum([x.total for x in active + inactive]), 2)

    active = [b.to_dict() for b in active]
    inactive = [b.to_dict() for b in inactive]

    return render_template(
        "viewbudgets.html",
        budgets=[active, inactive],
        total=helpers.format_to_money_string(total),
    )
