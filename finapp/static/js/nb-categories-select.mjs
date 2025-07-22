import { html, WaSelect } from "./bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-category.mjs";
console.log(WaSelect);
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

    this.valueHasChanged = true;
    this.hasInteracted = true;

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

      // Emit after updating
      this.updateComplete.then(() => {
        this.dispatchEvent(
          new InputEvent("input", { bubbles: true, composed: true })
        );
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
    selected: { type: Array },
  };

  static get queries() {
    return {
      select: "nb-base-select",
    };
  }

  get value() {
    let arrOfStrings = this.select.value;
    if (arrOfStrings) {
      // Convert to array of ints
      return arrOfStrings.map((x) => parseInt(x, 10)).filter(Number);
    } else {
      return [];
    }
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
      with-clear
      >${this.categories.map(
        (c) =>
          html`<wa-option
            value="${c.id}"
            ?selected=${this.selected?.includes(c.id)}
            ><nb-category name="${c.name}" color="${c.color}"></nb-category
          ></wa-option>`
      )}</nb-base-select
    >`;
  }
}

customElements.define("nb-categories-select", CategoriesSelect);
