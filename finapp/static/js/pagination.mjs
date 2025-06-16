export class Pagination {
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
    this.#controller.transactions = [];
    this.#controller.updateComplete.then(() => {
      this.#controller.transactions = this.transactions;
    });
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

  get currentSort() {
    return (
      this.controller.nbSearchBudget?.currentSortValueAsJson ??
      '{"date":"desc"}'
    );
  }

  // TODO: Store transaction based sort
  getPage(page) {
    return this.pageMap[this.currentSort][page];
  }

  setPage(page, transactions) {
    this.pageMap[this.currentSort][page] = transactions;
  }

  deletePage(page) {
    delete this.pageMap[this.currentSort][page];
  }

  init() {
    this.requestNewPages({
      lessThanCurrentPage: true,
      greaterThanCurrentPage: true,
    });
  }

  getParams(page) {
    let params = new URLSearchParams();
    params.set("page", page);
    params.set("sort", this.currentSort);

    return params;
  }

  urlForPage(page) {
    let params = this.getParams(page);
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
      return;
    }

    this.currentPage = newPage;
    this.setTransactions();
    this.earlyFetchPages();
  }
}

export class Search extends Pagination {
  constructor(
    transactions,
    numTransactions,
    currentPage,
    numPages,
    url,
    controller
  ) {
    super(
      transactions,
      numTransactions,
      currentPage,
      numPages,
      url,
      controller
    );

    document.addEventListener("SearchInputChanged", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "SearchInputChanged":
        this.handleInputEvent(event);
        break;
    }
  }

  urlForPage(page) {
    let params = super.getParams(page);

    // Search params
    params.set("name", this.searchValues?.name ?? "");
    for (let category of this.searchValues?.categories ?? []) {
      params.append("categories", category);
    }
    if (this.searchValues?.amount) {
      params.set("amount", this.searchValues?.amount ?? "");
    } else {
      params.set("minAmount", this.searchValues?.minAmount ?? "");
      params.set("maxAmount", this.searchValues?.maxAmount ?? "");
    }
    params.set("startDate", this.searchValues?.startDate ?? "");
    params.set("endDate", this.searchValues?.endDate ?? "");

    return this.url + "?" + params;
  }

  debounce(callback, wait) {
    return (...args) => {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  async handleInputEvent(event) {
    this.searchValues = event.detail;

    if (this.lastSearchValues === this.searchValues) {
      return;
    }

    this.debounce(async () => {
      await this.requestNewPages({
        lessThanCurrentPage: true,
        greaterThanCurrentPage: true,
      });
    }, 300)();

    this.lastSearchValues = this.searchValues;
  }
}
