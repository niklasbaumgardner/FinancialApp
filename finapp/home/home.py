
from flask import Blueprint, render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from finapp.models import User
from finapp.extensions import db
import datetime

# app = Flask(__name__)

home = Blueprint('home', __name__)
# mail = Mail(home)


@home.route('/', methods=["GET"])
def index():
    return "Welcome"
