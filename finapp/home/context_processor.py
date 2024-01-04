from flask_login import current_user
from finapp.home import queries
import app


@app.context_processor
def utility_processor():
    def get_theme():
        if current_user.is_authenticated:
            theme = queries.get_theme()
            if theme:
                return theme.color
        return ""

    return dict(theme=get_theme())
