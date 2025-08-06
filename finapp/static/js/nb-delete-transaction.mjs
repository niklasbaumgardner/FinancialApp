import { NikElement } from "./nik-element.mjs";
import { html } from "./main.bundle.mjs";

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

    document.dispatchEvent(
      new CustomEvent("DeleteTransaction", {
        bubbles: true,
        composed: true,
        detail: { transaction: this.transaction },
      })
    );

    this.remove();
  }

  render() {
    return html`<wa-dialog label="Delete Transaction">
      <div class="wa-stack">
        <b>Are you sure you want to delete this transaction?</b>
        <div class="wa-split">
          <p>Name:</p>
          <b>${this.transaction.name}</b>
        </div>
        <div class="wa-split">
          <p>Amount:</p>
          <b
            ><wa-format-number
              type="currency"
              currency="USD"
              value=${this.transaction.amount}
              lang="en-US"
            ></wa-format-number
          ></b>
        </div>
        <div class="wa-split">
          <p>User:</p>
          <b>${this.transaction.user.username}</b>
        </div>
        <div class="wa-split">
          <p>Date:</p>
          <b>
            <wa-format-date
              month="long"
              day="numeric"
              year="numeric"
              date="${this.transaction.date}T00:00:00"
            ></wa-format-date>
          </b>
        </div>
        <div class="wa-split">
          <p>Categories:</p>
          <div class="wa-cluster gap-(--wa-space-2xs)!">
            ${this.transaction.categories.map(
              (c) =>
                html`<nb-category
                  name="${c.category.name}"
                  color="${c.category.color}"
                ></nb-category>`
            )}
          </div>
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
          >Delete</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-delete-transaction", DeleteTransactionModal);
