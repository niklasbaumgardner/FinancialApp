
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from finapp.models import User, Budget, Transaction
from finapp.extensions import db
import datetime

# app = Flask(__name__)

home = Blueprint('home', __name__)
# mail = Mail(home)


@home.route('/', methods=["GET"])
@login_required
def index():
    budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()
    budgets.sort(key=lambda x: x.name)
    return render_template("index.html", budgets=budgets, round=round)


@home.route('/add_budget', methods=["GET", "POST"])
@login_required
def add_budget():
    if request.method == 'GET':
        budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()
        budgets.sort(key=lambda x: x.name)
        return render_template("addbudget.html", budgets=budgets, str=str)
    
    elif request.method == 'POST':
        name = request.form.get('name')
        try:
            amount = float(request.form.get('amount'))
        except:
            amount = 0

        budg = Budget(name=name, total=amount, user_id=current_user.get_id())
        db.session.add(budg)
        db.session.commit()

        if amount != 0:
            trans = Transaction(name=f"Initial Transaction for {name}", budget_id=budg.id, amount=amount, user_id=current_user.get_id(), date=datetime.datetime.now())
            do_transaction(trans)

        return redirect(url_for('home.index'))


@home.route('/add_transaction', methods=["GET", "POST"])
@login_required
def add_transaction():
    if request.method == 'GET':
        budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()
        budgets.sort(key=lambda x: x.name)
        return render_template("addtransaction.html", budgets=budgets)
    
    elif request.method == 'POST':
        return


@home.route('/paycheck', methods=["POST"])
@login_required
def paycheck():
    budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()

    name = request.form.get("name")
    amount = request.form.get('amount')
    print(name, amount)
    # buddic = {}
    for budget in budgets:
        b_amt = float(request.form.get(budget.name + str(budget.id)))
        if b_amt > 0:
            trans = Transaction(name=name, budget_id=budget.id, user_id=current_user.get_id(), amount=b_amt, date=datetime.datetime.now())
            do_transaction(trans)
    # print(buddic)
    return redirect(url_for('home.index'))


@home.route('/budget_transaction', methods=["POST"])
@login_required
def budget_transaction():
    # budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()

    name = request.form.get("name")
    amount = float(request.form.get('amount'))
    budget_id = request.form.get('budget')

    # budget = Budget.query.filter_by(user_id=current_user.get_id(), id=budget_id).first()
    trans = Transaction(name=name, budget_id=budget_id, user_id=current_user.get_id(), amount=amount, date=datetime.datetime.now())
    do_transaction(trans)
    # print(buddic)
    return redirect(url_for('home.view_budget', id=budget_id))


@home.route('/budget_to_budget', methods=["POST"])
@login_required
def budget_to_budget():
    name = request.form.get("name")
    amount = float(request.form.get('amount'))
    source_budget = request.form.get('source_budget')
    dest_budget = request.form.get('dest_budget')

    trans1 = Transaction(name=name, budget_id=source_budget, user_id=current_user.get_id(), amount=-amount, date=datetime.datetime.now())
    trans2 = Transaction(name=name, budget_id=dest_budget, user_id=current_user.get_id(), amount=amount, date=datetime.datetime.now())
    do_transaction(trans1)
    do_transaction(trans2)
    return redirect(url_for('home.index'))

@home.route('/view_budget/<int:id>')
@login_required
def view_budget(id):
    budget = Budget.query.filter_by(id=id, user_id=current_user.get_id()).first()
    transactions = Transaction.query.filter_by(budget_id=budget.id, user_id=current_user.get_id()).all()
    transactions.sort(key=lambda x: x.date, reverse=True)
    return render_template('viewbudget.html', budget=budget, transactions=transactions, round=round)


@home.route('/delete_transaction/<int:b_id>/<int:t_id>')
@login_required
def delete_transaction(b_id, t_id):
    trans = Transaction.query.filter_by(id=t_id, budget_id=b_id, user_id=current_user.get_id()).first()
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
        transactions = Transaction.query.filter_by(budget_id=b_id, user_id=current_user.get_id()).all()
        for trans in transactions:
            trans.budget_id = new_budget
        db.session.commit()
    else:
        # delete transactions
        transactions = Transaction.query.filter_by(budget_id=b_id, user_id=current_user.get_id()).all()
        for trans in transactions:
            delete_transaction(b_id, trans.id)

    budg = Budget.query.filter_by(id=b_id, user_id=current_user.get_id()).first()
    db.session.delete(budg)
    db.session.commit()

    return redirect(url_for('home.index'))


def do_transaction(transaction):
    budget = Budget.query.filter_by(id=transaction.budget_id, user_id=current_user.get_id()).first()
    budget.total += transaction.amount

    db.session.add(transaction)
    db.session.commit()

    return transaction

def link_transactions(t1, t2):
    pass

def delete_transaction(b_id, t_id):
    # need to edit once transactions are linked
    trans = Transaction.query.filter_by(id=t_id, budget_id=b_id, user_id=current_user.get_id()).first()
    db.session.delete(trans)
    db.session.commit()

def update_budget(b_id):
    budget = Budget.query.filter_by(id=b_id, user_id=current_user.get_id()).first()

    transactions = Transaction.query.filter_by(user_id=current_user.get_id(), budget_id=budget.id).all()
    total = 0
    for trans in transactions:
        total += trans.amount
    budget.total = total

    db.session.commit()


def update_budgets():
    budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()

    for budget in budgets:
        transactions = Transaction.query.filter_by(user_id=current_user.get_id(), budget_id=budget.id).all()
        total = 0
        for trans in transactions:
            total += trans.amount
        budget.total = round(total, 2)

    db.session.commit()
