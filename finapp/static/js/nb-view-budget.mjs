import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-share-budget-dialog.mjs";
import "./nb-transaction.mjs";
import "./nb-categories-select.mjs";
import "./nb-search-budget.mjs";
import { Pagination, Search } from "./pagination.mjs";

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

  static queries = {
    nbSearchBudget: "nb-search-budget",
  };

  get numVisibleButtons() {
    return Math.min(this.numPages, 5);
  }

  connectedCallback() {
    super.connectedCallback();

    // this.searching = false;
    // this.pagination = new Pagination(
    //   this.transactions,
    //   this.numTransactions,
    //   this.currentPage,
    //   this.numPages,
    //   GET_PAGE_URL
    // );
    // this.pagination.init(this.currentPage);

    // this.currentPagination = this.pagination;

    // this.search = new Search([], 0, 1, 1, SEARCH_PAGE_URL);
    const currentPageParams = window.location.search;

    this.pagination = new Pagination(
      this.transactions,
      this.numTransactions,
      this.currentPage,
      this.numPages,
      GET_PAGE_URL,
      currentPageParams,
      this
    );

    this.search = new Search(
      [],
      0,
      1,
      1,
      SEARCH_PAGE_URL,
      currentPageParams,
      this
    );

    this.currentPagination = this.pagination;

    this.setCurrentPage(this.currentPage, true);

    document.addEventListener("RequestNewPages", this);
    document.addEventListener("SortingChanged", this);
    document.addEventListener("CategoriesChanged", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "RequestNewPages":
        this.requestNewPages(event.detail);
        break;
      case "SortingChanged":
        this.handleSortingChanged(event);
        break;
      case "CategoriesChanged":
        this.handleCategoriesChanged(event);
        break;
    }
  }

  requestNewPages(options) {
    this.currentPagination.requestNewPages(options);
    // if (this.currentPagination === this.search) {
    //   this.pagination.requestNewPages({ deleteOnly: true, ...options });
    // }
  }

  handleSortingChanged(event) {
    let sort = event.detail.sort;
    this.currentPagination.sort = sort;

    this.requestNewPages({
      lessThanCurrentPage: true,
      greaterThanCurrentPage: true,
    });
  }

  handleCategoriesChanged(event) {
    let { categories } = event.detail;
    if (!categories) {
      return;
    }

    this.categories = categories;

    let transcationEls = document.querySelectorAll("nb-transaction");
    for (let t of transcationEls) {
      if (t.editing) {
        t.requestUpdate();
      }
    }
  }

  toggleSearch(event) {
    this.searching = event.detail.searching;

    if (this.searching) {
      this.search.init();
      this.currentPagination = this.search;
    } else {
      this.pagination.init();
      this.currentPagination = this.pagination;
    }
  }

  handlePageButtonClick(event) {
    let button = event.target;
    let newPage = button.value;

    this.setCurrentPage(newPage);
  }

  setCurrentPage(newPage, force) {
    this.currentPagination.setCurrentPage(newPage, force);
  }

  sharedUsersTemplate() {
    if (!this.budget.shared_users?.length) {
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
    let users = [this.budget.user];
    users.push(...this.budget.shared_users);

    return users.map(
      (u) =>
        html`<wa-option ?selected=${CURRENT_USER.id === u.id} value=${u.id}
          >${u.username}</wa-option
        >`
    );
  }

  sharedUsersSelectTemplate() {
    if (!this.budget.shared_users?.length) {
      return null;
    }

    return html`<wa-select label="Select user for this transaction" name="user"
      >${this.sharedUsersOptionsTemplate()}</wa-select
    >`;
  }

  transactionsTemplate() {
    if (!this.transactions?.length) {
      return html`<div class="flex justify-center">
        <p class="wa-heading-m">No transactions found</p>
      </div>`;
    }

    return this.transactions
      .flatMap((t) => [
        html`<nb-transaction
          .transaction=${t}
          .categories=${this.categories}
          ?editing=${t.editing ?? false}
        ></nb-transaction>`,
        html`<wa-divider></wa-divider>`,
      ])
      .slice(0, -1);
  }

  getVisibleButtonNumbers() {
    let pageButtonNumbers = [];
    for (let i = -2; i < this.numVisibleButtons - 2; i++) {
      pageButtonNumbers.push(this.currentPage + i);
    }

    let leftOOR = pageButtonNumbers.filter((ele) => ele < 1).length;
    pageButtonNumbers = pageButtonNumbers.slice(leftOOR);

    while (pageButtonNumbers.length < this.numVisibleButtons) {
      let num = pageButtonNumbers[pageButtonNumbers.length - 1];
      if (num) {
        num += 1;
      } else {
        num = 1;
      }
      pageButtonNumbers.push(num);
    }

    let rightOOR = pageButtonNumbers.filter((ele) => ele > this.numPages);
    for (let _ of rightOOR) {
      pageButtonNumbers.pop();
    }

    if (leftOOR === 0) {
      while (pageButtonNumbers.length < this.numVisibleButtons) {
        pageButtonNumbers.unshift(pageButtonNumbers[0] - 1);
      }
    }

    return pageButtonNumbers;
  }

  pageButtonsTemplate() {
    let pageButtonNumbers = this.getVisibleButtonNumbers();

    return pageButtonNumbers.map(
      (n) =>
        html`<wa-button
          value=${n}
          variant=${n === this.currentPage ? "brand" : null}
          appearance=${n !== this.currentPage ? "filled-outlined" : null}
          >${n}</wa-button
        >`
    );
  }

  paginationButtonsTemplate() {
    let paginationResultsText = "";
    if (this.numTransactions === 0) {
      paginationResultsText = "Showing 0 to 0 of 0 Results";
    } else {
      paginationResultsText = `Showing ${(this.currentPage - 1) * 10 + 1} to
          ${Math.min(this.numTransactions, this.currentPage * 10)} of ${
        this.numTransactions
      } Results`;
    }

    return html`<div class="wa-split">
      <span class="wa-body-m">${paginationResultsText}</span>

      <wa-button-group
        orientation="horizontal"
        @click=${this.handlePageButtonClick}
      >
        <wa-button
          id="prev"
          appearance="filled-outlined"
          value=${this.currentPage - 1}
          ?disabled=${this.currentPage === 1}
        >
          <wa-icon
            label="Previous page"
            class="pointer-events-none"
            library="ion"
            name="chevron-back-outline"
          ></wa-icon>
        </wa-button>
        ${this.pageButtonsTemplate()}
        <wa-button
          id="next"
          appearance="filled-outlined"
          value=${this.currentPage + 1}
          ?disabled=${this.currentPage === this.numPages}
        >
          <wa-icon
            label="Next page"
            class="pointer-events-none"
            library="ion"
            name="chevron-forward-outline"
          ></wa-icon>
        </wa-button>
      </wa-button-group>
    </div>`;
  }

  openCategoriesModal() {
    document.querySelector("nb-category-modal").show();
  }

  handleShareButtonClick() {
    if (!this.shareBudgetDialog) {
      this.shareBudgetDialog = document.createElement("nb-share-budget-dialog");
      this.shareBudgetDialog.url = this.budget.share_budget_url;
      document.body.append(this.shareBudgetDialog);
    }

    this.shareBudgetDialog.show();
  }

  render() {
    return html`<div class="wa-stack">
      <wa-card>
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
            <div class="wa-cluster">
              ${this.sharedUsersTemplate()}<wa-tooltip for="share-budget-button"
                >Share this budget</wa-tooltip
              >
              <wa-button
                id="share-budget-button"
                class="icon-button"
                appearance="plain"
                size="small"
                @click=${this.handleShareButtonClick}
                ><wa-icon
                  name="share-social-outline"
                  library="ion"
                  label="Share this budget"
                  class="text-(length:--wa-font-size-l)"
                ></wa-icon
              ></wa-button>
            </div>
          </div>

          <div class="wa-cluster @5xl:flex-nowrap! items-end!">
            <wa-input
              class="grow basis-[200%]"
              type="text"
              id="name"
              name="name"
              label="Name"
              placeholder="Spent too much?"
              autocomplete="niklas"
              required
              @input=${this.checkTransactionInput}
            ></wa-input>
            <wa-input
              class="grow basis-[0]"
              type="number"
              step=".01"
              id="amount"
              name="amount"
              label="Amount"
              placeholder="0.00"
              autocomplete="niklas"
              required
              @input=${this.checkTransactionInput}
            ></wa-input>
            <wa-input
              class="grow basis-[0]"
              type="date"
              id="date"
              name="date"
              label="Date"
              value=${CURRENT_DATE}
              required
            ></wa-input>
            <wa-button
              class="grow basis-full"
              variant="brand"
              id="transaction-submit"
              type="submit"
              >Add Transaction</wa-button
            >
          </div>
          ${this.sharedUsersSelectTemplate()}
          <div>
            <nb-categories-select
              .categories=${this.categories}
            ></nb-categories-select>
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

      <nb-search-budget
        @ToggleSearching=${this.toggleSearch}
        .categories=${this.categories}
      ></nb-search-budget>

      <wa-card class="">
        <div id="transactionList" class="">${this.transactionsTemplate()}</div>
      </wa-card>

      ${this.paginationButtonsTemplate()}
    </div>`;
  }
}
customElements.define("nb-view-budget", ViewBudget);
