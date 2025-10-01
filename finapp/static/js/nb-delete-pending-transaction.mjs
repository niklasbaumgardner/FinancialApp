import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

export class DeletePendingTransactionModal extends NikElement {
  static properties = {
    pendingTransaction: { type: Object },
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

    let response = await fetch(
      this.pendingTransaction.delete_pending_transaction_url,
      {
        method: "POST",
      }
    );

    let { pending_transactions } = await response.json();

    document.dispatchEvent(
      new CustomEvent("UpdatePendingTransactions", {
        bubbles: true,
        composed: true,
        detail: { pendingTransactions: pending_transactions },
      })
    );

    this.remove();
  }

  render() {
    return html`<wa-dialog label="Discard Pending Transaction">
      <div class="wa-stack">
        <b>Are you sure you want to discard this transaction?</b>
        <div class="wa-split">
          <p>Name:</p>
          <b>${this.pendingTransaction.name}</b>
        </div>
        <div class="wa-split">
          <p>Amount:</p>
          <b
            ><wa-format-number
              type="currency"
              currency="USD"
              value=${this.pendingTransaction.amount}
              lang="en-US"
            ></wa-format-number
          ></b>
        </div>
        <div class="wa-split">
          <p>Date:</p>
          <b>
            <wa-format-date
              month="long"
              day="numeric"
              year="numeric"
              date="${this.pendingTransaction.date}T00:00:00"
            ></wa-format-date>
          </b>
        </div>
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
          >Discard</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define(
  "nb-delete-pending-transaction",
  DeletePendingTransactionModal
);
