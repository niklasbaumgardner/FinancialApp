
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
    return render_template("index.html", budgets=budgets)


@home.route('/add_budget', methods=["GET", "POST"])
@login_required
def add_budget():
    if request.method == 'GET':
        budgets = Budget.query.filter_by(user_id=current_user.get_id()).all()
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
        return render_template("addtransaction.html", budgets=budgets)
    
    elif request.method == 'POST':
        return


@home.route('/paycheck', methods=["POST"])
@login_required
def paycheck():
    return


@home.route('/budget_transaction', methods=["POST"])
@login_required
def budget_transaction():
    return


@home.route('/budget_to_budget', methods=["POST"])
@login_required
def budget_to_budget():
    return