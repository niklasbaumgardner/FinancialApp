import SlSelect from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.16.0/cdn/components/select/select.js";
import { html } from "./imports.mjs";
import "./nb-category.mjs";

class NBSelect extends SlSelect {
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
export default NBSelect;

customElements.define("nb-select", NBSelect);
