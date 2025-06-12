from finapp.queries import (
    budget_queries,
    prefill_queries,
    shared_budget_queries,
    transaction_queries,
    user_queries,
)
from flask import Blueprint, render_template, request, abort, redirect, url_for
from flask_login import login_required, current_user
from finapp.utils import helpers


editbudget_bp = Blueprint("editbudget_bp", __name__)


@editbudget_bp.get("/toggle_budget")
@login_required
def toggle_budget():
    active = request.args.get("active")
    id_ = request.args.get("id", 0, type=int)

    if id_ != 0:
        active = False if active == "false" else True
        budget_queries.update_budget(id_, is_active=active)

        return {"success": True}

    return {"success": False}


@editbudget_bp.post("/add_budget")
@login_required
def add_budget():
    name = request.form.get("name")
    try:
        amount = float(request.form.get("amount"))
    except:
        amount = 0

    if name:
        duplicate = budget_queries.get_duplicate_budget_by_name(name)
        if not duplicate:
            budg = budget_queries.create_budget(name)

            if amount is not None and amount != 0:
                str_date = request.form.get("date")
                date = helpers.get_date_from_string(str_date)
                transaction_queries.create_transaction(
                    user_id=current_user.id,
                    name=f"Initial Transaction for {name}",
                    amount=amount,
                    date=date,
                    budget_id=budg.id,
                )

            return {"budget": budg.to_dict()}

        abort(409)
    abort(400)


@editbudget_bp.post("/edit_budget/<int:id>")
@login_required
def edit_budget(id):
    new_name = request.form.get("name")
    duplicate = budget_queries.get_duplicate_budget_by_name(new_name)
    if not duplicate:
        budget_queries.update_budget(id, name=new_name)
        return {"sucess": True}

    abort(409)


@editbudget_bp.post("/delete_budget/<int:b_id>")
@login_required
def delete_budget(b_id):
    budget = budget_queries.get_budget(b_id)
    if not budget:
        abort(400)

    new_budget_id = request.form.get("new_budget")

    # move or delete the transactions
    new_budget = budget_queries.get_budget(new_budget_id) if new_budget_id else None

    # update shared budgets
    shared_budgets = shared_budget_queries.get_shared_budgets_by_budget_id(
        budget_id=budget.id
    )
    if shared_budgets and new_budget:
        shared_budget_queries.update_shared_budgets(
            shared_budgets=shared_budgets, new_budget_id=new_budget.id
        )
        budget_queries.set_budget_shared(budget_id=new_budget.id)
    elif shared_budgets:
        shared_budget_queries.delete_shared_budgets(shared_budgets=shared_budgets)

    # transactions = transaction_queries.get_transactions(b_id)
    if new_budget:
        # transaction_queries.updates_transactions_budget(
        #     transactions=transactions, new_budget_id=new_budget.id
        # )
        transaction_queries.bulk_update_transactions_budget(
            old_budget_id=b_id, new_budget_id=new_budget_id
        )

    else:
        # transaction_queries.delete_transactions(transactions=transactions)
        transaction_queries.bulk_delete_transactions_for_budget(budget_id=b_id)

    # delete prefills
    prefill_queries.delete_prefills_for_budget(budget_id=budget.id)

    # finally delete the budget
    budget_queries.delete_budget(b_id)

    return redirect(url_for("viewbudgets_bp.viewbudgets"))
