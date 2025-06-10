import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class MoveTransactionModal extends NikElement {
  static properties = {
    transaction: { type: Object },
    budgets: { type: Array },
  };

  static queries = {
    dialog: "sl-dialog",
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

  handleEvent(event) {
    if (event.target.id === "submit-button") {
      this.handleTransactionMove();
    } else if (event.target.id === "close-button") {
      this.hide();
    }
  }

  show() {
    this.updateComplete.then(() => {
      this.dialog.updateComplete.then(() => {
        this.dialog.show();
      });
    });
  }

  hide() {
    this.dialog.hide();
  }

  async handleTransactionMove() {
    this.submitButton.loading = true;
    this.submitButton.disabled = true;

    let formData = new FormData(this.form);

    await postRequest(this.transaction.url, formData);

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
      return html`<sl-radio-group
        id="new_budget"
        name="new_budget"
        label="Select a budget"
        required
      >
        ${moveableBudgets.map(
          (budget) =>
            html`<sl-radio value="${budget.id}">${budget.name}</sl-radio>`
        )}
      </sl-radio-group>`;
    }

    return html`There are no other budgets shared with
    ${this.transaction.user.username}. You can only move this transaction to a
    budget ${this.transaction.user.username} has access to.`;
  }

  render() {
    return html`<sl-dialog
      label="Move transaction named ${this.transaction.name}?"
    >
      <form>
        <input
          class="page-number"
          name="page"
          hidden=""
          type="number"
          value="1"
        />
        ${this.availableNewBudgetsTemplate()}
      </form>

      <div class="row" slot="footer">
        <sl-button
          id="close-button"
          class="w-50"
          variant="neutral"
          outline
          @click=${this.hide}
          >Cancel</sl-button
        >
        <sl-button
          id="submit-button"
          class="w-50"
          variant="primary"
          @click=${this.handleTransactionMove}
          >Move</sl-button
        >
      </div>
    </sl-dialog>`;
  }
}
customElements.define("nb-move-transaction", MoveTransactionModal);
