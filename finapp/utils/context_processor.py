from flask_login import current_user
from finapp.utils import queries
from flask import Blueprint

context_processor_bp = Blueprint("context_processor_bp", __name__)


@context_processor_bp.app_context_processor
def utility_processor():
    def get_theme():
        if current_user.is_authenticated:
            theme = queries.get_theme()
            if theme:
                return theme.color
        return ""

    return dict(theme=get_theme())
