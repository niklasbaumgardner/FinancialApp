import { BaseDialog } from "./nb-base-dialog.mjs";
import { html } from "lit";

const DUPLICATE_NAME_MESSAGE = "A budget with that name already exists";

export class AddBudget extends BaseDialog {
  inputEvent = true;
  submitEvent = false;

  static properties = {
    budget: { type: Object },
    budgets: { type: Array },
  };

  static queries = {
    ...BaseDialog.queries,
    form: "form",
    submitButton: "#submit-button",
    nameInput: "#budget-name",
    amountInput: "#starting-budget-amount",
  };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("BudgetsUpdated", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "BudgetsUpdated": {
        const { budgets } = event.detail;

        this.budgets = budgets;
        break;
      }
    }
  }

  reset() {
    this.submitButton.disabled = false;
    this.submitButton.loading = false;
    this.form.reset();
    this.hide();
  }

  async handleInput() {
    await this.updateComplete;

    let newName = this.nameInput.value.trim();
    if (newName.length === 0) {
      this.submitButton.disabled = true;
      this.nameInput.hint = "";
      return;
    }

    let duplicates = this.budgets.filter((b) => b.name === newName);
    if (duplicates.length === 0) {
      this.submitButton.disabled = false;
      this.nameInput.hint = "";
    } else if (duplicates.length > 0) {
      this.submitButton.disabled = true;
      this.nameInput.hint = DUPLICATE_NAME_MESSAGE;
    }
  }

  async handleSaveClick() {
    if (!this.form.reportValidity()) {
      return;
    }

    this.submitButton.disabled = true;
    this.submitButton.loading = true;

    let formData = new FormData(this.form);

    let response = await fetch(ADD_NEW_BUDGET_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let { budget_id } = await response.json();
      this.reset();

      document.dispatchEvent(
        new CustomEvent("UpdateBudgets", {
          bubbles: true,
        }),
      );
    } else {
      document
        .querySelector("nb-alert-manager")
        .pushAlert("Something went wrong", "danger");

      this.submitButton.disabled = false;
      this.submitButton.loading = false;

      this.nameInput.hint = DUPLICATE_NAME_MESSAGE;
    }
  }

  labelTemplate() {
    return "Add New Budget";
  }

  contentTemplate() {
    return html`<form>
      <div class="wa-stack">
        <input hidden class="hidden" name="date" value=${CURRENT_DATE} />
        <wa-input
          autofocus
          id="budget-name"
          name="name"
          label="Budget name"
          placeholder="Hello world"
          autocomplete="niklas"
          required
        ></wa-input>
        <wa-input
          id="starting-budget-amount"
          type="number"
          name="amount"
          label="Starting amout"
          placeholder="$0.00"
          autocomplete="niklas"
        ></wa-input>
      </div>
    </form>`;
  }

  footerTemplate() {
    return html`<div class="wa-cluster w-full" slot="footer">
      ${this.cancelButtonTemplate()}
      <wa-button
        id="submit-button"
        class="grow"
        variant="brand"
        disabled
        @click=${this.handleSaveClick}
        >Add Budget</wa-button
      >
    </div>`;
  }
}
customElements.define("nb-add-budget", AddBudget);
