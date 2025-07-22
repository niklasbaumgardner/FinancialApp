import { html } from "./bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import { getRequest } from "./fetch.mjs";

class ShareBudgetDialog extends NikElement {
  static get queries() {
    return {
      emailInputEl: "#email",
      dialog: "sl-dialog",
      shareButton: "#share-button",
    };
  }

  show() {
    this.dialog.show();
  }

  hide() {
    this.dialog.hide();
  }

  async handleClick() {
    this.shareButton.loading = true;

    let response = await getRequest(SHARE_BUDGET_URL, {
      email: this.emailInputEl.value,
    });

    this.shareButton.loading = false;

    let alert = document.createElement("sl-alert");
    alert.closable = true;
    alert.duration = "5000";
    alert.open = true;
    if (response.ok) {
      this.hide();
      alert.variant = "primary";
      alert.textContent =
        "An email has been sent. They must accept before the budget is shared";
    } else {
      alert.variant = "danger";
      alert.textContent = "Invalid email.";
    }
    document.getElementById("alerts").appendChild(alert);
  }

  render() {
    return html`<sl-dialog label="Share this budget with someone">
      <div class="nb-row">
        <span
          >Please input the email of the person you would like to share this
          budget with</span
        >
        <sl-input
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
        ></sl-input>
        <div class="row" slot="footer">
          <sl-button @click=${this.hide} class="w-50" variant="neutral" outline
            >Cancel</sl-button
          >
          <sl-button
            @click=${this.handleClick}
            id="share-button"
            class="w-50"
            variant="primary"
            >Share</sl-button
          >
        </div>
      </div>
    </sl-dialog>`;
  }
}

export default ShareBudgetDialog;

customElements.define("share-budget-dialog", ShareBudgetDialog);
