import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class EditSimpleFINAccount extends NikElement {
  static properties = {
    account: { type: Object },
  };

  static queries = {
    dialog: "wa-dialog",
    form: "form",
    submitButton: "#submit-button",
    nameInput: "#name",
  };

  handleDialogShow(event) {
    if (event.target !== this.dialog) {
      return;
    }

    this.nameInput.focus();
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

  reset() {
    this.submitButton.loading = false;
    this.submitButton.disabled = false;

    this.hide();
  }

  async handleSubmit() {
    if (!this.form.reportValidity()) {
      return;
    }

    this.submitButton.loading = true;
    this.submitButton.disabled = true;

    let formData = new FormData(this.form);

    let response = await fetch(this.account.update_account_name, {
      method: "POST",
      body: formData,
    });

    let { name } = await response.json();

    document.dispatchEvent(
      new CustomEvent("SimpleFINAccountChange", {
        bubbles: true,
        composed: true,
        detail: { id: this.account.id, name },
      })
    );

    this.reset();
  }

  render() {
    return html`<wa-dialog
      label="Edit Account"
      @wa-after-show=${this.handleDialogShow}
    >
      <form class="wa-stack">
        <wa-input
          label="Name"
          class="grow"
          type="text"
          id="name"
          name="name"
          placeholder="Account 1"
          autocomplete="niklas"
          value=${this.account.name}
          required
        ></wa-input>
      </form>
      <div class="wa-cluster w-full" slot="footer">
        <wa-button
          class="grow"
          variant="neutral"
          appearance="outlined"
          data-dialog="close"
          >Cancel</wa-button
        ><wa-button
          id="submit-button"
          class="grow"
          variant="brand"
          @click=${this.handleSubmit}
          >Update</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-edit-simplefin-account", EditSimpleFINAccount);
