
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from finapp.models import User, Budget, Transaction, PaycheckPrefill
from finapp.extensions import db
from datetime import datetime, timedelta, date
from pytz import timezone


home = Blueprint('home', __name__)



@home.route('/', methods=["GET"])
@login_required
def index():
    active, inactive = get_budgets(separate=True)

    total = round(sum([x.total for x in active + inactive ]), 2)
    format_to_money_string(total)
    return render_template("index.html", budgets=[active, inactive], round=round, total=format_to_money_string(total), format_to_money_string=format_to_money_string)


@home.route('/dashboard', methods=["GET"])
@login_required
def dashboard():
    budgets = get_budgets()
    return render_template('dashboard.html', budgets=budgets)


@home.route('/get_budget_name', methods={"GET"})
@login_required
def get_budget_name():
    names = ['allBudgets'] + [ b.name for b in get_budgets() ]

    return { 'names': names }


@home.route('/get_pie_data', methods=["GET"])
@login_required
def get_pie_data():
    date = request.args.get('date')
    if date:
        date = get_datetime(date)

    data = pie_data(date)

    keys = [ k for k in data.keys() ]
    values = [ v for v in data.values() ]

    return { 'keys': keys, 'values': values }

@home.route('/get_spending_for_month', methods=["GET"])
@login_required
def get_spending_for_month():
    month = request.args.get('month', date.today().month, type=int)

    data = spending_for_month(month)

    keys = [ k for k in data.keys() ]
    values = [ v for v in data.values() ]

    return { 'keys': keys, 'values': values }


@home.route('/get_all_budgets_line_data', methods=["GET"])
@login_required
def get_all_budgets_line_data():
    date = request.args.get('currentDate')
    days_back = request.args.get('daysBack')

    if date:
        curr_date = get_datetime(date)
        date = curr_date - timedelta(days=int(days_back)) if days_back else None


    data, dates = all_budgets_net_worth(date)
    dataNW, datesNW = net_worth(date)

    names = ['allBudgets'] + [ k for k in data.keys() ]

    data['allBudgets'] = dataNW

    return { 'names': names, 'keys': dates, 'data': data }


@home.route('/get_net_spending_for_month', methods=["GET"])
@login_required
def get_net_spending_for_month():
    month = request.args.get('month', date.today().month, type=int)

    data = net_spending(month)

    return data


@home.route('/toggle_budget', methods=["GET"])
@login_required
def toggle_budget():
    active = request.args.get('active')
    id_ = request.args.get('id', 0, type=int)

    if id_ != 0:
        active = False if active == "false" else True
        budget = get_budget(id_)
        budget.is_active = active
        db.session.commit()

        return 'succes'

    return 'fail'


@home.route('/add_budget', methods=["POST"])
@login_required
def add_budget():
    name = request.form.get('name')
    try:
        amount = float(request.form.get('amount'))
    except:
        amount = 0

    if name and amount is not None:
        duplicate = Budget.query.filter_by(name=name, user_id=current_user.get_id()).first()
        if not duplicate:
            budg = Budget(name=name, total=0, user_id=current_user.get_id(), is_active=True)
            db.session.add(budg)
            db.session.commit()

            if amount != 0:
                str_date = request.form.get('date')
                date = get_date(str_date)
                create_transaction(name=f"Initial Transaction for {name}", amount=amount, date=date, budget_id=budg.id)

    return redirect(url_for('home.index'))


@home.route('/add_paycheck', methods=["GET"])
@login_required
def add_paycheck():
    budgets = get_budgets()
    prefills = get_prefill_paycheck()
    for k, v in prefills.items():
        for item in v:
            for budget in budgets:
                if budget.id == item[0]:
                    item.insert(1, budget.name)
                    break

    return render_template("addpaycheck.html", budgets=budgets, str=str, prefills=prefills, enumerate=enumerate, showPrefills=len(prefills)>0)


