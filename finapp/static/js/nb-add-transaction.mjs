import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class AddTransactionModal extends NikElement {
  static properties = {
    budgets: { type: Array },
  };

  static queries = {
    dialog: "wa-dialog",
    form: "form",
    budgetsSelect: "#budgets-select",
    usersSelect: "#user-select",
    submitButton: "#submit-button",
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
    this.form.reset();
    this.hide();
  }

  async handleTransactionAdd() {
    this.submitButton.loading = true;
    this.submitButton.disabled = true;

    let response = await fetch(this.selectedBudget.add_transaction_url, {
      method: "POST",
    });

    this.dispatchEvent(
      new CustomEvent("RequestNewPages", {
        bubbles: true,
        composed: true,
        detail: { greaterThanCurrentPage: true },
      })
    );

    this.reset();
  }

  async budgetChange() {
    this.requestUpdate();
    await this.updateComplete;
    this.usersSelect.value = "";
    this.usersSelect.value = `${CURRENT_USER.id}`;
    this.usersSelect.requestUpdate();
  }

  openCategoriesModal() {
    document.querySelector("nb-category-modal").show();
  }

  budgetOptionsTemplate() {
    return this.budgets.map(
      (b) => html`<wa-option value=${b.id}>${b.name}</wa-option>`
    );
  }

  budgetsTemplate() {
    return html`<wa-select
      label="Select Budget"
      name="budget"
      id="budgets-select"
      required
      @input=${this.budgetChange}
      >${this.budgetOptionsTemplate()}</wa-select
    >`;
  }

  sharedUsersOptionsTemplate() {
    if (!this.selectedBudget) {
      return null;
    }

    let users = [this.selectedBudget.user];
    users.push(...this.selectedBudget.shared_users);

    return users.map(
      (u) => html`<wa-option value=${u.id}>${u.username}</wa-option>`
    );
  }

  sharedUsersSelectTemplate() {
    return html`<wa-select
      id="user-select"
      label="Select user for this transaction"
      name="user"
      value=${CURRENT_USER.id}
      ?disabled=${!this.selectedBudget}
      required
      >${this.sharedUsersOptionsTemplate()}</wa-select
    >`;
  }

  render() {
    return html`<wa-dialog label="Add New Transaction">
      <form class="wa-stack">
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
            @input=${this.checkTransactionInput}
          ></wa-input>
          <div class="wa-cluster">
            <wa-input
              label="Amount"
              class="grow"
              type="number"
              step=".01"
              id="amount"
              name="amount"
              placeholder="0.00"
              autocomplete="niklas"
              required
              @input=${this.checkTransactionInput}
            ></wa-input>
            <wa-input
              label="Date"
              class="grow"
              type="date"
              id="date"
              name="date"
              value=${new Date().toISOString().substring(0, 10)}
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
          id="delete-button"
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
