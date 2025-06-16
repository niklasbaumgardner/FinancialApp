import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class SearchItem extends NikElement {
  static queries = {
    input: "#search-name",
    removeButton: "wa-icon-button",
  };

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent("SearchItemAdded", { bubbles: true }));
  }

  async focus(options) {
    await this.updateComplete;
    this.input.focus(options);
  }

  handleClick(event) {
    if (event.target === this.removeButton) {
      this.dispatchEvent(
        new CustomEvent("SearchItemRemoved", { bubbles: true, composed: true })
      );
      this.remove();
    }
  }

  render() {
    return html`<div class="wa-cluster gap-(--wa-space-xs)! grow flex-nowrap!">
      <wa-input
        id="search-name"
        class="grow"
        type="text"
        placeholder="Search"
        clearable
      ></wa-input>
      <wa-icon-button
        class="text-(length:--wa-font-size-l) danger-icon-button"
        library="ion"
        name="trash-outline"
        label="Remove"
        appearance="plain"
        @click=${this.handleClick}
      ></wa-icon-button>
    </div>`;
  }
}
customElements.define("nb-search-item", SearchItem);
