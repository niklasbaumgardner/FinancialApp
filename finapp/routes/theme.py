from flask import Blueprint, request
from flask_login import current_user
from finapp.queries import theme_queries


theme_bp = Blueprint("theme_bp", __name__)


@theme_bp.get("/set_theme")
def set_theme():
    if not current_user.is_authenticated:
        return {}

    theme = request.args.get("theme")
    theme_queries.set_theme(theme=theme)
    return {"success": True}


@theme_bp.get("/set_theme_mode")
def set_theme_mode():
    if not current_user.is_authenticated:
        return {}

    mode = request.args.get("mode")
    theme_queries.set_theme_mode(mode=mode)
    return {"success": True}


@theme_bp.get("/set_primary_color")
def set_primary_color():
    if not current_user.is_authenticated:
        return {}

    primary_color = request.args.get("primary_color")
    theme_queries.set_primary_color(primary_color=primary_color)
    return {"success": True}


@theme_bp.get("/set_background_color")
def set_background_color():
    if not current_user.is_authenticated:
        return {}

    background_color = request.args.get("background_color")
    theme_queries.set_background_color(background_color=background_color)
    return {"success": True}


@theme_bp.get("/set_color_palette")
def set_color_palette():
    if not current_user.is_authenticated:
        return {}

    color_palette = request.args.get("color_palette")
    theme_queries.set_color_palette(color_palette=color_palette)
    return {"success": True}
