from flask_login import current_user
from finapp.queries import theme_queries, user_settings_queries
from flask import Blueprint

context_processor_bp = Blueprint("context_processor_bp", __name__)


@context_processor_bp.app_context_processor
def utility_processor():
    def get_theme():
        if not current_user.is_authenticated:
            return None

        theme = theme_queries.get_theme()
        return theme

    def get_user_settings():
        if not current_user.is_authenticated:
            return None

        user_settings = user_settings_queries.get_user_settings()
        return user_settings

    user_settings = get_user_settings()
    if user_settings:
        return dict(user_settings=user_settings.to_dict())

    theme = get_theme()

    if theme and not user_settings:
        user_settings_queries.migrate_theme_to_settings(theme.to_dict())
        user_settings = get_user_settings()

        return dict(user_settings=user_settings.to_dict())

    return dict(user_settings={"settings": {"theme": "classic"}})
