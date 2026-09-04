from typing import Any

from flask import Blueprint
from flask_login import current_user

from finapp.queries import user_settings_queries

context_processor_bp = Blueprint("context_processor_bp", __name__)


@context_processor_bp.app_context_processor
def globals() -> dict[str, dict[str, dict[str, Any]]]:
    user_settings = {}

    if current_user.is_authenticated:
        if us := user_settings_queries.get_user_settings():
            user_settings = us.to_dict()

    else:
        user_settings = {"settings": {"theme": "shoelace", "color_palette": "shoelace"}}

    return {"user_settings": user_settings}
