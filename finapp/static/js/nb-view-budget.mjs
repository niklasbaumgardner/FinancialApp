import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./shareBudgetElement.mjs";
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

    this.pagination = new Pagination(
      this.transactions,
      this.numTransactions,
      this.currentPage,
      this.numPages,
      GET_PAGE_URL,
      this
    );

    this.search = new Search([], 0, 1, 1, SEARCH_PAGE_URL, this);

    this.currentPagination = this.pagination;

    this.setCurrentPage(this.currentPage, true);

    document.addEventListener("RequestNewPages", this);
    document.addEventListener("SortingChanged", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "RequestNewPages":
        this.requestNewPages(event.detail);
        break;
      case "SortingChanged":
        this.handleSortingChanged(event);
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
      return html`<div class="flex justify-center">
        <p class="wa-heading-m">No transactions found</p>
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
          appearance=${n !== this.currentPage ? "outlined" : null}
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
          ${this.currentPage * 10} of ${this.numTransactions} Results`;
    }

    return html`<div class="wa-split">
      <span class="wa-caption-l">${paginationResultsText}</span>

      <wa-button-group
        orientation="horizontal"
        @click=${this.handlePageButtonClick}
      >
        <wa-button
          id="prev"
          appearance="outlined"
          label="Previous page"
          value=${this.currentPage - 1}
          ?disabled=${this.currentPage === 1}
        >
          <wa-icon
            class="pointer-events-none"
            library="ion"
            name="chevron-back-outline"
          ></wa-icon>
        </wa-button>
        ${this.pageButtonsTemplate()}
        <wa-button
          id="next"
          appearance="outlined"
          label="Next page"
          value=${this.currentPage + 1}
          ?disabled=${this.currentPage === this.numPages}
        >
          <wa-icon
            class="pointer-events-none"
            library="ion"
            name="chevron-forward-outline"
          ></wa-icon>
        </wa-button>
      </wa-button-group>
    </div>`;
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

          <div class="wa-cluster @5xl:flex-nowrap!">
            <wa-input
              class="grow basis-[200%]"
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
