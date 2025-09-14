from flask import Blueprint, request
from flask_login import current_user
from finapp.queries import simplefin_queries
from finapp.utils import simplefin
from datetime import datetime
import requests


simplefin_bp = Blueprint("simplefin_bp", __name__)


@simplefin_bp.post("/claim_simplefin_token")
@login_required
def claim_simplefin_token():
    setup_token = request.form.get("setup_token")

    username, password = simplefin.claim_simplefin_token(setup_token)

    credential_id = simplefin_queries.create_simplefin_credential(
        username=username, password=password
    )


@simplefin_bp.get("/sync_simplefin")
@login_required
def sync_simplefin():
    credential = simplefin_queries.get_simplefin_credential()
    if not credential:
        return

    if (
        credential.last_synced
        and (datetime.now() - credential.last_synced).total_seconds() < 3600
    ):
        return

    username, password = credential.decrypt_credentials()

    url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

    response = requests.get(
        url + f"?start-date={credential.last_synced.timestamp()}&pending=1"
    )
    data = response.json()

    for account in data.get("accounts", []):
        sf_account = simplefin_queries.get_simplefin_account(account["id"])
        for transactions in account.get("transactions", []):
            not_found_transactions = simplefin.find_transactions(
                transactions=transactions
            )
            simplefin_queries.create_pending_transactions(
                account=sf_account, transactions=not_found_transactions
            )

    simplefin_queries.update_simplefin_credential_last_synced()

    return "Synced"
