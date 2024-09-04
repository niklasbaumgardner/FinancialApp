import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

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
    return html`<button
      type="button"
      class="nb-radio"
      @click=${this.handleClick}
    >
      <input
        type="radio"
        id="${this.value}"
        value=${this.value}
        name="${this.name}"
        required
      />
      <div class="circle ${this.value}"></div>
      <label for="${this.value}">${this.label}</label>
    </button>`;
  }
}
export default NBRadio;

customElements.define("nb-radio", NBRadio);
