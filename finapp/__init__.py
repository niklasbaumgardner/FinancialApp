from ast import Tuple
from csv import Error
from flask import Flask, abort
from flask_bcrypt import Bcrypt
from finapp.config import Config
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.pool import NullPool
import sentry_sdk
import os
from flask_compress import Compress
# from sqlalchemy import event
# from sqlalchemy.engine import Engine
# import time
# import logging


app = Flask(__name__)


if not os.environ.get("FLASK_DEBUG"):
    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_DSN"),
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for tracing.
        traces_sample_rate=1.0,
        # To collect profiles for all profile sessions,
        # set `profile_session_sample_rate` to 1.0.
        profile_session_sample_rate=1.0,
        # Profiles will be automatically collected while
        # there is an active span.
        profile_lifecycle="trace",
        release="nbfinancial@1.1.10",
    )


app.config.from_object(Config)

db = SQLAlchemy(engine_options=dict(poolclass=NullPool))
db.init_app(app)

bcrypt = Bcrypt()
bcrypt.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message_category = "alert-primary"

mail = Mail()
mail.init_app(app)

compress = Compress()
compress.init_app(app)


# logging.basicConfig()
# logger = logging.getLogger("postgres.budgets")
# logger.setLevel(logging.DEBUG)


# @event.listens_for(Engine, "before_cursor_execute")
# def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
#     conn.info.setdefault("query_start_time", []).append(time.time())
#     logger.debug("Start Query: %s", statement)


# @event.listens_for(Engine, "after_cursor_execute")
# def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
#     total = time.time() - conn.info["query_start_time"].pop(-1)
#     logger.debug("Query Complete!")
#     logger.debug("Total Time: %f", total)


from finapp.routes.auth import auth_bp as auth_blueprint
from finapp.routes.category import category_bp as category_blueprint
from finapp.routes.dashboard import dashboard_bp as dashboard_blueprint
from finapp.routes.editbudget import editbudget_bp as editbudget_blueprint
from finapp.routes.paycheck import paycheck_bp as paycheck_blueprint
from finapp.routes.preferences import preferences_bp as preferences_blueprint
from finapp.routes.profile import profile_bp as profile_blueprint
from finapp.routes.sharebudget import sharebudget_bp as sharebudget_blueprint
from finapp.routes.theme import theme_bp as theme_blueprint
from finapp.routes.transaction import transaction_bp as transaction_blueprint
from finapp.routes.transfer import transfer_bp as transfer_blueprint
from finapp.routes.viewbudget import viewbudget_bp as viewbudget_blueprint
from finapp.routes.viewbudgets import viewbudgets_bp as viewbudgets_blueprint
from finapp.routes.viewtransactions import (
    viewtransactions_bp as viewtransactions_blueprint,
)
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
app.register_blueprint(transaction_blueprint)
app.register_blueprint(transfer_blueprint)
app.register_blueprint(viewbudget_blueprint)
app.register_blueprint(viewbudgets_blueprint)
app.register_blueprint(viewtransactions_blueprint)
app.register_blueprint(context_processor_blueprint)

with app.app_context():
    db.create_all()

migrate = Migrate()
migrate.init_app(app, db)
