from flask import Blueprint, request
from flask_login import current_user, login_required
from finapp.queries import category_queries

category_bp = Blueprint("category_bp", __name__)


@category_bp.post("/create_category")
@login_required
def create_category():
    name = request.form.get("name")
    color = request.form.get("color")

    category_queries.create_category(name=name, color=color)
    categories = category_queries.get_categories_shared()

    return {"success": True, "categories": [c.to_dict() for c in categories]}


@category_bp.get("/get_categories")
@login_required
def get_categories():
    categories = category_queries.get_categories_shared()

    return [c.to_dict() for c in categories]
