import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { postRequest } from "./fetch.mjs";
import { MoveTransactionModal } from "./moveTransactionElement.mjs";
import { DeleteTransactionModal } from "./deleteTransactionElement.mjs";

class NBTransaction extends NikElement {
  connectedCallback() {
    super.connectedCallback();

    if (CURRENT_USER_ID !== this.transaction.user_id) {
      return;
    }

    if (!this.deleteModal) {
      this.deleteModal = new DeleteTransactionModal(this);
    }
    if (!this.moveModal) {
      this.moveModal = new MoveTransactionModal(this);
    }
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
    this.transaction.editing = this.editing;
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
    response = await response.json();
    let newTransaction = response.transaction;
    this.transaction.name = newTransaction.name;
    this.transaction.amount = newTransaction.amount;

    options.changed = {
      name: newName !== name,
      date: newDate !== date,
      amount: newAmount !== amount,
    };

    this.dispatchEvent(
      new CustomEvent("RequestNewPages", {
        bubbles: true,
        detail: options,
      })
    );

    this.editing = false;
  }

  handleMoveTransactionClick() {
    this.moveModal.show();
  }

  handleDeleteClick() {
    this.deleteModal.show();
  }

  transferTemplate() {
    if (this.transaction.is_ransfer) {
      return html`<sl-tag
        class="width-fit-content fs-75"
        variant="primary"
        size="small"
        pill
        >Transfer</sl-tag
      >`;
    }
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
      <div class="d-flex align-items-center">
        <span class="fs-75 me-2"
          ><sl-format-date
            date=${this.transaction.date + "T00:00:00"}
            month="long"
            day="numeric"
            year="numeric"
          ></sl-format-date></span
        >${this.transferTemplate()}
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
    if (CURRENT_USER_ID !== this.transaction.user_id) {
      return html`<sl-tag variant="primary" size="small"
        >${SHARED_USERS[this.transaction.user_id].username}</sl-tag
      >`;
    }

    if (this.editing) {
      return html`<sl-tooltip content="Delete"
          ><sl-button
            variant="text"
            label="Delete"
            class="danger font-size-large"
            @click=${this.handleDeleteClick}
            ><sl-icon
              name="trash"
              label="Delete"
            ></sl-icon></sl-button></sl-tooltip
        ><sl-tooltip content="Move transaction"
          ><sl-button
            id="moveButton"
            variant="text"
            label="Move transaction"
            class="neutral font-size-large"
            @click=${this.handleMoveTransactionClick}
            ><sl-icon
              name="arrows-move"
              label="Move transaction"
            ></sl-icon></sl-button></sl-tooltip
        ><sl-tooltip content="Save"
          ><sl-button
            id="saveButton"
            label="Save"
            variant="text"
            class="font-size-large"
            @click=${this.handleSaveClick}
            ><sl-icon
              name="floppy-fill"
              label="Save"
            ></sl-icon></sl-button></sl-tooltip
        ><sl-tooltip content="Cancel"
          ><sl-button
            label="Cancel"
            variant="text"
            class="default font-size-large"
            @click=${this.handleEditClick}
            ><sl-icon name="x-lg" label="Cancel"></sl-icon></sl-button
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
