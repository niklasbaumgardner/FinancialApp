import requests
import base64
from finapp.queries import transaction_queries, simplefin_queries
from flask_login import current_user
from datetime import datetime


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


# def double_check_pending_transactions():
#     seen_transaction_ids = []
#     pending_transactions = simplefin_queries.get_pending_transactions()

#     for pending_transaction in pending_transactions:
#         found, found_transactions = (
#             transaction_queries.find_transaction_for_pending_transaction(
#                 transaction=pending_transaction, seen_transactions=seen_transaction_ids
#             )
#         )

#         if found:
#             t, should_convert = found_transactions[0]
#             if t is not None:
#                 seen_transaction_ids.append(t.id)

#             simplefin_queries.delete_pending_transaction(id=pending_transaction.id)


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

    simplefin_queries.update_last_synced_for_accounts(account_ids=account_ids)

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


def sync_simplefin_transactions(credentials):
    accounts = simplefin_queries.get_simplefin_accounts(access_type=0)

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
