from finapp.queries import (
    budget_queries,
    category_queries,
    shared_budget_queries,
    transaction_queries,
    user_queries,
)
from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user
from finapp.utils import helpers
import json
from finapp.utils.Sqids import sqids

viewbudget_bp = Blueprint("viewbudget_bp", __name__)


@viewbudget_bp.get("/view_budget/<string:sqid>/")
@viewbudget_bp.get("/view_budget/<string:sqid>/<string:name>")
@login_required
def view_budget(sqid, name=None):
    budget_id = sqids.decode_one(sqid)

    page = request.args.get("page", 1, type=int)

    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    budget = budget_queries.get_budget(budget_id=budget_id)
    budgets = [b.to_dict() for b in budget_queries.get_budgets(active_only=True)]

    if ytd:
        transactions, total, page, num_pages = (
            transaction_queries.get_transactions_for_year(
                budget_id=budget.id, year=year, page=page, paginate=True
            )
        )
    elif month:
        transactions, total, page, num_pages = (
            transaction_queries.get_transactions_for_month(
                budget_id=budget.id, month=month, year=year, page=page, paginate=True
            )
        )
    else:
        transactions, total, page, num_pages = transaction_queries.get_transactions(
            budget_id=budget.id, page=page, paginate=True
        )

    budget = budget.to_dict()
    transactions = [t.to_dict() for t in transactions]

    categories = category_queries.get_categories()
    categories = [c.to_dict() for c in categories]

    return render_template(
        "viewbudget.html",
        budget=budget,
        transactions=transactions,
        budgets=budgets,
        categories=categories,
        total=total,
        page=page,
        num_pages=num_pages,
    )


@viewbudget_bp.get("/get_page/<string:sqid>/")
@viewbudget_bp.get("/get_page/<string:sqid>/<string:name>")
@login_required
def get_page(sqid, name=None):
    page = request.args.get("page", -1, type=int)

    if page < 1:
        return {"sucess": False}

    budget_id = sqids.decode_one(sqid)

    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"
    sort_by = request.args.get("sort")
    try:
        sort_by = json.loads(sort_by)
    except:
        sort_by = None

    budget = budget_queries.get_budget(budget_id=budget_id)

    if ytd:
        transactions, total, page, num_pages = (
            transaction_queries.get_transactions_for_year(
                budget_id=budget_id,
                year=year,
                page=page,
                sort_by=sort_by,
                paginate=True,
            )
        )
    elif month:
        transactions, total, page, num_pages = (
            transaction_queries.get_transactions_for_month(
                budget_id=budget_id,
                month=month,
                year=year,
                page=page,
                sort_by=sort_by,
                paginate=True,
            )
        )
    else:
        transactions, total, page, num_pages = transaction_queries.get_transactions(
            budget_id=budget_id, page=page, sort_by=sort_by, paginate=True
        )

    transactions = [t.to_dict() for t in transactions]

    return {
        "page": page,
        "transactions": transactions,
        "total": total,
        "num_pages": num_pages,
        "budget_total": budget.total,
    }


@viewbudget_bp.get("/search/<string:sqid>/")
@viewbudget_bp.get("/search/<string:sqid>/<string:name>")
@login_required
def search(sqid, name=None):
    budget_id = sqids.decode_one(sqid)

    start_date = request.args.get("startDate")
    end_date = request.args.get("endDate")
    amount = request.args.get("amount")
    min_amount = request.args.get("minAmount")
    max_amount = request.args.get("maxAmount")
    name = request.args.get("name")
    if name:
        name = json.loads(name)
    else:
        name = []
    categories = sqids.decode_list(request.form.getlist("categories"))
    page = request.args.get("page", -1, type=int)

    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    sort_by = request.args.get("sort")

    transactions, total, page, num_pages, search_sum = helpers.search_for(
        budget_id=budget_id,
        name=name,
        categories=categories,
        start_date=start_date,
        end_date=end_date,
        amount=amount,
        min_amount=min_amount,
        max_amount=max_amount,
        page=page,
        month=month,
        year=year,
        ytd=ytd,
        sort_by=sort_by,
    )

    transactions = [t.to_dict() for t in transactions]

    return {
        "page": page,
        "transactions": transactions,
        "total": total,
        "num_pages": num_pages,
        "search_sum": search_sum,
    }
