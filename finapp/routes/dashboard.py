from unicodedata import category
from finapp.queries import budget_queries, category_queries, transaction_queries
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
    start_date = request.args.get("startDate")
    if start_date:
        start_date = helpers.get_date_from_string(start_date)

    data, dates = helpers.all_budgets_net_worth(start_date)
    month, day, year = dates[0].split("/")
    actualStartDate = date(int(year), int(month), int(day))
    dataNW, datesNW = helpers.net_worth(actualStartDate)

    names = ["allBudgets"] + [k for k in data.keys()]

    data["allBudgets"] = dataNW

    return {"names": names, "keys": dates, "data": data}


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

    data = helpers.spending_by_category(current_date)
    categories = {
        c.id: c.to_dict() for c in category_queries.get_cetegories(sort=False)
    }

    return {"data": data, "categories": categories}
