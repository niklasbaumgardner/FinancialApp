from flask import Blueprint

alerts_bp = Blueprint("alerts_bp", __name__)


@alerts_bp.cli.command("send_weekly_alerts")
def send_weekly_alerts():
    # TODO
    pass
