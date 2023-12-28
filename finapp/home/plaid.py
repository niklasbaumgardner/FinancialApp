from flask import Blueprint, render_template, flash, redirect, url_for, request, jsonify
from flask_login import login_user, current_user, logout_user, login_required
from finapp import plaid_client, plaid_api_client
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.item_public_token_exchange_request import (
    ItemPublicTokenExchangeRequest,
)
from plaid.model.transactions_sync_request import TransactionsSyncRequest
from plaid.model.accounts_get_request import AccountsGetRequest
from plaid.model.products import Products
from plaid.model.country_code import CountryCode

from finapp.home import queries


plaid = Blueprint("plaid", __name__)


@plaid.route("/oauth", methods=["GET"])
@login_required
def oauth():
    return render_template("oauth.html")


@plaid.route("/create_link_token", methods=["POST"])
@login_required
def create_link_token():
    # Get the client_user_id by searching for the current user
    client_user_id = current_user.get_id()

    # Create a link_token for the given user
    link_request = LinkTokenCreateRequest(
        products=[Products("auth")],
        client_name="NB Financial App",
        country_codes=[CountryCode("US")],
        redirect_uri=url_for(
            "plaid.oauth",
            _external=True,
            _scheme="https",
        ),
        language="en",
        webhook="https://webhook.example.com",
        user=LinkTokenCreateRequestUser(client_user_id=client_user_id),
    )

    response = plaid_client.link_token_create(link_request)
    print(response)
    temp = jsonify(response.to_dict())
    print(temp)
    return temp


@plaid.route("/exchange_public_token", methods=["POST"])
@login_required
def exchange_public_token():
    public_token = request.form["public_token"]

    plaid_item_request = ItemPublicTokenExchangeRequest(public_token=public_token)
    response = plaid_client.item_public_token_exchange(plaid_item_request)

    # These values should be saved to a persistent database and
    # associated with the currently signed-in user
    access_token = response["access_token"]
    item_id = response["item_id"]

    print(access_token, item_id)

    queries.create_plaid_access_token(access_token=access_token, item_id=item_id)

    return jsonify({"public_token_exchange": "complete"})


@plaid.route("/get_plaid_accounts", methods=["GET"])
@login_required
def get_plaid_accounts():
    tokens_list = queries.get_all_access_tokens()

    accounts = []
    for plaid_access_token in tokens_list:
        auth_request = AccountsGetRequest(access_token=plaid_access_token.access_token)

        response = plaid_client.accounts_get(auth_request)
        response_dict = response.to_dict()
        accounts.extend(response_dict["accounts"])

    return jsonify(accounts)


@plaid.route("/get_plaid_transactions", methods=["GET"])
@login_required
def get_plaid_transactions():
    tokens_list = queries.get_all_access_tokens()

    added = []
    modified = []
    removed = []

    for plaid_access_token in tokens_list:
        has_more = True
        while has_more:
            transaction_request = TransactionsSyncRequest(
                access_token=plaid_access_token.access_token,
                cursor=plaid_access_token.cursor,
            )

            response = plaid_client.transactions_sync(transaction_request)

            print(response)
            response = response.to_dict()

            added.extend(response["added"])
            modified.extend(response["modified"])
            removed.extend(response["removed"])

            has_more = response["has_more"]

            cursor = response["next_cursor"]

            queries.update_plaid_cursor(
                item_id=plaid_access_token.item_id, new_cursor=cursor
            )

    return jsonify({"added": added, "modified": modified, "removed": removed})
