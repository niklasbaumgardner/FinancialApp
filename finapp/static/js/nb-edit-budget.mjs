import { BaseDialog } from "./nb-base-dialog.mjs";
import { html } from "lit";
import "./nb-categories-select.mjs";
import "./nb-pending-transaction.mjs";
import "./budgets.mjs";

export class EditBudgetModal extends BaseDialog {
  inputEvent = true;
  submitEvent = false;

  static properties = {
    budget: { type: Object },
    budgets: { type: Array },
  };

  static queries = {
    ...BaseDialog.queries,
    submitButton: "#edit-budget-button",
    form: "form",
    nameInput: "#name",
    activeSwitch: "wa-switch",
  };

  init() {
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
    } else if (duplicates.length === 1) {
      let duplicate = duplicates[0];
      if (duplicate.id === this.budget.id) {
        // Duplicate is this. Set to initial state
        this.submitButton.disabled = true;
        this.nameInput.hint = "";
      } else {
        this.submitButton.disabled = true;
        this.nameInput.hint = "A budget with that name already exists";
      }
    } else {
      this.submitButton.disabled = true;
      this.nameInput.hint = "A budget with that name already exists";
    }
  }

  reset() {
    this.submitButton.loading = false;
    this.submitButton.disabled = false;
    this.form.reset();
    this.hide();
  }

  async handleBudgetEdit() {
    if (!this.form.reportValidity()) {
      return;
    }

    this.submitButton.loading = true;
    this.submitButton.disabled = true;

    let formData = new FormData(this.form);

    try {
      let response = await fetch(this.budget.edit_url, {
        method: "POST",
        body: formData,
      });

      await response.json();

      this.budget.name = this.nameInput.value;
      this.budget.is_active = this.activeSwitch.checked;
    } catch (e) {
      console.log(e);
      document
        .querySelector("nb-alert-manager")
        .pushAlert("Something went wrong", "danger");
    }

    document.dispatchEvent(
      new CustomEvent("UpdateBudgets", {
        bubbles: true,
      }),
    );

    this.reset();
  }

  labelTemplate() {
    return `Edit ${this.budget.name}`;
  }

  contentTemplate() {
    return html`<form>
      <div class="wa-stack">
        <wa-input
          autofocus
          label="Name"
          class="grow"
          type="text"
          id="name"
          name="name"
          placeholder="Budget name"
          value=${this.budget.name}
          autocomplete="niklas"
          required
        ></wa-input>
        <wa-switch name="active" ?checked=${this.budget.is_active}
          >Active</wa-switch
        >
      </div>
    </form>`;
  }

  footerTemplate() {
    return html`<div class="wa-cluster w-full" slot="footer">
      ${this.cancelButtonTemplate()}<wa-button
        id="edit-budget-button"
        class="grow"
        variant="brand"
        @click=${this.handleBudgetEdit}
        disabled
        >Save</wa-button
      >
    </div>`;
  }
}
customElements.define("nb-edit-budget", EditBudgetModal);