@home.route('/paycheck', methods=["POST"])
@login_required
def paycheck():
    budgets = get_budgets()

    name = request.form.get("name")
    amount = request.form.get('amount')
    is_percentage = request.form.get("isPercentage")

    is_percentage = True if is_percentage == "True" else False

    if name and amount:
        total_amount = 100 if is_percentage else amount
        temp = {}
        for budget in budgets:
            try:
                b_amt = float(request.form.get(budget.name + str(budget.id)))
                if b_amt:
                    str_date = request.form.get('date')
                    date = get_date(str_date)
                    if is_percentage:
                        temp[budget.id] = [b_amt, name, date]
                    else:
                        create_transaction(name=name, amount=b_amt, date=date, budget_id=budget.id)
            except:
                b_amt = 0

            prefill = PaycheckPrefill(budget_id=budget.id, user_id=current_user.get_id(), total_amount=total_amount, amount=b_amt)
            do_prefill(prefill)

        if is_percentage:
            confirmBudgetsForPercentages(temp, float(amount))

    return redirect(url_for('home.index'))


@home.route('/budget_transaction', methods=["POST"])
@login_required
def budget_transaction():

    name = request.form.get("name")
    try:
        amount = float(request.form.get('amount'))
    except:
        amount = 0

    str_date = request.form.get('date')
    date = get_date(str_date)

    budget_id = request.form.get('budget')

    if name and amount and budget_id:
        create_transaction(name=name, amount=amount, date=date, budget_id=budget_id)

    return redirect(url_for('home.view_budget', id=budget_id))


@home.route('/transfer', methods=["GET", "POST"])
@login_required
def transfer():
    if request.method == "POST":
        name = request.form.get("name")
        try:
            amount = float(request.form.get('amount'))
        except:
            amount = None

        str_date = request.form.get('date')
        date = get_date(str_date)

        source_budget = request.form.get('source_budget')
        dest_budget = request.form.get('dest_budget')

        if name and amount and source_budget and dest_budget:
            create_transaction(name=name, amount=-amount, date=date, budget_id=source_budget, is_transfer=True)
            create_transaction(name=name, amount=amount, date=date, budget_id=dest_budget, is_transfer=True)

        return redirect(url_for('home.index'))

    budgets = get_budgets(active_only=True)
    return render_template('transfer.html', budgets=budgets, str=str)


@home.route('/edit_budget/<int:id>', methods=["POST"])
@login_required
def edit_budget(id):
    budget = get_budget(id)
    new_name = request.form.get(f'editName{id}')
    if budget and new_name:
        budget.name = new_name
        db.session.commit()
    return redirect(url_for('home.index'))


@home.route('/view_budget/<int:id>')
@login_required
def view_budget(id):
    page = request.args.get('page', 1, type=int)

    month = request.args.get('month')

    budget = get_budget(id)
    budgets = get_budgets(active_only=True)

    if month:
        month = int(month)
        transactions = get_transactions_for_month(budget_id=budget.id, month=month)
        # transactions = Pagination(query=None, page=page, per_page=10, total=len(transactions), items=transactions)
        return render_template('viewbudget.html', budget=budget, transactions=transactions, round=round, strftime=datetime.strftime, budgets=budgets, str=str, format_to_money_string=format_to_money_string)

    else:
        transactions = get_transactions(budget_id=budget.id)
        # transactions = Transaction.query.filter_by(budget_id=budget.id, user_id=current_user.get_id()).paginate(page=page, per_page=10)

    return render_template('viewbudget.html', budget=budget, transactions=transactions, round=round, strftime=datetime.strftime, budgets=budgets, str=str, format_to_money_string=format_to_money_string)


@home.route('/edit_transaction/<int:b_id>/<int:t_id>', methods=["POST"])
@login_required
def edit_transaction(b_id, t_id):
    new_name = request.form.get(f'editName{t_id}')
    new_amount = request.form.get(f'editAmount{t_id}')
    new_date = request.form.get(f'editDate{t_id}')
    page = request.form.get('page')
    page = page if page else 1

    trans = get_transaction(b_id, t_id)
    if trans:
        if new_name:
            trans.name = new_name
        if new_amount:
            trans.amount = new_amount

        new_date = get_date(new_date)

        if not same_day(new_date, trans.date):
            trans.date = new_date

        db.session.commit()
        update_budget(b_id)

    return redirect(url_for('home.view_budget', id=b_id, page=page))


