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

  handleTagRemove(event, directOption) {
    event.stopPropagation();
    if (this.disabled) return;
    let option = directOption;
    if (!option) {
      const tagElement = event.target.closest("nb-category");
      if (tagElement) {
        const tagsContainer = this.shadowRoot?.querySelector('[part="tags"]');
        if (tagsContainer) {
          const allTags = Array.from(tagsContainer.children);
          const index = allTags.indexOf(tagElement);
          if (index >= 0 && index < this.selectedOptions.length) {
            option = this.selectedOptions[index];
          }
        }
      }
    }
    if (option) {
      this.toggleOptionSelection(option, false);
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input"));
        this.dispatchEvent(
          new Event("change", { bubbles: true, composed: true })
        );
      });
    }
  }

  render() {
    let template = super.render();
    return html`<link
        href="/static/css/nb-category.css"
        rel="stylesheet"
      /><link
        href="/static/css/category-colors.css"
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
      value=${this.selected}
      multiple
      clearable
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
