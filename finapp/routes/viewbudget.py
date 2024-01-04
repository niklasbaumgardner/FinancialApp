from finapp.utils import queries
from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required
from datetime import datetime
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

    budget = queries.get_budget(id)
    budgets = queries.get_budgets(active_only=True)

    if ytd:
        transactions, total, page, num_pages = queries.get_transactions_for_year(
            budget_id=budget.id, year=year, page=page, paginate=True
        )
    elif month:
        transactions, total, page, num_pages = queries.get_transactions_for_month(
            budget_id=budget.id, month=month, year=year, page=page, paginate=True
        )
    else:
        transactions, total, page, num_pages = queries.get_transactions(
            budget_id=budget.id, page=page, paginate=True
        )

    transactions = helpers.jsify_transactions(transactions)

    return render_template(
        "viewbudget.html",
        budget=budget,
        transactions=transactions,
        round=round,
        strftime=datetime.strftime,
        budgets=budgets,
        str=str,
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

    budget = queries.get_budget(budget_id)

    if ytd:
        transactions, total, page, num_pages = queries.get_transactions_for_year(
            budget_id=budget_id, year=year, page=page, sort_by=sort_by, paginate=True
        )
    elif month:
        transactions, total, page, num_pages = queries.get_transactions_for_month(
            budget_id=budget_id,
            month=month,
            year=year,
            page=page,
            sort_by=sort_by,
            paginate=True,
        )
    else:
        transactions, total, page, num_pages = queries.get_transactions(
            budget_id=budget_id, page=page, sort_by=sort_by, paginate=True
        )

    transactions = helpers.jsify_transactions(transactions)

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
    page = request.args.get("page", -1, type=int)

    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    sort_by = request.args.get("sort")

    transactions, total, page, num_pages, search_sum = helpers.search_for(
        budget_id=b_id,
        name=name,
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

    transactions = helpers.jsify_transactions(transactions)

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

    if name and amount and budget_id:
        queries.create_transaction(
            name=name, amount=amount, date=date, budget_id=budget_id
        )

    return redirect(url_for("viewbudget.view_budget", id=budget_id))


@viewbudget_bp.route("/edit_transaction/<int:b_id>/<int:t_id>", methods=["POST"])
@login_required
def edit_transaction(b_id, t_id):
    new_name = request.form.get(f"name")
    new_amount = request.form.get(f"amount")
    new_date = request.form.get(f"date")
    page = request.form.get("page")
    page = page if page else 1

    new_date = helpers.get_date_from_string(new_date)
    queries.update_transaction(
        b_id=b_id, t_id=t_id, name=new_name, amount=new_amount, new_date=new_date
    )

    return {
        "success": True,
        "transaction": queries.get_transaction(budget_id=b_id, trans_id=t_id).to_json(),
    }


@viewbudget_bp.route("/move_transaction/<int:sb_id>/<int:t_id>", methods=["POST"])
@login_required
def move_transaction(sb_id, t_id):
    new_budget_id = request.form.get("new_budget")

    queries.update_transaction(b_id=sb_id, t_id=t_id, new_b_id=new_budget_id)

    return {"success": True}


@viewbudget_bp.route("/delete_transaction/<int:b_id>/<int:t_id>", methods=["DELETE"])
@login_required
def delete_transaction(b_id, t_id):
    page = request.form.get("page")
    page = page if page else 1

    queries.delete_transaction(b_id, t_id)

    return {"success": True}
