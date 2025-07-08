import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class Category extends NikElement {
  static properties = {
    name: { type: String },
    color: { type: String },
    size: { type: String },
    removable: { type: Boolean },
  };

  constructor() {
    super();

    this.removable = false;
  }

  handleRemoveClick() {
    this.dispatchEvent(
      new CustomEvent("wa-remove", {
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
            <wa-button
              class="tag__remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
              ><wa-icon
                name="system/close-large-line"
                library="remix"
                label="Remove"
              ></wa-icon
            ></wa-button>
          `
        : ""}</span
    >`;
  }
}
export default Category;

customElements.define("nb-category", Category);
