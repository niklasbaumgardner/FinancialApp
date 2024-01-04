from flask import Blueprint, request
from flask_login import login_required, current_user
from finapp.home import queries


theme = Blueprint("theme", __name__)


@theme.route("/set_theme", methods=["GET"])
@login_required
def set_theme():
    color = request.args.get("theme")
    color = "dark" if color == "dark" else "light"
    queries.set_theme(color=color)
    return {"success": True}
