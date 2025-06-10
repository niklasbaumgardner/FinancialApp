import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class DeleteTransactionModal extends NikElement {
  static properties = {
    transaction: { type: Object },
  };

  static queries = {
    dialog: "sl-dialog",
    deleteButton: "#delete-button",
    form: "form",
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

  async handleTransactionDelete() {
    this.deleteButton.loading = true;
    this.deleteButton.disabled = true;

    await fetch(this.transaction.delete_url, {
      method: "DELETE",
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

  render() {
    return html`<sl-dialog
      label="Are you sure you want to delete this transaction?"
    >
      <p>Transaction name: ${this.transaction.name}</p>
      <p>
        Transaction amount:
        <sl-format-number
          type="currency"
          currency="USD"
          value="${this.transaction.amount}"
          lang="en-US"
        ></sl-format-number>
      </p>
      <div class="row" slot="footer">
        <sl-button
          id="close-button"
          class="w-50"
          variant="neutral"
          outline
          @click=${this.hide}
          >Cancel</sl-button
        ><sl-button
          id="delete-button"
          class="w-50"
          variant="danger"
          @click=${this.handleTransactionDelete}
          >Delete</sl-button
        >
      </div>
    </sl-dialog>`;
  }
}
customElements.define("nb-delete-transaction", DeleteTransactionModal);
