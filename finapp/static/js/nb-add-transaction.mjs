import { NikElement } from "./nik-element.mjs";
import { html } from "./bundle.mjs";
import "./nb-categories-select.mjs";

export class AddTransactionModal extends NikElement {
  static properties = {
    budgets: { type: Array },
    categories: { type: Array },
    sharedUsers: { type: Array },
  };

  static queries = {
    dialog: "wa-dialog",
    form: "form",
    budgetsSelect: "#budgets-select",
    usersSelect: "#user-select",
    submitButton: "#submit-button",
    nameInput: "#name",
  };

  get selectedBudget() {
    let currentBudgetId = this.budgetsSelect?.value;
    if (!currentBudgetId) {
      return null;
    }

    let budget = this.budgets.find((b) => b.id == currentBudgetId);
    return budget;
  }

  connectedCallback() {
    super.connectedCallback();

    this.budgets.sort((a, b) => a.name.localeCompare(b.name));
  }

  handleDialogShow(event) {
    if (event.target !== this.dialog) {
      return;
    }

    this.nameInput.focus();
  }

  show() {
    customElements.whenDefined("wa-dialog").then(() => {
      this.updateComplete.then(() => {
        this.dialog.updateComplete.then(() => {
          this.dialog.open = true;
        });
      });
    });
  }

  hide() {
    this.dialog.open = false;
  }

  reset() {
    this.submitButton.loading = false;
    this.submitButton.disabled = false;
    this.sharedUsers = [];
    this.form.reset();
    this.hide();
  }

  async handleTransactionAdd() {
    if (!this.form.reportValidity()) {
      return;
    }

    this.submitButton.loading = true;
    this.submitButton.disabled = true;

    let formData = new FormData(this.form);

    let response = await fetch(this.selectedBudget.add_transaction_url, {
      method: "POST",
      body: formData,
    });

    let { transaction } = await response.json();

    document.dispatchEvent(
      new CustomEvent("AddTransaction", {
        bubbles: true,
        composed: true,
        detail: { transaction },
      })
    );

    this.reset();
  }

  async budgetChange() {
    if (!this.selectedBudget) {
      return;
    }

    let users = [this.selectedBudget.user];
    users.push(...this.selectedBudget.shared_users);
    users.sort((a, b) => a.username.localeCompare(b.username));
    this.sharedUsers = users;
  }

  openCategoriesModal() {
    document.querySelector("nb-category-modal").show();
  }

  budgetOptionsTemplate() {
    return this.budgets.map(
      (b) => html`<wa-option value=${b.id}
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
        html`<wa-option ?selected=${CURRENT_USER.id === u.id} value=${u.id}
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
      label="Add New Transaction"
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
              required
            ></wa-input>
            <wa-input
              label="Date"
              class="grow min-w-min"
              type="date"
              id="date"
              name="date"
              value=${CURRENT_DATE}
              required
            ></wa-input>
          </div>
        </div>
        ${this.budgetsTemplate()} ${this.sharedUsersSelectTemplate()}
        <div>
          <nb-categories-select
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
          >Add Transaction</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-add-transaction", AddTransactionModal);
