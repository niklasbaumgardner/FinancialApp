import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";

export class SimpleFin extends NikElement {
  render() {
    return html`<wa-card>
      <form
        id="simplefin-form"
        action=""
        method="POST"
        autocomplete="off"
      ></form>
      <div class="wa-stack">
        <h2>Profile</h2>

        <wa-input
          form="simplefin-form"
          @input=${this.handleEmailInput}
          value=${this.email}
          original-value=${this.email}
          type="email"
          label="Email"
          id="email"
          name="email"
          maxlength="60"
          required
        ></wa-input>

        <wa-input
          form="simplefin-form"
          @input=${this.handleUsernameInput}
          value=${this.username}
          original-value=${this.username}
          label="Username"
          id="username"
          name="username"
          maxlength="60"
          required
        ></wa-input>

        <wa-button
          form="simplefin-form"
          id="submitButton"
          class="w-full"
          variant="brand"
          type="submit"
          ?disabled=${!(this.emailValid || this.usernameValid)}
          >Update</wa-button
        >
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-simple-fin", SimpleFin);
