import SlSelect from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/components/select/select.js";
import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-category.mjs";

class BaseNBSelect extends SlSelect {
  constructor() {
    super();

    this.getTag = this.getTagFunction;
  }

  getTagFunction(slOption, index) {
    let nbCategory = slOption.querySelector("nb-category");

    return html`<nb-category
      name=${nbCategory.name}
      color=${nbCategory.color}
      removable
    ></nb-category>`;
  }

  render() {
    let template = super.render();
    return html`<link
        href="/static/css/nb-category.css"
        rel="stylesheet"
      />${template}`;
  }
}

customElements.define("base-nb-select", BaseNBSelect);

class NBSelect extends NikElement {
  static properties = {
    categories: { type: Array },
    value: { type: Array },
    selected: { type: String },
  };

  static get queries() {
    return {
      select: "base-nb-select",
    };
  }

  get value() {
    return this.select.value;
  }

  render() {
    return html`<base-nb-select
      label="Select any categories"
      name="categories"
      max-options-visible="0"
      multiple
      clearable
      value="${this.selected}"
      >${this.categories.map(
        (c) =>
          html`<sl-option value="${c.id}"
            ><nb-category name="${c.name}" color="${c.color}"></nb-category
          ></sl-option>`
      )}</base-nb-select
    >`;
  }
}
export default { NBSelect, BaseNBSelect };

customElements.define("nb-select", NBSelect);
