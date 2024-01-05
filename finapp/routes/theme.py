from flask import Blueprint, request
from flask_login import login_required
from finapp.utils import queries


theme_bp = Blueprint("theme_bp", __name__)


@theme_bp.route("/set_theme", methods=["GET"])
@login_required
def set_theme():
    theme = request.args.get("theme")
    theme = "light" if theme == "light" else "dark"
    queries.set_theme(theme_color=theme)
    return {"success": True}
