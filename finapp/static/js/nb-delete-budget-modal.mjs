import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

export class DeleteBudget extends NikElement {
  static properties = {
    budget: { type: Object },
    transferBudgets: { type: Array },
  };

  static queries = {
    deleteButton: "#delete-button",
    dialog: "wa-dialog",
  };

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

  transferBudgetsTemplate() {
    return this.transferBudgets.map(
      (b) =>
        html`<wa-radio name="new_budget" value=${b.id}>${b.name}</wa-radio>`
    );
  }

  handleDeleteClick() {
    this.deleteButton.disabled = true;
    this.deleteButton.loading = true;
    this.deleteButton.requestUpdate();
  }

  render() {
    return html`<wa-dialog
      label='Are you sure you want to delete this budget named "${this.budget
        .name}" ?'
    >
      <form method="POST" id="delete-budget" action=${this.budget.delete_url}>
        <wa-radio-group
          label="Select a budget to transfer the transactions to"
          name="new_budget"
          required
        >
          <wa-radio name="new_budget" value="-1"
            >Delete transactions along with this budget</wa-radio
          >
          ${this.transferBudgetsTemplate()}
        </wa-radio-group>
      </form>
      <div class="wa-cluster w-full" slot="footer">
        <wa-button
          class="grow"
          variant="neutral"
          appearance="filled outlined"
          data-dialog="close"
          >Cancel</wa-button
        >
        <wa-button
          @click=${this.handleDeleteClick}
          id="delete-button"
          class="grow"
          variant="danger"
          type="submit"
          form="delete-budget"
          >Delete</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-delete-budget-modal", DeleteBudget);
