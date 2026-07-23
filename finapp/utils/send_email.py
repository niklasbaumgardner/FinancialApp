from threading import Thread

from flask import url_for
from flask_mail import Message

from finapp import app, mail
from finapp.queries import user_queries


def async_email_sender(a_app, msg):
    with a_app.app_context():
        mail.send(msg)


def send_async_email(msg):
    Thread(target=async_email_sender, args=(app, msg)).start()


def send_reset_email(user):
    if not user:
        return

    token = user.get_reset_token()
    msg = Message("Password Reset Request", recipients=[user.email])
    msg.body = f"""To reset your password, visit the following link:
{url_for("auth_bp.password_reset", token=token, _external=True)}
If you did not make this request then please ignore this email and no changes will be made.
"""
    send_async_email(msg)


def send_share_budget_email(sender_username, token, recipient):
    if not recipient:
        return

    msg = Message(
        f"{sender_username} has shared a budget with you", recipients=[recipient.email]
    )
    msg.body = f"""To accept the budget, please click on the following link:
{url_for("sharebudget_bp.accept_budget", token=token, _external=True)}
This link will expire in 24 hours.
If you do not want this or this was not intened for you then please ignore this email and no changes will be made.
"""
    send_async_email(msg)


def send_weekly_report(user_id, report_content):
    user = user_queries.get_user_by_id(user_id)

    # Sorted by most change
    report_content.sort(key=lambda x: x["income"] - x["spend"], reverse=True)

    msg = Message("Weekly spending report", recipients=[user.email])

    def money_string(number):
        return f"{'-' if number < 0 else ''}${abs(round(number, 2))}"

    def difference_string(number):
        return f"{'+' if number >= 0 else ''}{round(number, 2)}"

    title = "Below is the amount spent for each budget in the last week."
    body = f"{title}\n\n"
    html = f"<p>{title}</p><br>"
    for budget_content in report_content:
        body += "\n".join(
            [
                f"{budget_content['name']}: {money_string(budget_content['total'])} ({difference_string(budget_content['spend'] + budget_content['income'])})",
                f"Spent in the last week: {money_string(budget_content['spend'])}",
                f"Income in the last week: {money_string(budget_content['income'])}",
                "\n",
            ]
        )

        html += (
            "<div>"
            + "".join(
                [
                    f"<h3>{budget_content['name']}: {money_string(budget_content['total'])} ({difference_string(budget_content['spend'] + budget_content['income'])})</h3>",
                    "<br>".join(
                        [
                            f"Spent in the last week: {money_string(budget_content['spend'])}",
                            f"Income in the last week: {money_string(budget_content['income'])}",
                        ]
                    ),
                ]
            )
            + "</div><br>"
        )

    print(body)
    # print(html)

    msg.body = body.strip()
    msg.html = html
    send_async_email(msg)
