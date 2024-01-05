from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import current_user, login_required
from finapp.utils import queries

preferences_bp = Blueprint("preferences_bp", __name__)


@preferences_bp.route("/preferences", methods=["GET"])
@login_required
def preferences():
    return render_template("preferences.html")


@preferences_bp.route("/set_primary_color", methods=["GET"])
@login_required
def set_primary_color():
    color = request.args.get("color")
    queries.set_theme(color=color)
    return {"success": True}
