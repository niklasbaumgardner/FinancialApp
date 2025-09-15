import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class SimpleFIN extends NikElement {
  static properties = {
    accounts: { type: Array },
  };

  connectedCallback() {
    super.connectedCallback();

    this.accounts.sort((a, b) => a.name.localeCompare(b.name));
    console.log(this.accounts);
  }

  accountsTemplate() {
    return html`<wa-card
      >${this.accounts.map(
        (a) => html`${a.organization.name} ${a.name}<br />`
      )}</wa-card
    >`;
  }

  simpleFINFormTemplate() {
    return html`<wa-card
      ><form
        id="simplefin-form"
        action=${CLAIM_SIMPLEFIN_TOKEN_URL}
        method="POST"
        autocomplete="off"
      ></form>
      <div class="wa-stack">
        <h2>Generate SimpleFIN Token for External Accounts</h2>

        <ol>
          <li>
            Create an account at
            <a href="https://beta-bridge.simplefin.org/" target="_blank"
              >https://beta-bridge.simplefin.org/</a
            >
          </li>
          <li>Follow directions to link bank accounts with SimpleFIN</li>
          <li>
            Once logged in, from the "My Accounts" page, under "Apps", click on
            "New Connection". Give your connection a name (eg. "NB Budgets"),
            and click "Create Setup Token"
          </li>
          <li>Copy the SimpleFIN Setup Token and paste it below</li>
        </ol>

        <wa-input
          form="simplefin-form"
          label="SimpleFIN Setup Token"
          id="token"
          name="setup_token"
          required
        ></wa-input>

        <wa-button
          form="simplefin-form"
          class="w-full"
          variant="brand"
          type="submit"
          >Submit</wa-button
        >
      </div></wa-card
    >`;
  }

  render() {
    if (this.accounts.length) {
      return this.accountsTemplate();
    }

    return this.simpleFINFormTemplate();
  }
}

customElements.define("nb-simplefin", SimpleFIN);
