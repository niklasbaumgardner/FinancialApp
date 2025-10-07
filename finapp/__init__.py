from flask import Flask
from flask_bcrypt import Bcrypt
from finapp.config import Config
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool
import sentry_sdk
import os
from werkzeug.middleware.proxy_fix import ProxyFix
from scout_apm.flask import ScoutApm
from scout_apm.flask.sqlalchemy import instrument_sqlalchemy
# from flask_compress import Compress
# from flask_caching import Cache
# from sqlalchemy import event
# from sqlalchemy.engine import Engine
# import time
# import logging
# ruff: noqa: E402


class Base(DeclarativeBase):
    pass


app = Flask(__name__)

app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)


if not os.environ.get("FLASK_DEBUG"):
    sentry_sdk.init(
        dsn=os.environ.get("SENTRY_DSN"),
        traces_sample_rate=1.0,
        send_default_pii=True,
        release="nb-budgets@2.0.7",
    )


app.config.from_object(Config)

db = SQLAlchemy(engine_options=dict(poolclass=NullPool, future=True), model_class=Base)
db.init_app(app)

bcrypt = Bcrypt()
bcrypt.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message_category = "alert-primary"

mail = Mail()
mail.init_app(app)

ScoutApm(app)
instrument_sqlalchemy(db)


# cache = Cache(
#     config={
#         "CACHE_TYPE": "SimpleCache",
#         "CACHE_DEFAULT_TIMEOUT": 60 * 60,  # 1 hour cache timeout
#     }
# )
# cache.init_app(app)


# # Define a function to return cache key for incoming requests
# def get_cache_key(request):
#     print(request.url)
#     return request.url


# # Initialize Flask-Compress
# compress = Compress()
# compress.init_app(app)

# # Set up cache for compressed responses
# compress.cache = cache
# compress.cache_key = get_cache_key


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


from finapp.routes.auth import auth_bp
from finapp.routes.category import category_bp
from finapp.routes.dashboard import dashboard_bp
from finapp.routes.editbudget import editbudget_bp
from finapp.routes.paycheck import paycheck_bp
from finapp.routes.preferences import preferences_bp
from finapp.routes.profile import profile_bp
from finapp.routes.sharebudget import sharebudget_bp
from finapp.routes.simplefin import simplefin_bp
from finapp.routes.theme import theme_bp
from finapp.routes.transaction import transaction_bp
from finapp.routes.transfer import transfer_bp
from finapp.routes.viewbudget import viewbudget_bp
from finapp.routes.viewbudgets import viewbudgets_bp
from finapp.routes.viewtransactions import viewtransactions_bp
from finapp.utils.context_processor import context_processor_bp

app.register_blueprint(auth_bp)
app.register_blueprint(category_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(editbudget_bp)
app.register_blueprint(paycheck_bp)
app.register_blueprint(preferences_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(sharebudget_bp)
app.register_blueprint(simplefin_bp)
app.register_blueprint(theme_bp)
app.register_blueprint(transaction_bp)
app.register_blueprint(transfer_bp)
app.register_blueprint(viewbudget_bp)
app.register_blueprint(viewbudgets_bp)
app.register_blueprint(viewtransactions_bp)
app.register_blueprint(context_processor_bp)

with app.app_context():
    db.create_all()

migrate = Migrate()
migrate.init_app(app, db)
