from finapp.queries import (
    budget_queries,
    transaction_queries,
)
from flask import Blueprint, redirect, url_for, request
from flask_login import login_required, current_user
from finapp.utils import helpers


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

    transaction_queries.create_transaction(
        user_id=user_id,
        name=name,
        amount=amount,
        date=date,
        budget_id=budget_id,
        categories=categories,
    )

    # # TODO: Think about this
    # can_add_transaction = user_id == current_user.id
    # if user_id != current_user.id:
    #     can_add_transaction = budget_queries.can_user_modify_budget(
    #         budget_id=budget_id, user_id=user_id
    #     )

    # if not can_add_transaction:
    #     return redirect(url_for("viewbudgets_bp.viewbudgets"))

    # if name is not None and amount is not None and budget_id is not None:

    if return_transactions:
        transactions, _ = transaction_queries.get_recent_transactions()
        budgets = [budget_queries.get_budget(budget_id=budget_id).to_dict()]
        return dict(
            transactions=[t.to_dict() for t in transactions],
            budgets=budgets,
        )

    return redirect(url_for("viewbudget_bp.view_budget", id=budget_id))


@transaction_bp.post("/edit_transaction/<int:b_id>/<int:t_id>")
@login_required
def edit_transaction(b_id, t_id):
    name = request.form.get("name")
    amount = request.form.get("amount", type=float)
    # new_budget_id = request.form.get("budget", type=int)
    user_id = request.form.get("user", type=int, default=current_user.id)
    date = request.form.get("date")
    page = request.form.get("page")
    page = page if page else 1
    return_transactions = request.form.get("return-transactions")
    return_transactions = return_transactions and return_transactions == "True"

    categories_added = request.form.getlist("categoriesAdded")
    categories_deleted = request.form.getlist("categoriesDeleted")

    date = helpers.get_date_from_string(date)

    transaction_queries.update_transaction(
        budget_id=b_id,
        transaction_id=t_id,
        # new_budget_id=new_budget_id,
        user_id=user_id,
        name=name,
        amount=amount,
        date=date,
        categories_added=categories_added,
        categories_deleted=categories_deleted,
    )

    if return_transactions:
        transactions, _ = transaction_queries.get_recent_transactions()
        # budgets = [
        #     budget_queries.get_budget(budget_id=b).to_dict()
        #     for b in set([b_id, new_budget_id])
        # ]
        budgets = [budget_queries.get_budget(budget_id=b_id).to_dict()]

        return dict(transactions=[t.to_dict() for t in transactions], budgets=budgets)

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
        budget_id=sb_id, transaction_id=t_id, new_budget_id=new_budget_id
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
