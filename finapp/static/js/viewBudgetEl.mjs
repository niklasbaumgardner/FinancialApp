import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { Pagination, Search } from "./pagination.mjs";
import "./viewBudgetSearchCard.mjs";
import "./shareBudgetElement.mjs";
import "./nb-transaction.mjs";
import "./nb-select.mjs";

class ViewBudget extends NikElement {
  static properties = {
    budget: { type: Object },
    transactions: { type: Array },
    categories: { type: Array },
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

    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");

    this.prevButton.onclick = () => this.onPrevClick();
    this.nextButton.onclick = () => this.onNextClick();
  }

  async firstUpdated() {
    this.transactionSubmitButton.disabled = true;
    let dateNow = new Date();
    // We only record date for transactions so
    // just set hours to 0 so day is correct
    dateNow.setHours(0);
    this.dateEl.valueAsDate = dateNow;

    await this.nameInputEl.updateComplete;
    this.nameInputEl.focus({ focusVisible: true });
  }

  async handleEvent(event) {
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
        this.transactions = [];
        await this.updateComplete;
        this.transactions = event.detail.transactions;
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
      this.pagination.requestNewPages({ deleteOnly: true, ...options });
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

  openCategoriesModal() {
    document.querySelector("create-category-modal").show();
  }

  sharedUsersTemplate() {
    if (!this.budget.is_shared) {
      return null;
    }

    return this.budget.shared_users.map(
      (u) => html`<wa-tooltip
        content="This budget is shared with ${u.username}"
      >
        <wa-icon library="ion" name="person-circle-outline"></wa-icon>
      </wa-tooltip>`
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
        html`<nb-transaction
          .transaction=${t}
          ?editing=${t.editing ?? false}
        ></nb-transaction>`,
        html`<wa-divider></wa-divider>`,
      ])
      .slice(0, -1);
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

    return html`<div class="row">
      <wa-select
        label="Select user for this transaction"
        name="user"
        value=${CURRENT_USER.id}
        >${this.sharedUsersOptionsTemplate()}</wa-select
      >
    </div>`;
  }

  render() {
    return html`<wa-card class="mb-4">
        <div class="row" slot="header">
          <div class="d-flex justify-content-between">
            <div class="fs-1">${this.budget.name}</div>
            <div>
              ${this.sharedUsersTemplate()}<wa-tooltip
                content="Share this budget"
              >
                <wa-icon-button
                  id="share-budget-button"
                  name="share-fill"
                  label="Share this budget"
                  @click=${this.handleShareButtonClick}
                ></wa-icon-button>
              </wa-tooltip>
            </div>
          </div>
          <div class="fs-5 mb-0 subhead">
            Total:
            <wa-format-number
              id="budgetTotal"
              type="currency"
              currency="USD"
              value="${this.budget.total}"
              lang="en-US"
            ></wa-format-number>
          </div>
        </div>

        <form
          id="addTransaction"
          method="POST"
          action="${this.budget.add_transaction_url}"
        >
          <div class="row">
            <div class="col-12 col-md-8 col-xl-6 mb-2">
              <wa-input
                type="text"
                id="name"
                name="name"
                placeholder="Spent too much?"
                autocomplete="niklas"
                required
                @input=${this.checkTransactionInput}
              ></wa-input>
            </div>
            <div class="col-6 col-md-4 col-xl-2 mb-2">
              <wa-input
                class="amount-input-86"
                type="number"
                step=".01"
                id="amount"
                name="amount"
                placeholder="0.00"
                autocomplete="niklas"
                required
                @input=${this.checkTransactionInput}
              ></wa-input>
            </div>
            <div class="col-6 col-md-4 col-xl-2 mb-2">
              <wa-input type="date" id="date" name="date" required></wa-input>
            </div>
            <div class="col-12 col-md-8 col-xl-2 mb-2">
              <wa-button
                class="w-100"
                variant="primary"
                id="transaction-submit"
                type="submit"
                >Add Transaction</wa-button
              >
            </div>
          </div>
          ${this.sharedUsersSelectTemplate()}
          <div class="row">
            <nb-select .categories=${this.categories}></nb-select>
            <div>
              <wa-button
                variant="text"
                size="small"
                @click=${this.openCategoriesModal}
                >Create more categories</wa-button
              >
            </div>
          </div>
        </form>
      </wa-card>

      <search-budget-card .categories=${this.categories}></search-budget-card>

      <wa-card class="mb-4">
        <div id="transactionList" class="">${this.transactionsTemplate()}</div>
      </wa-card>

      <div id="moveModals"></div>
      <div id="deleteModals"></div>

      <share-budget-dialog id="share-budget-dialog"></share-budget-dialog> `;
  }
}
export default ViewBudget;

customElements.define("view-budget-el", ViewBudget);
