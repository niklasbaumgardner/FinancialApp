import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class SimpleFINAccounts extends NikElement {
  static properties = {
    accounts: { type: Array },
    credentials: { type: Object },
  };

  get credentialsExist() {
    for (let prop in this.credentials) {
      if (this.credentials.hasOwnProperty(prop)) {
        return true;
      }
    }

    return false;
  }

  connectedCallback() {
    super.connectedCallback();

    this.accounts.forEach(
      (a) => (a.longName = `${a.organization.name} ${a.name}`)
    );
    this.accounts.sort((a, b) => a.longName.localeCompare(b.longName));
    console.log(this.accounts);
  }

  async handleAccountSyncChange(event, url) {
    // event.target.toggleAttribute("checked", event.target.checked);

    let data = new FormData();
    data.append("sync_transactions", event.target.checked ? 1 : 0);

    let response = await fetch(url, { method: "POST", body: data });
  }

  accountsTemplate() {
    if (this.accounts.length === 0) {
      let message;
      if (this.credentialsExist) {
        message = html`<p>
            No linked accounts. Make sure you have connected your Financial
            Institutions under "My Account" on
            <a href="https://beta-bridge.simplefin.org/" target="_blank"
              >https://beta-bridge.simplefin.org/</a
            >.
          </p>
          <p>
            If you have connected your Financial Institutions on SimpleFIN, you
            can <a href=${SYNC_SIMPLEFIN_URL}>sync your accounts here</a>.
          </p>`;
      } else {
        message = html`<p>
          You don't have any SimpleFIN credentials set up yet. Please go to the
          <a href=${SIMPLEFIN_CREDENTIALS_URL}>SimpleFIN credentials page</a>
          to create your SimpleFIN credentials.
        </p>`;
      }

      return message;
    }

    return this.accounts
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
              this.handleAccountSyncChange(event, a.sync_transactions_url)}
            >Sync transactions from this account</wa-switch
          >
        </div>`,
        html`<wa-divider></wa-divider>`,
      ])
      .slice(0, -1);
  }

  render() {
    return html`<wa-card>
      <div class="wa-stack">
        <div class="wa-split">
          <h2>External Accounts</h2>
          <wa-button
            appearance="outlined"
            href="${SIMPLEFIN_CREDENTIALS_URL}?force=true"
            >Edit Credentials</wa-button
          >
        </div>

        <div class="wa-split">
          <div></div>
          <wa-button
            appearance="outlined"
            variant="brand"
            href=${this.accounts.length === 0 ? "" : SYNC_SIMPLEFIN_URL}
            ?disabled=${this.accounts.length === 0}
            >Sync All Accounts</wa-button
          >
        </div>
        ${this.accountsTemplate()}
      </div></wa-card
    >`;
  }
}

customElements.define("nb-simplefin-accounts", SimpleFINAccounts);
