import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-transactions-grid.mjs";

class ViewTransactions extends NikElement {
  static properties = {
    transactions: { type: Array },
    theme: { type: String },
  };

  transactionsTemplate() {
    return html`<nb-transactions-grid
      .transactions=${this.transactions}
      theme=${this.theme}
    ></nb-transactions-grid>`;
  }

  render() {
    return html`<div class="wa-stack">
      <h2>Recent Transactions</h2>
      ${this.transactionsTemplate()}
    </div>`;
  }
}
customElements.define("nb-view-transactions", ViewTransactions);