@home.route('/move_transaction/<int:sb_id>/<int:t_id>', methods=["POST"])
@login_required
def move_transaction(sb_id, t_id):
    trans = get_transaction(sb_id, t_id)
    new_budget_id = request.form.get('new_budget')
    if trans and new_budget_id:
        new_budget = get_budget(new_budget_id)

        if new_budget:
            trans.budget_id = new_budget.id
            db.session.commit()

            update_budget(sb_id)
            update_budget(new_budget.id)

    return redirect(url_for('home.view_budget', id=sb_id))


@home.route('/delete_transaction/<int:b_id>/<int:t_id>', methods=["POST"])
@login_required
def delete_transaction(b_id, t_id):
    page = request.form.get("page")
    page = page if page else 1
    trans = get_transaction(b_id, t_id)
    if trans:
        db.session.delete(trans)
        db.session.commit()

        update_budget(b_id)

    return redirect(url_for('home.view_budget', id=b_id, page=page))


@home.route('/delete_budget/<int:b_id>', methods=["POST"])
@login_required
def delete_budget(b_id):
    try:
        new_budget = int(request.form.get("new_budget"))
    except:
        new_budget = None

    if new_budget is not None:
        # transfer transactions to new budget
        transactions = get_transactions(b_id)
        for trans in transactions:
            trans.budget_id = new_budget
        db.session.commit()
        update_budget(new_budget)
    else:
        # delete transactions
        transactions = get_transactions(b_id)
        for trans in transactions:
            delete_transaction(b_id, trans.id)
        
    # delete prefills
    prefills = get_prefills_by_budget(b_id)
    for prefill in prefills:
        delete_prefill(prefill.id)

    budg = get_budget(b_id)
    db.session.delete(budg)
    db.session.commit()

    return redirect(url_for('home.index'))


@home.route('/delete_prefill/<float:amount>', methods=["GET"])
@login_required
def delete_prefill(amount):
    prefills = get_prefills_by_amount(amount)

    for prefill in prefills:
        delete_prefill(prefill.id)

    return { "success": True }



# API Endpoints

# @home.route('/get_data', methods=['GET'])
# @login_required
# def get_data():
#     budget = request.args.get('budget')
#     date = request.args.get('date')

#     return


# Functions

def format_to_money_string(number, include_minus=True):
    if include_minus and number < 0:
        return f'-${abs(number):,.2f}'
    return f'${abs(number):,.2f}'

def create_transaction(name, amount, date, budget_id, is_transfer=False):
    if get_budget(budget_id):
        trans = Transaction(name=name, budget_id=budget_id, user_id=current_user.get_id(), amount=amount, date=date, is_transfer=is_transfer)
        db.session.add(trans)
        db.session.commit()
        do_transaction(trans)


def get_budgets(separate=False, active_only=False, inactive_only=False):
    if active_only:
        active = Budget.query.filter_by(user_id=current_user.get_id(), is_active=True).all()
        active.sort(key=lambda x: x.name.lower())
        return active

    elif inactive_only:
        inactive = Budget.query.filter_by(user_id=current_user.get_id(), is_active=False).all()
        inactive.sort(key=lambda x: x.name.lower())
        return inactive

    elif separate:
        active = Budget.query.filter_by(user_id=current_user.get_id(), is_active=True).all()
        inactive = Budget.query.filter_by(user_id=current_user.get_id(), is_active=False).all()
        active.sort(key=lambda x: x.name.lower())
        inactive.sort(key=lambda x: x.name.lower())
        return active, inactive

    else:
        budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()
        budgets.sort(key=lambda x: x.name.lower())
        return budgets


def get_budget(id):
    return Budget.query.filter_by(id=id, user_id=current_user.get_id()).first()


