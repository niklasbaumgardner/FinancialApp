"use strict";

const storage = window["localStorage"];
const PER_PAGE = 10;

class PaginationOwner {
  constructor(transactions, numTransactions, currentPage, numPages) {
    this.searching = false;
    this.pagination = new Pagination(
      transactions,
      numTransactions,
      currentPage,
      numPages,
      GET_PAGE_URL
    );
    this.pagination.init(currentPage);

    this.search = new Search([], 0, 1, 1, SEARCH_PAGE_URL);

    this.searchIcon = document.getElementById("searchIcon");
    this.searchInputs = document.getElementById("searchInputs");

    for (let searchButton of document.querySelectorAll(".search-toggle")) {
      searchButton.addEventListener("click", (event) => {
        this.searchClickFunction(event);
      });
    }

    this.sortOptions = document.querySelectorAll(
      "#sort-options .dropdown-item"
    );
    for (let sortButton of this.sortOptions) {
      sortButton.addEventListener("click", (event) => {
        this.sortTransactions(event);
      });
    }
  }

  toggleSearch() {
    this.searching = !this.searching;

    if (this.searching) {
      this.search.clearInputs();
      this.search.init(1);
    } else {
      this.pagination.init(1);
    }
  }

  searchClickFunction(event) {
    this.searchIcon.toggleAttribute("hidden");
    this.searchInputs.toggleAttribute("hidden");

    this.toggleSearch();
  }

  async sortTransactions(event) {
    let button = event.target;
    for (let sortButton of this.sortOptions) {
      sortButton.classList.remove("active");
    }

    button.classList.add("active");

    console.log(event);

    this.pagination.sort = button.value;

    await this.pagination.requestNewPages({
      lessThanCurrentPage: true,
      greaterThanCurrentPage: true,
    });
  }
}

class Pagination {
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
    this.budgetTotalElement = document.getElementById("budgetTotal");

    this.prevButton.onclick = () => this.onPrevClick();
    this.nextButton.onclick = () => this.onNextClick();
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

    let data = await this.getPageData(this.currentPage);
    this.numTransactions = data.total;

    this.numPages = data.num_pages;
    this.createAllPageButtons();

    if (data.budget_total) {
      this.budget_total = data.budget_total;
      this.budgetTotalElement.textContent = this.budget_total;
    }

    this.pageMap[this.currentPage] = this.getTransactionArray(data);

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
    let li = document.createElement("li");
    li.classList.add("page-item");

    let button = document.createElement("button");
    button.classList.add("page-link");
    button.textContent = pageNum;
    button.onclick = () => this.setCurrentPage(pageNum);

    li.appendChild(button);

    return li;
  }

  togglePrevButton(disable = false) {
    this.prevButton.classList.toggle("disabled", disable);
    this.prevButton.firstElementChild.disabled = disable;
  }

  toggleNextButton(disable = false) {
    this.nextButton.classList.toggle("disabled", disable);
    this.nextButton.firstElementChild.disabled = disable;
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
    let buttons = document.querySelectorAll(".pagination > li");
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
      button.classList.toggle("active", i + 1 === this.currentPage);
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
      this.pageMap[this.currentPage] = this.getTransactionArray(data);
    }

    let noTransactionsFound = document.getElementById("emptyTransaction");
    if (this.pageMap[this.currentPage].length) {
      noTransactionsFound.toggleAttribute("hidden", true);
      for (let transaction of this.pageMap[this.currentPage]) {
        this.transactionContainer.appendChild(transaction.renderElement());
      }
    } else {
      noTransactionsFound.toggleAttribute("hidden", false);
    }
  }

  clearTransactionContainer() {
    let transactions = document.querySelectorAll("#transactionList > form");
    for (let t of transactions) {
      t.remove();
    }
  }

  updatePage() {
    this.clearTransactionContainer();
    this.addTransactionsToContainer();

    let allPageNumberInputs = document.querySelectorAll(".page-number");
    for (let input of allPageNumberInputs) {
      input.setAttribute("value", this.currentPage);
    }
  }

  onPrevClick() {
    if (this.prevButton.firstElementChild.disabled) {
      return;
    }
    this.setCurrentPage(this.currentPage - 1);
  }

  onNextClick() {
    if (this.nextButton.firstElementChild.disabled) {
      return;
    }
    this.setCurrentPage(this.currentPage + 1);
  }

  getTransactionArray(data) {
    let newTransactionArray = [];
    for (let t of data.transactions) {
      let transaction = new Transaction(...t);
      newTransactionArray.push(transaction);
    }

    return newTransactionArray;
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

class Search extends Pagination {
  constructor(transactions, numTransactions, currentPage, numPages, url) {
    super(transactions, numTransactions, currentPage, numPages, url);

    this.searchName = document.getElementById("searchName");
    this.searchDate = document.getElementById("searchDate");
    this.searchAmount = document.getElementById("searchAmount");

    this.searchName.addEventListener("input", this);
    this.searchDate.addEventListener("input", this);
    this.searchAmount.addEventListener("input", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "input": {
        this.handleInputEvent(event);
      }
    }
  }

  pageUrlWithParams(page) {
    this.setSearchParams();
    let url = super.pageUrlWithParams(page);
    this.removeSearchParams();

    return url;
  }

  async handleInputEvent(event) {
    await this.requestNewPages({
      lessThanCurrentPage: true,
      greaterThanCurrentPage: true,
    });

    this.createAllPageButtons();
    this.updatePageButtons();
  }

  clearInputs() {
    this.searchName.value = "";
    this.searchDate.value = "";
    this.searchAmount.value = "";

    if (this.currentPage) {
      this.requestNewPages({
        lessThanCurrentPage: true,
        greaterThanCurrentPage: true,
      });
    }
  }

  setSearchParams() {
    params.set("name", this.searchName.value);
    params.set("date", this.searchDate.value);
    params.set("amount", this.searchAmount.value);
  }

  removeSearchParams() {
    params.delete("name");
    params.delete("date");
    params.delete("amount");
  }
}
