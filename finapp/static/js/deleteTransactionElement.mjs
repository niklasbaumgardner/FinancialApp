import { CustomElement } from "./customElement.mjs";

export class DeleteTransactionModal extends CustomElement {
  get markup() {
    return `<template>
      <sl-dialog
        id="deleteTransaction${this.transaction.transaction.id}"
        label="Are you sure you want to delete this transaction?"
      >
        <p>
          Transaction name: ${this.transaction.transaction.name}
        </p>
        <p>
          Transaction amount:
          <sl-format-number
            type="currency"
            currency="USD"
            value="${this.transaction.transaction.amount}"
            lang="en-US"
          ></sl-format-number>
        </p>
        <div class="row" slot="footer">
          <sl-button id="close-button" class="w-50" variant="neutral" outline>Cancel</sl-button
          ><sl-button id="delete-button" class="w-50" variant="danger">Delete</sl-button>
        </div>
      </sl-dialog>
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
      `deleteTransaction${this.transaction.transaction.id}`
    );
    this.submitButton = fragment.getElementById("delete-button");
    this.closeButton = fragment.getElementById("close-button");
  }

  addEventListeners() {
    this.submitButton.addEventListener("click", this);
    this.closeButton.addEventListener("click", this);
  }

  handleEvent(event) {
    if (event.target.id === "delete-button") {
      this.handleTransactionDelete();
    } else if (event.target.id === "close-button") {
      this.hide();
    }
  }

  show() {
    if (!this.element) {
      document.getElementById("deleteModals").appendChild(this.fragment);
    }
    this.element.show();
  }

  hide() {
    this.element.hide();
  }

  async handleTransactionDelete() {
    await deleteRequest(
      DELETE_TRANSACTION_URL + this.transaction.transaction.id
    );

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
