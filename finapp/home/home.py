from operator import ne
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from finapp.models import User, Budget, Transaction, PaycheckPrefill
from finapp.extensions import db
from datetime import datetime, timedelta, date
from finapp.home import helpers, queries


home = Blueprint("home", __name__)


@home.route("/", methods=["GET"])
@login_required
def index():
    active, inactive = queries.get_budgets(separate=True)

    total = round(sum([x.total for x in active + inactive]), 2)
    return render_template(
        "index.html",
        budgets=[active, inactive],
        round=round,
        total=helpers.format_to_money_string(total),
        format_to_money_string=helpers.format_to_money_string,
    )


@home.route("/toggle_budget", methods=["GET"])
@login_required
def toggle_budget():
    active = request.args.get("active")
    id_ = request.args.get("id", 0, type=int)

    if id_ != 0:
        active = False if active == "false" else True
        queries.update_budget(id_, is_active=active)

        return "succes"

    return "fail"


@home.route("/add_budget", methods=["POST"])
@login_required
def add_budget():
    name = request.form.get("name")
    try:
        amount = float(request.form.get("amount"))
    except:
        amount = 0

    if name and amount is not None:
        duplicate = queries.get_duplicate_budget_by_name(name)
        if not duplicate:
            budg = queries.create_budget(name)

            if amount != 0:
                str_date = request.form.get("date")
                date = helpers.get_date_from_string(str_date)
                queries.create_transaction(
                    name=f"Initial Transaction for {name}",
                    amount=amount,
                    date=date,
                    budget_id=budg.id,
                )

    return redirect(url_for("home.index"))


@home.route("/add_paycheck", methods=["GET"])
@login_required
def add_paycheck():
    budgets = queries.get_budgets()
    prefills = queries.get_prefill_paycheck()
    for k, v in prefills.items():
        for item in v:
            for budget in budgets:
                if budget.id == item[0]:
                    item.insert(1, budget.name)
                    break

    return render_template(
        "addpaycheck.html",
        budgets=budgets,
        str=str,
        prefills=prefills,
        enumerate=enumerate,
        showPrefills=len(prefills) > 0,
    )


@home.route("/paycheck", methods=["POST"])
@login_required
def paycheck():
    budgets = queries.get_budgets()

    name = request.form.get("name")
    amount = request.form.get("amount")
    is_percentage = request.form.get("isPercentage")

    is_percentage = True if is_percentage == "True" else False

    if name and amount:
        total_amount = 100 if is_percentage else amount
        temp = {}
        for budget in budgets:
            try:
                b_amt = float(request.form.get(budget.name + str(budget.id)))
                if b_amt:
                    str_date = request.form.get("date")
                    date = helpers.get_date_from_string(str_date)
                    if is_percentage:
                        temp[budget.id] = [b_amt, name, date]
                    else:
                        queries.create_transaction(
                            name=name, amount=b_amt, date=date, budget_id=budget.id
                        )
            except:
                b_amt = 0

            queries.create_or_update_prefill(
                b_id=budget.id,
                total_amount=total_amount,
                amount=b_amt,
            )

        if is_percentage:
            helpers.confirmBudgetsForPercentages(temp, float(amount))

    return redirect(url_for("home.index"))


@home.route("/budget_transaction", methods=["POST"])
@login_required
def budget_transaction():

    name = request.form.get("name")
    try:
        amount = float(request.form.get("amount"))
    except:
        amount = 0

    str_date = request.form.get("date")
    date = helpers.get_date_from_string(str_date)

    budget_id = request.form.get("budget")

    if name and amount and budget_id:
        queries.create_transaction(
            name=name, amount=amount, date=date, budget_id=budget_id
        )

    return redirect(url_for("home.view_budget", id=budget_id))


@home.route("/transfer", methods=["GET", "POST"])
@login_required
def transfer():
    if request.method == "POST":
        name = request.form.get("name")
        try:
            amount = float(request.form.get("amount"))
        except:
            amount = None

        str_date = request.form.get("date")
        date = helpers.get_date_from_string(str_date)

        source_budget = request.form.get("source_budget")
        dest_budget = request.form.get("dest_budget")

        if name and amount and source_budget and dest_budget:
            queries.create_transaction(
                name=name,
                amount=-amount,
                date=date,
                budget_id=source_budget,
                is_transfer=True,
            )
            queries.create_transaction(
                name=name,
                amount=amount,
                date=date,
                budget_id=dest_budget,
                is_transfer=True,
            )

        return redirect(url_for("home.index"))

    budgets = queries.get_budgets(active_only=True)
    return render_template("transfer.html", budgets=budgets, str=str)


@home.route("/edit_budget/<int:id>", methods=["POST"])
@login_required
def edit_budget(id):
    new_name = request.form.get(f"editName{id}")
    queries.update_budget(id, name=new_name)
    return redirect(url_for("home.index"))


