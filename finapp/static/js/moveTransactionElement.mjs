import { CustomElement } from "./customElement.mjs";

export class MoveTransactionModal extends CustomElement {
  get markup() {
    return `<template>
    <sl-dialog id="moveTransaction${
      this.transaction.transaction.id
    }" label='Move transaction named ${this.transaction.transaction.name}?'>
    <form action="${
      MOVE_TRANSACTION_URL + this.transaction.transaction.id
    }" method="POST">
      <input class="page-number" name="page" hidden="" type="number" value="1"></input>
      <sl-radio-group id="new_budget" name="new_budget" label="Select a budget">
        ${this.getAvailableBudgets()}
      </sl-radio-group>
    </form>
    <div class="row" slot="footer">
      <sl-button id="close-button" class="w-50" variant="neutral" outline>Cancel</sl-button>
      <sl-button id="submit-button" class="w-50" variant="primary">Move</sl-button>
    </div>
</sl-dialog>
    </template>`;
  }

  getAvailableBudgets() {
    let template = "";
    for (let budget of budgetsArray) {
      if (budget.id == this.transaction.transaction.budgetId) {
        continue;
      }
      template += `<sl-radio value="${budget.id}">${budget.budgetString}</sl-radio>`;
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
      `moveTransaction${this.transaction.transaction.id}`
    );
    this.submitButton = fragment.getElementById("submit-button");
    this.closeButton = fragment.getElementById("close-button");
    this.form = fragment.querySelector("form");
  }

  addEventListeners() {
    this.submitButton.addEventListener("click", this);
    this.closeButton.addEventListener("click", this);
  }

  handleEvent(event) {
    if (event.target.id === "submit-button") {
      this.handleTransactionMove();
    } else if (event.target.id === "close-button") {
      this.hide();
    }
  }

  show() {
    if (!this.element) {
      document.getElementById("moveModals").appendChild(this.fragment);
    }
    this.element.show();
  }

  hide() {
    this.element.hide();
  }

  async handleTransactionMove() {
    this.submitButton.loading = true;
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
    this.element.remove();
  }
}
