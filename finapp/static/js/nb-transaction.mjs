import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { postRequest } from "./fetch.mjs";
import "./nb-select.mjs";
import "./nb-move-transaction.mjs";
import "./nb-delete-transaction.mjs";

export class Transaction extends NikElement {
  connectedCallback() {
    super.connectedCallback();

    this.transaction.categories.sort((a, b) =>
      a.category.name.localeCompare(b.category.name)
    );
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
      categoriesSelect: "nb-select",
    };
  }

  categoriesChange(oldCategories, newCategories) {
    let oldCategoriesSet = new Set(oldCategories);
    let newCategoriesSet = new Set(newCategories);

    let categoriesAdded = Array.from(
      newCategoriesSet.difference(oldCategoriesSet)
    );
    let categoriesDeleted = Array.from(
      oldCategoriesSet.difference(newCategoriesSet)
    );

    return { categoriesAdded, categoriesDeleted };
  }

  handleEditClick() {
    this.editing = !this.editing;
  }

  async handleSaveClick() {
    this.saveButtonEl.loading = true;
    this.saveButtonEl.disabled = true;

    let newName = this.editNameEl.value;
    let newDate = this.editDateEl.value;
    let newAmount = Number(this.editAmountEl.value);

    let currentCategories = this.transaction.categories.map(
      (c) => c.category_id
    );
    let newCategories = this.categoriesSelect.value;

    const { categoriesAdded, categoriesDeleted } = this.categoriesChange(
      currentCategories,
      newCategories
    );

    let { name, date, amount } = this.transaction;

    if (
      name === newName &&
      date === newDate &&
      amount === newAmount &&
      !categoriesAdded.length &&
      !categoriesDeleted.length
    ) {
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
    for (let c_id of categoriesAdded) {
      formData.append("categoriesAdded", c_id);
    }
    for (let c_id of categoriesDeleted) {
      formData.append("categoriesDeleted", c_id);
    }

    let response = await postRequest(this.transaction.edit_url, formData);
    response = await response.json();
    let newTransaction = response.transaction;
    this.transaction.name = newTransaction.name;
    this.transaction.amount = newTransaction.amount;
    this.transaction.categories = newTransaction.categories;
    this.transaction.categories.sort((a, b) =>
      a.category.name.localeCompare(b.category.name)
    );

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

    this.saveButtonEl.loading = false;
    this.saveButtonEl.disabled = false;
    this.editing = false;
  }

  handleMoveTransactionClick() {
    if (!this.moveModal) {
      this.moveModal = document.createElement("nb-move-transaction");
      this.moveModal.transaction = this.transaction;
      this.moveModal.budgets = BUDGETS;
      document.body.appendChild(this.moveModal);
    }

    this.moveModal.show();
  }

  handleDeleteClick() {
    if (!this.deleteModal) {
      this.deleteModal = document.createElement("nb-delete-transaction");
      this.deleteModal.transaction = this.transaction;
      document.body.appendChild(this.deleteModal);
    }

    this.deleteModal.show();
  }

  transferTemplate() {
    if (this.transaction.is_transfer) {
      return html`<wa-tag
        class="width-fit-content fs-75"
        variant="primary"
        size="small"
        pill
        >Transfer</wa-tag
      >`;
    }
  }

  nameTemplate() {
    if (this.editing) {
      return html`<wa-input
          id="editName"
          name="editName"
          autocomplete="niklas"
          value="${this.transaction.name}"
        ></wa-input>
        <wa-input
          id="editDate"
          class="width-fit-content"
          name="editDate"
          type="date"
          value="${this.transaction.date}"
          size="small"
        ></wa-input>`;
    }

    return html`<p class="fs-5 my-0">${this.transaction.name}</p>
      <div class="d-flex align-items-center">
        <span class="fs-75 me-2"
          ><wa-format-date
            date=${this.transaction.date + "T00:00:00"}
            month="long"
            day="numeric"
            year="numeric"
          ></wa-format-date></span
        >${this.transferTemplate()}
      </div>`;
  }

  amountTemplate() {
    if (this.editing) {
      return html`<wa-input
        id="editAmount"
        name="editAmount"
        class="flex-shrink-0 edit-amount"
        autocomplete="niklas"
        step=".01"
        type="number"
        value="${this.transaction.amount}"
      ></wa-input>`;
    }

    return html`<wa-format-number
      class="my-0 flex-shrink-0 width-fit-content"
      type="currency"
      currency="USD"
      value="${this.transaction.amount}"
      lang="en-US"
    ></wa-format-number>`;
  }

  buttonsTempate() {
    if (this.editing) {
      return html`<wa-tooltip content="Delete"
          ><wa-button
            variant="text"
            label="Delete"
            class="danger font-size-large"
            @click=${this.handleDeleteClick}
            ><wa-icon
              name="trash"
              label="Delete"
            ></wa-icon></wa-button></wa-tooltip
        ><wa-tooltip content="Move transaction"
          ><wa-button
            id="moveButton"
            variant="text"
            label="Move transaction"
            class="neutral font-size-large"
            @click=${this.handleMoveTransactionClick}
            ><wa-icon
              name="arrows-move"
              label="Move transaction"
            ></wa-icon></wa-button></wa-tooltip
        ><wa-tooltip content="Save"
          ><wa-button
            id="saveButton"
            label="Save"
            variant="text"
            class="font-size-large"
            @click=${this.handleSaveClick}
            ><wa-icon
              name="floppy-fill"
              label="Save"
            ></wa-icon></wa-button></wa-tooltip
        ><wa-tooltip content="Cancel"
          ><wa-button
            label="Cancel"
            variant="text"
            class="default font-size-large"
            @click=${this.handleEditClick}
            ><wa-icon name="x-lg" label="Cancel"></wa-icon></wa-button
        ></wa-tooltip>`;
    }

    return html`${CURRENT_USER.id !== this.transaction.user_id
        ? html`<wa-tag variant="primary" size="small"
            >${this.transaction.user.username}</wa-tag
          >`
        : null}<wa-tooltip content="Edit"
        ><wa-icon-button
          class="icon-primary icon-fs-18"
          name="pencil-square"
          label="Settings"
          @click=${this.handleEditClick}
        ></wa-icon-button
      ></wa-tooltip>`;
  }

  template() {
    return html`<div class="name">
        <div class="column-flex">${this.nameTemplate()}</div>
      </div>
      <div class="amount">${this.amountTemplate()}</div>
      <div class="buttons transaction-buttons">${this.buttonsTempate()}</div>`;
  }

  categoriesTemplate() {
    if (this.editing) {
      return html`<div>
        <nb-select
          .categories=${CATEGORIES}
          selected="${this.transaction.categories.reduce(
            (acc, cur) => acc + " " + cur.category_id,
            ""
          )}"
        ></nb-select>
      </div>`;
    }

    return html`<div class="existing-categories mt-3">
      ${this.transaction.categories.map(
        (c) =>
          html`<nb-category
            name="${c.category.name}"
            color="${c.category.color}"
          ></nb-category>`
      )}
    </div>`;
  }

  render() {
    return html`<div class="transaction-grid">${this.template()}</div>
      ${this.categoriesTemplate()}`;
  }
}

customElements.define("nb-transaction", Transaction);
