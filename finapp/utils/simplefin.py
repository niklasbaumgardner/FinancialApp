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
    seen_transaction_ids = []
    for transaction in transactions:
        found = transaction_queries.find_transaction(
            transaction=transaction, seen_transactions=seen_transaction_ids
        )

        if len(found) == 0:
            not_found_transactions.append(transaction)
        else:
            seen_transaction_ids.append(found[0].id)

    return not_found_transactions


def sf_data():
    fp = open(
        "/mnt/c/Users/nikla/OneDrive/Documents/GitHub/FinancialAppGitLab/data.json"
    )
    return json.load(fp)


def write_sf_data(data):
    fp = open(
        "/mnt/c/Users/nikla/OneDrive/Documents/GitHub/FinancialAppGitLab/data.json", "w"
    )
    json.dump(data, fp)
    fp.close()


def get_simplefin_data(credentials):
    if False:
        username, password = credentials.decrypt_credentials()

        url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

        DAYS_BACK = 30
        start_date = int(datetime.now().timestamp() - (86400 * DAYS_BACK))

        accounts = simplefin_queries.get_simplefin_accounts()
        sync_accounts = [a for a in accounts if a.type and a.type > 0]

        if len(sync_accounts) == 0:
            return

        accounts_string = "&".join([f"account={a.id}" for a in sync_accounts])

        response = requests.get(
            url + f"?start-date={start_date}&pending=1&{accounts_string}"
        )
        data = response.json()

    else:
        data = sf_data()

    return data


def sync_simplefin(credentials):
    data = get_simplefin_data(credentials)

    errors = data.get("errors")
    for error in errors:
        print("SIMPLEFIN ERROR:", error)

    transactions = []
    accounts = data.get("accounts")
    for account in accounts:
        org = account["org"]
        sf_org = simplefin_queries.get_or_create_simplefin_organization(org)
        simplefin_queries.upsert_simplefin_account(
            account=account, organization_id=sf_org.id
        )
        sf_account = simplefin_queries.get_simplefin_account(account["id"])

        transactions += account.get("transactions")

    # Sort by date to find duplicates easier
    transactions.sort(key=lambda x: x["transacted_at"] or x["posted"])
    not_found_transactions = find_transactions(transactions=transactions)

    simplefin_queries.create_pending_transactions(
        account=sf_account, transactions=not_found_transactions
    )

    simplefin_queries.update_simplefin_credentials_last_synced()
