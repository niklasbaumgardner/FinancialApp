import requests
import base64
from finapp.queries import transaction_queries, simplefin_queries
from flask_login import current_user
from datetime import datetime
import os


def claim_simplefin_token(setup_token):
    claim_url = base64.b64decode(setup_token)

    response = requests.post(claim_url)
    access_url = response.text

    _, rest = access_url.split("//", 1)

    auth, rest = rest.split("@", 1)

    username, password = auth.split(":", 1)
    return username, password


def find_missing_transactions():
    result = transaction_queries.find_transactions_v2()

    # TODO: Make sure this works with -19.60 bathing suit example
    # Meaning: two SFTs in the db with same amount and only 1 transaction in T
    missing_SFTs = []
    seen_transactions = set()
    seen_SFTs = set()

    for sft, t in result:
        if sft.id not in seen_SFTs and (
            t is None or (t is not None and t.id in seen_transactions)
        ):
            missing_SFTs.append(sft)
            seen_SFTs.add(sft.id)

            if t is not None:
                seen_transactions.add(t.id)

    print(f"found {len(missing_SFTs)} missing transactions")

    return missing_SFTs


def find_missing_transactions_for_user(key, user_id):
    if key != os.environ.get("SIMPLEFIN_KEY"):
        return

    result = transaction_queries.find_transactions_for_user_v2(key=key, user_id=user_id)

    # TODO: Make sure this works with -19.60 bathing suit example
    # Meaning: two SFTs in the db with same amount and only 1 transaction in T
    missing_SFTs = []
    seen_transactions = set()
    seen_SFTs = set()

    for sft, t in result:
        if sft.id not in seen_SFTs and (
            t is None or (t is not None and t.id in seen_transactions)
        ):
            missing_SFTs.append(sft)
            seen_SFTs.add(sft.id)

            if t is not None:
                seen_transactions.add(t.id)

    print(f"found {len(missing_SFTs)} missing transactions")

    return missing_SFTs


def request_simplefin_transactions(credentials, account_ids):
    if len(account_ids) < 1:
        return {}

    username, password = credentials.decrypt_credentials()

    url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

    DAYS_BACK = 30
    start_date = int(datetime.now().timestamp() - (86400 * DAYS_BACK))

    accounts_string = "&".join([f"account={id}" for id in account_ids])

    response = requests.get(
        url + f"?pending=1&{accounts_string}&start-date={start_date}"
    )
    data = response.json()

    simplefin_queries.update_last_synced_for_accounts(
        account_ids=account_ids, account=True, transactions=True
    )

    return data


def request_simplefin_accounts(credentials, account_ids):
    if len(account_ids) < 1:
        return {}

    username, password = credentials.decrypt_credentials()

    url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

    # DAYS_BACK = 30
    # start_date = int(datetime.now().timestamp() - (86400 * DAYS_BACK))

    accounts_string = "&".join([f"account={id}" for id in account_ids])

    response = requests.get(url + f"?balances-only=1&{accounts_string}")
    data = response.json()

    simplefin_queries.update_last_synced_for_accounts(
        account_ids=account_ids, account=True
    )

    return data


def request_simplefin(credentials):
    username, password = credentials.decrypt_credentials()

    url = f"https://{username}:{password}@beta-bridge.simplefin.org/simplefin/accounts"

    # DAYS_BACK = 30
    # start_date = int(datetime.now().timestamp() - (86400 * DAYS_BACK))

    response = requests.get(url + "?balances-only=1")
    data = response.json()

    return data


def update_account_transactions(data):
    if data:
        errors = data.get("errors")
        for error in errors:
            print("SIMPLEFIN ERROR:", error)

        accounts = data.get("accounts")
        for account in accounts:
            account_id = account["id"]

            account_transactions = account.get("transactions")

            safe_for_db_transactions = [
                {
                    "account_id": account_id,
                    "user_id": current_user.id,
                    "id": t["id"],
                    "posted": t["posted"],
                    "amount": t["amount"],
                    "description": t["description"],
                    "transacted_at": t.get("transacted_at") or t["posted"],
                }
                for t in account_transactions
            ]

            simplefin_queries.update_transactions_for_account(
                account_id=account_id, transactions=safe_for_db_transactions
            )

        simplefin_queries.update_simeplefin_accounts(accounts=accounts)


def sync_simplefin_transactions(credentials):
    accounts = simplefin_queries.get_simplefin_accounts_with_timestamp(access_type=1)

    account_ids = [
        a.id
        for a, now in accounts
        if a.last_synced_transactions is None
        or (now.timestamp() - a.last_synced_transactions.timestamp()) > 3600
    ]

    data = request_simplefin_transactions(
        credentials=credentials, account_ids=account_ids
    )

    update_account_transactions(data=data)

    missing_SFTs = find_missing_transactions()

    simplefin_queries.create_pending_transactions(transactions=missing_SFTs)


def sync_simplefin_account_balances(credentials):
    accounts = simplefin_queries.get_simplefin_accounts_with_timestamp()

    account_ids = [
        a.id
        for a, now in accounts
        if a.last_synced_account is None
        or (now.timestamp() - a.last_synced_account.timestamp()) > 3600
    ]

    data = request_simplefin_accounts(credentials=credentials, account_ids=account_ids)

    if data:
        errors = data.get("errors")
        for error in errors:
            print("SIMPLEFIN ERROR:", error)

        accounts = data.get("accounts")
        simplefin_queries.update_simeplefin_accounts(accounts=accounts)


def sync_simplefin(credentials):
    data = request_simplefin(credentials=credentials)

    if data:
        errors = data.get("errors")
        for error in errors:
            print("SIMPLEFIN ERROR:", error)

        accounts = data.get("accounts")
        for account in accounts:
            org = account["org"]
            sf_org = simplefin_queries.get_or_create_simplefin_organization(org=org)
            simplefin_queries.upsert_simplefin_account(
                account=account, organization_id=sf_org.id
            )


def update_all_accounts_and_transactions(key):
    if key != os.environ.get("SIMPLEFIN_KEY"):
        return

    all_credentials = simplefin_queries.get_all_credentials(key=key)
    for credentials in all_credentials:
        accounts = simplefin_queries.get_all_accounts_for_user_with_timestamp(
            key=key, user_id=credentials.user_id
        )

        transaction_sync_account_ids = [
            a.id
            for a, now in accounts
            if a.access_type >= 1
            and (
                a.last_synced_transactions is None
                or (now.timestamp() - a.last_synced_transactions.timestamp()) > 3600
            )
        ]

        account_sync_account_ids = [
            a.id
            for a, now in accounts
            if a.access_type < 1
            and (
                a.last_synced_account is None
                or (now.timestamp() - a.last_synced_account.timestamp()) > 3600
            )
        ]

        data = request_simplefin_transactions(
            credentials=credentials, account_ids=transaction_sync_account_ids
        )

        update_account_transactions(data=data)

        missing_SFTs = find_missing_transactions_for_user(
            key=key, user_id=credentials.user_id
        )

        simplefin_queries.create_pending_transactions_for_user(
            transactions=missing_SFTs, user_id=credentials.user_id
        )

        data = request_simplefin_accounts(
            credentials=credentials, account_ids=account_sync_account_ids
        )
        if data:
            errors = data.get("errors")
            for error in errors:
                print("SIMPLEFIN ERROR:", error)

            accounts = data.get("accounts")
            simplefin_queries.update_simeplefin_accounts(accounts=accounts)
