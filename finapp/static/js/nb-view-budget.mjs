import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

import "./viewBudgetSearchCard.mjs";
import "./shareBudgetElement.mjs";
import "./nb-transaction.mjs";
import "./nb-select.mjs";

export class ViewBudget extends NikElement {
  static properties = {
    budget: { type: Object },
    transactions: { type: Array },
    categories: { type: Array },
    searching: { type: Boolean },
    numTransactions: { type: Number },
    currentPage: { type: Number },
    numPages: { type: Number },
  };

  sharedUsersTemplate() {
    if (!this.budget.is_shared) {
      return null;
    }

    return this.budget.shared_users.map(
      (u) => html`<wa-tooltip for="shared-user-${u.id}"
          >This budget is shared with ${u.username}</wa-tooltip
        ><wa-icon
          library="ion"
          name="person-circle-outline"
          id="shared-user-${u.id}"
        ></wa-icon>`
    );
  }

  sharedUsersOptionsTemplate() {
    let templateArray = [];
    templateArray.push(
      html`<wa-option value=${CURRENT_USER.id}
        >${CURRENT_USER.username}</wa-option
      >`
    );
    templateArray.push(
      ...this.budget.shared_users.map(
        (su) => html`<wa-option value=${su.id}>${su.username}</wa-option>`
      )
    );

    return templateArray;
  }

  sharedUsersSelectTemplate() {
    if (!this.budget.is_shared || !this.budget.shared_users.length) {
      return null;
    }

    return html`<wa-select
      label="Select user for this transaction"
      name="user"
      value=${CURRENT_USER.id}
      >${this.sharedUsersOptionsTemplate()}</wa-select
    >`;
  }

  transactionsTemplate() {
    if (!this.transactions?.length) {
      return html`<div id="emptyTransaction">
        <div class="d-flex justify-content-center">
          <p class="fs-5">No transactions found</p>
        </div>
      </div>`;
    }

    return this.transactions
      .flatMap((t) => [
        html`<nb-transaction
          .transaction=${t}
          ?editing=${t.editing ?? false}
        ></nb-transaction>`,
        html`<wa-divider></wa-divider>`,
      ])
      .slice(0, -1);
  }

  render() {
    return html`<wa-card>
        <form
          class="wa-stack"
          id="addTransaction"
          method="POST"
          action="${this.budget.add_transaction_url}"
        >
          <div class="wa-split">
            <div class="wa-stack gap-(--wa-space-s)">
              <h2>${this.budget.name}</h2>
              <h4>
                Total:
                <wa-format-number
                  id="budgetTotal"
                  type="currency"
                  currency="USD"
                  value="${this.budget.total}"
                  lang="en-US"
                ></wa-format-number>
              </h4>
            </div>
            <div>
              ${this.sharedUsersTemplate()}<wa-tooltip for="share-budget-button"
                >Share this budget</wa-tooltip
              >
              <wa-icon-button
                id="share-budget-button"
                name="share-social-outline"
                library="ion"
                label="Share this budget"
                @click=${this.handleShareButtonClick}
              ></wa-icon-button>
            </div>
          </div>

          <div class="wa-cluster">
            <wa-input
              class="grow-3"
              type="text"
              id="name"
              name="name"
              placeholder="Spent too much?"
              autocomplete="niklas"
              required
              @input=${this.checkTransactionInput}
            ></wa-input>
            <wa-input
              class="grow"
              type="number"
              step=".01"
              id="amount"
              name="amount"
              placeholder="0.00"
              autocomplete="niklas"
              required
              @input=${this.checkTransactionInput}
            ></wa-input>
            <wa-input
              class="grow"
              type="date"
              id="date"
              name="date"
              value=${new Date().toISOString().substring(0, 10)}
              required
            ></wa-input>
            <wa-button
              class="grow"
              variant="brand"
              id="transaction-submit"
              type="submit"
              >Add Transaction</wa-button
            >
          </div>
          ${this.sharedUsersSelectTemplate()}
          <div>
            <nb-select .categories=${this.categories}></nb-select>
            <wa-button
              appearance="plain"
              variant="brand"
              size="small"
              @click=${this.openCategoriesModal}
              >Create more categories</wa-button
            >
          </div>
        </form>
      </wa-card>

      <search-budget-card .categories=${this.categories}></search-budget-card>

      <wa-card class="">
        <div id="transactionList" class="">${this.transactionsTemplate()}</div>
      </wa-card> `;
  }
}
customElements.define("nb-view-budget", ViewBudget);
