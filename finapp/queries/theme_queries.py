from finapp.models import Theme
from flask_login import current_user
from finapp import db
from sqlalchemy import select


##
## Theme queries
##


def create_theme(
    theme=None,
    mode=None,
    primary_color=None,
    background_color=None,
    color_contrast=None,
    color_palette=None,
):
    theme = Theme(
        user_id=current_user.id,
        theme=theme or None,
        mode=mode or None,
        primary_color=primary_color or None,
        background_color=background_color or None,
        color_contrast=color_contrast or None,
        color_palette=color_palette or None,
    )
    db.session.add(theme)
    db.session.commit()
    return theme


def get_theme():
    return db.session.scalars(
        select(Theme).where(Theme.user_id == current_user.id).limit(1)
    ).first()


def set_theme(theme):
    if not current_user.is_authenticated:
        return

    if theme in [
        "default",
        "awesome",
        "shoelace",
        "active",
        "brutalist",
        "glossy",
        "matter",
        "mellow",
        "playful",
        "premium",
        "tailspin",
    ]:
        theme = theme
    else:
        theme = "classic"

    theme_model = get_theme()

    if theme_model:
        theme_model.theme = theme
        db.session.commit()
    else:
        create_theme(theme=theme, mode="light")

    return theme


def set_theme_mode(mode):
    if not current_user.is_authenticated:
        return

    mode = "dark" if mode == "dark" else "light"

    theme = get_theme()

    if theme:
        theme.mode = mode
        db.session.commit()
    else:
        create_theme(theme="classic", mode=mode)

    return theme


def set_primary_color(primary_color):
    if not current_user.is_authenticated:
        return

    if primary_color not in [
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
        "slate",
        "gray",
        "zinc",
        "neutral",
        "stone",
    ]:
        primary_color = None

    theme = get_theme()

    if theme:
        theme.primary_color = primary_color
        db.session.commit()
    else:
        create_theme(theme="classic", mode="light", primary_color=primary_color)

    return theme


def set_background_color(background_color):
    if not current_user.is_authenticated:
        return

    if background_color not in [
        "niks-favorite",
        "red",
        "gray",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
    ]:
        background_color = None

    theme = get_theme()

    if theme:
        theme.background_color = background_color
        db.session.commit()
    else:
        create_theme(theme="classic", mode="light", background_color=background_color)

    return theme


def set_color_palette(color_palette):
    if not current_user.is_authenticated:
        return

    if color_palette not in [
        "default",
        "bright",
        "shoelace",
        "rudimentary",
        "elegant",
        "mild",
        "natural",
        "anodized",
        "vogue",
    ]:
        color_palette = None

    theme = get_theme()

    if theme:
        theme.color_palette = color_palette
        db.session.commit()
    else:
        create_theme(theme="classic", mode="light", color_palette=color_palette)

    return theme
