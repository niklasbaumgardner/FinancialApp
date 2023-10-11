from datetime import date
from finapp.home import queries
from flask import url_for
import json


def format_to_money_string(number, include_minus=True):
    number = round(number, 2)
    if include_minus and number < 0:
        return f"-${abs(number):,.2f}"
    return f"${abs(number):,.2f}"


def is_same_day(d1, d2):
    return d1.year == d2.year and d1.month == d2.month and d1.day == d2.day


def get_date_from_string(str_date):
    if not str_date:
        return None

    year, month, day = str_date.strip().split("-")

    return date(int(year), int(month), int(day))


def transSum(lst):
    total = 0

    for t in lst:
        total += t.amount

    return total


def get_dates_for_range(first, last):
    num_day = last - first
    step = num_day // 10

    dates = []
    curr = first
    while curr < last:
        dates.append(curr)
        curr += step

    dates.append(last)

    return dates, step


def get_data_dict(all_trans):
    data = {}
    for i, trans in enumerate(all_trans):
        try:
            curr_date = trans.date.strftime("%m/%d/%Y")
            next_date = all_trans[i + 1].date.strftime("%m/%d/%Y")
            if curr_date == next_date:
                continue
        except:  # will hit at end of list and we want to sum at the end of the list
            pass
        # str_date = trans.date.strftime("%m/%d/%Y")
        data[trans.date] = round(transSum(all_trans[:i]) + all_trans[i].amount, 2)
    return data


def jsify_transactions(transactions):
    t_list = []

    for t in transactions:
        temp = [
            t.id,
            t.name,
            t.amount,
            format_to_money_string(t.amount),
            t.date.strftime("%Y-%m-%d"),
            t.is_transfer,
            t.budget_id,
            url_for("home.edit_transaction", b_id=t.budget_id, t_id=t.id),
        ]
        t_list.append(temp)

    return t_list


def in_out_net(trans):
    in_ = 0
    out = 0
    net = 0
    for tran in trans:
        if tran.amount > 0:
            in_ += tran.amount
        elif tran.amount < 0:
            out += tran.amount
    net = in_ + out
    return in_, out, net


def net_spending(month, year, ytd):
    data = {}
    total_in = 0
    total_out = 0
    total_net = 0
    all_budgets = queries.get_budgets()

    for budget in all_budgets:
        if ytd:
            b_trans = queries.get_transactions_for_year(
                budget_id=budget.id, year=year, include_transfers=False
            )
        else:
            b_trans = queries.get_transactions_for_month(
                budget.id, month=month, year=year, include_transfers=False
            )

        if not b_trans:
            continue
        in_, out, net = in_out_net(b_trans)
        total_in += in_
        total_out += out
        data[budget.name] = {
            "in": format_to_money_string(in_),
            "out": format_to_money_string(out, False),
            "net": format_to_money_string(net),
        }
    total_net = total_in + total_out
    data["allBudgets"] = {
        "in": format_to_money_string(total_in),
        "out": format_to_money_string(total_out, False),
        "net": format_to_money_string(total_net),
    }
    return data


def all_budgets_net_worth(start_date=None):
    # { budget name: { date: net worth } }
    all_budgets = queries.get_budgets(active_only=True)
    temp = {}
    first = None
    last = None
    for budget in all_budgets:
        b_trans = queries.get_transactions(budget.id, start_date)
        if b_trans:
            b_trans.sort(key=lambda x: x.date)

            b_data = get_data_dict(b_trans)
            # print(budget.name, b_data)

            if not first or first > b_trans[0].date:
                # print(first, b_trans[0].date)
                first = b_trans[0].date
            if not last or last < b_trans[-1].date:
                # print(last, b_trans[-1].date)
                last = b_trans[-1].date

            temp[budget.name] = b_data

            # num_day = last - first
            # step = num_day // 10

            # if step == timedelta():
            #     step += timedelta(1)

            # budgets_data[budget.name] = sum_per_date_list(first, last, step, b_data)
            # print(budgets_data.keys(), budgets_data)

    dates, step = get_dates_for_range(first, last)

    budgets_data = {}
    for k, v in temp.items():
        budgets_data[k] = sum_per_date_list(first, last, step, v, dates)

    return budgets_data, [d.strftime("%m/%d/%Y") for d in dates]


