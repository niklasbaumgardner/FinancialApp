import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class Category extends NikElement {
  static properties = {
    name: { type: String },
    color: { type: String },
    size: { type: String },
    removable: { type: Boolean },
  };

  static get queries() {
    return {
      dialog: "sl-dialog",
    };
  }

  constructor() {
    super();

    this.removable = false;
  }

  handleRemoveClick() {
    this.dispatchEvent(
      new CustomEvent("sl-remove", {
        bubbles: true,
        cancelable: false,
        composed: true,
      })
    );
  }

  render() {
    return html`<span class="tag ${this.color}" part="base"
      ><span>${this.name}</span>${this.removable
        ? html`
            <sl-icon-button
              class="tag__remove"
              name="x-lg"
              library="system"
              label="Remove"
              class="tag__remove"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            ></sl-icon-button>
          `
        : ""}</span
    >`;
  }
}
export default Category;

customElements.define("nb-category", Category);
