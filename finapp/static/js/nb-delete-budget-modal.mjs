import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class DeleteBudget extends NikElement {
  static properties = {
    budget: { type: Object },
    transferBudgets: { type: Array },
  };

  static queries = {
    deleteButton: "#delete-button",
    dialog: "sl-dialog",
  };

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

  transferBudgetsTemplate() {
    return this.transferBudgets.map(
      (b) =>
        html`<sl-radio name="new_budget" value=${b.id}>${b.name}</sl-radio>`
    );
  }

  handleDeleteClick() {
    this.deleteButton.disabled = true;
    this.deleteButton.loading = true;
  }

  render() {
    return html`<sl-dialog
      label='Are you sure you want to delete this budget named "${this.budget
        .name}" ?'
    >
      <form method="POST" id="delete-budget" action=${this.budget.delete_url}>
        <sl-radio-group
          label="Select a budget to transfer the transactions to"
          name="new_budget"
          required
        >
          <sl-radio name="new_budget" value="-1"
            >Delete transactions along with this budget</sl-radio
          >
          ${this.transferBudgetsTemplate()}
        </sl-radio-group>
      </form>
      <div class="row" slot="footer">
        <sl-button class="w-50" variant="neutral" outline @click=${this.hide}
          >Cancel</sl-button
        >
        <sl-button
          @click=${this.handleDeleteClick}
          id="delete-button"
          class="w-50"
          variant="danger"
          type="submit"
          form="delete-budget"
          >Delete</sl-button
        >
      </div>
    </sl-dialog>`;
  }
}
customElements.define("nb-delete-budget-modal", DeleteBudget);
