import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class DeleteTransactionModal extends NikElement {
  static properties = {
    transaction: { type: Object },
  };

  static queries = {
    dialog: "wa-dialog",
    deleteButton: "#delete-button",
    form: "form",
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
    return html`<wa-dialog
      label="Are you sure you want to delete this transaction?"
    >
      <div class="wa-stack">
        <p>Transaction name: ${this.transaction.name}</p>
        <p>
          Transaction amount:
          <wa-format-number
            type="currency"
            currency="USD"
            value="${this.transaction.amount}"
            lang="en-US"
          ></wa-format-number>
        </p>
      </div>
      <div class="wa-cluster w-full" slot="footer">
        <wa-button
          id="close-button"
          class="grow"
          variant="neutral"
          appearance="outlined"
          data-dialog="close"
          >Cancel</wa-button
        ><wa-button
          id="delete-button"
          class="grow"
          variant="danger"
          @click=${this.handleTransactionDelete}
          >Delete</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-delete-transaction", DeleteTransactionModal);
