import { CustomElement } from "./customElement.mjs";

export class Transaction extends CustomElement {
  get markup() {
    return `<template>
      <transaction>
        <input
          class="page-number"
          name="page"
          hidden=""
          type="number"
          value="1"
        />
        <li class="list-group-item">
        <form
          id="transaction-${this.id}"
          action="${this.editURL}"
          method="POST"
        >
            <div class="transaction-grid">
              <div class="name">
                <div class="column-flex">
                  <p class="${this.showNotEditClass} fs-5 my-0">${this.name}</p>
                  <input
                    id="editName${this.id}"
                    class="${this.showEditClass} form-control"
                    name="editName${this.id}"
                    hidden=""
                    autocomplete="niklas"
                    type="text"
                    value="${this.name}"
                  />
                  <div class="column-flex">
                    <span class="${this.showNotEditClass} fs-75"
                      >${this.dateAsString}</span
                    ><input
                      id="editDate${this.id}"
                      class="${this.showEditClass} form-control form-control-sm w-75"
                      name="editDate${this.id}"
                      hidden=""
                      type="date"
                      value="${this.date}"
                    />
                  </div>
                </div>
              </div>
              <div class="amount">
                <div class="d-flex justify-content-center">
                  <p class="${this.showNotEditClass} fs-6 my-0">${this.stringAmount}</p>
                  <input
                    id="editAmount${this.id}"
                    class="${this.showEditClass} form-control edit-amount"
                    name="editAmount${this.id}"
                    hidden=""
                    autocomplete="niklas"
                    step=".01"
                    type="number"
                    value="${this.amount}"
                  />
                </div>
              </div>
              <div class="buttons">
                <div class="show-not-edit d-flex justify-content-end gap-3">
                  <button
                    class="btn btn-link icon-button"
                    id="edit-btn"
                    type="button" title="Edit this transaction"
                  ></button>
                  <button
                    class="btn btn-link icon-button"
                    id="delete-btn"
                    type="button"
                    title="Delete this transaction"
                  ></button>
                </div>
                <div class="show-edit d-flex justify-content-end gap-3" hidden="">
                  <button
                    class="btn btn-link icon-button"
                    id="update-btn"
                    type="button"
                    title="Save this transaction"
                  ></button>
                  <button
                    class="btn btn-link icon-button"
                    id="move-btn"
                    type="button"
                    title="Transfer transaction to another budget"
                  ></button>
                  <button
                    class="btn-close"
                    id="cancel-btn"
                    type="button"
                    title="Cancel"
                  ></button>
                </div>
              </div>
            </div>
          </form>
        </li>
      </transaction>
    </template>`;
  }

  constructor(
    id,
    name,
    amount,
    stringAmount,
    date,
    isTransfer,
    budgetId,
    editURL
  ) {
    super();

    this.id = id;
    this.name = name.replace("&#39;", "'");
    this.amount = amount;
    this.stringAmount = stringAmount;
    this.date = date;
    this.isTransfer = isTransfer === "True";
    this.budgetId = budgetId;
    this.editURL = editURL;
    this.element = null;

    this.deleteModal = new DeleteTransactionModal(this);
    this.moveModal = new MoveTransactionModal(this);
  }

  get showEditClass() {
    return `show-edit-${this.id}`;
  }

  get showNotEditClass() {
    return `show-not-edit-${this.id}`;
  }

