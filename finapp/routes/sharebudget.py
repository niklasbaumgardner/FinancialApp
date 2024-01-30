from finapp.utils import queries
from flask import Blueprint, redirect, url_for, request, abort
from flask_login import login_required, current_user
from finapp.utils.send_email import send_share_budget_email
from finapp.models import Budget

sharebudget_bp = Blueprint("sharebudget_bp", __name__)


@sharebudget_bp.route("/share_budget/<int:budget_id>", methods=["GET"])
@login_required
def share_budget(budget_id):
    email = request.args.get("email", "", type=str)
    if email == current_user.email:
        abort(400)

    user = queries.getUserByEmail(email=email)
    if not user:
        return abort(400)

    shared_budget = queries.get_shared_budget_for_user_id(
        budget_id=budget_id, user_id=user.id
    )
    if shared_budget:
        # just return if the budget is already shared with this user
        return {"success": True}

    budget = queries.get_budget(id=budget_id)
    token = budget.get_share_token(recipient_id=user.id)

    send_share_budget_email(
        sender_username=current_user.username, token=token, recipient=user
    )

    return {"success": True}


@sharebudget_bp.route("/accept_budget/", methods=["GET"])
@login_required
def accept_budget():
    token = request.args.get("token")

    obj = Budget.verify_share_token(token=token)
    budget_id, recipient_id = obj.get("budget_id"), obj.get("recipient_id")

    if current_user.id != recipient_id:
        return redirect(url_for("index_bp.index"))

    budget = queries.get_budget_for_id(budget_id)

    if budget:
        queries.create_shared_budget(budget=budget)
        return redirect(url_for("viewbudget_bp.view_budget", id=budget.id))

    return redirect(url_for("index_bp.index"))
