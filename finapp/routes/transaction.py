from finapp.queries import (
    budget_queries,
    category_queries,
    shared_budget_queries,
    transaction_queries,
    user_queries,
)
from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user
from finapp.utils import helpers
import json

transaction_bp = Blueprint("transaction_bp", __name__)


@transaction_bp.post("/add_transaction/<int:budget_id>")
@login_required
def add_transaction(budget_id):
    user_id = request.form.get("user", type=int, default=current_user.id)
    name = request.form.get("name")
    amount = request.form.get("amount", type=float, default=0.0)
    str_date = request.form.get("date")
    date = helpers.get_date_from_string(str_date)
    return_transactions = request.form.get("return-transactions")
    return_transactions = return_transactions and return_transactions == "True"

    categories = request.form.getlist("categories")

    can_add_transaction = user_id == current_user.id
    if user_id != current_user.id:
        can_add_transaction = shared_budget_queries.can_add_transation_as_shared_user(
            budget_id=budget_id, user_id=user_id
        )

    if not can_add_transaction:
        return redirect(url_for("viewbudgets_bp.viewbudgets"))

    if name is not None and amount is not None and budget_id is not None:
        transaction_queries.create_transaction(
            user_id=user_id,
            name=name,
            amount=amount,
            date=date,
            budget_id=budget_id,
            categories=categories,
        )

    if return_transactions:
        return dict(
            transactions=[
                t.to_dict() for t in transaction_queries.get_recent_transactions()
            ]
        )

    return redirect(url_for("viewbudget_bp.view_budget", id=budget_id))


@transaction_bp.post("/edit_transaction/<int:b_id>/<int:t_id>")
@login_required
def edit_transaction(b_id, t_id):
    new_name = request.form.get("name")
    new_amount = request.form.get("amount", type=float)
    new_date = request.form.get("date")
    page = request.form.get("page")
    page = page if page else 1
    return_transactions = request.form.get("return-transactions")
    return_transactions = return_transactions and return_transactions == "True"

    categories_added = request.form.getlist("categoriesAdded")
    categories_deleted = request.form.getlist("categoriesDeleted")

    new_date = helpers.get_date_from_string(new_date)
    transaction_queries.update_transaction(
        b_id=b_id,
        t_id=t_id,
        name=new_name,
        amount=new_amount,
        new_date=new_date,
        categories_added=categories_added,
        categories_deleted=categories_deleted,
    )

    if return_transactions:
        return dict(
            transactions=[
                t.to_dict() for t in transaction_queries.get_recent_transactions()
            ]
        )

    return {
        "success": True,
        "transaction": transaction_queries.get_transaction(
            transaction_id=t_id
        ).to_dict(),
    }


@transaction_bp.post("/move_transaction/<int:sb_id>/<int:t_id>")
@login_required
def move_transaction(sb_id, t_id):
    new_budget_id = request.form.get("new_budget")

    transaction_queries.update_transaction(
        b_id=sb_id, t_id=t_id, new_b_id=new_budget_id
    )

    return {"success": True}


# @transaction_bp.route("/delete_transaction/<int:b_id>/<int:t_id>", methods=["DELETE"])
@transaction_bp.delete("/delete_transaction/<int:b_id>/<int:t_id>")
@login_required
def delete_transaction(b_id, t_id):
    page = request.form.get("page")
    page = page if page else 1

    transaction_queries.delete_transaction(transaction_id=t_id, budget_id=b_id)

    return {"success": True}
