import requests
import base64
from finapp.queries import transaction_queries, simplefin_queries
from flask_login import current_user
from datetime import datetime
import json


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

        if len(found) == 0:
            print("HEREEEEEEEEEEEEE", found, transaction)
            not_found_transactions.append(transaction)

    return not_found_transactions


def sf_data():
    fp = open("/Users/niklas/Documents/GitHub/FinancialAppGitLab/data.json")
    return json.load(fp)


def sync_simplefin(credentials):
    # username, password = credentials.decrypt_credentials()

    # url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

    # start_date = int(datetime.now().timestamp() - (86400 * 90))

    # response = requests.get(url + f"?start-date={start_date}&pending=1")
    # data = response.json()
    data = sf_data()
    # print("\n\n\n\n\n")
    # print(data)
    # print("\n\n\n\n\n")

    for account in data.get("accounts"):
        org = account["org"]
        sf_org = simplefin_queries.get_or_create_simplefin_organization(org)
        simplefin_queries.upsert_simplefin_account(
            account=account, organization_id=sf_org.id
        )
        sf_account = simplefin_queries.get_simplefin_account(account["id"])

        not_found_transactions = find_transactions(
            transactions=account.get("transactions")
        )
        print("THESE ARE MISSING", not_found_transactions)
        simplefin_queries.create_pending_transactions(
            account=sf_account, transactions=not_found_transactions
        )

    simplefin_queries.update_simplefin_credentials_last_synced()
