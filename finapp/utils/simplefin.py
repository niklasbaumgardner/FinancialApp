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
        found, found_transaction_ids = transaction_queries.find_transaction(
            transaction=transaction, seen_transactions=seen_transaction_ids
        )

        if not found:
            not_found_transactions.append(transaction)
        else:
            if len(found_transaction_ids) > 0:
                seen_transaction_ids.append(found_transaction_ids[0])

    return not_found_transactions


def double_check_pending_transactions():
    seen_transaction_ids = []
    pending_transactions = simplefin_queries.get_pending_transactions()

    for pending_transaction in pending_transactions:
        found, found_transactions = (
            transaction_queries.find_transaction_for_pending_transaction(
                transaction=pending_transaction, seen_transactions=seen_transaction_ids
            )
        )

        if found:
            t, should_convert = found_transactions[0]
            if t is not None:
                seen_transaction_ids.append(t.id)

            simplefin_queries.delete_pending_transaction(id=pending_transaction.id)


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


def get_simplefin_transaction_data(credentials):
    if True:
        if (
            credentials.last_synced_transactions
            and (datetime.now() - credentials.last_synced_transactions).total_seconds()
            < 3600
        ):  # 1 hour
            print("Last synced less than 1 hour ago")
            return None

        username, password = credentials.decrypt_credentials()

        url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

        # DAYS_BACK = 30
        # start_date = int(datetime.now().timestamp() - (86400 * DAYS_BACK))

        accounts = simplefin_queries.get_simplefin_accounts()
        sync_accounts = [a for a in accounts if a.type and a.type > 0]

        if len(sync_accounts) == 0:
            return

        accounts_string = "&".join([f"account={a.id}" for a in sync_accounts])

        response = requests.get(url + f"?pending=1&{accounts_string}")
        data = response.json()

        write_sf_data(data)

    else:
        data = sf_data()

    return data


def sync_simplefin_transactions(credentials):
    data = get_simplefin_transaction_data(credentials=credentials)

    if data:
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

            account_transactions = account.get("transactions")

            for t in account_transactions:
                t["simplefin_account_id"] = sf_account.id

            transactions += account_transactions

        # Sort by date to find duplicates easier
        transactions.sort(key=lambda x: x["transacted_at"] or x["posted"])
        not_found_transactions = find_transactions(transactions=transactions)

        simplefin_queries.create_pending_transactions(
            transactions=not_found_transactions
        )

        simplefin_queries.update_simplefin_credentials_last_synced(transactions=True)

    # double_check_pending_transactions()


def sync_simplefin_accounts(credentials):
    if (
        credentials.last_synced_accounts
        and (datetime.now() - credentials.last_synced_accounts).total_seconds() < 3600
    ):  # 1 hour
        print("Last synced less than 1 hour ago")
        return None

    username, password = credentials.decrypt_credentials()

    url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

    response = requests.get(url + "?balances-only=1")
    data = response.json()

    simplefin_queries.update_simplefin_credentials_last_synced(accounts=True)

    if data:
        errors = data.get("errors")
        for error in errors:
            print("SIMPLEFIN ERROR:", error)

        accounts = data.get("accounts")
        for account in accounts:
            org = account["org"]
            sf_org = simplefin_queries.get_or_create_simplefin_organization(org)
            simplefin_queries.upsert_simplefin_account(
                account=account, organization_id=sf_org.id
            )
