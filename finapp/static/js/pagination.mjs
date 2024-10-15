export class Pagination {
  constructor(transactions, numTransactions, currentPage, numPages, url) {
    this.currentRequests = {};
    this.visibleButtons = [];
    this.pageMap = {};
    this.numTransactions = numTransactions;
    this.numPages = numPages;
    this.URL = url;
    this.BUTTONS_VISIBLE = 5;
    this.sort = '{"date":"desc"}';

    this.pageMap[currentPage] = transactions;

    this.transactionContainer = document.getElementById("transactionList");
    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");
  }

  init(currentPage) {
    this.createAllPageButtons();
    this.setCurrentPage(1 * currentPage, true);
  }

  pageUrlWithParams(page) {
    params.set("page", page);
    params.set("sort", this.sort);
    return this.URL + "?" + params;
  }

  async getPageData(page) {
    let url = this.pageUrlWithParams(page);
    let response = await fetch(url);
    response = await response.json();
    return response;
  }

  requestPageData(page) {
    let url = this.pageUrlWithParams(page);
    let request = fetch(url);
    return request;
  }

  /**
   * options object
   *  {
   *    lessThanCurrentPage
   *    greatherThanCurrentPage
   *  }
   */
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
      document.getElementById("budgetTotal").value = data.budget_total;
    }

    this.numPages = data.num_pages;
    this.createAllPageButtons();

    if (data.search_sum) {
      document.dispatchEvent(
        new CustomEvent("SearchTotalChanged", {
          detail: { searchSum: data.search_sum, searchCount: data.total },
        })
      );
    }

    this.pageMap[this.currentPage] = data.transactions;

    this.setCurrentPage(this.currentPage, true);
  }

  createAllPageButtons() {
    if (this.allPageButtons) {
      for (let button of this.allPageButtons) {
        button.remove();
      }
    }
    this.allPageButtons = [];
    for (let i = 1; i <= this.numPages; i++) {
      let button = this.createButton(i);
      this.allPageButtons.push(button);
    }

    this.BUTTONS_VISIBLE = Math.min(this.numPages, 5);
  }

  createButton(pageNum) {
    let button = document.createElement("sl-button");
    button.textContent = pageNum;
    button.variant = "default";
    button.onclick = () => this.setCurrentPage(pageNum);

    return button;
  }

  togglePrevButton(disable = false) {
    this.prevButton.disabled = disable;
  }

  toggleNextButton(disable = false) {
    this.nextButton.disabled = disable;
  }

  setCurrentPage(newPage, flush = false) {
    if (!flush && newPage === this.currentPage) {
      return;
    }

    this.togglePrevButton();
    this.toggleNextButton();

    this.currentPage = newPage;

    if (newPage >= this.numPages) {
      this.currentPage = this.numPages;
      this.toggleNextButton(true);
    }

    if (newPage <= 1) {
      this.currentPage = 1;
      this.togglePrevButton(true);
    }

    this.updatePage();
    this.updatePageButtons();
    this.getPageDataForPotentialPages();
  }

  clearPageButtons() {
    let buttons = document.querySelectorAll(".pagination > sl-button");
    for (let i = 1; i < buttons.length - 1; i++) {
      buttons[i].remove();
    }
    this.visibleButtons = [];
  }

  updateVisibleButtons() {
    let arr = [];
    for (let i = -2; i < this.BUTTONS_VISIBLE - 2; i++) {
      arr.push(this.currentPage + i);
    }

    let leftOOR = arr.filter((ele) => ele < 1).length;
    arr = arr.slice(leftOOR);

    if (arr.length < this.BUTTONS_VISIBLE) {
    }
    while (arr.length < this.BUTTONS_VISIBLE) {
      let num = arr[arr.length - 1];
      if (num) {
        num += 1;
      } else {
        num = 1;
      }
      arr.push(num);
    }

    let rightOOR = arr.filter((ele) => ele > this.allPageButtons.length);
    for (let _ of rightOOR) {
      arr.pop();
    }

    if (leftOOR === 0) {
      while (arr.length < this.BUTTONS_VISIBLE) {
        arr.unshift(arr[0] - 1);
      }
    }
    console.log(arr);

    let start = arr[0] - 1;
    let end = arr[arr.length - 1];

    let buttonsListEle = document.querySelector(".pagination");

    for (let i = start; i < end; i++) {
      let button = this.allPageButtons[i];
      button.variant = i + 1 === this.currentPage ? "primary" : "default";
      buttonsListEle.insertBefore(button, this.nextButton);
    }

    this.visibleButtons = arr;
  }

  updatePageButtons() {
    this.clearPageButtons();
    this.updateVisibleButtons();
  }

  async addTransactionsToContainer() {
    if (!this.pageMap[this.currentPage]) {
      let data;
      if (this.currentRequests[this.currentPage]) {
        let request = await this.currentRequests[this.currentPage];
        data = await request.json();
        this.currentRequests[this.currentPage] = null;
      } else {
        data = await this.getPageData(this.currentPage);
      }
      this.pageMap[this.currentPage] = data.transactions;
    }

    document.dispatchEvent(
      new CustomEvent("UpdateTransactions", {
        detail: { transactions: this.pageMap[this.currentPage] },
      })
    );
  }

  updatePage() {
    this.addTransactionsToContainer();

    let allPageNumberInputs = document.querySelectorAll(".page-number");
    for (let input of allPageNumberInputs) {
      input.setAttribute("value", this.currentPage);
    }
  }

  async getPageDataForPotentialPages() {
    for (let pageNum of this.visibleButtons) {
      if (this.pageMap[pageNum] || this.currentRequests[pageNum]) {
        continue;
      }

      let request = this.requestPageData(pageNum);

      this.currentRequests[pageNum] = request;
    }
  }
}

export class Search extends Pagination {
  constructor(transactions, numTransactions, currentPage, numPages, url) {
    super(transactions, numTransactions, currentPage, numPages, url);

    document.addEventListener("SearchInputChanged", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "SearchInputChanged":
        this.handleInputEvent(event);
        break;
    }
  }

  pageUrlWithParams(page) {
    this.setSearchParams();
    let url = super.pageUrlWithParams(page);
    this.removeSearchParams();

    return url;
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

      this.createAllPageButtons();
      this.updatePageButtons();
    }, 300)();

    this.lastSearchValues = this.searchValues;
  }

  setSearchParams() {
    params.set("name", this.searchValues?.name ?? "");
    for (let category of this.searchValues?.categories) {
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
  }

  removeSearchParams() {
    params.delete("name");
    params.delete("categories");
    params.delete("startDate");
    params.delete("endDate");
    params.delete("amount");
    params.delete("minAmount");
    params.delete("maxAmount");
  }
}