  get dateAsString() {
    let date = new Date(this.date + "T00:00:00");
    let options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  get fragment() {
    let fragment = super.fragment;

    this.initializeElements(fragment);
    this.addEventListeners();

    return fragment;
  }

  initializeElements(fragment) {
    this.editButton = fragment.getElementById("edit-btn");
    this.moveButton = fragment.getElementById("move-btn");
    this.deleteButton = fragment.getElementById("delete-btn");
    this.updateButton = fragment.getElementById("update-btn");
    this.cancelButton = fragment.getElementById("cancel-btn");

    this.showNotEdit = fragment.querySelector(".show-not-edit");
    this.showEdit = fragment.querySelector(".show-edit");

    this.showNotEditElements = fragment.querySelectorAll(
      `.${this.showNotEditClass}`
    );
    this.showEditElements = fragment.querySelectorAll(`.${this.showEditClass}`);

    this.editDateElement = fragment.getElementById(`editDate${this.id}`);

    this.form = fragment.querySelector("form");
    this.element = fragment.querySelector("transaction");
  }

  addEventListeners() {
    this.editButton.addEventListener("click", this);
    this.moveButton.addEventListener("click", this);
    this.deleteButton.addEventListener("click", this);
    this.updateButton.addEventListener("click", this);
    this.cancelButton.addEventListener("click", this);
  }

  handleEvent(event) {
    switch (event.target.id) {
      case "edit-btn":
        this.handleEditTransaction(event);
        break;
      case "move-btn":
        this.handleMoveTransaction(event);
        break;
      case "delete-btn":
        this.handleDeleteTransaction(event);
        break;
      case "update-btn":
        this.handleUpdateTransaction(event);
        break;
      case "cancel-btn":
        this.handleCancelEditTransaction(event);
        break;
    }
  }

  handleEditTransaction(event) {
    this.element.toggleAttribute("editing", true);
    this.showNotEdit.hidden = true;
    for (let ele of this.showNotEditElements) {
      ele.hidden = true;
    }

    this.showEdit.hidden = false;
    for (let ele of this.showEditElements) {
      ele.hidden = false;
    }
  }

  handleMoveTransaction(event) {
    this.moveModal.show();
  }

  handleDeleteTransaction(event) {
    this.deleteModal.show();
  }

  async handleUpdateTransaction(event) {
    // this.pageInput.value = paginationOwner.currentPagination.currentPage;
    this.element.toggleAttribute("editing", false);

    let formData = new FormData(this.form);
    let url = this.form.action;

    let options = {};
    if (this.date > this.editDateElement.value) {
      options.greaterThanCurrentPage = true;
    } else {
      options.lessThanCurrentPage = true;
    }

    await postRequest(url, formData);
    this.element.dispatchEvent(
      new CustomEvent("RequestNewPages", {
        bubbles: true,
        composed: true,
        detail: options,
      })
    );
  }

  handleCancelEditTransaction(event) {
    this.element.toggleAttribute("editing", false);
    this.showNotEdit.hidden = false;
    for (let ele of this.showNotEditElements) {
      ele.hidden = false;
    }

    this.showEdit.hidden = true;
    for (let ele of this.showEditElements) {
      ele.hidden = true;
    }
  }
}

export class MoveTransactionModal extends CustomElement {
  get markup() {
    return `<template>
      <div id="moveTransaction${this.transaction.id}" class="modal">
        <div class="modal-dialog">
          <form action="${
            MOVE_TRANSACTION_URL + this.transaction.id
          }" method="POST">
            <input
              class="page-number"
              name="page"
              hidden=""
              type="number"
              value="1"
            />
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Move transaction named "${
                  this.transaction.name
                }"?</h5>
                <button class="btn-close close-button" type="button"></button>
              </div>
              <div class="modal-body">
                <p>Which budget would you like to move this transaction to?</p>
                <div class="form-outline mb-4">
                  <label>Select budget:</label
                  ><select
                    id="new_budget"
                    class="form-select form-select-sm w-75"
                    name="new_budget"
                  >
                    ${this.getAvailableBudgets()}
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-outline-secondary col w-50 close-button" type="button">
                  Cancel</button
                ><button id="submit-button" class="btn btn-primary col w-50" type="button">
                  Move
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>`;
  }

