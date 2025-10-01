import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-edit-simplefin-account.mjs";

class SimpleFINAccountAccessConfirmation extends NikElement {
  static properties = {
    account: { type: Object },
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

  async handleSubmit() {
    this.deleteButton.loading = true;
    this.deleteButton.disabled = true;

    let data = new FormData();
    data.append("sync_transactions", 2 & this.account.access_type);

    let response = await fetch(this.account.update_account_access_type_url, {
      method: "POST",
      body: data,
    });
    let { access_type } = await response.json();

    document.dispatchEvent(
      new CustomEvent("AccountAccessChange", {
        bubbles: true,
        composed: true,
        detail: { id: this.account.id, access_type },
      })
    );

    this.deleteButton.loading = false;
    this.deleteButton.disabled = false;

    this.hide();
  }

  render() {
    return html`<wa-dialog label="Disable Transaction Sync">
      <div class="wa-stack">
        <p>
          Are you sure you want to disables transaction syncing for
          <b>${this.account.name}</b>?
        </p>
        <p>This will delete all pending transactions for this account.</p>
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
          @click=${this.handleSubmit}
          >Disable Transaction Sync</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}

customElements.define(
  "nb-simplefin-account-access-confirmation",
  SimpleFINAccountAccessConfirmation
);

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
    document.addEventListener("AccountAccessChange", this);
  }

  handleEvent(event) {
    if (event.type === "SimpleFINAccountChange") {
      let { id, name } = event.detail;
      if (id !== this.account.id) {
        return;
      }

      this.account.name = name;
      this.update();
    } else if (event.type === "AccountAccessChange") {
      let { id, access_type } = event.detail;
      if (id !== this.account.id) {
        return;
      }

      this.account.access_type = access_type;
      this.switch.checked = (access_type & 4) === 4;
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

  showConfirmation() {
    if (!this.confirmationModal) {
      this.confirmationModal = document.createElement(
        "nb-simplefin-account-access-confirmation"
      );
      this.confirmationModal.account = this.account;
      document.body.appendChild(this.confirmationModal);
    }

    this.confirmationModal.show();
  }

  async handleAccountSyncChange(event) {
    if (!this.switch.checked) {
      this.switch.checked = true;
      console.log(event);
      event.preventDefault();
      this.showConfirmation();
      return;
    }

    let data = new FormData();
    data.append(
      "sync_transactions",
      this.switch.checked
        ? this.account.access_type | 4
        : 2 & this.account.access_type
    );

    let response = await fetch(this.account.update_account_access_type_url, {
      method: "POST",
      body: data,
    });
    let { access_type } = await response.json();
    this.account.access_type = access_type;

    this.switch.checked = (this.account.access_type & 4) === 4;
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
        ?checked=${(this.account.access_type & 4) === 4}
        @change=${this.handleAccountSyncChange}
        >Sync transactions from this account</wa-switch
      >
    </div>`;
  }
}

customElements.define("nb-simplefin-account", SimpleFINAccount);
