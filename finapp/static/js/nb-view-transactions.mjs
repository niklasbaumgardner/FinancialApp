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
  };

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
    return html`<nb-transactions-grid
      .transactions=${this.transactions}
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
