import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class SearchItem extends NikElement {
  static get queries() {
    return {
      inputEl: "#search-name",
      removeButtonEl: "#search-remove",
    };
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
    return html`<input
        id="search-name"
        class="searchName form-control"
        type="text"
        placeholder="Search"
      /><button
        id="search-remove"
        class="btn-close"
        @click=${this.handleClick}
      ></button>`;
  }
}
customElements.define("search-item", SearchItem);
