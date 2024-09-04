import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class SearchItem extends NikElement {
  static get queries() {
    return {
      inputEl: "#search-name",
      removeButtonEl: "#search-remove",
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent("SearchItemAdded", { bubbles: true }));
  }

  async focus(options) {
    await this.updateComplete;
    this.inputEl.focus(options);
  }

  handleClick(event) {
    if (event.target.id === "search-remove") {
      this.dispatchEvent(
        new CustomEvent("SearchItemRemoved", { bubbles: true, composed: true })
      );
      this.remove();
    }
  }

  render() {
    return html`<sl-input
        id="search-name"
        class="searchName w-100"
        type="text"
        placeholder="Search"
        clearable
      ></sl-input
      ><sl-icon-button
        id="search-remove"
        name="x-lg"
        label="Remove"
        style="font-size: 22px;"
        @click=${this.handleClick}
      ></sl-icon-button>`;
  }
}
customElements.define("search-item", SearchItem);
