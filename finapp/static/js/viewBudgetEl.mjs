import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { Pagination, Search } from "./pagination.mjs";
import "./viewBudgetSearchCard.mjs";
import "./shareBudgetElement.mjs";
import "./transaction.mjs";

class ViewBudget extends NikElement {
  static properties = {
    budget: { type: Object },
    transactions: { type: Array },
    searching: { type: Boolean },
    numTransactions: { type: Number },
    currentPage: { type: Number },
    numPages: { type: Number },
  };

  static get queries() {
    return {
      nameInputEl: "#name",
      amountInputEl: "#amount",
      transactionSubmitButton: "#transaction-submit",
      shareBudgetDialog: "#share-budget-dialog",
      dateEl: "#date",
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.searching = false;
    this.pagination = new Pagination(
      this.transactions,
      this.numTransactions,
      this.currentPage,
      this.numPages,
      GET_PAGE_URL
    );
    this.pagination.init(this.currentPage);

    this.currentPagination = this.pagination;

    this.search = new Search([], 0, 1, 1, SEARCH_PAGE_URL);

    document.addEventListener("RequestNewPages", this);
    document.addEventListener("SortingChanged", this);
    document.addEventListener("ToggleSearching", this);
    document.addEventListener("UpdateTransactions", this);
    window.addEventListener("keydown", this, { once: true });

    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");

    this.prevButton.onclick = () => this.onPrevClick();
    this.nextButton.onclick = () => this.onNextClick();
  }

  firstUpdated() {
    this.transactionSubmitButton.disabled = true;
    let dateNow = new Date();
    // We only record date for transactions so
    // just set hours to 0 so day is correct
    dateNow.setHours(0);
    this.dateEl.valueAsDate = dateNow;
  }

  handleEvent(event) {
    switch (event.type) {
      case "RequestNewPages":
        this.requestNewPages(event.detail);
        break;
      case "SortingChanged":
        this.handleSortingChanged(event);
        break;
      case "ToggleSearching":
        this.toggleSearch(event.detail.searching);
        break;
      case "UpdateTransactions":
        this.transactions = event.detail.transactions;
        break;
      case "keydown":
        if (event.key === "Tab") {
          event.preventDefault();
          this.nameInputEl.focus();
        }
        break;
    }
  }

  toggleSearch(searching) {
    this.searching = searching;

    if (this.searching) {
      this.search.init(1);
      this.currentPagination = this.search;
    } else {
      this.pagination.init(1);
      this.currentPagination = this.pagination;
    }
  }

  handleSortingChanged(event) {
    let sort = event.detail.sort;
    this.currentPagination.sort = sort;

    this.requestNewPages({
      lessThanCurrentPage: true,
      greaterThanCurrentPage: true,
    });
  }

  async sortTransactions(event) {
    let button = event.target;

    if (this.searching) {
      if (this.search.sort === button.value) {
        return;
      }

      for (let sortButton of this.sortOptionsSearch) {
        sortButton.classList.remove("active");
      }

      button.classList.add("active");

      this.search.sort = button.value;

      await this.search.requestNewPages({
        lessThanCurrentPage: true,
        greaterThanCurrentPage: true,
      });
    } else {
      if (this.pagination.sort === button.value) {
        return;
      }

      for (let sortButton of this.sortOptions) {
        sortButton.classList.remove("active");
      }

      button.classList.add("active");

      this.pagination.sort = button.value;

      await this.pagination.requestNewPages({
        lessThanCurrentPage: true,
        greaterThanCurrentPage: true,
      });
    }
  }

  requestNewPages(options) {
    this.currentPagination.requestNewPages(options);
    if (this.currentPagination === this.search) {
      this.pagination.requestNewPages(options);
    }
  }

  onPrevClick() {
    if (this.prevButton.disabled) {
      return;
    }
    this.currentPagination.setCurrentPage(
      this.currentPagination.currentPage - 1
    );
  }

  onNextClick() {
    if (this.nextButton.disabled) {
      return;
    }
    this.currentPagination.setCurrentPage(
      this.currentPagination.currentPage + 1
    );
  }

  handleShareButtonClick() {
    this.shareBudgetDialog.show();
  }

  checkTransactionInput() {
    let name = this.nameInputEl.value;
    let amount = this.amountInputEl.value;
    if (name !== "" && amount !== "") {
      if (!isNaN(amount)) {
        // success
        this.transactionSubmitButton.disabled = false;
        if (this.nameInputEl.classList.contains("w3-border-red")) {
          this.nameInputEl.classList.remove("w3-border-red");
        }
        if (this.amountInputEl.classList.contains("w3-border-red")) {
          this.amountInputEl.classList.remove("w3-border-red");
        }
        return;
      } else {
        if (!this.amountInputEl.classList.contains("w3-border-red")) {
          this.amountInputEl.classList.add("w3-border-red");
        }
      }
    }
    if (name == "") {
      if (!this.nameInputEl.classList.contains("w3-border-red")) {
        this.nameInputEl.classList.add("w3-border-red");
      }
    }
    if (amount === "") {
      if (!this.amountInputEl.classList.contains("w3-border-red")) {
        this.amountInputEl.classList.add("w3-border-red");
      }
    }
    this.transactionSubmitButton.disabled = true;
  }

  sharedUsersTemplate() {
    if (!this.budget.is_shared) {
      return null;
    }

    return this.budget.shared_users.map(
      (u) => html`<sl-tooltip
        content="This budget is shared with ${u.username}"
      >
        <sl-icon name="person-circle"></sl-icon>
      </sl-tooltip>`
    );
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
        html`<nb-transaction .transaction=${t}></nb-transaction>`,
        html`<sl-divider></sl-divider>`,
      ])
      .slice(0, -1);
  }

  render() {
    return html`<sl-card class="mb-4">
        <div class="row" slot="header">
          <div class="d-flex justify-content-between">
            <div class="fs-1">${this.budget.name}</div>
            <div>
              ${this.sharedUsersTemplate()}<sl-tooltip
                content="Share this budget"
              >
                <sl-icon-button
                  id="share-budget-button"
                  name="share-fill"
                  label="Share this budget"
                  @click=${this.handleShareButtonClick}
                ></sl-icon-button>
              </sl-tooltip>
            </div>
          </div>
          <div class="fs-5 mb-0 subhead">
            Total:
            <sl-format-number
              id="budgetTotal"
              type="currency"
              currency="USD"
              value="${this.budget.total}"
              lang="en-US"
            ></sl-format-number>
          </div>
        </div>

        <form
          id="addTransaction"
          method="POST"
          action="${this.budget.addTransactionUrl}"
        >
          <div class="row">
            <div class="col-12 col-md-8 col-xl-6 mb-2">
              <sl-input
                type="text"
                id="name"
                name="name"
                placeholder="Spent too much?"
                autocomplete="niklas"
                required
                @input=${this.checkTransactionInput}
              ></sl-input>
            </div>
            <div class="col-6 col-md-4 col-xl-2 mb-2">
              <sl-input
                class="amount-input-86"
                type="number"
                step=".01"
                id="amount"
                name="amount"
                placeholder="0.00"
                autocomplete="niklas"
                required
                @input=${this.checkTransactionInput}
              ></sl-input>
            </div>
            <div class="col-6 col-md-4 col-xl-2 mb-2">
              <sl-input type="date" id="date" name="date" required></sl-input>
            </div>
            <div class="col-12 col-md-8 col-xl-2 mb-2">
              <sl-button
                class="w-100"
                variant="primary"
                id="transaction-submit"
                type="submit"
                >Add Transaction</sl-button
              >
            </div>
          </div>
        </form>
      </sl-card>

      <search-budget-card></search-budget-card>

      <sl-card class="mb-4">
        <div id="transactionList" class="">${this.transactionsTemplate()}</div>
      </sl-card>

      <div id="moveModals"></div>
      <div id="deleteModals"></div>

      <share-budget-dialog id="share-budget-dialog"></share-budget-dialog> `;
  }
}
export default ViewBudget;

customElements.define("view-budget-el", ViewBudget);
