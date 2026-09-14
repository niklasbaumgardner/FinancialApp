import { BaseDialog } from "./nb-base-dialog.mjs";
import { html } from "lit";

export class DeleteBudget extends BaseDialog {
  static properties = {
    budget: { type: Object },
    transferBudgets: { type: Array },
  };

  static queries = {
    ...BaseDialog.queries,
    form: "form",
    deleteButton: "#delete-button",
  };

  reset() {
    this.deleteButton.loading = false;
    this.deleteButton.disabled = false;
    this.form.reset();
    this.hide();
  }

  async handleDeleteClick() {
    if (!this.form.reportValidity()) {
      return;
    }

    this.deleteButton.loading = true;
    this.deleteButton.disabled = true;

    let formData = new FormData(this.form);

    try {
      let response = await fetch(this.budget.delete_url, {
        method: "POST",
        body: formData,
      });

      await response.json();

      this.remove();
    } catch (e) {
      console.error(e);
      document
        .querySelector("nb-alert-manager")
        .pushAlert("Something went wrong", "danger");

      this.deleteButton.loading = false;
      this.deleteButton.disabled = false;
      this.reset();
    }

    document.dispatchEvent(
      new CustomEvent("UpdateBudgets", {
        bubbles: true,
      }),
    );
  }

  transferBudgetsTemplate() {
    return this.transferBudgets.map(
      (b) =>
        html`<wa-option name="new_budget" value=${b.id}>${b.name}</wa-option>`,
    );
  }

  labelTemplate() {
    return `Are you sure you want to delete this budget named "${
      this.budget.name
    }" ?`;
  }

  contentTemplate() {
    return html`<form>
      <wa-select
        label="Select a budget to transfer the transactions to"
        name="new_budget"
        required
      >
        <wa-option name="new_budget" value="null"
          >Delete this budget's transaction</wa-option
        >
        ${this.transferBudgetsTemplate()}
      </wa-select>
    </form>`;
  }

  footerTemplate() {
    return html`<div class="wa-cluster w-full" slot="footer">
      ${this.cancelButtonTemplate()}<wa-button
        id="delete-button"
        class="grow"
        variant="danger"
        @click=${this.handleDeleteClick}
        >Delete</wa-button
      >
    </div>`;
  }
}
customElements.define("nb-delete-budget-modal", DeleteBudget);
