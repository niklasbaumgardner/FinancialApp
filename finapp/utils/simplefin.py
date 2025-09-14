import requests
import base64
from finapp.queries import transaction_queries
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
