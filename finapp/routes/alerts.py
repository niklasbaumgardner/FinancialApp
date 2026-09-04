from flask import Blueprint

from finapp.queries import alert_queries
from finapp.utils.send_email import send_weekly_report

alerts_bp = Blueprint("alerts_bp", __name__)


@alerts_bp.cli.command("send_weekly_alerts")
def send_weekly_alerts() -> None:
    user_ids = alert_queries.get_users_with_weekly_alerts()
    for user_id in user_ids:
        report_content = alert_queries.get_week_spend_report(user_id)
        send_weekly_report(user_id, report_content)
