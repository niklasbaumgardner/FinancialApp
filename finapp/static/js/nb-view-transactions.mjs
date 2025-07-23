import { NikElement } from "./nik-element.mjs";
import { html } from "./bundle.mjs";
import "./nb-transactions-grid.mjs";
import "./nb-add-transaction.mjs";

class ViewTransactions extends NikElement {
  static properties = {
    transactions: { type: Array },
    budgets: { type: Array },
    categories: { type: Array },
    theme: { type: String },
    total: { type: Number },
    canSetDownloadLink: { type: Boolean },
    gotTransactions: { type: Boolean },
  };

  static queries = {
    downloadLink: "a",
  };

  constructor() {
    super();

    this.canSetDownloadLink = false;
    this.gotTransactions = false;
  }

  connectedCallback() {
    let dummyArray = new Array(this.total - this.transactions.length).fill({});
    this.transactions = this.transactions.concat(dummyArray);

    super.connectedCallback();

    this.requestData();

    document.addEventListener("UpdateBudgets", this);
    document.addEventListener("RequestNewData", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "UpdateBudgets": {
        let budgets = event.detail.budgets;
        this.updateBudgets(budgets);
        break;
      }
      case "RequestNewData": {
        let includeBudgets = event.detail.includeBudgets;
        this.requestData(includeBudgets);
        break;
      }
    }
  }

  updateBudgets(budgets) {
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
  }

  async requestData(includeBudgets = false) {
    this.gotTransactions = false;
    let url = VIEW_TRANSACTIONS_CONTENT_URL;
    if (includeBudgets) {
      url += "?includeBudgets=True";
    }
    let response = await fetch(url);
    let data = await response.json();

    let { transactions } = data;
    this.transactions = transactions;
    this.gotTransactions = true;
    this.setDownloadLink();
    document.dispatchEvent(
      new CustomEvent("UpdateTransactions", {
        bubbles: true,
        composed: true,
        detail: { transactions },
      })
    );

    if (includeBudgets) {
      let { budgets } = data;
      this.updateBudgets(budgets);
    }
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

  toggleSetDownloadLink() {
    this.canSetDownloadLink = !this.canSetDownloadLink;
  }

  setDownloadLink() {
    let csvContent = "";
    csvContent +=
      [
        "Date",
        "Name",
        "Amount",
        "Id",
        "Budget Name",
        "Username",
        "is_tranfer",
        "Categories",
      ].join(",") + "\r\n";

    for (let transaction of this.transactions) {
      const row = [
        transaction.date,
        transaction.name.replaceAll(",", "-"),
        transaction.amount,
        transaction.id,
        transaction.budget.name,
        transaction.user.username,
        transaction.is_tranfer,
        transaction.categories.map((c) => c.category.name).join("|"),
      ];
      csvContent += row.join(",") + "\r\n";
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    this.downloadLink.setAttribute("href", url);
    this.downloadLink.setAttribute("download", "transactions.csv");

    this.downloadLink.hidden = !this.canSetDownloadLink;
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
        <h2 @click=${this.toggleSetDownloadLink}>Recent Transactions</h2>
        <wa-button
          variant="neutral"
          appearance="filled outlined"
          @click=${this.addTransactionClick}
          >Add New Transaction</wa-button
        >
      </div>
      <a
        @click=${this.handleDownloadClick}
        ?hidden=${!(this.canSetDownloadLink && this.gotTransactions)}
        >Download transactions</a
      >
      ${this.transactionsTemplate()}
    </div>`;
  }
}
customElements.define("nb-view-transactions", ViewTransactions);
