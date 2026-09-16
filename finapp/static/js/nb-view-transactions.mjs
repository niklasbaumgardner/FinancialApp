import { NikElement } from "./nik-element.mjs";
import { html } from "lit";
import "./nb-transactions-grid.mjs";
import "./nb-add-transaction.mjs";
import "./budgets.mjs";

const ABORT_ERROR = "AbortError";
class RequestController {
  #abortController = null;

  async doRequest(url) {
    this.abort();

    this.#abortController = new AbortController();
    const response = await fetch(url, { signal: this.#abortController.signal });

    return await response.json();
  }

  abort() {
    this.#abortController?.abort(
      new DOMException("Request cancelled", ABORT_ERROR),
    );
  }
}

class ViewTransactions extends NikElement {
  static properties = {
    budgets: { type: Array },
    categories: { type: Array },
    canSetDownloadLink: { type: Boolean },
    pendingTransactions: { type: Array },
  };

  static queries = {
    downloadLink: "a",
  };

  constructor() {
    super();

    this.canSetDownloadLink = false;
    this.pendingTransactions = [];
  }

  init() {
    this.requestPendingTransactions();

    document.addEventListener("keydown", this);
    document.addEventListener("UpdatePendingTransactions", this);
    document.addEventListener("BudgetsUpdated", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "keydown": {
        this.handleKeyDown(event);
        break;
      }
      case "UpdatePendingTransactions": {
        let pendingTransactions = event.detail.pendingTransactions;
        this.updatePendingTransactions(pendingTransactions);
        break;
      }
      case "BudgetsUpdated": {
        const { budgets } = event.detail;
        this.updateBudgets(budgets);
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
  }

  async requestPendingTransactions() {
    let url = PENDING_TRANSACTIONS_URL;
    let response = await fetch(url);
    let data = await response.json();

    let { pending_transactions } = data;
    this.updatePendingTransactions(pending_transactions);
  }

  updatePendingTransactions(pendingTransactions) {
    this.pendingTransactions = pendingTransactions;

    if (this.addTransactionModal) {
      this.addTransactionModal.setPendingTransactions(this.pendingTransactions);
    }
  }

  addTransactionClick() {
    if (!this.addTransactionModal) {
      this.addTransactionModal = document.createElement("nb-add-transaction");
      this.addTransactionModal.budgets = this.budgets;
      this.addTransactionModal.categories = this.categories;
      this.addTransactionModal.pendingTransactions = this.pendingTransactions;
      document.body.append(this.addTransactionModal);
    }

    this.addTransactionModal.show();
  }

  handleKeyDown(event) {
    let tagName = event.target.localName;
    if (
      tagName === "input" ||
      tagName === "wa-input" ||
      tagName === "wa-option"
    ) {
      return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "n") {
      this.addTransactionClick();
    }
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
    return html`<nb-transactions-grid
      .budgets=${this.budgets}
      .categories=${this.categories}
    ></nb-transactions-grid>`;
  }

  pendingTransactionsBadge() {
    if (this.pendingTransactions.length > 0) {
      return html`<wa-badge variant="brand" pill
        >${this.pendingTransactions.length}</wa-badge
      >`;
    }

    return null;
  }

  render() {
    return html`<div class="wa-stack">
      <div class="wa-split">
        <h2 @click=${this.toggleSetDownloadLink}>Recent Transactions</h2>
        <wa-button
          variant="shoelace"
          appearance="filled"
          @click=${this.addTransactionClick}
          >Add New Transaction${this.pendingTransactionsBadge()}</wa-button
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
