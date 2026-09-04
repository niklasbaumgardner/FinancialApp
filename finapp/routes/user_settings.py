from typing import Any

from flask import Blueprint, redirect, request, url_for
from flask.typing import ResponseReturnValue
from flask_login import current_user, login_required

from finapp.queries import user_settings_queries

user_settings_bp = Blueprint("user_settings_bp", __name__)


@user_settings_bp.post("/update_settings")
def update_settings() -> dict[str, bool]:
    if not current_user.is_authenticated:
        return {}

    settings_data = request.get_json()

    user_settings_queries.update_user_settings(**settings_data)
    return {"success": True}


@user_settings_bp.get("/update_settings")
@login_required
def update_settings_get() -> ResponseReturnValue:
    settings_data: dict[str, Any] = request.args.to_dict()

    for k, v in settings_data.items():
        if v.lower() == "true":
            settings_data[k] = True
        elif v.lower() == "false":
            settings_data[k] = False

    user_settings_queries.update_user_settings(**settings_data)
    return redirect(url_for("preferences_bp.preferences"))
