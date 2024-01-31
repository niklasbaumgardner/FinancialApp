from flask import Flask
from flask_bcrypt import Bcrypt
from finapp.config import Config
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy


bcrypt = Bcrypt()
migrate = Migrate()
mail = Mail()
login_manager = LoginManager()
db = SQLAlchemy(
    engine_options=dict(
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
    )
)


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message_category = "alert-primary"

mail.init_app(app)

from finapp.routes.auth import auth_bp as auth_blueprint
from finapp.routes.dashboard import dashboard_bp as dashboard_blueprint
from finapp.routes.index import index_bp as index_blueprint
from finapp.routes.paycheck import paycheck_bp as paycheck_blueprint
from finapp.routes.preferences import preferences_bp as preferences_blueprint
from finapp.routes.profile import profile_bp as profile_blueprint
from finapp.routes.sharebudget import sharebudget_bp as sharebudget_blueprint
from finapp.routes.theme import theme_bp as theme_blueprint
from finapp.routes.transfer import transfer_bp as transfer_blueprint
from finapp.routes.viewbudget import viewbudget_bp as viewbudget_blueprint
from finapp.utils.context_processor import (
    context_processor_bp as context_processor_blueprint,
)

app.register_blueprint(auth_blueprint)
app.register_blueprint(dashboard_blueprint)
app.register_blueprint(index_blueprint)
app.register_blueprint(paycheck_blueprint)
app.register_blueprint(preferences_blueprint)
app.register_blueprint(profile_blueprint)
app.register_blueprint(sharebudget_blueprint)
app.register_blueprint(theme_blueprint)
app.register_blueprint(transfer_blueprint)
app.register_blueprint(viewbudget_blueprint)
app.register_blueprint(context_processor_blueprint)

with app.app_context():
    db.create_all()

migrate.init_app(app, db)

from finapp.utils.jinja_filters import add_filters

add_filters()
