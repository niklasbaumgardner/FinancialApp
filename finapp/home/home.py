
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
    return render_template("index.html", budgets=budgets)


@home.route('/add_budget', methods=["GET", "POST"])
@login_required
def add_budget():
    if request.method == 'GET':
        budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()
        budgets.sort(key=lambda x: x.name)
        return render_template("addbudget.html", budgets=budgets)
    
    elif request.method == 'POST':
        name = request.form.get('name')
        amount = request.form.get('amount')

        budg = Budget(name=name, total=amount, user_id=current_user.get_id())
        db.session.add(budg)
        db.session.commit()
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
    budget = Budget.query.filter_by(user_id=current_user.get_id(), id=budget_id).first()
    trans = Transaction(name=name, budget_id=budget.id, user_id=current_user.get_id(), amount=amount, date=datetime.datetime.now())
    do_transaction(trans)
    # print(buddic)
    return redirect(url_for('home.index'))


@home.route('/budget_to_budget', methods=["POST"])
@login_required
def budget_to_budget():
    return

@home.route('/view_budget/<int:id>')
@login_required
def view_budget(id):
    budget = Budget.query.filter_by(id=id, user_id=current_user.get_id()).first()
    transactions = Transaction.query.filter_by(budget_id=budget.id, user_id=current_user.get_id()).all()
    transactions.sort(key=lambda x: x.date, reverse=True)
    return render_template('viewbudget.html', budget=budget, transactions=transactions)


def do_transaction(transaction):
    budget = Budget.query.filter_by(id=transaction.budget_id, user_id=current_user.get_id()).first()
    budget.total += transaction.amount

    db.session.add(transaction)
    db.session.commit()

    return transaction

def link_transactions(t1, t2):
    pass