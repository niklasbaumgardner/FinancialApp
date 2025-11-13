import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-categories-select.mjs";
import "./nb-move-transaction.mjs";
import "./nb-delete-transaction.mjs";

export class Transaction extends NikElement {
  static properties = {
    editing: { type: Boolean, reflect: true },
    transaction: { type: Object },
    categories: { type: Array },
  };

  static get queries() {
    return {
      nameInput: "#name",
      dateInput: "#date",
      amountInput: "#amount",
      saveButton: "#save-button",
      categoriesSelect: "nb-categories-select",
      form: "form",
      buttons: { all: "wa-button" },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.transaction.categories.sort((a, b) =>
      a.category.name.localeCompare(b.category.name)
    );
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

  setEditingState() {
    this.editing = true;
  }

  setViewingState() {
    for (let button of this.buttons) {
      button.disabled = false;
    }

    this.saveButton.loading = false;
    this.editing = false;
  }

  async handleSaveClick() {
    this.saveButton.loading = true;

    for (let button of this.buttons) {
      button.disabled = true;
    }

    let newName = this.nameInput.value;
    let newDate = this.dateInput.value;
    let newAmount = Number(this.amountInput.value);

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
      this.setViewingState();
      return;
    }

    let options = {};
    if (date > newDate) {
      options.greaterThanCurrentPage = true;
    } else {
      options.lessThanCurrentPage = true;
    }

    let formData = new FormData(this.form);

    for (let c_id of categoriesAdded) {
      formData.append("categoriesAdded", c_id);
    }
    for (let c_id of categoriesDeleted) {
      formData.append("categoriesDeleted", c_id);
    }

    let response = await fetch(this.transaction.edit_url, {
      method: "POST",
      body: formData,
    });
    response = await response.json();

    this.transaction = response.transaction;
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

    this.setViewingState();
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
      return html`<wa-tag class="w-fit" variant="primary" size="small" pill
        >Transfer</wa-tag
      >`;
    }
  }

  editButtonsTempate() {
    return html`<wa-tooltip for="delete-transaction-${this.transaction.id}"
        >Delete</wa-tooltip
      ><wa-button
        class="icon-button"
        id="delete-transaction-${this.transaction.id}"
        variant="danger"
        appearance="plain"
        @click=${this.handleDeleteClick}
        ><wa-icon
          label="Delete"
          library="ion"
          name="trash-outline"
          class="text-(length:--wa-font-size-l)"
        ></wa-icon></wa-button
      ><wa-tooltip for="move-transaction-${this.transaction.id}"
        >Move Transaction</wa-tooltip
      ><wa-button
        class="icon-button"
        id="move-transaction-${this.transaction.id}"
        appearance="plain"
        @click=${this.handleMoveTransactionClick}
        ><wa-icon
          label="Move Transaction"
          library="ion"
          name="move-outline"
          class="text-(length:--wa-font-size-l)"
        ></wa-icon></wa-button
      ><wa-tooltip for="save-button">Save</wa-tooltip
      ><wa-button
        class="icon-button"
        id="save-button"
        variant="brand"
        appearance="plain"
        @click=${this.handleSaveClick}
        ><wa-icon
          label="Save"
          library="ion"
          name="save"
          class="text-(length:--wa-font-size-l)"
        ></wa-icon></wa-button
      ><wa-tooltip for="cancel-${this.transaction.id}">Cancel</wa-tooltip
      ><wa-button
        class="icon-button"
        appearance="plain"
        id="cancel-${this.transaction.id}"
        @click=${this.setViewingState}
        ><wa-icon
          label="Cancel"
          library="remix"
          name="system/close-large-line"
          class="text-(length:--wa-font-size-l)"
        ></wa-icon
      ></wa-button>`;
  }

  viewButtonsTemplate() {
    return html`${CURRENT_USER.id !== this.transaction.user_id
        ? html`<wa-tag variant="primary" size="small"
            >${this.transaction.user.username}</wa-tag
          >`
        : null}
      <wa-tooltip for="edit-transaction-${this.transaction.id}"
        >Edit</wa-tooltip
      >
      <wa-button
        class="icon-button"
        appearance="plain"
        variant="brand"
        id="edit-transaction-${this.transaction.id}"
        @click=${this.setEditingState}
        ><wa-icon
          library="ion"
          name="create-outline"
          label="Edit"
          class="text-(length:--wa-font-size-l)"
        ></wa-icon
      ></wa-button>`;
  }

  viewTemplate() {
    return html`<div class="wa-stack">
      <div class="wa-grid transaction-grid">
        <div class="name">
          <div class="wa-stack gap-(--wa-space-xs)!">
            <span class="wa-body-m">${this.transaction.name}</span>
            <div class="wa-cluster">
              <wa-format-date
                class="w-fit wa-body-xs"
                date=${this.transaction.date + "T00:00:00"}
                month="long"
                day="numeric"
                year="numeric"
              ></wa-format-date
              >${this.transferTemplate()}
            </div>
          </div>
        </div>
        <div class="flex justify-center items-start amount">
          <wa-format-number
            class="wa-body-m"
            type="currency"
            currency="USD"
            value=${this.transaction.amount}
            lang="en-US"
          ></wa-format-number>
        </div>
        <div class="wa-cluster justify-end! items-start! buttons">
          ${this.viewButtonsTemplate()}
        </div>
      </div>
      <div class="wa-cluster gap-(--wa-space-2xs)!">
        ${this.transaction.categories.map(
          (c) =>
            html`<nb-category
              name="${c.category.name}"
              color="${c.category.color}"
            ></nb-category>`
        )}
      </div>
    </div>`;
  }

  editTemplate() {
    return html`<form class="wa-stack">
      <div class="wa-grid transaction-grid">
        <div class="name">
          <div class="wa-stack gap-(--wa-space-xs)!">
            <wa-input
              id="name"
              name="name"
              label="Name"
              autocomplete="niklas"
              value=${this.transaction.name}
              required
            ></wa-input>
            <wa-input
              id="date"
              class="w-fit"
              name="date"
              type="date"
              label="Date"
              value=${this.transaction.date}
              size="small"
              required
            ></wa-input>
          </div>
        </div>
        <div class="flex justify-center items-start amount">
          <wa-input
            id="amount"
            name="amount"
            label="Amount"
            class="min-w-[0]"
            autocomplete="niklas"
            step=".01"
            type="number"
            value=${this.transaction.amount}
            required
          ></wa-input>
        </div>
        <div class="wa-cluster justify-end! items-start! buttons">
          ${this.editButtonsTempate()}
        </div>
      </div>

      <nb-categories-select
        .categories=${this.categories}
        .selected=${this.transaction.categories.map((c) => c.category_id)}
      ></nb-categories-select>
    </form>`;
  }

  render() {
    if (this.editing) {
      return this.editTemplate();
    }
    return this.viewTemplate();
  }
}

customElements.define("nb-transaction", Transaction);
