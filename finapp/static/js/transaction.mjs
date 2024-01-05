import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { postRequest } from "./fetch.mjs";
import { MoveTransactionModal } from "./moveTransactionElement.mjs";
import { DeleteTransactionModal } from "./deleteTransactionElement.mjs";

class NBTransaction extends NikElement {
  constructor() {
    super();

    this.deleteModal = new DeleteTransactionModal(this);
    this.moveModal = new MoveTransactionModal(this);
  }
  static properties = {
    editing: { type: Boolean, reflect: true },
    transaction: { type: Object },
  };

  static get queries() {
    return {
      editNameEl: "#editName",
      editDateEl: "#editDate",
      editAmountEl: "#editAmount",
      saveButtonEl: "#saveButton",
    };
  }

  handleEditClick() {
    this.editing = !this.editing;
  }

  async handleSaveClick() {
    this.saveButtonEl.loading = true;
    let newName = this.editNameEl.value;
    let newDate = this.editDateEl.value;
    let newAmount = Number(this.editAmountEl.value);

    let { name, date, amount } = this.transaction;

    if (name === newName && date === newDate && amount === newAmount) {
      this.editing = false;
      return;
    }

    let options = {};
    if (date > newDate) {
      options.greaterThanCurrentPage = true;
    } else {
      options.lessThanCurrentPage = true;
    }

    console.log(options);

    let formData = new FormData();
    formData.set("name", newName);
    formData.set("amount", newAmount);
    formData.set("date", newDate);
    let response = await postRequest(this.transaction.editUrl, formData);

    if (newDate !== date || newAmount !== amount) {
      this.dispatchEvent(
        new CustomEvent("RequestNewPages", {
          bubbles: true,
          detail: options,
        })
      );
    } else {
      response = await response.json();
      let newTransaction = JSON.parse(response.transaction);
      this.transaction.name = newTransaction.name;
      this.transaction.amount = newTransaction.amount;
      this.editing = false;
    }
  }

  handleMoveTransactionClick() {
    this.moveModal.show();
  }

  handleDeleteClick() {
    this.deleteModal.show();
  }

  nameTemplate() {
    if (this.editing) {
      return html`<sl-input
          id="editName"
          name="editName"
          autocomplete="niklas"
          value="${this.transaction.name}"
        ></sl-input>
        <sl-input
          id="editDate"
          class="width-fit-content"
          name="editDate"
          type="date"
          value="${this.transaction.date}"
          size="small"
        ></sl-input>`;
    }

    return html`<p class="fs-5 my-0">${this.transaction.name}</p>
      <div class="column-flex">
        <span class="fs-75"
          ><sl-format-date
            date=${this.transaction.date + "T00:00:00"}
            month="long"
            day="numeric"
            year="numeric"
          ></sl-format-date
        ></span>
      </div>`;
  }

  amountTemplate() {
    if (this.editing) {
      return html`<sl-input
        id="editAmount"
        name="editAmount"
        class="flex-shrink-0 edit-amount"
        autocomplete="niklas"
        step=".01"
        type="number"
        value="${this.transaction.amount}"
      ></sl-input>`;
    }

    return html`<sl-format-number
      class="my-0 flex-shrink-0 width-fit-content"
      type="currency"
      currency="USD"
      value="${this.transaction.amount}"
      lang="en-US"
    ></sl-format-number>`;
  }

  buttonsTempate() {
    if (this.editing) {
      return html`<sl-tooltip content="Delete"
          ><sl-icon-button
            class="icon-danger icon-fs-20"
            name="trash"
            @click=${this.handleDeleteClick}
          ></sl-icon-button></sl-tooltip
        ><sl-tooltip content="Move"
          ><sl-icon-button
            class="icon-fs-20"
            name="arrows-move"
            id="moveButton"
            variant="primary"
            @click=${this.handleMoveTransactionClick}
            outline
          ></sl-icon-button></sl-tooltip
        ><sl-tooltip content="Save"
          ><sl-icon-button
            class="icon-primary icon-fs-20"
            name="floppy-fill"
            id="saveButton"
            variant="primary"
            @click=${this.handleSaveClick}
          ></sl-icon-button></sl-tooltip
        ><sl-tooltip content="Cancel"
          ><sl-icon-button
            class="icon-fs-20"
            name="x-lg"
            library="system"
            label="Cancel"
            @click=${this.handleEditClick}
          ></sl-icon-button
        ></sl-tooltip>`;
    }

    return html`<sl-tooltip content="Edit"
      ><sl-icon-button
        class="icon-primary icon-fs-18"
        name="pencil-square"
        label="Settings"
        @click=${this.handleEditClick}
      ></sl-icon-button
    ></sl-tooltip>`;
  }

  template() {
    return html`<div class="name">
        <div class="column-flex">${this.nameTemplate()}</div>
      </div>
      <div class="amount">${this.amountTemplate()}</div>
      <div class="buttons transaction-buttons">${this.buttonsTempate()}</div>`;
  }

  render() {
    return html`<div class="transaction-grid">${this.template()}</div>`;
  }
}

export default NBTransaction;

customElements.define("nb-transaction", NBTransaction);
