from unicodedata import category
from finapp.queries import (
    budget_queries,
    category_queries,
    dashboard_queries,
    transaction_queries,
)
from flask import Blueprint, render_template, request
from flask_login import login_required
from finapp.utils.Sqids import sqids
from finapp.utils import helpers


dashboard_bp = Blueprint("dashboard_bp", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
@login_required
def dashboard():
    dashboard_queries.get_spending_by_budget_and_month()
    start_date = transaction_queries.get_first_transaction_date()
    return render_template("dashboard.newest.html", startDate=start_date)


@dashboard_bp.route("/api/get_net_worth_data", methods=["GET"])
@login_required
def api_get_net_worth_data():
    data = dashboard_queries.get_net_worth_data()

    return {"data": data}


@dashboard_bp.route("/api/get_budget_totals_by_date", methods=["GET"])
@login_required
def api_get_budget_totals_by_date():
    lc_data, start_date_, end_date = dashboard_queries.get_line_chart_data()

    return {"data": lc_data, "start_date": start_date_, "end_date": end_date}


@dashboard_bp.route("/api/get_spending_by_budget", methods=["GET"])
@login_required
def api_get_spending_by_budget():
    month = request.args.get("month", 0, type=int)
    year = request.args.get("year", 0, type=int)
    ytd = request.args.get("ytd") == "true"

    data = helpers.net_spending(month, year, ytd)

    return data


@dashboard_bp.get("/api/get_spending_by_month")
@login_required
def api_get_spending_by_month():
    budgets, income, spending = dashboard_queries.get_spending_by_budget_and_month()

    budgets = {b.sqid_id(): b.to_dict() for b in budgets}

    for row in spending:
        row["budget_id"] = sqids.encode_one(row["budget_id"])
    for row in income:
        row["budget_id"] = sqids.encode_one(row["budget_id"])

    return {"budgets": budgets, "spending": spending, "income": income}


@dashboard_bp.get("/api/get_spending_by_category")
@login_required
def api_get_spending_by_category():
    current_date = request.args.get("date")
    interval = request.args.get("interval", default="monthly")

    data = helpers.spending_by_category(
        current_date_str=current_date, interval=interval
    )
    categories = {c.sqid_id(): c.to_dict() for c in category_queries.get_categories()}
    data = {sqids.encode_one(key): val for key, val in data.items()}

    return {"data": data, "categories": categories}
