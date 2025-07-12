from flask import url_for
from flask_mail import Message
from finapp import mail


def send_reset_email(user):
    if not user:
        return

    token = user.get_reset_token()
    msg = Message("Password Reset Request", recipients=[user.email])
    msg.body = f"""To reset your password, visit the following link:
{url_for("auth_bp.password_reset", token=token, _external=True)}
If you did not make this request then please ignore this email and no changes will be made.
"""
    mail.send(msg)


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
    mail.send(msg)
