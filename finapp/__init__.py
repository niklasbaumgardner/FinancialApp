from flask import Flask
from flask_bcrypt import Bcrypt
from finapp.config import Config
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.pool import NullPool
from apitally.flask import ApitallyMiddleware
import os


bcrypt = Bcrypt()
migrate = Migrate()
mail = Mail()
login_manager = LoginManager()
db = SQLAlchemy(engine_options=dict(poolclass=NullPool))


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
login_manager.init_app(app)
login_manager.login_view = "auth_bp.login"
login_manager.login_message_category = "alert-primary"

app.wsgi_app = ApitallyMiddleware(
    app,
    client_id=os.environ.get("APITALLY_CLIENT_ID"),
    env=os.environ.get("APITALLY_ENVIRONMENT"),
)

mail.init_app(app)

from finapp.routes.auth import auth_bp as auth_blueprint
from finapp.routes.category import category_bp as category_blueprint
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
app.register_blueprint(category_blueprint)
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