def spending_for_month(month, year, ytd):
    all_budgets = queries.get_budgets()
    data = {}

    for budg in all_budgets:
        if ytd:
            temp_trans = queries.get_transactions_for_year(
                budget_id=budg.id, year=year, include_transfers=False
            )
        else:
            temp_trans = queries.get_transactions_for_month(
                budget_id=budg.id, month=month, year=year, include_transfers=False
            )
        expenses = sum([t.amount for t in temp_trans if t.amount < 0]) * -1
        income = sum([t.amount for t in temp_trans if t.amount > 0])

        if expenses != 0 or income != 0:
            data[budg.name] = {
                "expenses": round(expenses, 2),
                "income": round(income, 2),
            }
    return data


def pie_data(date):
    data = {}
    active_only = True if date else False
    all_budgets = queries.get_budgets(active_only=active_only)

    if date:
        for budget in all_budgets:
            total = sum(
                map(
                    lambda x: x.amount,
                    queries.get_transactions(budget.id, end_date=date),
                )
            )
            if total > 0:
                data[budget.name] = total
    else:
        for budget in all_budgets:
            total = budget.total
            if total > 0:
                data[budget.name] = total

    return data


def net_worth(start_date=None):
    all_budgets = queries.get_budgets()
    all_trans = []
    for budget in all_budgets:
        all_trans += queries.get_transactions(budget.id)
    all_trans.sort(key=lambda x: x.date)

    data = get_data_dict(all_trans)

    first = start_date
    last = all_trans[-1].date
    dates, step = get_dates_for_range(first, last)
    # print(first, last, dates)

    return sum_per_date_list(first, last, step, data, dates), [
        d.strftime("%m/%d/%Y") for d in dates
    ]


def sum_per_date_list(first, last, step, data, dates):
    # curr = first

    keys = [k for k in data.keys()]
    keys.sort()

    trimmed = {}

    for date in dates:
        if date in data:
            trimmed[date.strftime("%m/%d/%Y")] = data[date]

        else:
            # find next smallest date
            # curr = date
            for key_date in keys:
                if date >= key_date:
                    trimmed[date.strftime("%m/%d/%Y")] = data[key_date]
    return trimmed


def confirmBudgetsForPercentages(dic, amount):
    total = 0
    for k, v in dic.items():
        temp_total = round(v[0] * amount / 100, 2)
        v.append(temp_total)
        total += temp_total
    rmdr = amount - total

    if abs(rmdr) < (len(dic) / 100):
        for k, v in dic.items():
            if rmdr > 0:
                rmdr -= 0.01
                v[-1] += 0.01
            elif rmdr < 0:
                rmdr += 0.01
                v[-1] -= 0.01
            queries.create_transaction(name=v[1], amount=v[-1], date=v[2], budget_id=k)
            return True

    else:
        return False


def search_for(
    budget_id,
    name,
    start_date,
    end_date,
    amount,
    min_amount,
    max_amount,
    page,
    month,
    year,
    ytd,
    sort_by,
):
    start_date = get_date_from_string(start_date)
    end_date = get_date_from_string(end_date)

    try:
        multiplier = -1
        if amount[0] == "+" or amount[0] == "-" or amount == "0":
            multiplier = 1
        amount = float(amount) * multiplier
    except:
        amount = None

    try:
        multiplier = -1
        if min_amount[0] == "+" or min_amount[0] == "-" or min_amount == "0":
            multiplier = 1
        min_amount = float(min_amount) * multiplier
    except:
        min_amount = None

    try:
        multiplier = -1
        if max_amount[0] == "+" or max_amount[0] == "-" or max_amount == "0":
            multiplier = 1
        max_amount = float(max_amount) * multiplier
    except:
        max_amount = None

    try:
        sort_by = json.loads(sort_by)
    except:
        sort_by = None

    return queries.search(
        budget_id=budget_id,
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
