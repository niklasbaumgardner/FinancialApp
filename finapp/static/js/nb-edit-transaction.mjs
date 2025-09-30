import { html } from "./lit.bundle.mjs";
import "./nb-categories-select.mjs";
import { AddTransactionModal } from "./nb-add-transaction.mjs";

export class EditTransactionModal extends AddTransactionModal {
  static properties = {
    transaction: { type: Object },
  };

  static queries = {
    dialog: "wa-dialog",
    form: "form",
    budgetsSelect: "#budgets-select",
    usersSelect: "#user-select",
    categoriesSelect: "nb-categories-select",
    submitButton: "#submit-button",
    nameInput: "#name",
    dateInput: "#date",
    amountInput: "#amount",
  };

  get selectedBudget() {
    let currentBudgetId = this.budgetsSelect?.value;
    if (!currentBudgetId || !this.budgetsSelect) {
      currentBudgetId = this.transaction.budget_id;
    }

    let budget = this.budgets.find((b) => b.id == currentBudgetId);
    return budget;
  }

  connectedCallback() {
    super.connectedCallback();

    let users = [this.selectedBudget.user];
    users.push(...this.selectedBudget.shared_users);
    users.sort((a, b) => a.username.localeCompare(b.username));
    this.sharedUsers = users;
  }

  reset() {
    this.setLoadingState(false);

    this.hide();
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

  async handleTransactionAdd() {
    if (!this.form.reportValidity()) {
      return;
    }

    await this.setLoadingState(true);

    let currentCategories = this.transaction.categories.map(
      (c) => c.category_id
    );
    let newCategories = this.categoriesSelect.value;

    const { categoriesAdded, categoriesDeleted } = this.categoriesChange(
      currentCategories,
      newCategories
    );

    if (
      this.nameInput.value === this.transaction.name &&
      this.dateInput.value === this.transaction.date &&
      this.amountInput.value == this.transaction.amount &&
      this.budgetsSelect.value == this.transaction.budget_id &&
      this.usersSelect.value == this.transaction.user_id &&
      !categoriesAdded.length &&
      !categoriesDeleted.length
    ) {
      this.reset();
      return;
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

    let { transaction } = await response.json();
    this.transaction = transaction;

    document.dispatchEvent(
      new CustomEvent("UpdateTransaction", {
        bubbles: true,
        composed: true,
        detail: { transaction },
      })
    );

    this.reset();
  }

  budgetOptionsTemplate() {
    return this.budgets.map(
      (b) => html`<wa-option
        value=${b.id}
        ?selected=${b.id === this.transaction.budget_id}
        ><span class="wa-heading-s">${b.name}</span>:
        ${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(b.total)}</wa-option
      >`
    );
  }

  budgetsTemplate() {
    return html`<wa-select
      label="Select Budget"
      id="budgets-select"
      name="budget"
      required
      @input=${this.budgetChange}
      >${this.budgetOptionsTemplate()}</wa-select
    >`;
  }

  sharedUsersOptionsTemplate() {
    if (!this.selectedBudget || !this.sharedUsers) {
      return null;
    }

    return this.sharedUsers.map(
      (u) =>
        html`<wa-option
          ?selected=${u.id === this.transaction.user_id}
          value=${u.id}
          >${u.username}</wa-option
        >`
    );
  }

  sharedUsersSelectTemplate() {
    return html`<wa-select
      id="user-select"
      label="Select user for this transaction"
      name="user"
      ?disabled=${!this.selectedBudget}
      required
      >${this.sharedUsersOptionsTemplate()}</wa-select
    >`;
  }

  render() {
    return html`<wa-dialog
      label="Edit Transaction"
      @wa-after-show=${this.handleDialogShow}
    >
      <form class="wa-stack">
        <input
          name="return-transaction"
          type="text"
          class="hidden!"
          value="True"
          hidden
        />
        <div class="wa-stack">
          <wa-input
            label="Name"
            class="grow"
            type="text"
            id="name"
            name="name"
            placeholder="Spent too much?"
            autocomplete="niklas"
            value=${this.transaction.name}
            required
          ></wa-input>
          <div class="wa-cluster flex-nowrap!">
            <wa-input
              label="Amount"
              class="grow min-w-[0]"
              type="number"
              step=".01"
              id="amount"
              name="amount"
              placeholder="0.00"
              autocomplete="niklas"
              value=${this.transaction.amount}
              required
            ></wa-input>
            <wa-input
              label="Date"
              class="grow min-w-min"
              type="date"
              id="date"
              name="date"
              value=${this.transaction.date}
              required
            ></wa-input>
          </div>
        </div>
        ${this.budgetsTemplate()} ${this.sharedUsersSelectTemplate()}
        <div>
          <nb-categories-select
            .selected=${this.transaction.categories.map((c) => c.category_id)}
            .categories=${this.categories}
          ></nb-categories-select>
          <wa-button
            appearance="plain"
            variant="brand"
            size="small"
            @click=${this.openCategoriesModal}
            >Create more categories</wa-button
          >
        </div>
      </form>
      <div class="wa-cluster w-full" slot="footer">
        <wa-button
          class="grow"
          variant="neutral"
          appearance="outlined"
          data-dialog="close"
          >Cancel</wa-button
        ><wa-button
          id="submit-button"
          class="grow"
          variant="brand"
          @click=${this.handleTransactionAdd}
          >Update</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-edit-transaction", EditTransactionModal);
