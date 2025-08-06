import { NikElement } from "./nik-element.mjs";
import { html } from "./main.bundle.mjs";

export class NBRadio extends NikElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    name: { type: String },
    checked: { type: Boolean, reflect: true },
  };

  static get queries() {
    return {
      radio: "input",
    };
  }

  constructor() {
    super();

    this.checked = false;
  }

  handleClick() {
    this.radio.checked = true;
  }

  render() {
    return html`<div class="nb-radio" @click=${this.handleClick} tabindex="0">
      <input
        type="radio"
        id="${this.value}"
        value=${this.value}
        name="${this.name}"
        required
      />
      <div class="circle ${this.value}"></div>
      <label for="${this.value}">${this.label}</label>
    </div>`;
  }
}
export default NBRadio;

customElements.define("nb-radio", NBRadio);
