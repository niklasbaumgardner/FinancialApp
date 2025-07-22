import { NikElement } from "./nik-element.mjs";
import { html } from "./budgets-bundle.mjs";

export class SearchItem extends NikElement {
  static queries = {
    input: "#search-name",
    removeButton: "wa-button",
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
        with-clear
      ></wa-input>
      <wa-button
        class="icon-button"
        appearance="plain"
        variant="danger"
        @click=${this.handleClick}
        ><wa-icon
          class="text-(length:--wa-font-size-l)"
          library="ion"
          name="trash-outline"
          label="Remove"
        ></wa-icon
      ></wa-button>
    </div>`;
  }
}
customElements.define("nb-search-item", SearchItem);