  getAvailableBudgets() {
    let template = "";
    for (let budget of budgetsArray) {
      if (budget.id == this.transaction.budgetId) {
        continue;
      }
      template += `<option value="${budget.id}">${budget.budgetString}</option>`;
    }
    return template;
  }

  constructor(transaction) {
    super();

    this.transaction = transaction;
    this.element = null;
  }

  get fragment() {
    let fragment = super.fragment;

    this.initializeElements(fragment);
    this.addEventListeners();

    return fragment;
  }

  initializeElements(fragment) {
    this.element = fragment.getElementById(
      `moveTransaction${this.transaction.id}`
    );
    this.submitButton = fragment.getElementById("submit-button");
    this.form = fragment.querySelector("form");
  }

  addEventListeners() {
    this.submitButton.addEventListener("click", this);

    for (let button of this.element.querySelectorAll(".close-button")) {
      button.addEventListener("click", this);
    }
  }

  handleEvent(event) {
    if (event.target.id === "submit-button") {
      this.handleTransactionMove();
    } else if (event.target.classList.contains("close-button")) {
      this.hide();
    }
  }

  show() {
    if (!this.element) {
      document.getElementById("moveModals").appendChild(this.fragment);
    }
    this.element.toggleAttribute("show", true);
  }

  hide() {
    this.element.toggleAttribute("show", false);
  }

  async handleTransactionMove() {
    let url = this.form.action;
    let formData = new FormData(this.form);

    await postRequest(url, formData);

    this.element.dispatchEvent(
      new CustomEvent("RequestNewPages", {
        bubbles: true,
        composed: true,
        detail: { greaterThanCurrentPage: true },
      })
    );

    this.hide();
  }
}

export class DeleteTransactionModal extends CustomElement {
  get markup() {
    return `<template>
      <div
        id="deleteTransaction${this.transaction.id}"
        class="modal"
      >
        <form action="${
          DELETE_TRANSACTION_URL + this.transaction.id
        }" method="POST"></form>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete transaction named "${
                this.transaction.name
              }"?</h5>
              <button class="btn-close close-button"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete transaction named "${
                this.transaction.name
              }"?</p>
              <p>Transaction amount: ${this.transaction.stringAmount}</p>
            </div>
            <div class="modal-footer">
              <input
                class="page-number"
                name="page"
                hidden=""
                type="number"
                value="1"
              /><button class="btn btn-outline-secondary col w-50 close-button" type="button">
                Cancel</button
              ><button id="delete-button" class="btn btn-danger col w-50" type="button">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>`;
  }

  constructor(transaction) {
    super();

    this.transaction = transaction;
    this.element = null;
  }

  get fragment() {
    let fragment = super.fragment;

    this.initializeElements(fragment);
    this.addEventListeners();

    return fragment;
  }

  initializeElements(fragment) {
    this.element = fragment.getElementById(
      `deleteTransaction${this.transaction.id}`
    );
    this.submitButton = fragment.getElementById("delete-button");
    this.form = fragment.querySelector("form");
  }

  addEventListeners() {
    this.submitButton.addEventListener("click", this);

    for (let button of this.element.querySelectorAll(".close-button")) {
      button.addEventListener("click", this);
    }
  }

  handleEvent(event) {
    if (event.target.id === "delete-button") {
      this.handleTransactionDelete();
    } else if (event.target.classList.contains("close-button")) {
      this.hide();
    }
  }

  show() {
    if (!this.element) {
      document.getElementById("deleteModals").appendChild(this.fragment);
    }
    this.element.toggleAttribute("show", true);
  }

  hide() {
    this.element.toggleAttribute("show", false);
  }

  async handleTransactionDelete() {
    let url = this.form.action;
    let formData = new FormData(this.form);

    await deleteRequest(url, formData);

    this.element.dispatchEvent(
      new CustomEvent("RequestNewPages", {
        bubbles: true,
        composed: true,
        detail: { greaterThanCurrentPage: true },
      })
    );

    this.hide();
  }
}
