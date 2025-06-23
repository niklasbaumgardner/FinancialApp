from flask import Flask
from flask_bcrypt import Bcrypt
from finapp.config import Config
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.pool import NullPool
import sentry_sdk
import os


bcrypt = Bcrypt()
migrate = Migrate()
mail = Mail()
login_manager = LoginManager()
db = SQLAlchemy(engine_options=dict(poolclass=NullPool))

if not os.environ.get("FLASK_DEBUG"):
    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_DSN"),
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for tracing.
        traces_sample_rate=1.0,
        _experiments={
            # Set continuous_profiling_auto_start to True
            # to automatically start the profiler on whenpip
            # possible.
            "continuous_profiling_auto_start": True,
        },
        release="nbfinancial@1.0.5",
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
from finapp.routes.category import category_bp as category_blueprint
from finapp.routes.dashboard import dashboard_bp as dashboard_blueprint
from finapp.routes.editbudget import editbudget_bp as editbudget_blueprint
from finapp.routes.paycheck import paycheck_bp as paycheck_blueprint
from finapp.routes.preferences import preferences_bp as preferences_blueprint
from finapp.routes.profile import profile_bp as profile_blueprint
from finapp.routes.sharebudget import sharebudget_bp as sharebudget_blueprint
from finapp.routes.theme import theme_bp as theme_blueprint
from finapp.routes.transfer import transfer_bp as transfer_blueprint
from finapp.routes.viewbudget import viewbudget_bp as viewbudget_blueprint
from finapp.routes.viewbudgets import viewbudgets_bp as viewbudgets_blueprint
from finapp.utils.context_processor import (
    context_processor_bp as context_processor_blueprint,
)

app.register_blueprint(auth_blueprint)
app.register_blueprint(category_blueprint)
app.register_blueprint(dashboard_blueprint)
app.register_blueprint(editbudget_blueprint)
app.register_blueprint(paycheck_blueprint)
app.register_blueprint(preferences_blueprint)
app.register_blueprint(profile_blueprint)
app.register_blueprint(sharebudget_blueprint)
app.register_blueprint(theme_blueprint)
app.register_blueprint(transfer_blueprint)
app.register_blueprint(viewbudget_blueprint)
app.register_blueprint(viewbudgets_blueprint)
app.register_blueprint(context_processor_blueprint)

with app.app_context():
    db.create_all()

migrate.init_app(app, db)
