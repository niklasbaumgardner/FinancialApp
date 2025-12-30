from finapp.queries import (
    budget_queries,
    shared_budget_queries,
    transaction_queries,
)
from flask import Blueprint, request, abort, redirect, url_for
from flask_login import login_required, current_user
from finapp.utils import helpers
from finapp.utils.Sqids import sqids


editbudget_bp = Blueprint("editbudget_bp", __name__)


@editbudget_bp.get("/toggle_budget/<string:sqid>/")
@editbudget_bp.get("/toggle_budget/<string:sqid>/<string:name>")
@login_required
def toggle_budget(sqid=None, name=None):
    budget_id = sqids.decode_one(sqid)

    active = request.args.get("active")

    active = False if active == "false" else True
    budget_queries.update_budget(budget_id=budget_id, is_active=active)

    return {"success": True}


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
            budget_id = budget_queries.create_budget(name)

            if amount is not None and amount != 0:
                str_date = request.form.get("date")
                date = helpers.get_date_from_string(str_date)
                transaction_queries.create_transaction(
                    user_id=current_user.id,
                    name=f"Initial Transaction for {name}",
                    amount=amount,
                    date=date,
                    budget_id=budget_id,
                )

            return {"budget": budget_queries.get_budget(budget_id=budget_id).to_dict()}

        abort(409)
    abort(400)


@editbudget_bp.post("/edit_budget/<string:sqid>/")
@editbudget_bp.post("/edit_budget/<string:sqid>/<string:name>")
@login_required
def edit_budget(sqid=None, name=None):
    budget_id = sqids.decode_one(sqid)

    new_name = request.form.get("name")
    duplicate = budget_queries.get_duplicate_budget_by_name(new_name)
    if not duplicate:
        budget_queries.update_budget(budget_id=budget_id, name=new_name)
        return {"sucess": True}

    abort(409)


@editbudget_bp.post("/delete_budget/<string:sqid>/")
@editbudget_bp.post("/delete_budget/<string:sqid>/<string:name>")
@login_required
def delete_budget(sqid=None, name=None):
    budget_id = sqids.decode_one(sqid)

    budget = budget_queries.get_budget(budget_id=budget_id)

    new_budget_id = sqids.decode_one(request.form.get("new_budget"))

    # move or delete the transactions
    new_budget = (
        budget_queries.get_budget(budget_id=new_budget_id) if new_budget_id else None
    )

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

    if new_budget:
        transaction_queries.bulk_update_transactions_budget(
            old_budget_id=budget_id, new_budget_id=new_budget_id
        )

    else:
        transaction_queries.bulk_delete_transactions_for_budget(budget_id=budget_id)

    # finally delete the budget
    budget_queries.delete_budget(budget_id)

    return redirect(url_for("viewbudgets_bp.viewbudgets"))