def get_transactions(budget_id, start_date=None, end_date=None, include_transfers=True):
    transactions = Transaction.query.filter_by(budget_id=budget_id, user_id=current_user.get_id()).order_by(Transaction.date.desc(), Transaction.id.desc()).all()
    if not include_transfers:
        transactions = [ t for t in transactions if t.is_transfer is not True ]
    if start_date:
        transactions = [ t for t in transactions if t.date > start_date ]
    if end_date:
        transactions = [ t for t in transactions if t.date <= end_date ]

    return transactions

def get_transactions_for_month(budget_id, month, include_transfers=True, query=True):
    year=date.today().year

    current_month = date.today().month
    if current_month < month:
        year -=1

    transactions = Transaction.query.filter(Transaction.budget_id==budget_id).filter(Transaction.user_id==current_user.get_id()).order_by(Transaction.date.desc(), Transaction.id.desc()).all()
    transactions = [ t for t in transactions if t.date.month == month and t.date.year == year]
    # if not query:
    #     return transactions
    # else:
    #     transactions = transactions.all()

    if not include_transfers:
        transactions = [ t for t in transactions if t.is_transfer is not True ]
    return transactions


def get_transaction(budget_id, trans_id):
    transactions = Transaction.query.filter_by(id=trans_id, budget_id=budget_id, user_id=current_user.get_id()).first()
    return transactions


def get_prefills():
    prefills = PaycheckPrefill.query.filter_by(user_id=current_user.get_id()).all()
    return prefills


def get_prefills_by_budget(budget_id):
    prefills = PaycheckPrefill.query.filter_by(budget_id=budget_id, user_id=current_user.get_id()).all()
    return prefills


def get_prefills_by_amount(total_amount):
    prefill = PaycheckPrefill.query.filter_by(user_id=current_user.get_id(), total_amount=total_amount).all()
    return prefill


def get_prefill_by_amount_and_budget(total_amount, budget_id):
    prefill = PaycheckPrefill.query.filter_by(user_id=current_user.get_id(), total_amount=total_amount, budget_id=budget_id).first()
    return prefill


def get_prefill(prefill_id):
    prefill = PaycheckPrefill.query.filter_by(id=prefill_id, user_id=current_user.get_id()).first()
    return prefill


def do_transaction(transaction):
    budget = get_budget(transaction.budget_id)
    if budget:
        budget.total += transaction.amount
        db.session.commit()

        return transaction


def get_prefill_paycheck():
    prefills = get_prefills()

    prefill_dict = {}
    for prefill in prefills:
        temp = [prefill.budget_id, prefill.amount]
        try:
            prefill_dict[prefill.total_amount].append(temp)
        except:
            prefill_dict[prefill.total_amount] = [temp]
    
    return prefill_dict


def do_prefill(prefill):
    db_prefill = get_prefill_by_amount_and_budget(prefill.total_amount, prefill.budget_id)

    if db_prefill:
        db_prefill.amount = prefill.amount
    else:
        db.session.add(prefill)
    db.session.commit()


def link_transactions(t1, t2):
    pass


def delete_transaction(b_id, t_id):
    # need to edit once transactions are linked
    trans = get_transaction(b_id, t_id)
    if trans:
        db.session.delete(trans)
        db.session.commit()


def delete_prefill(p_id):
    pre = get_prefill(p_id)
    if pre:
        db.session.delete(pre)
        db.session.commit()


def update_budget(b_id):
    budget = get_budget(b_id)

    if budget:
        transactions = get_transactions(budget.id)
        total = 0
        for trans in transactions:
            total += trans.amount
        budget.total = total

        db.session.commit()


def update_budgets():
    budgets = get_budgets()

    for budget in budgets:
        transactions = get_transactions(budget.id)
        total = 0
        for trans in transactions:
            total += trans.amount
        budget.total = round(total, 2)

    db.session.commit()


def same_day(d1, d2):
    return d1.year == d2.year and d1.month == d2.month and d1.day == d2.day


def get_date(str_date):
    year, month, day = str_date.strip().split('-')

    return date(int(year), int(month), int(day))


