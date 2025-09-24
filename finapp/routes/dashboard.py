from unicodedata import category
from finapp.queries import (
    budget_queries,
    category_queries,
    dashboard_queries,
    transaction_queries,
)
from flask import Blueprint, render_template, request
from flask_login import login_required
from datetime import date
from finapp.utils import helpers


dashboard_bp = Blueprint("dashboard_bp", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
@login_required
def dashboard():
    budgets = budget_queries.get_budgets()
    start_date = transaction_queries.get_first_transaction_date()
    return render_template("dashboard-new.html", budgets=budgets, startDate=start_date)


@dashboard_bp.route("/get_budget_name", methods={"GET"})
@login_required
def get_budget_name():
    names = ["allBudgets"] + [b.name for b in budget_queries.get_budgets()]

    return {"names": names}


@dashboard_bp.route("/get_pie_data", methods=["GET"])
@login_required
def get_pie_data():
    date = request.args.get("date")
    if date:
        date = helpers.get_date_from_string(date)

    data = helpers.pie_data(date)

    keys = [k for k in data.keys()]
    values = [v for v in data.values()]

    return {"keys": keys, "values": values}


@dashboard_bp.route("/get_spending_for_month", methods=["GET"])
@login_required
def get_spending_for_month():
    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    data = helpers.spending_for_month(month, year, ytd)

    return data


@dashboard_bp.route("/get_all_budgets_line_data", methods=["GET"])
@login_required
def get_all_budgets_line_data():
    lc_data, start_date_, end_date = dashboard_queries.get_line_chart_data()

    return {"data": lc_data, "start_date": start_date_, "end_date": end_date}


@dashboard_bp.route("/get_net_spending", methods=["GET"])
@login_required
def get_net_spending():
    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    data = helpers.net_spending(month, year, ytd)

    return data


@dashboard_bp.get("/get_spending_by_category")
@login_required
def get_spending_by_category():
    current_date = request.args.get("date")
    interval = request.args.get("interval", default="monthly")

    data = helpers.spending_by_category(
        current_date_str=current_date, interval=interval
    )
    categories = {c.id: c.to_dict() for c in category_queries.get_categories()}

    return {"data": data, "categories": categories}
