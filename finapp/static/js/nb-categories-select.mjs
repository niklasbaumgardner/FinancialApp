import WaSelect from "https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/select/select.js";
import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-category.mjs";

export class BaseSelect extends WaSelect {
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

customElements.define("nb-base-select", BaseSelect);

export class CategoriesSelect extends NikElement {
  static properties = {
    categories: { type: Array },
    value: { type: Array },
    selected: { type: String },
  };

  static get queries() {
    return {
      select: "nb-base-select",
    };
  }

  get value() {
    let arrOfStrings = this.select.value;
    // Convert to array of ints
    return arrOfStrings.map((x) => parseInt(x, 10)).filter(Number);
  }

  connectedCallback() {
    super.connectedCallback();

    this.categories.sort((a, b) => a.name.localeCompare(b.name));
  }

  render() {
    return html`<nb-base-select
      label="Select Categories"
      name="categories"
      max-options-visible="0"
      multiple
      clearable
      value="${this.selected}"
      >${this.categories.map(
        (c) =>
          html`<wa-option value="${c.id}"
            ><nb-category name="${c.name}" color="${c.color}"></nb-category
          ></wa-option>`
      )}</nb-base-select
    >`;
  }
}

customElements.define("nb-categories-select", CategoriesSelect);
