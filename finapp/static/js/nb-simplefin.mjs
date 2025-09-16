import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class SimpleFIN extends NikElement {
  static properties = {
    accounts: { type: Array },
  };

  connectedCallback() {
    super.connectedCallback();

    this.accounts.forEach(
      (a) => (a.longName = `${a.organization.name} ${a.name}`)
    );
    this.accounts.sort((a, b) => a.longName.localeCompare(b.longName));
    console.log(this.accounts);
  }

  async handleSyncChange(event, url) {
    // event.target.toggleAttribute("checked", event.target.checked);

    let data = new FormData();
    data.append("sync_transactions", event.target.checked ? 1 : 0);

    let response = await fetch(url, { method: "POST", body: data });
  }

  accountsTemplate() {
    return html`<wa-card>
      <div class="wa-stack">
        <h2>External Accounts</h2>
        <div class="wa-split">
          <wa-button
            appearance="outlined"
            variant="danger"
            href=${SYNC_SIMPLEFIN_URL}
            >Revoke Credentials</wa-button
          >
          <wa-button
            appearance="outlined"
            variant="brand"
            href=${SYNC_SIMPLEFIN_URL}
            >Sync All Accounts</wa-button
          >
        </div>
        ${this.accounts
          .flatMap((a) => [
            html`<div class="wa-split">
              <div class="wa-cluster">
                ${a.longName}:
                <wa-format-number
                  type="currency"
                  currency=${a.currency}
                  value=${a.balance}
                ></wa-format-number>
              </div>
              <wa-switch
                ?checked=${a.type > 0}
                @change=${(event) =>
                  this.handleSyncChange(event, a.sync_transactions_url)}
                >Sync transactions from this account</wa-switch
              >
            </div>`,
            html`<wa-divider></wa-divider>`,
          ])
          .slice(0, -1)}
      </div></wa-card
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
