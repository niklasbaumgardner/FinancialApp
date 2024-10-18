from finapp.queries import (
    budget_queries,
    prefill_queries,
    transaction_queries,
    user_queries,
)
from flask import Blueprint, render_template, request, abort
from flask_login import login_required
from finapp.utils import helpers


index_bp = Blueprint("index_bp", __name__)


@index_bp.route("/", methods=["GET"])
@login_required
def index():
    active, inactive = budget_queries.get_budgets(separate=True)

    total = round(sum([x.total for x in active + inactive]), 2)

    active = [b.to_dict() for b in active]
    inactive = [b.to_dict() for b in inactive]

    shared_users = {
        u.id: u.to_dict() for u in user_queries.get_shared_users_for_all_budgets()
    }

    return render_template(
        "index.html",
        budgets=[active, inactive],
        round=round,
        total=helpers.format_to_money_string(total),
        shared_users=shared_users,
    )


@index_bp.route("/toggle_budget", methods=["GET"])
@login_required
def toggle_budget():
    active = request.args.get("active")
    id_ = request.args.get("id", 0, type=int)

    if id_ != 0:
        active = False if active == "false" else True
        budget_queries.update_budget(id_, is_active=active)

        return {"success": True}

    return {"success": False}


@index_bp.route("/add_budget", methods=["POST"])
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
                    name=f"Initial Transaction for {name}",
                    amount=amount,
                    date=date,
                    budget_id=budg.id,
                )

            return {"budget": budg.to_dict()}

        abort(409)
    abort(400)


@index_bp.route("/edit_budget/<int:id>", methods=["POST"])
@login_required
def edit_budget(id):
    new_name = request.form.get("name")
    duplicate = budget_queries.get_duplicate_budget_by_name(new_name)
    if not duplicate:
        budget_queries.update_budget(id, name=new_name)
        return {"sucess": True}

    abort(409)


@index_bp.route("/delete_budget/<int:b_id>", methods=["DELETE"])
@login_required
def delete_budget(b_id):
    budget = budget_queries.get_budget(b_id, shared=False)
    if not budget or budget.is_shared:
        abort(400)

    new_budget_id = request.form.get("new_budget")

    # move or delete the transactions
    new_budget = budget_queries.get_budget(new_budget_id) if new_budget else None
    if new_budget:
        transactions = transaction_queries.get_transactions(b_id)
        for t in transactions:
            transaction_queries._update_transaction(
                transaction=t, b_id=b_id, new_b_id=new_budget.id
            )
    else:
        transactions = transaction_queries.get_transactions(b_id)
        for trans in transactions:
            transaction_queries._delete_transaction(trans, b_id)

    # delete prefills
    prefills = prefill_queries.get_prefills_by_budget(b_id)
    for prefill in prefills:
        prefill_queries._delete_prefill(prefill)

    # finally delete the budget
    budget_queries.delete_budget(b_id)

    return {"success": True}
