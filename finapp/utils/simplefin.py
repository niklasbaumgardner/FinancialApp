import requests
import base64
from finapp.queries import transaction_queries, simplefin_queries
import os
from flask_login import current_user


def claim_simplefin_token(setup_token):
    claim_url = base64.b64decode(setup_token)

    response = requests.post(claim_url)
    access_url = response.text

    _, rest = access_url.split("//", 1)

    auth, rest = rest.split("@", 1)

    username, password = auth.split(":", 1)
    return username, password


def find_transactions(transactions):
    not_found_transactions = []
    for transaction in transactions:
        found = transaction_queries.find_transaction(transaction)
        if not found:
            not_found_transactions.append(transaction)

    return not_found_transactions


def sync_simplefin(credentials):
    username, password = credentials.decrypt_credentials()

    url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

    response = requests.get(
        url + f"?start-date={credentials.last_synced.timestamp()}&pending=1"
    )
    data = response.json()

    for account in data.get("accounts", []):
        sf_account = simplefin_queries.get_simplefin_account(account["id"])
        for transactions in account.get("transactions", []):
            not_found_transactions = find_transactions(transactions=transactions)
            simplefin_queries.create_pending_transactions(
                account=sf_account, transactions=not_found_transactions
            )

    simplefin_queries.update_simplefin_credentials_last_synced()
