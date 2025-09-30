import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

class ShareBudgetDialog extends NikElement {
  static properties = { url: String };

  static get queries() {
    return {
      emailInputEl: "#email",
      dialog: "wa-dialog",
      shareButton: "#share-button",
    };
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

  setLoadingState(state) {
    this.shareButton.loading = state;
    this.shareButton.disabled = state;

    this.shareButton.requestUpdate();
    return this.shareButton.updateComplete;
  }

  async handleClick() {
    await this.setLoadingState(true);

    let response = await fetch(
      this.url + "?" + new URLSearchParams({ email: this.emailInputEl.value })
    );

    await this.setLoadingState(false);

    let alert = document.createElement("nb-alert");
    if (response?.ok) {
      this.hide();
      alert.category = "success";
      alert.message =
        "An email has been sent. They must accept before the budget is shared. The link will expire in 24 hours.";
    } else {
      alert.category = "danger";
      alert.message = "Invalid email.";
    }
    document.getElementById("alerts").appendChild(alert);
  }

  render() {
    return html`<wa-dialog label="Share this budget with someone">
      <div class="wa-stack">
        <span
          >Please input the email of the person you would like to share this
          budget with</span
        >
        <wa-input
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
        ></wa-input>
      </div>
      <div class="wa-cluster w-full" slot="footer">
        <wa-button
          class="grow"
          variant="neutral"
          appearance="outlined"
          data-dialog="close"
          >Cancel</wa-button
        ><wa-button
          id="share-button"
          class="grow"
          variant="brand"
          @click=${this.handleClick}
          >Share</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}

customElements.define("nb-share-budget-dialog", ShareBudgetDialog);
