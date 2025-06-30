from finapp.models import Budget, SharedBudget, Transaction, TransactionCategory
from finapp.queries import (
    budget_queries,
    category_queries,
    paycheck_queries,
    shared_budget_queries,
)
from finapp import db
from flask_login import current_user
from sqlalchemy.sql import func, or_, and_
from sqlalchemy.orm import joinedload, noload
from sqlalchemy import delete, extract, insert, update, select


## Helper functions
##


def paginate_query(stmt, page):
    # transactions = transactions.paginate(page=page, per_page=10)
    total = db.session.execute(
        select(func.count()).select_from(stmt.subquery())
    ).scalar_one()
    num_pages = max(1, ((total - 1) // 10) + 1)
    stmt = stmt.limit(10).offset((page - 1) * 10)
    transactions = db.session.scalars(stmt).unique().all()
    return (
        transactions,
        total,
        page,
        num_pages,
    )


##
## Transaction queries
##


def get_transaction_query(transaction_id, include_budget=False):
    transactions_query = (
        select(Transaction)
        .join(Budget, Budget.id == Transaction.budget_id)
        .join(
            SharedBudget, SharedBudget.budget_id == Transaction.budget_id, isouter=True
        )
        .where(
            and_(
                Transaction.id == transaction_id,
                or_(
                    Transaction.user_id == current_user.id,
                    Budget.user_id == current_user.id,
                    SharedBudget.user_id == current_user.id,
                ),
            )
        )
    )

    if not include_budget:
        transactions_query = transactions_query.options(noload(Transaction.budget))

    return transactions_query


def get_transactions_query(include_budget=False):
    transactions_query = (
        select(Transaction)
        .join(Budget, Budget.id == Transaction.budget_id)
        .join(
            SharedBudget, SharedBudget.budget_id == Transaction.budget_id, isouter=True
        )
        .where(
            or_(
                Transaction.user_id == current_user.id,
                Budget.user_id == current_user.id,
                SharedBudget.user_id == current_user.id,
            ),
        )
    )

    if not include_budget:
        transactions_query = transactions_query.options(noload(Transaction.budget))

    return transactions_query


def get_transactions_for_budget_query(budget_id):
    return get_transactions_query().where(Transaction.budget_id == budget_id)


def create_transaction(
    user_id,
    name,
    amount,
    date,
    budget_id,
    is_transfer=False,
    categories=None,
    paycheck_id=None,
):
    if budget_queries.can_modify_budget(budget_id=budget_id):
        # transaction = Transaction(
        #     name=name.strip(),
        #     budget_id=budget_id,
        #     user_id=user_id,
        #     amount=amount,
        #     date=date,
        #     is_transfer=is_transfer,
        #     paycheck_id=paycheck_id,
        # )
        stmt = insert(Transaction).values(
            name=name.strip(),
            budget_id=budget_id,
            user_id=user_id,
            amount=amount,
            date=date,
            is_transfer=is_transfer,
            paycheck_id=paycheck_id,
        )
        result = db.session.execute(stmt)
        db.session.flush()

        transaction_id = result.inserted_primary_key[0]

        if categories:
            category_queries.bulk_add_transaction_categories(
                user_id=user_id,
                transaction_id=transaction_id,
                category_ids=categories,
                commit=False,
            )

        budget_queries.update_budget_total(budget_id=budget_id, commit=False)
        db.session.commit()


def get_transaction(transaction_id):
    return db.session.scalats(
        get_transaction_query(transaction_id=transaction_id).limit(1)
    ).first()


def get_first_transaction_date():
    transaction = db.session.scalats(
        get_transactions_query().order_by(Transaction.date.asc()).limit(1)
    ).first()

    return transaction.date


def can_modify_transaction(transaction_id):
    stmt = (
        select(func.count())
        .select_from(Transaction)
        .join(Budget, Budget.id == Transaction.budget_id)
        .join(
            SharedBudget, SharedBudget.budget_id == Transaction.budget_id, isouter=True
        )
        .where(
            and_(
                Transaction.id == transaction_id,
                or_(
                    Transaction.user_id == current_user.id,
                    Budget.user_id == current_user.id,
                    SharedBudget.user_id == current_user.id,
                ),
            )
        )
    )

    transaction = db.session.execute(stmt).scalar_one()

    return transaction > 0


def sort_transactions(sort_by, transactions_query):
    if not sort_by or sort_by.get("date") == "desc":
        transactions_query = transactions_query.order_by(
            Transaction.date.desc(), Transaction.id.desc()
        )
    elif sort_by.get("date") == "asc":
        transactions_query = transactions_query.order_by(
            Transaction.date.asc(), Transaction.id.asc()
        )
    elif sort_by.get("name") == "desc":
        transactions_query = transactions_query.order_by(
            Transaction.name.desc(), Transaction.id.desc()
        )
    elif sort_by.get("name") == "asc":
        transactions_query = transactions_query.order_by(
            Transaction.name.asc(), Transaction.id.desc()
        )
    elif sort_by.get("amount") == "desc":
        transactions_query = transactions_query.order_by(
            Transaction.amount.desc(), Transaction.id.desc()
        )
    elif sort_by.get("amount") == "asc":
        transactions_query = transactions_query.order_by(
            Transaction.amount.asc(), Transaction.id.desc()
        )
    else:
        transactions_query = transactions_query.order_by(
            Transaction.date.desc(), Transaction.id.desc()
        )

    return transactions_query


def get_recent_transactions(limit=None):
    query = get_transactions_query(include_budget=True).order_by(
        Transaction.date.desc(), Transaction.id.desc()
    )

    if limit and limit > 0:
        query = query.limit(limit)

    return db.session.scalars(query).unique().all()


def get_transactions(
    budget_id,
    start_date=None,
    end_date=None,
    include_transfers=True,
    page=1,
    sort_by=None,
    paginate=False,
    query=False,
):
    stmt = get_transactions_for_budget_query(budget_id=budget_id)

    stmt = sort_transactions(sort_by=sort_by, transactions_query=stmt)

    if not include_transfers:
        stmt = stmt.where(
            or_((not Transaction.is_transfer), (Transaction.is_transfer.is_(None)))
        )

    if start_date:
        stmt = stmt.where(Transaction.date >= start_date)

    if end_date:
        stmt = stmt.where(Transaction.date <= end_date)

    if paginate:
        return paginate_query(stmt=stmt, page=page)
    elif query:
        return stmt
    else:
        return db.session.scalars(stmt).all()


def get_transactions_for_month(
    budget_id,
    month,
    year,
    include_transfers=True,
    page=1,
    sort_by=None,
    paginate=False,
    query=False,
):
    stmt = get_transactions(
        budget_id=budget_id,
        include_transfers=include_transfers,
        page=page,
        sort_by=sort_by,
        query=True,
    )

    stmt = stmt.where(
        and_(
            extract("month", Transaction.date) == month,
            extract("year", Transaction.date) == year,
        )
    )

    if paginate:
        return paginate_query(stmt=stmt, page=page)
    elif query:
        return stmt
    else:
        return db.session.scalars(stmt).all()


def get_transactions_for_year(
    budget_id,
    year,
    include_transfers=True,
    page=1,
    sort_by=None,
    paginate=False,
    query=False,
    transactions=None,
):
    stmt = get_transactions(
        budget_id=budget_id,
        include_transfers=include_transfers,
        page=page,
        sort_by=sort_by,
        query=True,
    )

    stmt = stmt.where(
        extract("year", Transaction.date) == year,
    )

    if paginate:
        return paginate_query(stmt=stmt, page=page)
    elif query:
        return stmt
    else:
        return db.session.scalars(stmt).all()


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
    transaction = get_transaction(transaction_id=t_id)
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
            new_budget = budget_queries.get_budget(budget_id=new_b_id)
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
            category_queries.bulk_add_transaction_categories(
                user_id=transaction.user_id,
                transaction_id=transaction.id,
                category_ids=categories_added,
                commit=False,
            )

        if categories_deleted and len(categories_deleted) > 0:
            category_queries.bulk_delete_transaction_categories(
                transaction_id=transaction.id,
                category_ids=categories_deleted,
                commit=False,
            )

        for id in should_update_budget_total:
            budget_queries.update_budget_total(budget_id=id, commit=False)

        if update_paycheck:
            paycheck_queries.update_paycheck(transaction.paycheck_id, commit=False)

        db.session.commit()


def bulk_update_transactions_budget(old_budget_id, new_budget_id):
    if budget_queries.can_modify_budget(
        budget_id=old_budget_id
    ) and budget_queries.can_modify_budget(budget_id=new_budget_id):
        stmt = (
            update(Transaction)
            .where(Transaction.budget_id == old_budget_id)
            .values(budget_id=new_budget_id)
        )
        db.session.execute(stmt)
        db.session.commit()


def delete_transaction(transaction_id, budget_id):
    if can_modify_transaction(transaction_id=transaction_id):
        stmt = delete(Transaction).where(Transaction.id == transaction_id)
        db.session.execute(stmt)
        db.session.flush()

        budget_queries.update_budget_total(budget_id=budget_id, commit=False)
        db.session.commit()


def bulk_delete_transactions_for_budget(budget_id):
    if budget_queries.can_modify_budget(budget_id=budget_id):
        stmt = delete(Transaction).where(Transaction.budget_id == budget_id)
        db.session.execute(stmt)
        db.session.commit()


def transaction_category_query(category_id):
    return select(TransactionCategory).where(
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
    stmt = None

    # TODO: Refactor this. Ternary is used because we don't want to query the entire db if no filters are applied.
    if name:
        stmt = (
            stmt.where(
                or_(Transaction.name.ilike(f"%{search_name}%") for search_name in name)
            )
            if stmt
            else select(Transaction).where(
                or_(Transaction.name.ilike(f"%{search_name}%") for search_name in name)
            )
        )

    if amount is not None:
        stmt = (
            stmt.where(Transaction.amount == amount)
            if stmt
            else select(Transaction).where(Transaction.amount == amount)
        )
    else:
        if min_amount is not None:
            stmt = (
                stmt.where(Transaction.amount >= min_amount)
                if stmt
                else select(Transaction).where(Transaction.amount >= min_amount)
            )
        if max_amount is not None:
            stmt = (
                stmt.where(Transaction.amount <= max_amount)
                if stmt
                else select(Transaction).where(Transaction.amount <= max_amount)
            )
    if categories:
        stmt = (
            stmt.where(Transaction.category_id.in_(categories))
            if stmt
            else select(Transaction).where(Transaction.category_id.in_(categories))
        )
    if start_date:
        stmt = (
            stmt.where(Transaction.date >= start_date)
            if stmt
            else select(Transaction).where(Transaction.date >= start_date)
        )
    if end_date:
        stmt = (
            stmt.where(Transaction.date <= end_date)
            if stmt
            else select(Transaction).where(Transaction.date <= end_date)
        )

    if stmt is not None:
        if ytd:
            stmt = stmt.where(
                extract("year", Transaction.date) == year,
            )
        elif month:
            stmt = stmt.where(
                extract("month", Transaction.date) == month,
                extract("year", Transaction.date) == year,
            )

        stmt = shared_budget_queries.get_shared_transactions_query(
            budget_id=budget_id, transactions_query=stmt
        )

        search_sum = (
            stmt.order_by(None)  # Remove order by for sum
            .with_entities(func.sum(Transaction.amount))
            .first()[0]
        )

        stmt = sort_transactions(sort_by=sort_by, transactions_query=stmt)

        items, total, page, num_pages = paginate_query(stmt=stmt, page=page)

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
    stmt = select(
        func.sum(Transaction.amount)
        .join(Budget, Budget.id == Transaction.budget_id)
        .join(
            SharedBudget, SharedBudget.budget_id == Transaction.budget_id, isouter=True
        )
        .where(Transaction.budget_id == budget_id)
        .where(
            or_(
                Transaction.user_id == current_user.id,
                Budget.user_id == current_user.id,
                SharedBudget.user_id == current_user.id,
            ),
        )
    )
    total = db.session.execute(stmt).scalar_one()

    if total is None:
        total = 0
    return total


def get_transactions_for_paycheck_id(paycheck_id, query=False):
    stmt = get_transactions_query().where(Transaction.paycheck_id == paycheck_id)

    if query:
        return stmt

    return db.session.scalars(stmt).all()


def get_transactions_by_category(start_date, interval=None):
    if interval == "weekly":
        interval_extract = func.extract("week", Transaction.date)
        interval_trunc = func.date_trunc("week", Transaction.date)
    else:
        interval_extract = func.extract("month", Transaction.date)
        interval_trunc = func.date_trunc("month", Transaction.date)

    stmt = (
        get_transactions_query()
        .join(TransactionCategory, Transaction.id == TransactionCategory.transaction_id)
        .where(Transaction.date >= start_date)
        .with_entities(
            func.sum(Transaction.amount),
            TransactionCategory.category_id,
            interval_extract,
            interval_trunc,
        )
        .group_by(TransactionCategory.category_id, interval_extract, interval_trunc)
        .order_by(interval_trunc)
    )

    transactions = db.session.scalars(stmt).all()

    return transactions


def __get_net_spending__(condition, year=None, month=None):
    stmt = (
        get_transactions_query()
        .where(or_((not Transaction.is_transfer), (Transaction.is_transfer.is_(None))))
        .with_entities(
            func.sum(Transaction.amount),
            Transaction.budget_id,
        )
        .group_by(Transaction.budget_id)
    )

    if year:
        stmt = stmt.where(extract("year", Transaction.date) == year)
    if month:
        stmt = stmt.where(extract("month", Transaction.date) == month)

    stmt = stmt.where(condition)

    transactions = db.session.scalars(stmt).all()

    return transactions


def get_total_spent(year, month):
    condition = Transaction.amount < 0
    return __get_net_spending__(condition=condition, year=year, month=month)


def get_total_income(year, month):
    condition = Transaction.amount > 0
    return __get_net_spending__(condition=condition, year=year, month=month)


def get_paycheck_transactions():
    stmt = get_transactions_query().where(Transaction.paycheck_id.isnot(None))
    return db.session.scalars(stmt).all()
