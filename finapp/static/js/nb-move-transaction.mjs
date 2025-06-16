import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class MoveTransactionModal extends NikElement {
  static properties = {
    transaction: { type: Object },
    budgets: { type: Array },
  };

  static queries = {
    dialog: "wa-dialog",
    submitButton: "#submit-button",
    form: "form",
  };

  get availableBudgets() {
    if (this.transaction.user_id !== CURRENT_USER.id) {
      const availableBudgets = this.budgets.filter(
        (b) =>
          b.id !== this.transaction.budget_id &&
          b.shared_users.length &&
          b.shared_users.find((su) => su.id === this.transaction.user_id)
      );

      return availableBudgets;
    }

    return this.budgets.filter((b) => b.id !== this.transaction.budget_id);
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

  async handleTransactionMove() {
    if (!this.form.checkValidity()) {
      return;
    }

    this.submitButton.loading = true;
    this.submitButton.disabled = true;

    let formData = new FormData(this.form);

    await fetch(this.transaction.move_transaction_url, {
      method: "POST",
      body: formData,
    });

    this.dispatchEvent(
      new CustomEvent("RequestNewPages", {
        bubbles: true,
        composed: true,
        detail: { greaterThanCurrentPage: true },
      })
    );

    this.remove();
  }

  availableNewBudgetsTemplate() {
    const moveableBudgets = this.availableBudgets;

    if (moveableBudgets.length) {
      return html`<wa-select
        id="new_budget"
        name="new_budget"
        label="Select a budget"
        required
      >
        ${moveableBudgets.map(
          (budget) =>
            html`<wa-option value="${budget.id}"
              ><span class="wa-heading-s">${budget.name}</span>:
              ${new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(budget.total)}</wa-option
            >`
        )}
      </wa-select>`;
    }

    return html`There are no other budgets shared with
    ${this.transaction.user.username}. You can only move this transaction to a
    budget ${this.transaction.user.username} has access to.`;
  }

  render() {
    return html`<wa-dialog
      label="Move transaction named ${this.transaction.name}?"
    >
      <form>${this.availableNewBudgetsTemplate()}</form>

      <div class="wa-cluster w-full" slot="footer">
        <wa-button
          id="close-button"
          class="grow"
          variant="neutral"
          appearance="outlined"
          data-dialog="close"
          >Cancel</wa-button
        >
        <wa-button
          id="submit-button"
          class="grow"
          variant="brand"
          @click=${this.handleTransactionMove}
          >Move</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-move-transaction", MoveTransactionModal);
