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
    let { access_type } = await response.json();

    event.target.checked = access_type > 0;
  }

  accountTemplate(a) {
    return html`<div class="wa-split">
      <div class="wa-">
        <div><b>${a.longName}</b></div>
        <div>
          Balance:
          <wa-format-number
            type="currency"
            currency=${a.currency}
            value=${a.balance}
          ></wa-format-number>
        </div>
      </div>
      <wa-switch
        ?checked=${a.access_type > 0}
        @change=${(event) =>
          this.handleAccountSyncChange(event, a.update_account_access_type_url)}
        >Sync transactions from this account</wa-switch
      >
    </div>`;
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
            can
            <a href=${SYNC_SIMPLEFIN_ACCOUNTS_URL}>sync your accounts here</a>.
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
        this.accountTemplate(a),
        html`<wa-divider></wa-divider>`,
      ])
      .slice(0, -1);
  }

  render() {
    return html`<wa-card>
      <div class="wa-stack">
        <div class="wa-split">
          <h2 class="flex">
            External Accounts
            <wa-button
              size="large"
              appearance="plain"
              href="${SIMPLEFIN_CREDENTIALS_URL}?force=true"
              ><wa-icon
                library="ion"
                name="settings-outline"
                label="Manage Credentials"
              ></wa-icon
            ></wa-button>
          </h2>

          <wa-button appearance="outlined" href=${SYNC_SIMPLEFIN_URL}
            >Sync with SimpleFIN</wa-button
          >
        </div>

        <div class="wa-split">
          <wa-button
            appearance="outlined"
            target="_blank"
            href="https://beta-bridge.simplefin.org/my-account"
            >Add External Accounts
            <wa-icon slot="end" library="ion" name="open-outline"></wa-icon
          ></wa-button>
          <wa-button
            appearance="outlined"
            variant="brand"
            href=${this.accounts.length === 0
              ? ""
              : SYNC_SIMPLEFIN_ACCOUNT_BALANCES_URL}
            ?disabled=${this.accounts.length === 0}
            >Sync All Existing Accounts</wa-button
          >
        </div>
        ${this.accountsTemplate()}
      </div></wa-card
    >`;
  }
}

customElements.define("nb-simplefin-accounts", SimpleFINAccounts);
