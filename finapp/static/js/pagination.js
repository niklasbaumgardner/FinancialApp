"use strict";

const storage = window["localStorage"];
const PER_PAGE = 10;

class Pagination {
  #BUTTONS_VISIBLE = 5;
  constructor(transactions, numTransactions, currentPage, numPages) {
    this.currentRequests = {};
    this.visibleButtons = [];
    this.pageMap = {};
    this.numTransactions = numTransactions;
    this.numPages = numPages;

    this.pageMap[currentPage] = transactions;

    this.transactionContainer = document.getElementById("transactionList");
    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");
    this.init(currentPage);
  }

  init(currentPage) {
    this.prevButton.onclick = () => this.onPrevClick();
    this.nextButton.onclick = () => this.onNextClick();
    this.allPageButtons = this.createPageButtons();
    this.setCurrentPage(1 * currentPage);
  }

  async getPageData(page) {
    let response = await fetch(
      GET_PAGE_URL + "?" + new URLSearchParams({ page })
    );
    response = await response.json();
    return response;
  }

  requestPageData(page) {
    let request = fetch(GET_PAGE_URL + "?" + new URLSearchParams({ page }));
    return request;
  }

  async requestNewPages(options) {
    console.log(options);
    delete this.pageMap[this.currentPage];
    if (options.lessThanCurrentPage || options.greaterThanCurrentPage) {
      for (let key of Object.keys(this.pageMap)) {
        if (key < this.currentPage && options.lessThanCurrentPage) {
          delete this.pageMap[key];
          console.log("deleting pageMap key", key);
        }
        else if (key > this.currentPage && options.greaterThanCurrentPage) {
          delete this.pageMap[key];
          console.log("deleting pageMap key", key);
        }
      }
      for (let key of Object.keys(this.currentRequests)) {
        if (key < this.currentPage && options.lessThanCurrentPage) {
          delete this.currentRequests[key];
          console.log("deleting currentRequests key", key);
        }
        else if (key > this.currentPage && options.greaterThanCurrentPage) {
          delete this.currentRequests[key];
          console.log("deleting currentRequests key", key);
        }
      }
    }

    let data = await this.getPageData(this.currentPage);
    this.numTransactions = data.total;
    this.numPages = data.num_pages;

    this.pageMap[this.currentPage] = this.getTransactionArray(data);

    this.setCurrentPage(this.currentPage, true);
  }

  createPageButtons() {
    if (this.#BUTTONS_VISIBLE > this.numPages) {
      this.#BUTTONS_VISIBLE = this.numPages;
    }
    let buttonArr = [];
    for (let i = 1; i <= this.numPages; i++) {
      let button = this.createButton(i);
      buttonArr.push(button);
    }

    return buttonArr;
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

  setCurrentPage(newPage, flush=false) {
    if (!flush && newPage === this.currentPage) {
      return;
    }

    this.togglePrevButton();
    this.toggleNextButton();

    if (newPage >= this.numPages) {
      this.currentPage = this.numPages;
      this.toggleNextButton(true);
    }

    if (newPage <= 1) {
      this.currentPage = 1;
      this.togglePrevButton(true);
    }

    if (newPage > 1 && newPage < this.numPages) {
      this.currentPage = newPage;
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
    for (let i = -2; i < this.#BUTTONS_VISIBLE - 2; i++) {
      arr.push(this.currentPage + i);
    }

    let leftOOR = arr.filter((ele) => ele < 1).length;
    arr = arr.slice(leftOOR);

    if (arr.length < this.#BUTTONS_VISIBLE) {
    }
    while (arr.length < this.#BUTTONS_VISIBLE) {
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
      while (arr.length < this.#BUTTONS_VISIBLE) {
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
    for (let transaction of this.pageMap[this.currentPage]) {
      this.transactionContainer.appendChild(transaction.renderElement());
    }
    moveTransactionInputTo(storage.getItem("transactionInputLocation"));
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
    //
    if (this.prevButton.firstElementChild.disabled) {
      return;
    }
    console.log("clicked prev");
    this.setCurrentPage(this.currentPage - 1);
  }

  onNextClick() {
    //
    if (this.nextButton.firstElementChild.disabled) {
      return;
    }
    console.log("clicked next");
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