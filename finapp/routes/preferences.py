from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import current_user, login_required
from finapp.utils import queries

preferences_bp = Blueprint("preferences_bp", __name__)


@preferences_bp.route("/preferences", methods=["GET", "POST"])
@login_required
def preferences():
    return render_template("preferences.html")
