import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./shareBudgetElement.mjs";
import "./nb-transaction.mjs";
import "./nb-categories-select.mjs";
import "./nb-search-budget.mjs";

class Pagination {
  #transactions = null;
  #numTransactions = null;
  #currentPage = null;
  #numPages = null;
  #url = null;
  #controller = null;

  constructor(
    transactions,
    numTransactions,
    currentPage,
    numPages,
    url,
    controller
  ) {
    this.currentRequests = {};
    this.pageMap = {};

    this.pageMap[currentPage] = transactions;

    this.#transactions = transactions;
    this.#numTransactions = numTransactions;
    this.#currentPage = currentPage;
    this.#numPages = numPages;
    this.#url = url;
    this.#controller = controller;
  }

  set transactions(newTransactions) {
    this.#transactions = newTransactions;
    this.#controller.transactions = this.transactions;
  }
  get transactions() {
    return this.#transactions;
  }

  set numTransactions(newNumTransactions) {
    this.#numTransactions = newNumTransactions;
    this.#controller.numTransactions = this.numTransactions;
  }
  get numTransactions() {
    return this.#numTransactions;
  }

  set currentPage(newCurrentPage) {
    this.#currentPage = newCurrentPage;
    this.#controller.currentPage = this.currentPage;
  }
  get currentPage() {
    return this.#currentPage;
  }

  set numPages(newNumPages) {
    this.#numPages = newNumPages;
    this.#controller.numPages = this.numPages;
  }
  get numPages() {
    return this.#numPages;
  }

  get url() {
    return this.#url;
  }

  get controller() {
    return this.#controller;
  }

  urlForPage(page) {
    let params = new URLSearchParams();
    params.set("page", page);
    params.set(
      "sort",
      this.controller.nbSearchBudget?.currentSortValueAsJson ??
        '{"date":"desc"}'
    );
    return this.url + "?" + params;
  }

  requestPageData(page) {
    let url = this.urlForPage(page);
    return fetch(url);
  }

  async getPageData(page) {
    let response = await this.requestPageData(page);
    response = await response.json();
    return response;
  }

  earlyFetchPages() {
    for (let pageNum of this.controller.getVisibleButtonNumbers()) {
      if (this.pageMap[pageNum] || this.currentRequests[pageNum]) {
        continue;
      }

      let request = this.requestPageData(pageNum);

      this.currentRequests[pageNum] = request;
    }
  }

  async requestNewPages(options) {
    delete this.pageMap[this.currentPage];
    console.log("deleting pageMap key", this.currentPage);
    if (options.lessThanCurrentPage || options.greaterThanCurrentPage) {
      for (let key of Object.keys(this.pageMap)) {
        if (key < this.currentPage && options.lessThanCurrentPage) {
          delete this.pageMap[key];
          console.log("deleting pageMap key", key);
        } else if (key > this.currentPage && options.greaterThanCurrentPage) {
          delete this.pageMap[key];
          console.log("deleting pageMap key", key);
        }
      }
      for (let key of Object.keys(this.currentRequests)) {
        if (key < this.currentPage && options.lessThanCurrentPage) {
          delete this.currentRequests[key];
          console.log("deleting currentRequests key", key);
        } else if (key > this.currentPage && options.greaterThanCurrentPage) {
          delete this.currentRequests[key];
          console.log("deleting currentRequests key", key);
        }
      }
    }

    if (options.deleteOnly) {
      return;
    }

    let data = await this.getPageData(this.currentPage);
    this.numTransactions = data.total;
    if (data.hasOwnProperty("budget_total")) {
      this.controller.budget.total = data.budget_total;
    }

    this.numPages = data.num_pages;

    // if (data.search_sum) {
    //   document.dispatchEvent(
    //     new CustomEvent("SearchTotalChanged", {
    //       detail: { searchSum: data.search_sum, searchCount: data.total },
    //     })
    //   );
    // }

    this.pageMap[this.currentPage] = data.transactions;

    this.setCurrentPage(this.currentPage, true);
  }

  async setTransactions() {
    if (!this.pageMap[this.currentPage]) {
      let data;
      if (this.currentRequests[this.currentPage]) {
        let response = await this.currentRequests[this.currentPage];
        data = await response.json();
        this.currentRequests[this.currentPage] = null;
      } else {
        data = await this.getPageData(this.currentPage);
      }
      this.pageMap[this.currentPage] = data.transactions;
    }

    this.transactions = this.pageMap[this.currentPage];
  }

  setCurrentPage(newPage, force = false) {
    newPage = Number(newPage);
    if (
      (!force && newPage === this.currentPage) ||
      newPage < 1 ||
      newPage > this.numPages
    ) {
      return this.currentPage;
    }

    this.currentPage = newPage;
    this.setTransactions();
    this.earlyFetchPages();
  }
}

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

  constructor() {
    super();

    this.pageMap = {};
    this.currentRequests = {};
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

    this.search = new Pagination([], 0, 1, 1, SEARCH_PAGE_URL, this);

    this.currentPagination = this.pagination;

    this.setCurrentPage(this.currentPage, true);

    document.addEventListener("RequestNewPages", this);
    document.addEventListener("SortingChanged", this);
    document.addEventListener("ToggleSearching", this);
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

  toggleSearch(searching) {
    this.searching = searching;

    // if (this.searching) {
    //   this.search.init(1);
    //   this.currentPagination = this.search;
    // } else {
    //   this.pagination.init(1);
    //   this.currentPagination = this.pagination;
    // }
  }

  handlePageButtonClick(event) {
    let button = event.target;
    let newPage = button.value;

    this.setCurrentPage(newPage);
  }

  setCurrentPage(newPage, force) {
    this.currentPagination.setCurrentPage(newPage, force);
  }

  // async setTransactions() {
  //   this.transactions =
  //     await this.currentPagination.getCurrentPageTransactions();
  // }

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
    return html`<div class="wa-split">
      <span class="wa-caption-l"
        >Showing ${(this.currentPage - 1) * 10 + 1} to ${this.currentPage * 10}
        of ${this.numTransactions} Results</span
      >

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

      <nb-search-budget .categories=${this.categories}></nb-search-budget>

      <wa-card class="">
        <div id="transactionList" class="">${this.transactionsTemplate()}</div>
      </wa-card>

      ${this.paginationButtonsTemplate()}
    </div>`;
  }
}
customElements.define("nb-view-budget", ViewBudget);
