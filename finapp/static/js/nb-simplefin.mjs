import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class SimpleFIN extends NikElement {
  static properties = {
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

  noCredentialsTemplate() {
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

  existingCredentialsTemplate() {
    return html`<wa-card
      ><form
        id="simplefin-form"
        action=${CLAIM_SIMPLEFIN_TOKEN_URL}
        method="POST"
        autocomplete="off"
      ></form>
      <div class="wa-stack">
        <h2>Update SimpleFIN Token for External Accounts</h2>

        <ol>
          <li>
            Login to your account at
            <a href="https://beta-bridge.simplefin.org/" target="_blank"
              >https://beta-bridge.simplefin.org/</a
            >
          </li>
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

        <div class="wa-cluster w-full">
          <wa-button
            href=${DELETE_SIMPLEFIN_CREDENTIALS_URL}
            class="grow"
            appearance="outlined"
            variant="danger"
            type="submit"
            >Delete Credentials</wa-button
          >
          <wa-button
            form="simplefin-form"
            class="grow"
            variant="brand"
            type="submit"
            >Update Credentials</wa-button
          >
        </div>
      </div></wa-card
    >`;
  }

  render() {
    if (this.credentialsExist) {
      return this.existingCredentialsTemplate();
    }

    return this.noCredentialsTemplate();
  }
}

customElements.define("nb-simplefin", SimpleFIN);