def get_datetime(str_date):
    year, month, day = str_date.strip().split('-')

    return datetime(int(year), int(month), int(day))


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
                rmdr -= .01
                v[-1] += .01
            elif rmdr < 0:
                rmdr += .01
                v[-1] -= .01
            create_transaction(name=v[1], amount=v[-1], date=v[2], budget_id=k)
            return True

    else:
        return False

def transSum(lst):
    total = 0

    for t in lst:
        total += t.amount
    
    return total


def get_dates(first, last):
    num_day = last - first
    step = num_day // 10

    budgets_data = {}

    # print(first, last)
    # print(step, int(step.days))

    dates = []
    curr = first
    while curr < last:
        dates.append(curr)
        curr += step
    
    dates.append(last)

    return dates, step



def sum_per_date_list(first, last, step, data, dates):
    # curr = first

    keys = [ k for k in data.keys() ]
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


def get_data_dict(all_trans):
    data = {}
    for i, trans in enumerate(all_trans):
        try:
            curr_date = trans.date.strftime("%m/%d/%Y")
            next_date = all_trans[i+1].date.strftime("%m/%d/%Y")
            if curr_date == next_date:
                continue
        except: # will hit at end of list and we want to sum at the end of the list
            pass
        # str_date = trans.date.strftime("%m/%d/%Y")
        data[trans.date] = round(transSum(all_trans[:i]) + all_trans[i].amount, 2)
    return data


# returns list of date: net worth for all budgets combined
def net_worth(start_date=None):
    all_budgets = get_budgets()
    all_trans = []
    for budget in all_budgets:
        all_trans += get_transactions(budget.id, start_date)
    all_trans.sort(key=lambda x: x.date)

    data = get_data_dict(all_trans)

    first = all_trans[0].date
    last = all_trans[-1].date
    dates, step = get_dates(first, last)
    # print(first, last, dates)

    return sum_per_date_list(first, last, step, data, dates), [ d.strftime("%m/%d/%Y") for d in dates ]


def pie_data(date):
    data = {}
    active_only = True if date else False
    all_budgets = get_budgets(active_only=active_only)

    if date:
        for budget in all_budgets:
            total = sum(map(lambda x: x.amount, get_transactions(budget.id, end_date=date)))
            if total > 0:
                data[budget.name] = total
    else:
        for budget in all_budgets:
            total = budget.total
            if total > 0:
                data[budget.name] = total

    return data


def spending_for_month(month):
    all_budgets = get_budgets()
    data = {}
    currMonth = date.today().month
    year = date.today().year
    if month > currMonth:
        year -= 1

    for budg in all_budgets:
        b_trans = sum([ t.amount for t in get_transactions_for_month(budg.id, month=month, include_transfers=False) if t.date.year == year and t.amount < 0 ]) * -1
        # print(b_trans)
        if (b_trans > 0):
            data[budg.name] = round(b_trans, 2)
    return data


# returns list of date: net worth for each individual budget
def all_budgets_net_worth(start_date=None):
    # { budget name: { date: net worth } }
    all_budgets = get_budgets(active_only=True)
    temp = {}
    first = None
    last = None
    for budget in all_budgets:
        b_trans = get_transactions(budget.id, start_date)
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

    dates, step = get_dates(first, last)


    budgets_data = {}
    for k, v in temp.items():
        budgets_data[k] = sum_per_date_list(first, last, step, v, dates)

    return budgets_data, [ d.strftime("%m/%d/%Y") for d in dates ]


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

def net_spending(month):
    data = {}
    total_in = 0
    total_out = 0
    total_net = 0
    all_budgets = get_budgets()
    for budget in all_budgets:
        b_trans = get_transactions_for_month(budget.id, month=month, include_transfers=False)
        if not b_trans:
            continue
        in_, out, net = in_out_net(b_trans)
        total_in += in_
        total_out += out
        data[budget.name] = {'in': format_to_money_string(in_), 'out': format_to_money_string(out, False), 'net': format_to_money_string(net)}
    total_net = total_in + total_out
    data['allBudgets'] = {'in': format_to_money_string(total_in), 'out': format_to_money_string(total_out, False), 'net': format_to_money_string(total_net)}
    return data



