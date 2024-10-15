from finapp.queries import (
    budget_queries,
    category_queries,
    transaction_queries,
    user_queries,
)
from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required
from finapp.utils import helpers
import json

viewbudget_bp = Blueprint("viewbudget_bp", __name__)


@viewbudget_bp.route("/view_budget/<int:id>")
@login_required
def view_budget(id):
    page = request.args.get("page", 1, type=int)

    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    budget = budget_queries.get_budget(id)
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

    shared_users_map = {}
    if budget["is_shared"]:
        users = user_queries.get_shared_users_for_budget_id(budget_id=budget["id"])

        budget["shared_users"] = [u.to_dict() for u in users]

        shared_users_map = {u.id: u.to_dict() for u in users}

    categories = [c.to_dict() for c in category_queries.get_cetegories()]

    return render_template(
        "viewbudget.html",
        budget=budget,
        transactions=transactions,
        budgets=budgets,
        shared_users_map=shared_users_map,
        categories=categories,
        total=total,
        page=page,
        num_pages=num_pages,
    )


@viewbudget_bp.route("/get_page/<int:budget_id>")
@login_required
def get_page(budget_id):
    page = request.args.get("page", -1, type=int)

    if page < 1:
        return {"sucess": False}

    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"
    sort_by = request.args.get("sort")
    try:
        sort_by = json.loads(sort_by)
    except:
        sort_by = None

    budget = budget_queries.get_budget(budget_id)

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


@viewbudget_bp.route("/search/<int:b_id>", methods=["GET"])
@login_required
def search(b_id):
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
    categories = request.args.getlist("categories", type=int)
    page = request.args.get("page", -1, type=int)

    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    sort_by = request.args.get("sort")

    transactions, total, page, num_pages, search_sum = helpers.search_for(
        budget_id=b_id,
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
        "search_sum": helpers.format_to_money_string(search_sum),
    }


@viewbudget_bp.route("/add_transaction/<int:budget_id>", methods=["POST"])
@login_required
def add_transaction(budget_id):
    name = request.form.get("name")
    try:
        amount = float(request.form.get("amount"))
    except:
        amount = 0

    str_date = request.form.get("date")
    date = helpers.get_date_from_string(str_date)

    categories = request.form.getlist("categories")

    if name is not None and amount is not None and budget_id is not None:
        transaction_queries.create_transaction(
            name=name,
            amount=amount,
            date=date,
            budget_id=budget_id,
            categories=categories,
        )

    return redirect(url_for("viewbudget_bp.view_budget", id=budget_id))


@viewbudget_bp.route("/edit_transaction/<int:b_id>/<int:t_id>", methods=["POST"])
@login_required
def edit_transaction(b_id, t_id):
    new_name = request.form.get(f"name")
    new_amount = request.form.get(f"amount")
    new_date = request.form.get(f"date")
    page = request.form.get("page")
    page = page if page else 1

    categories_added = request.form.getlist("categoriesAdded")
    categories_deleted = request.form.getlist("categoriesDeleted")

    new_date = helpers.get_date_from_string(new_date)
    transaction_queries.update_transaction(
        b_id=b_id,
        t_id=t_id,
        name=new_name,
        amount=new_amount,
        new_date=new_date,
        categories_added=categories_added,
        categories_deleted=categories_deleted,
    )

    return {
        "success": True,
        "transaction": transaction_queries.get_transaction(
            budget_id=b_id, trans_id=t_id
        ).to_dict(),
    }


@viewbudget_bp.route("/move_transaction/<int:sb_id>/<int:t_id>", methods=["POST"])
@login_required
def move_transaction(sb_id, t_id):
    new_budget_id = request.form.get("new_budget")

    transaction_queries.update_transaction(
        b_id=sb_id, t_id=t_id, new_b_id=new_budget_id
    )

    return {"success": True}


@viewbudget_bp.route("/delete_transaction/<int:b_id>/<int:t_id>", methods=["DELETE"])
@login_required
def delete_transaction(b_id, t_id):
    page = request.form.get("page")
    page = page if page else 1

    transaction_queries.delete_transaction(b_id, t_id)

    return {"success": True}
