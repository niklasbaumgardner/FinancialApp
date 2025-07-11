import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-transactions-grid.mjs";
import "./nb-add-transaction.mjs";

class ViewTransactions extends NikElement {
  static properties = {
    transactions: { type: Array },
    budgets: { type: Array },
    categories: { type: Array },
    theme: { type: String },
    total: { type: Number },
  };

  connectedCallback() {
    let dummyArray = new Array(this.total - this.transactions.length).fill({});
    this.transactions = this.transactions.concat(dummyArray);

    super.connectedCallback();

    this.requestData();

    document.addEventListener("UpdateBudgets", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "UpdateBudgets":
        let budgets = event.detail.budgets;
        for (let budget of budgets) {
          let budgetIndex = this.budgets.findIndex((b) => b.id === budget.id);
          if (budgetIndex === -1) {
            continue;
          }
          this.budgets[budgetIndex] = budget;
        }

        if (this.addTransactionModal) {
          this.addTransactionModal.budgets = this.budgets;
        }
        break;
    }
  }

  async requestData() {
    let response = await fetch(VIEW_TRANSACTIONS_CONTENT_URL);
    let data = await response.json();

    let { transactions } = data;
    this.transactions = transactions;
    document.dispatchEvent(
      new CustomEvent("UpdateTransactions", {
        bubbles: true,
        composed: true,
        detail: { transactions },
      })
    );
  }

  addTransactionClick() {
    if (!this.addTransactionModal) {
      this.addTransactionModal = document.createElement("nb-add-transaction");
      this.addTransactionModal.budgets = this.budgets;
      this.addTransactionModal.categories = this.categories;
      document.body.append(this.addTransactionModal);
    }

    this.addTransactionModal.show();
  }

  transactionsTemplate() {
    if (!this.transactions || !this.budgets || !this.categories) {
      return html`<div class="flex items-center justify-center">
        <wa-spinner class="text-9xl"></wa-spinner>
      </div>`;
    }

    return html`<nb-transactions-grid
      .transactions=${this.transactions}
      .budgets=${this.budgets}
      .categories=${this.categories}
      theme=${this.theme}
    ></nb-transactions-grid>`;
  }

  render() {
    return html`<div class="wa-stack">
      <div class="wa-split">
        <h2>Recent Transactions</h2>
        <wa-button
          variant="neutral"
          appearance="filled outlined"
          @click=${this.addTransactionClick}
          >Add New Transaction</wa-button
        >
      </div>
      ${this.transactionsTemplate()}
    </div>`;
  }
}
customElements.define("nb-view-transactions", ViewTransactions);
