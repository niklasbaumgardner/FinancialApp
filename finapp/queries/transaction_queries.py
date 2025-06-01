from flask import session
from finapp.models import Transaction, TransactionCategory
from finapp.queries import (
    budget_queries,
    category_queries,
    paycheck_queries,
    shared_budget_queries,
)
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import func, or_
from sqlalchemy import extract
from datetime import date


## Helper functions
##


def paginate_query(query, page):
    # transactions = transactions.paginate(page=page, per_page=10)
    num_pages = max(1, ((query.count() - 1) // 10) + 1)
    total = query.count()
    query = query.limit(10).offset((page - 1) * 10).all()
    return (
        query,
        total,
        page,
        num_pages,
    )


##
## Transaction queries
##


def create_transaction(
    name, amount, date, budget_id, is_transfer=False, categories=None, paycheck_id=None
):
    budget = budget_queries.get_budget(budget_id)
    if budget:
        trans = Transaction(
            name=name.strip(),
            budget_id=budget.id,
            user_id=current_user.id,
            amount=amount,
            date=date,
            is_transfer=is_transfer,
            paycheck_id=paycheck_id,
        )
        db.session.add(trans)
        db.session.commit()
        budget_queries.update_budget_total(b_id=budget.id, budget=budget)

        if categories:
            for c_id in categories:
                # If not categories exists, c_id can be a empty string
                if not c_id:
                    continue

                category_queries.add_transaction_category(
                    transaction_id=trans.id, category_id=c_id
                )


def get_transaction(budget_id, trans_id):
    transaction = Transaction.query.filter_by(
        id=trans_id, budget_id=budget_id, user_id=current_user.id
    ).first()
    return transaction


def get_first_transaction_date():
    transaction = (
        Transaction.query.filter_by(user_id=current_user.id)
        .order_by(Transaction.date.asc())
        .limit(1)
        .first()
    )
    return transaction.date


def sort_transactions(sort_by, transactionsQuery):
    if not sort_by or sort_by.get("date") == "desc":
        transactionsQuery = transactionsQuery.order_by(
            Transaction.date.desc(), Transaction.id.desc()
        )
    elif sort_by.get("date") == "asc":
        transactionsQuery = transactionsQuery.order_by(
            Transaction.date.asc(), Transaction.id.asc()
        )
    elif sort_by.get("name") == "desc":
        transactionsQuery = transactionsQuery.order_by(
            Transaction.name.desc(), Transaction.id.desc()
        )
    elif sort_by.get("name") == "asc":
        transactionsQuery = transactionsQuery.order_by(
            Transaction.name.asc(), Transaction.id.desc()
        )
    elif sort_by.get("amount") == "desc":
        transactionsQuery = transactionsQuery.order_by(
            Transaction.amount.desc(), Transaction.id.desc()
        )
    elif sort_by.get("amount") == "asc":
        transactionsQuery = transactionsQuery.order_by(
            Transaction.amount.asc(), Transaction.id.desc()
        )
    else:
        transactionsQuery = transactionsQuery.order_by(
            Transaction.date.desc(), Transaction.id.desc()
        )

    return transactionsQuery


def get_transactions(
    budget_id=None,
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

    if budget_id:
        transactions = shared_budget_queries.get_shared_transactions_query(
            budget_id=budget_id
        )

    transactions = sort_transactions(sort_by=sort_by, transactionsQuery=transactions)

    if not include_all_transfers:
        transactions = transactions.where(
            (Transaction.is_transfer == False) | (Transaction.is_transfer == None)
        )

    if include_only_positive_transfers:
        transactions = transactions.where(
            (Transaction.is_transfer == False)
            | (Transaction.is_transfer == None)
            | (Transaction.is_transfer == True) & (Transaction.amount > 0)
        )

    if start_date:
        transactions = transactions.where(Transaction.date >= start_date)

    if end_date:
        transactions = transactions.where(Transaction.date <= end_date)

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

    transactions = shared_budget_queries.get_shared_transactions_query(
        budget_id=budget_id
    ).where(
        extract("month", Transaction.date) == month,
        extract("year", Transaction.date) == year,
    )

    transactions = sort_transactions(sort_by=sort_by, transactionsQuery=transactions)

    if not include_all_transfers:
        transactions = transactions.where(
            (Transaction.is_transfer == False) | (Transaction.is_transfer == None)
        )

    if include_only_positive_transfers:
        transactions = transactions.where(
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

    transactions = shared_budget_queries.get_shared_transactions_query(
        budget_id=budget_id
    ).where(
        extract("year", Transaction.date) == year,
    )

    transactions = sort_transactions(sort_by=sort_by, transactionsQuery=transactions)

    if not include_all_transfers:
        transactions = transactions.where(
            (Transaction.is_transfer == False) | (Transaction.is_transfer == None)
        )

    if include_only_positive_transfers:
        transactions = transactions.where(
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
    b_id,
    t_id,
    new_b_id=None,
    name=None,
    amount=None,
    new_date=None,
    is_transfer=None,
    categories_added=None,
    categories_deleted=None,
):
    transaction = get_transaction(b_id, t_id)
    if transaction:
        _update_transaction(
            transaction,
            b_id,
            new_b_id,
            name,
            amount,
            new_date,
            is_transfer,
            categories_added,
            categories_deleted,
        )


def _update_transaction(
    transaction,
    b_id,
    new_b_id=None,
    name=None,
    amount=None,
    new_date=None,
    is_transfer=None,
    categories_added=None,
    categories_deleted=None,
):
    should_update_budget_total = set()
    update_paycheck = False

    if transaction:
        if new_b_id is not None:
            new_budget = budget_queries.get_budget(new_b_id)
            if new_budget:
                transaction.budget_id = new_b_id
                should_update_budget_total.add(new_b_id)
                should_update_budget_total.add(b_id)
        if name is not None:
            transaction.name = name.strip()
        if amount is not None:
            if amount != transaction.amount:
                transaction.amount = amount
                should_update_budget_total.add(b_id)
                if transaction.paycheck_id:
                    update_paycheck = True

        if new_date is not None:
            transaction.date = new_date
        if is_transfer is not None:
            transaction.is_transfer = is_transfer
        if categories_added and len(categories_added) > 0:
            for c_id in categories_added:
                category_queries.add_transaction_category(
                    transaction_id=transaction.id, category_id=c_id
                )
        if categories_deleted and len(categories_deleted) > 0:
            for c_id in categories_deleted:
                category_queries.delete_transaction_category(
                    transaction_id=transaction.id, category_id=c_id
                )

        db.session.commit()

        for id in should_update_budget_total:
            budget_queries.update_budget_total(id)

        if update_paycheck:
            paycheck_queries.update_paycheck(transaction.paycheck_id)


def updates_transactions_budget(transactions, new_budget_id):
    for t in transactions:
        t.budget_id = new_budget_id

    budget_queries.update_budget_total(new_budget_id)

    db.session.commit()


def delete_transaction(b_id, t_id):
    trans = get_transaction(b_id, t_id)
    _delete_transaction(trans, b_id)


def _delete_transaction(transaction, b_id):
    if transaction:
        # delete transaction categories
        for c in transaction.categories:
            db.session.delete(c)

        db.session.delete(transaction)
        db.session.commit()

        budget_queries.update_budget_total(b_id)


def delete_transactions(transactions):
    for t in transactions:
        db.session.delete(t)

    db.session.commit()


def transaction_category_query(category_id):
    return TransactionCategory.query.where(
        Transaction.id == TransactionCategory.transaction_id,
        category_id == TransactionCategory.category_id,
    )


def search(
    budget_id,
    name,
    categories,
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
            transactions.where(
                or_(Transaction.name.ilike(f"%{search_name}%") for search_name in name)
            )
            if transactions
            else Transaction.query.where(
                or_(Transaction.name.ilike(f"%{search_name}%") for search_name in name)
            )
        )

    if amount is not None:
        transactions = (
            transactions.where(Transaction.amount == amount)
            if transactions
            else Transaction.query.where(Transaction.amount == amount)
        )
    else:
        if min_amount is not None:
            transactions = (
                transactions.where(Transaction.amount >= min_amount)
                if transactions
                else Transaction.query.where(Transaction.amount >= min_amount)
            )
        if max_amount is not None:
            transactions = (
                transactions.where(Transaction.amount <= max_amount)
                if transactions
                else Transaction.query.where(Transaction.amount <= max_amount)
            )
    if categories:
        transactions = (
            transactions.where(
                or_(
                    transaction_category_query(category_id=c_id).exists()
                    for c_id in categories
                )
            )
            if transactions
            else Transaction.query.where(
                or_(
                    transaction_category_query(category_id=c_id).exists()
                    for c_id in categories
                )
            )
        )
    if start_date:
        transactions = (
            transactions.where(Transaction.date >= start_date)
            if transactions
            else Transaction.query.where(Transaction.date >= start_date)
        )
    if end_date:
        transactions = (
            transactions.where(Transaction.date <= end_date)
            if transactions
            else Transaction.query.where(Transaction.date <= end_date)
        )

    if transactions:
        if ytd:
            transactions = transactions.where(
                extract("year", Transaction.date) == year,
            )
        elif month:
            transactions = transactions.where(
                extract("month", Transaction.date) == month,
                extract("year", Transaction.date) == year,
            )

        transactions = shared_budget_queries.get_shared_transactions_query(
            budget_id=budget_id, transactionsQuery=transactions
        )

        search_sum = (
            transactions.order_by(None)  # Remove order by for sum
            .with_entities(func.sum(Transaction.amount))
            .first()[0]
        )

        transactions = sort_transactions(
            sort_by=sort_by, transactionsQuery=transactions
        )

        items, total, page, num_pages = paginate_query(query=transactions, page=page)

        if total > 0:
            return (
                items,
                total,
                page,
                num_pages,
                search_sum,
            )

    # I want to return the number of pages as 1
    return ([], 0, 1, 1, 0)


def get_transactions_sum(budget_id):
    total = (
        Transaction.query.filter_by(budget_id=budget_id)
        .with_entities(func.sum(Transaction.amount))
        .scalar()
    )

    if total is None:
        total = 0
    return total


def get_transactions_for_paycheck_id(paycheck_id, query=False):
    transactions = Transaction.query.filter_by(
        user_id=current_user.id, paycheck_id=paycheck_id
    )

    if query:
        return transactions

    return transactions.all()


def get_transactions_by_category(start_date, interval=False):
    if interval == "weekly":
        interval_extract = func.extract("week", Transaction.date)
        interval_trunc = func.date_trunc("week", Transaction.date)
    else:
        interval_extract = func.extract("month", Transaction.date)
        interval_trunc = func.date_trunc("month", Transaction.date)

    transactions = (
        Transaction.query.join(
            TransactionCategory, Transaction.id == TransactionCategory.transaction_id
        )
        .filter_by(user_id=current_user.id)
        .where(Transaction.date >= start_date)
        .with_entities(
            func.sum(Transaction.amount),
            TransactionCategory.category_id,
            interval_extract,
            interval_trunc,
        )
        .group_by(TransactionCategory.category_id, interval_extract, interval_trunc)
        .order_by(interval_trunc)
        .all()
    )

    return transactions


def __get_net_spending__(condition, year=None, month=None):
    query = (
        Transaction.query.filter_by(user_id=current_user.id)
        .where((Transaction.is_transfer == False) | (Transaction.is_transfer == None))
        .with_entities(
            func.sum(Transaction.amount),
            Transaction.budget_id,
        )
        .group_by(Transaction.budget_id)
    )

    if year:
        query = query.where(extract("year", Transaction.date) == year)
    if month:
        query = query.where(extract("month", Transaction.date) == month)

    query = query.where(condition)

    return query.all()


def get_total_spent(year, month):
    condition = Transaction.amount < 0
    return __get_net_spending__(condition=condition, year=year, month=month)


def get_total_income(year, month):
    condition = Transaction.amount > 0
    return __get_net_spending__(condition=condition, year=year, month=month)
