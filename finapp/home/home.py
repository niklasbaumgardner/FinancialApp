
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from finapp.models import User, Budget, Transaction, PaycheckPrefill
from finapp.extensions import db
import datetime
from pytz import timezone


home = Blueprint('home', __name__)


@home.route('/', methods=["GET"])
@login_required
def index():
    temp = get_budgets()

    budgets = []
    for i in range(0, len(temp), 3):
        budgets.append(temp[i:i+3])
    
    total = round(sum([x.total for x in temp ]), 2)
    return render_template("index.html", budgets=budgets, round=round, total=total)


@home.route('/add_budget', methods=["POST"])
@login_required
def add_budget():
    name = request.form.get('name')
    try:
        amount = float(request.form.get('amount'))
    except:
        amount = 0

    if name and amount is not None:
        budg = Budget(name=name, total=0, user_id=current_user.get_id())
        db.session.add(budg)
        db.session.commit()

        if amount != 0:
            trans = Transaction(name=f"Initial Transaction for {name}", budget_id=budg.id, amount=amount, user_id=current_user.get_id(), date=datetime.datetime.now())
            do_transaction(trans)

    return redirect(url_for('home.index'))


@home.route('/add_transaction', methods=["GET"])
@login_required
def add_transaction():
    budgets = get_budgets()
    prefills = get_prefill_paycheck()
    for k, v in prefills.items():
        for item in v:
            for budget in budgets:
                if budget.id == item[0]:
                    item.insert(1, budget.name)
                    break

    return render_template("addtransaction.html", budgets=budgets, str=str, prefills=prefills, enumerate=enumerate, showPrefills=len(prefills)>0)


@home.route('/paycheck', methods=["POST"])
@login_required
def paycheck():
    budgets = get_budgets()

    name = request.form.get("name")
    amount = request.form.get('amount')
    if name and amount:
        for budget in budgets:
            try:
                b_amt = float(request.form.get(budget.name + str(budget.id)))
                if b_amt:
                    str_date = request.form.get('date')
                    if str_date:
                        date = get_date(str_date)
                    else:
                        date = datetime.datetime.now()
                    trans = Transaction(name=name, budget_id=budget.id, user_id=current_user.get_id(), amount=b_amt, date=date)
                    do_transaction(trans)
            except:
                b_amt = 0

            prefill = PaycheckPrefill(budget_id=budget.id, user_id=current_user.get_id(), total_amount=amount, amount=b_amt)
            do_prefill(prefill)

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

    if str_date:
        date = get_date(str_date)

    else:
        date = datetime.datetime.now()
    
    budget_id = request.form.get('budget')

    if name and amount and budget_id:

        trans = Transaction(name=name, budget_id=budget_id, user_id=current_user.get_id(), amount=amount, date=date)
        do_transaction(trans)

    return redirect(url_for('home.view_budget', id=budget_id))


@home.route('/transfer', methods=["GET"])
@login_required
def transfer():
    budgets = get_budgets()
    return render_template('transfer.html', budgets=budgets, str=str)



@home.route('/budget_to_budget', methods=["POST"])
@login_required
def budget_to_budget():
    name = request.form.get("name")
    try:
        amount = float(request.form.get('amount'))
    except:
        amount = None
    source_budget = request.form.get('source_budget')
    dest_budget = request.form.get('dest_budget')

    if name and amount and source_budget and dest_budget:
        trans1 = Transaction(name=name, budget_id=source_budget, user_id=current_user.get_id(), amount=-amount, date=datetime.datetime.now())
        trans2 = Transaction(name=name, budget_id=dest_budget, user_id=current_user.get_id(), amount=amount, date=datetime.datetime.now())
        do_transaction(trans1)
        do_transaction(trans2)
    return redirect(url_for('home.index'))


@home.route('/view_budget/<int:id>')
@login_required
def view_budget(id):
    page = request.args.get('page', 1, type=int)

    tz = timezone('US/Eastern')

    budget = get_budget(id)
    budgets = get_budgets()
    transactions = Transaction.query.filter_by(budget_id=budget.id, user_id=current_user.get_id()).order_by( Transaction.date.desc(), Transaction.id.desc()).paginate(page=page, per_page=10)

    return render_template('viewbudget.html', budget=budget, transactions=transactions, round=round, strftime=datetime.datetime.strftime, budgets=budgets, str=str, date=datetime.datetime.now(tz))


@home.route('/edit_transaction/<int:b_id>/<int:t_id>', methods=["POST"])
@login_required
def edit_transaction(b_id, t_id):
    new_name = request.form.get(f'editName{t_id}')
    new_amount = request.form.get(f'editAmount{t_id}')
    new_date = request.form.get(f'editDate{t_id}')
    page = request.form.get('page')

    trans = get_transaction(b_id, t_id)
    if trans:
        if new_name:
            trans.name = new_name
        if new_amount:
            trans.amount = new_amount
        
        if new_date:
            new_date = get_date(new_date)
        else:
            new_date = trans.date

        if not same_day(new_date, trans.date):
            trans.date = new_date
            print('not same')
        else:
            print('same')
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
    trans = get_transaction(b_id, t_id)
    if trans:
        db.session.delete(trans)
        db.session.commit()

        update_budget(b_id)

    return redirect(url_for('home.view_budget', id=b_id))


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


@home.route('/delete_prefill/<float:amount>', methods=["POST"])
@login_required
def delete_prefill(amount):
    prefills = get_prefills_by_amount(amount)

    for prefill in prefills:
        delete_prefill(prefill.id)

    return redirect(url_for('home.add_transaction'))



# API Endpoints

@home.route('/get_data', methods=['GET'])
@login_required
def get_data():
    budget = request.args.get('budget')
    date = request.args.get('date')

    return


# Functions

def get_budgets():
    budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()
    budgets.sort(key=lambda x: x.name.lower())
    return budgets


def get_budget(id):
    budget = Budget.query.filter_by(id=id, user_id=current_user.get_id()).first()
    return budget


def get_transactions(budget_id):
    transactions = Transaction.query.filter_by(budget_id=budget_id, user_id=current_user.get_id()).all()
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

        db.session.add(transaction)
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
    if d1.year == d2.year and d1.month == d2.month and d1.day == d2.day:
        return True
    return False


def get_date(str_date):
    year, month, day = str_date.strip().split('-')

    date_now = datetime.datetime.now()

    date = datetime.datetime(int(year), int(month), int(day))
    if same_day(date_now, date):
        return date_now

    return datetime.datetime(int(year), int(month), int(day))