from finapp.queries import (
    budget_queries,
    transaction_queries,
)
from flask import Blueprint, redirect, url_for, request
from flask_login import login_required, current_user
from finapp.utils import helpers
from finapp.utils.Sqids import sqids


transaction_bp = Blueprint("transaction_bp", __name__)


@transaction_bp.post("/add_transaction/<int:budget_id>")
@transaction_bp.post("/add_transaction/<string:budget_sqid>")
@login_required
def add_transaction(budget_id=None, budget_sqid=None):
    if budget_sqid:
        budget_id = sqids.decode_one(budget_sqid)

    user_id = request.form.get("user", type=int, default=current_user.id)
    name = request.form.get("name")
    amount = request.form.get("amount", type=float, default=0.0)
    str_date = request.form.get("date")
    date = helpers.get_date_from_string(str_date)
    return_transactions = request.form.get("return-transactions")
    return_transactions = return_transactions and return_transactions == "True"

    return_transaction = request.form.get("return-transaction")
    return_transaction = return_transaction and return_transaction == "True"

    categories = request.form.getlist("categories")

    transaction_id = transaction_queries.create_transaction(
        user_id=user_id,
        name=name,
        amount=amount,
        date=date,
        budget_id=budget_id,
        categories=categories,
    )

    if return_transaction:
        transaction = transaction_queries.get_transaction(
            transaction_id=transaction_id, include_budget=True
        )
        return dict(transaction=transaction.to_dict())

    if return_transactions:
        transactions, _ = transaction_queries.get_recent_transactions()
        budgets = [budget_queries.get_budget(budget_id=budget_id).to_dict()]
        return dict(
            transactions=[t.to_dict() for t in transactions],
            budgets=budgets,
        )

    return redirect(url_for("viewbudget_bp.view_budget", id=budget_id))


@transaction_bp.post("/edit_transaction/<int:b_id>/<int:t_id>")
@transaction_bp.post("/edit_transaction/<string:b_sqid>/<string:t_sqid>")
@transaction_bp.post("/edit_transaction/<string:sqid_ids>")
@login_required
def edit_transaction(b_id=None, t_id=None, b_sqid=None, t_sqid=None, sqid_ids=None):
    if sqid_ids:
        b_id, t_id = sqids.decode(sqid_ids)
    elif b_sqid and t_sqid:
        b_id = sqids.decode_one(b_sqid)
        t_id - sqids.decode_one(t_sqid)

    name = request.form.get("name")
    amount = request.form.get("amount", type=float)
    new_budget_id = request.form.get("budget", type=int)
    user_id = request.form.get("user", type=int, default=current_user.id)
    date = request.form.get("date")
    page = request.form.get("page")
    page = page if page else 1
    return_transactions = request.form.get("return-transactions")
    return_transactions = return_transactions and return_transactions == "True"

    return_transaction = request.form.get("return-transaction")
    return_transaction = return_transaction and return_transaction == "True"

    categories_added = request.form.getlist("categoriesAdded")
    categories_deleted = request.form.getlist("categoriesDeleted")

    date = helpers.get_date_from_string(date)

    transaction_queries.update_transaction(
        budget_id=b_id,
        transaction_id=t_id,
        new_budget_id=new_budget_id,
        user_id=user_id,
        name=name,
        amount=amount,
        date=date,
        categories_added=categories_added,
        categories_deleted=categories_deleted,
    )

    if return_transaction:
        transaction = transaction_queries.get_transaction(
            transaction_id=t_id, include_budget=True
        )
        return dict(transaction=transaction.to_dict())

    if return_transactions:
        transactions, _ = transaction_queries.get_recent_transactions()
        budgets = [budget_queries.get_budget(budget_id=b_id).to_dict()]

        return dict(transactions=[t.to_dict() for t in transactions], budgets=budgets)

    return {
        "success": True,
        "transaction": transaction_queries.get_transaction(
            transaction_id=t_id
        ).to_dict(),
    }


@transaction_bp.post("/move_transaction/<int:sb_id>/<int:t_id>")
@transaction_bp.post("/move_transaction/<string:sb_sqid>/<string:t_sqid>")
@transaction_bp.post("/move_transaction/<string:sqid_ids>")
@login_required
def move_transaction(sb_id=None, t_id=None, sb_sqid=None, t_sqid=None, sqid_ids=None):
    if sqid_ids:
        sb_id, t_id = sqids.decode(sqid_ids)
    elif sb_sqid and t_sqid:
        sb_id = sqids.decode_one(sb_sqid)
        t_id - sqids.decode_one(t_sqid)

    new_budget_id = request.form.get("new_budget")

    print(sqid_ids, sb_id, t_id, new_budget_id)

    transaction_queries.update_transaction(
        budget_id=sb_id, transaction_id=t_id, new_budget_id=new_budget_id
    )

    return {"success": True}


@transaction_bp.delete("/delete_transaction/<int:b_id>/<int:t_id>")
@transaction_bp.delete("/delete_transaction/<string:b_sqid>/<string:t_sqid>")
@transaction_bp.delete("/delete_transaction/<string:sqid_ids>")
@login_required
def delete_transaction(b_id=None, t_id=None, b_sqid=None, t_sqid=None, sqid_ids=None):
    if sqid_ids:
        b_id, t_id = sqids.decode(sqid_ids)
    elif b_sqid and t_sqid:
        b_id = sqids.decode_one(b_sqid)
        t_id - sqids.decode_one(t_sqid)

    page = request.form.get("page")
    page = page if page else 1

    transaction_queries.delete_transaction(transaction_id=t_id, budget_id=b_id)

    return {"success": True}
