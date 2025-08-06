from finapp.queries import (
    category_queries,
    budget_queries,
    transaction_queries,
)
from flask import Blueprint, render_template, request, stream_with_context, Response
from flask_login import login_required
import json


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

    def generate():
        yield '{"transactions": ['

        prev_transaction = None
        transactions, _ = transaction_queries.get_recent_transactions()
        for t in transactions:
            if prev_transaction is not None:
                yield json.dumps(prev_transaction.to_dict()) + ", "

            prev_transaction = t

        yield json.dumps(prev_transaction.to_dict()) + "]"

        if include_budgets:
            yield ', "budgets": ['

            prev_budget = None
            budgets = budget_queries.get_budgets()
            for b in budgets:
                if prev_budget is not None:
                    yield json.dumps(prev_budget.to_dict()) + ", "

                prev_budget = b

            yield json.dumps(prev_budget.to_dict()) + "]"

        yield "}"

    return Response(
        response=stream_with_context(generate()),
        mimetype="application/json",
    )
