from flask_login import current_user
from sqlalchemy import cast, select
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import insert as pg_insert

from finapp import db
from finapp.models import UserSettings

##
## UserSettings queries
##


VALID_VARIANTS = {"brand", "danger", "neutral", "success", "warning"}

VALID_USER_SETTINGS_ARGS = {
    "theme",
    "mode",
    "background_color",
    "color_contrast",
    "color_palette",
    "rounding",
    "wa_data_grid",
    *VALID_VARIANTS,
}

ARGS_ALLOW_NULL = {
    "background_color",
    "color_contrast",
    "color_palette",
    "rounding",
    "wa_data_grid",
    *VALID_VARIANTS,
}

VALID_THEMES = {
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
}

VALID_THEME_MODES = {"light", "dark"}


NUMBERS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

COLORS = {
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
    "taupe",
    "mauve",
    "mist",
    "olive",
}


VALID_BACKGROUND_COLORS = {
    "niks-favorite",
} | {f"--color-{color}-{number}" for color in COLORS for number in NUMBERS}


VALID_COLOR_PALETTES = {
    "default",
    "bright",
    "shoelace",
    "rudimentary",
    "elegant",
    "mild",
    "natural",
    "anodized",
    "vogue",
}

VALID_ROUNDING_VALUES = {r / 10 for r in range(41)}

VALID_SPACING_VALUES = {r / 80 for r in range(40, 161)}

VALID_BORDER_WIDTHS = {r / 2 for r in range(1, 9)}

VALID_USER_SETTINGS_DICT = {
    "theme": {"valid_values": VALID_THEMES},
    "mode": {"valid_values": VALID_THEME_MODES},
    "background_color": {"valid_values": VALID_BACKGROUND_COLORS, "nullable": True},
    "color_palette": {"valid_values": VALID_COLOR_PALETTES, "nullable": True},
    "rounding": {"valid_values": VALID_ROUNDING_VALUES, "nullable": True},
    "spacing": {"valid_values": VALID_SPACING_VALUES, "nullable": True},
    "brand": {"valid_values": COLORS, "nullable": True},
    "danger": {"valid_values": COLORS, "nullable": True},
    "neutral": {"valid_values": COLORS, "nullable": True},
    "success": {"valid_values": COLORS, "nullable": True},
    "warning": {"valid_values": COLORS, "nullable": True},
    "wa_data_grid": {
        "valid_values": {True, False},
        "nullable": True,
        "experimental": True,
    },
}


def is_valid_user_setting(arg, value):
    return arg in VALID_USER_SETTINGS_DICT and (
        (value is None and VALID_USER_SETTINGS_DICT[arg]["nullable"])
        or value in VALID_USER_SETTINGS_DICT[arg]["valid_values"]
    )


def get_user_settings():
    return db.session.scalars(
        select(UserSettings).where(UserSettings.user_id == current_user.id).limit(1)
    ).first()


def update_user_settings(**kwargs):
    settings_data = {}
    for arg, val in kwargs.items():
        if is_valid_user_setting(arg, val):
            settings_data[arg] = val

    values = [
        {
            "user_id": current_user.id,
            "settings": cast(settings_data, JSONB),
        }
    ]

    stmt = pg_insert(UserSettings).values(values)
    upsert_stmt = stmt.on_conflict_do_update(
        constraint="user_settings_user_id_unique",
        set_={
            "settings": UserSettings.settings + stmt.excluded.settings,
        },
    )
    db.session.execute(upsert_stmt)
    db.session.commit()
