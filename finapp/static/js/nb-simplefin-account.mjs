import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-edit-simplefin-account.mjs";

export class SimpleFINAccount extends NikElement {
  static properties = {
    account: { type: Object },
  };

  static queries = {
    switch: "wa-switch",
  };

  get longName() {
    return `${this.account.organization.name} ${this.account.name}`;
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("SimpleFINAccountChange", this);
  }

  handleEvent(event) {
    if (event.type === "SimpleFINAccountChange") {
      let { id, name } = event.detail;
      if (id !== this.account.id) {
        return;
      }

      this.account.name = name;
      this.update();
    }
  }

  handleEditClick() {
    if (!this.editAccountModal) {
      this.editAccountModal = document.createElement(
        "nb-edit-simplefin-account"
      );
      this.editAccountModal.account = this.account;
      document.body.appendChild(this.editAccountModal);
    }

    this.editAccountModal.show();
  }

  async handleAccountSyncChange() {
    let data = new FormData();
    data.append("sync_transactions", this.switch.checked ? 1 : 0);

    let response = await fetch(this.account.update_account_access_type_url, {
      method: "POST",
      body: data,
    });
    let { access_type } = await response.json();

    this.switch.checked = access_type > 0;
  }

  render() {
    return html`<div class="wa-split ps-(--wa-space-2xl)">
      <div class="wa-">
        <div class="flex items-center">
          <b>${this.account.name}</b>
          <wa-button appearance="plain" @click=${this.handleEditClick}
            ><wa-icon
              library="ion"
              name="create-outline"
              label="Edit Account"
            ></wa-icon
          ></wa-button>
        </div>
        <div>
          Balance:
          <wa-format-number
            type="currency"
            currency=${this.account.currency}
            value=${this.account.balance}
          ></wa-format-number>
        </div>
      </div>
      <wa-switch
        ?checked=${this.account.access_type > 0}
        @change=${this.handleAccountSyncChange}
        >Sync transactions from this account</wa-switch
      >
    </div>`;
  }
}

customElements.define("nb-simplefin-account", SimpleFINAccount);