@home.route("/get_page/<int:budget_id>")
@login_required
def get_page(budget_id):
    page = request.args.get("page", -1, type=int)

    if page < 1:
        return {"sucess": False}

    month = request.args.get("month")

    if month:
        month = int(month)
        transactions, total, page, num_pages = queries.get_transactions_for_month(
            budget_id=budget_id, month=month, page=page, paginate=True
        )

    else:
        transactions, total, page, num_pages = queries.get_transactions(
            budget_id=budget_id, page=page, paginate=True
        )

    transactions = helpers.jsify_transactions(transactions)

    return {"page": page, "transactions": transactions}


@home.route("/view_budget/<int:id>")
@login_required
def view_budget(id):
    page = request.args.get("page", 1, type=int)

    month = request.args.get("month")

    budget = queries.get_budget(id)
    budgets = queries.get_budgets(active_only=True)

    if month:
        month = int(month)
        transactions, total, page, num_pages = queries.get_transactions_for_month(
            budget_id=budget.id, month=month, page=page, paginate=True
        )

    else:
        transactions, total, page, num_pages = queries.get_transactions(
            budget_id=budget.id, page=page, paginate=True
        )

    return render_template(
        "viewbudget.html",
        budget=budget,
        transactions=transactions,
        round=round,
        strftime=datetime.strftime,
        budgets=budgets,
        str=str,
        format_to_money_string=helpers.format_to_money_string,
        total=total,
        page=page,
        num_pages=num_pages,
    )


@home.route("/edit_transaction/<int:b_id>/<int:t_id>", methods=["POST"])
@login_required
def edit_transaction(b_id, t_id):
    new_name = request.form.get(f"editName{t_id}")
    new_amount = request.form.get(f"editAmount{t_id}")
    new_date = request.form.get(f"editDate{t_id}")
    page = request.form.get("page")
    page = page if page else 1

    new_date = helpers.get_date_from_string(new_date)
    queries.update_transaction(
        b_id=b_id, t_id=t_id, name=new_name, amount=new_amount, new_date=new_date
    )

    return redirect(url_for("home.view_budget", id=b_id, page=page))


@home.route("/move_transaction/<int:sb_id>/<int:t_id>", methods=["POST"])
@login_required
def move_transaction(sb_id, t_id):
    new_budget_id = request.form.get("new_budget")

    queries.update_transaction(b_id=sb_id, t_id=t_id, new_b_id=new_budget_id)

    return redirect(url_for("home.view_budget", id=sb_id))


@home.route("/delete_transaction/<int:b_id>/<int:t_id>", methods=["POST"])
@login_required
def delete_transaction(b_id, t_id):
    page = request.form.get("page")
    page = page if page else 1

    queries.delete_transaction(b_id, t_id)

    return redirect(url_for("home.view_budget", id=b_id, page=page))


@home.route("/delete_budget/<int:b_id>", methods=["POST"])
@login_required
def delete_budget(b_id):
    new_budget_id = request.form.get("new_budget")

    # move or delete the transactions
    new_budget = queries.get_budget(new_budget_id)
    if new_budget:
        transactions = queries.get_transactions(b_id)
        for t in transactions:
            queries._update_transaction(
                transaction=t, b_id=b_id, new_b_id=new_budget.id
            )
    else:
        transactions = queries.get_transactions(b_id)
        for trans in transactions:
            queries._delete_transaction(trans, b_id)

    # delete prefills
    prefills = queries.get_prefills_by_budget(b_id)
    for prefill in prefills:
        queries._delete_prefill(prefill)

    # finall delete the budget
    queries.delete_budget(b_id)

    return redirect(url_for("home.index"))


@home.route("/delete_prefill/<float:amount>", methods=["GET"])
@login_required
def delete_prefill(amount):
    prefills = queries.get_prefills_by_total_amount(amount)

    for prefill in prefills:
        queries._delete_prefill(prefill)

    return {"success": True}


## Endpoints for the dashboard

@home.route("/dashboard", methods=["GET"])
@login_required
def dashboard():
    budgets = queries.get_budgets()
    return render_template("dashboard.html", budgets=budgets)


@home.route("/get_budget_name", methods={"GET"})
@login_required
def get_budget_name():
    names = ["allBudgets"] + [b.name for b in queries.get_budgets()]

    return {"names": names}


@home.route("/get_pie_data", methods=["GET"])
@login_required
def get_pie_data():
    date = request.args.get("date")
    if date:
        date = helpers.get_date_from_string(date)

    data = helpers.pie_data(date)

    keys = [k for k in data.keys()]
    values = [v for v in data.values()]

    return {"keys": keys, "values": values}


@home.route("/get_spending_for_month", methods=["GET"])
@login_required
def get_spending_for_month():
    month = request.args.get("month", date.today().month, type=int)

    data = helpers.spending_for_month(month)

    keys = [k for k in data.keys()]
    values = [v for v in data.values()]

    return {"keys": keys, "values": values}


@home.route("/get_all_budgets_line_data", methods=["GET"])
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


@home.route("/get_net_spending_for_month", methods=["GET"])
@login_required
def get_net_spending_for_month():
    month = request.args.get("month", date.today().month, type=int)

    data = helpers.net_spending(month)

    return data
