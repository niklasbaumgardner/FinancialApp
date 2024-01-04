from flask import Blueprint, request
from flask_login import login_required
from finapp.utils import queries


theme_bp = Blueprint("theme_bp", __name__)


@theme_bp.route("/set_theme", methods=["GET"])
@login_required
def set_theme():
    color = request.args.get("theme")
    color = "dark" if color == "dark" else "light"
    queries.set_theme(color=color)
    return {"success": True}
