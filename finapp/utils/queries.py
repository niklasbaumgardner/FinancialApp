from finapp.models import (
    Budget,
    SharedBudget,
    Transaction,
    PaycheckPrefill,
    Theme,
    User,
)
from sqlalchemy import extract
from sqlalchemy.sql import func, or_, and_
from flask_login import current_user
from datetime import date
from finapp import bcrypt, db

## Helper functions
##


def paginate_query(query, page):
    # transactions = transactions.paginate(page=page, per_page=10)
    num_pages = (query.count() // 10) + 1
    query = query.limit(10).offset((page - 1) * 10).all()
    return (
        query,
        len(query),
        page,
        num_pages,
    )


##
## Budget queries
##


def create_budget(name):
    budg = Budget(
        name=name,
        total=0,
        user_id=current_user.get_id(),
        is_active=True,
        is_shared=False,
    )
    db.session.add(budg)
    db.session.commit()
    return budg


def get_budget_for_id(id):
    # do not call this method unless absolutely needed
    return Budget.query.filter_by(id=id).first()


def get_budget(id):
    try:
        id = int(id)
        return Budget.query.where(
            and_(
                Budget.id == id,
                or_(
                    Budget.user_id == current_user.get_id(),
                    get_shared_budgets_query().exists(),
                ),
            )
        ).first()

    except:
        return None


def get_budgets(separate=False, active_only=False, inactive_only=False):
    shared_budget_query = get_shared_budgets_query()
    budgets = Budget.query.where(
        or_(Budget.user_id == current_user.id, shared_budget_query.exists())
    )

    if active_only:
        active = budgets.filter_by(is_active=True).all()
        active.sort(key=lambda x: x.name.lower())
        return active

    elif inactive_only:
        inactive = budgets.filter_by(is_active=False).all()
        inactive.sort(key=lambda x: x.name.lower())
        return inactive

    elif separate:
        active = budgets.filter_by(is_active=True).all()
        inactive = budgets.filter_by(is_active=False).all()
        active.sort(key=lambda x: x.name.lower())
        inactive.sort(key=lambda x: x.name.lower())
        return active, inactive

    else:
        budgets = budgets.all()
        budgets.sort(key=lambda x: x.name.lower())
        return budgets


def get_duplicate_budget_by_name(name):
    return Budget.query.filter_by(name=name, user_id=current_user.get_id()).first()


def update_budget(id, name=None, is_active=None):
    budget = get_budget(id)
    if budget:
        if name is not None:
            budget.name = name
        if is_active is not None:
            budget.is_active = is_active
        db.session.commit()


def update_budget_total(b_id):
    budget = get_budget(b_id)

    if budget:
        transactions = get_transactions(budget.id)
        total = 0
        for trans in transactions:
            total += trans.amount
        budget.total = total

        db.session.commit()


def add_transaction_to_total(budget, transaction):
    if budget:
        budget.total += transaction.amount
        db.session.commit()


def delete_budget(id):
    budget = get_budget(id)
    _delete_budget(budget)


def _delete_budget(budget):
    if budget:
        db.session.delete(budget)
        db.session.commit()


##
## SharedBudget queries
##


def create_shared_budget(budget):
    maybe = get_shared_budget(budget_id=budget.id)
    if maybe:
        return maybe

    shared_budget = SharedBudget(user_id=current_user.id, budget_id=budget.id)
    db.session.add(shared_budget)
    budget.is_shared = True
    db.session.commit()
    return shared_budget


def get_shared_budget(budget_id):
    return SharedBudget.query.filter_by(
        user_id=current_user.id, budget_id=budget_id
    ).first()


def get_shared_budget_for_user_id(budget_id, user_id):
    return SharedBudget.query.filter_by(user_id=user_id, budget_id=budget_id).first()


def get_shared_budgets_query():
    return SharedBudget.query.filter_by(user_id=current_user.id, budget_id=Budget.id)


##
## Transaction queries
##


def create_transaction(name, amount, date, budget_id, is_transfer=False):
    budget = get_budget(budget_id)
    if budget:
        trans = Transaction(
            name=name,
            budget_id=budget.id,
            user_id=current_user.get_id(),
            amount=amount,
            date=date,
            is_transfer=is_transfer,
        )
        db.session.add(trans)
        db.session.commit()
        add_transaction_to_total(budget, trans)


def get_transaction(budget_id, trans_id):
    transaction = Transaction.query.filter_by(
        id=trans_id, budget_id=budget_id, user_id=current_user.get_id()
    ).first()
    return transaction


def get_first_transaction_date():
    transaction = (
        Transaction.query.filter_by(user_id=current_user.get_id())
        .order_by(Transaction.date.asc())
        .limit(1)
        .first()
    )
    return transaction.date


def sort_transactions(sort_by, transactions):
    if not sort_by or sort_by.get("date") == "desc":
        transactions = transactions.order_by(
            Transaction.date.desc(), Transaction.id.desc()
        )
    elif sort_by.get("date") == "asc":
        transactions = transactions.order_by(
            Transaction.date.asc(), Transaction.id.asc()
        )
    elif sort_by.get("name") == "desc":
        transactions = transactions.order_by(
            Transaction.name.desc(), Transaction.id.desc()
        )
    elif sort_by.get("name") == "asc":
        transactions = transactions.order_by(
            Transaction.name.asc(), Transaction.id.desc()
        )
    elif sort_by.get("amount") == "desc":
        transactions = transactions.order_by(
            Transaction.amount.desc(), Transaction.id.desc()
        )
    elif sort_by.get("amount") == "asc":
        transactions = transactions.order_by(
            Transaction.amount.asc(), Transaction.id.desc()
        )
    else:
        transactions = transactions.order_by(
            Transaction.date.desc(), Transaction.id.desc()
        )

    return transactions


def get_transactions(
    budget_id,
    start_date=None,
    end_date=None,
    include_all_transfers=True,
    include_only_positive_transfers=False,
    page=1,
    sort_by=None,
    paginate=False,
    query=False,
    transactions=None,
):
    if not transactions:
        transactions = Transaction.query

    transactions = transactions.filter(Transaction.budget_id == budget_id)

    transactions = sort_transactions(sort_by=sort_by, transactions=transactions)

    if not include_all_transfers:
        transactions = transactions.filter(
            (Transaction.is_transfer == False) | (Transaction.is_transfer == None)
        )

    if include_only_positive_transfers:
        transactions = transactions.filter(
            (Transaction.is_transfer == False)
            | (Transaction.is_transfer == None)
            | (Transaction.is_transfer == True) & (Transaction.amount > 0)
        )

    if start_date:
        transactions = transactions.filter(Transaction.date >= start_date)

    if end_date:
        transactions = transactions.filter(Transaction.date <= end_date)

    if paginate:
        return paginate_query(query=transactions, page=page)
    elif query:
        return transactions
    else:
        return transactions.all()


def get_transactions_for_month(
    budget_id,
    month,
    year=None,
    include_all_transfers=True,
    include_only_positive_transfers=False,
    page=1,
    sort_by=None,
    paginate=False,
    query=False,
    transactions=None,
):
    if not year:
        year = date.today().year

    if not transactions:
        transactions = Transaction.query

    transactions = transactions.filter(
        Transaction.budget_id == budget_id,
        extract("month", Transaction.date) == month,
        extract("year", Transaction.date) == year,
    )

    transactions = sort_transactions(sort_by=sort_by, transactions=transactions)

    if not include_all_transfers:
        transactions = transactions.filter(
            (Transaction.is_transfer == False) | (Transaction.is_transfer == None)
        )

    if include_only_positive_transfers:
        transactions = transactions.filter(
            (Transaction.is_transfer == False)
            | (Transaction.is_transfer == None)
            | (Transaction.is_transfer == True) & (Transaction.amount > 0)
        )

    if paginate:
        return paginate_query(query=transactions, page=page)
    elif query:
        return transactions
    else:
        return transactions.all()


def get_transactions_for_year(
    budget_id,
    year,
    include_all_transfers=True,
    include_only_positive_transfers=False,
    page=1,
    sort_by=None,
    paginate=False,
    query=False,
    transactions=None,
):
    if not transactions:
        transactions = Transaction.query

    transactions = transactions.filter(
        Transaction.budget_id == budget_id,
        extract("year", Transaction.date) == year,
    )

    transactions = sort_transactions(sort_by=sort_by, transactions=transactions)

    if not include_all_transfers:
        transactions = transactions.filter(
            (Transaction.is_transfer == False) | (Transaction.is_transfer == None)
        )

    if include_only_positive_transfers:
        transactions = transactions.filter(
            (Transaction.is_transfer == False)
            | (Transaction.is_transfer == None)
            | (Transaction.is_transfer == True) & (Transaction.amount > 0)
        )

    if paginate:
        return paginate_query(query=transactions, page=page)
    elif query:
        return transactions
    else:
        return transactions.all()


def update_transaction(
    b_id, t_id, new_b_id=None, name=None, amount=None, new_date=None, is_transfer=None
):
    transaction = get_transaction(b_id, t_id)
    if transaction:
        _update_transaction(
            transaction, b_id, new_b_id, name, amount, new_date, is_transfer
        )


def _update_transaction(
    transaction,
    b_id,
    new_b_id=None,
    name=None,
    amount=None,
    new_date=None,
    is_transfer=None,
):
    should_update_budget_total = set()

    if transaction:
        if new_b_id is not None:
            new_budget = get_budget(new_b_id)
            if new_budget:
                transaction.budget_id = new_b_id
                should_update_budget_total.add(new_b_id)
                should_update_budget_total.add(b_id)
        if name is not None:
            transaction.name = name
        if amount is not None:
            if amount != transaction.amount:
                transaction.amount = amount
                should_update_budget_total.add(b_id)
        if new_date is not None:
            transaction.date = new_date
        if is_transfer is not None:
            transaction.is_transfer = is_transfer

        db.session.commit()

        for id in should_update_budget_total:
            update_budget_total(id)


def delete_transaction(b_id, t_id):
    trans = get_transaction(b_id, t_id)
    _delete_transaction(trans, b_id)


def _delete_transaction(transaction, b_id):
    if transaction:
        db.session.delete(transaction)
        db.session.commit()

        update_budget_total(b_id)


def search(
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
    transactions = None

    if name:
        transactions = (
            transactions.filter(
                or_(Transaction.name.ilike(f"%{search_name}%") for search_name in name)
            )
            if transactions
            else Transaction.query.filter(
                or_(Transaction.name.ilike(f"%{search_name}%") for search_name in name)
            )
        )
    if amount is not None:
        transactions = (
            transactions.filter(Transaction.amount == amount)
            if transactions
            else Transaction.query.filter(Transaction.amount == amount)
        )
    else:
        if min_amount is not None:
            transactions = (
                transactions.filter(Transaction.amount >= min_amount)
                if transactions
                else Transaction.query.filter(Transaction.amount >= min_amount)
            )
        if max_amount is not None:
            transactions = (
                transactions.filter(Transaction.amount <= max_amount)
                if transactions
                else Transaction.query.filter(Transaction.amount <= max_amount)
            )
    if start_date:
        transactions = (
            transactions.filter(Transaction.date >= start_date)
            if transactions
            else Transaction.query.filter(Transaction.date >= start_date)
        )
    if end_date:
        transactions = (
            transactions.filter(Transaction.date <= end_date)
            if transactions
            else Transaction.query.filter(Transaction.date <= end_date)
        )

    if transactions:
        if ytd:
            transactions = get_transactions_for_year(
                budget_id=budget_id,
                year=year,
                page=page,
                query=True,
                transactions=transactions,
                sort_by=sort_by,
            )
        elif month:
            transactions = get_transactions_for_month(
                budget_id=budget_id,
                month=month,
                year=year,
                page=page,
                query=True,
                transactions=transactions,
                sort_by=sort_by,
            )

        transactions = transactions.filter_by(user_id=current_user.get_id()).filter_by(
            budget_id=budget_id
        )

        search_sum = transactions.with_entities(func.sum(Transaction.amount)).first()[0]

        transactions = sort_transactions(sort_by=sort_by, transactions=transactions)

        items, total, page, num_pages = paginate_query(query=transactions, page=page)

        if total == 0:
            # I want to return the number of pages as 1
            return ([], 0, 1, 1, 0)

        return (
            items,
            total,
            page,
            num_pages,
            search_sum,
        )
    else:
        return ([], 0, 1, 1, 0)


##
## Prefill queries
##


def create_or_update_prefill(b_id, total_amount, amount):
    prefill = PaycheckPrefill(
        budget_id=b_id,
        user_id=current_user.get_id(),
        total_amount=total_amount,
        amount=amount,
    )

    db_prefill = get_prefill_by_total_amount_and_budget(
        prefill.total_amount, prefill.budget_id
    )

    if db_prefill:
        db_prefill.amount = prefill.amount
    else:
        db.session.add(prefill)
    db.session.commit()


def get_prefill(prefill_id):
    prefill = PaycheckPrefill.query.filter_by(
        id=prefill_id, user_id=current_user.get_id()
    ).first()
    return prefill


def get_prefills():
    prefills = PaycheckPrefill.query.filter_by(user_id=current_user.get_id()).all()
    return prefills


def get_prefills_by_budget(budget_id):
    prefills = PaycheckPrefill.query.filter_by(
        budget_id=budget_id, user_id=current_user.get_id()
    ).all()
    return prefills


def get_prefills_by_total_amount(total_amount):
    prefill = PaycheckPrefill.query.filter_by(
        user_id=current_user.get_id(), total_amount=total_amount
    ).all()
    return prefill


def get_prefill_by_total_amount_and_budget(total_amount, budget_id):
    prefill = PaycheckPrefill.query.filter_by(
        user_id=current_user.get_id(), total_amount=total_amount, budget_id=budget_id
    ).first()
    return prefill


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


def delete_prefill(p_id):
    pre = get_prefill(p_id)
    _delete_prefill(pre)


def _delete_prefill(prefill):
    if prefill:
        db.session.delete(prefill)
        db.session.commit()


##
## Theme queries
##


def get_theme():
    return Theme.query.filter_by(user_id=current_user.id).first()


def set_theme(theme_color=None, background_color=None, color=None):
    if not current_user.is_authenticated:
        return

    theme = get_theme()

    if theme:
        if theme_color is not None:
            theme.theme = theme_color
        if background_color is not None:
            theme.backgroundColor = background_color
        if color is not None:
            theme.color = color
        db.session.commit()
    else:
        theme = Theme(
            user_id=current_user.id,
            theme=theme_color or "",
            backgroundColor=background_color or "",
            color=color or "",
        )
        db.session.add(theme)
        db.session.commit()

    return theme


##
## User queries
##


def createUser(email, username, password):
    hash_ = hashPassword(password=password)
    new_user = User(email=email, username=username, password=hash_)
    db.session.add(new_user)
    db.session.commit()


def getUserById(id):
    return User.query.filter_by(id=id).first()


def getUserByEmail(email):
    return User.query.filter_by(email=email).first()


def updateUser(id, username, email):
    user = getUserById(id=id)

    username = username if is_username_unique(username=username) else None
    email = email if is_email_unique(email=email) else None

    if username:
        user.username = username

    if email:
        user.email = email

    db.session.commit()


def updateUserPasswod(id, password):
    if not password or not id:
        return

    user = getUserById(id=id)
    hash_ = hashPassword(password=password)
    user.password = hash_

    db.session.commit()


def hashPassword(password):
    return bcrypt.generate_password_hash(password=password).decode("utf-8")


def is_email_unique(email):
    return not User.query.filter_by(email=email).first()


def is_username_unique(username):
    return not User.query.filter_by(username=username).first()


def get_shared_users_for_budget_id(budget_id):
    shared_budget_query = SharedBudget.query.filter_by(
        budget_id=budget_id, user_id=User.id
    )
    budget_owner_query = Budget.query.filter_by(id=budget_id, user_id=User.id)

    return User.query.where(
        and_(
            current_user.id != User.id,
            or_(shared_budget_query.exists(), budget_owner_query.exists()),
        )
    ).all()


def get_shared_users_for_all_budgets():
    shared_budget_query = SharedBudget.query.filter_by(
        budget_id=Budget.id, user_id=User.id
    )
    budget_shared_query = Budget.query.where(
        or_(
            and_(Budget.is_shared == True, Budget.user_id == User.id),
            shared_budget_query.exists(),
        )
    )

    return User.query.where(
        and_(current_user.id != User.id, budget_shared_query.exists())
    ).all()
