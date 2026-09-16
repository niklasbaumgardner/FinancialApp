from flask import Blueprint, render_template
from flask_login import login_required

settings_bp = Blueprint("settings_bp", __name__)


@settings_bp.get("/settings")
@login_required
def settings() -> str:
    return render_template("settings.html")
