import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-category.mjs";
import "./nb-radio.mjs";

export class CreateCategoryModal extends NikElement {
  static properties = {
    existingCategories: { type: Array },
  };

  static get queries() {
    return {
      dialog: "wa-dialog",
      form: "form",
      input: "wa-input",
      submitButton: "#submit-button",
      cancelButton: "#cancel-button",
    };
  }

  constructor() {
    super();

    this.existingCategories = [];
  }

  arraysEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    let arr1Sorted = arr1.toSorted((a, b) => a.id - b.id);
    let arr2Sorted = arr2.toSorted((a, b) => a.id - b.id);

    for (let i = 0; i < arr1Sorted.length; ++i) {
      if (arr1Sorted[i].id !== arr2Sorted[i].id) return false;
    }
    return true;
  }

  setExistingCategories(newCategories) {
    if (this.arraysEqual(this.existingCategories, newCategories)) {
      return;
    }
    this.existingCategories = newCategories;

    document.dispatchEvent(
      new CustomEvent("CategoriesChanged", {
        bubbles: true,
        composed: true,
        detail: { categories: this.existingCategories },
      })
    );
  }

  async show() {
    let request = await fetch(GET_CATEGORIES_URL);
    let newCategories = await request.json();
    this.setExistingCategories(newCategories);

    customElements.whenDefined("wa-dialog").then(() => {
      this.updateComplete.then(() => {
        this.dialog.updateComplete.then(() => {
          this.dialog.open = true;
        });
      });
    });
  }

  hide() {
    this.dialog.open = false;
  }

  async handleSubmitClick() {
    if (!this.form.checkValidity) {
      return true;
    }

    this.submitButton.loading = true;
    this.submitButton.disabled = true;
    let formData = new FormData(this.form);

    let request = await fetch(CREATE_CATEGORY_URL, {
      method: "POST",
      body: formData,
    });
    let data = await request.json();

    this.submitButton.loading = false;
    this.submitButton.disabled = false;
    this.form.reset();
    this.setExistingCategories(data.categories);
  }

  render() {
    return html`<wa-dialog label="Create a new category">
      <form>
        <div class="wa-stack">
          <wa-input
            label="Category name:"
            placeholder="Food"
            name="name"
            required
          ></wa-input>
          <div>
            <div>Select a color: *</div>
            <div class="wa-cluster">
              <nb-radio value="red" name="color" label="Red"></nb-radio>
              <nb-radio value="gray" name="color" label="Gray"></nb-radio>
              <nb-radio value="orange" name="color" label="Orange"></nb-radio>
              <nb-radio value="amber" name="color" label="Amber"></nb-radio>
              <nb-radio value="yellow" name="color" label="Yellow"></nb-radio>
              <nb-radio value="lime" name="color" label="Lime"></nb-radio>
              <nb-radio value="green" name="color" label="Green"></nb-radio>
              <nb-radio value="emerald" name="color" label="Emerald"></nb-radio>
              <nb-radio value="teal" name="color" label="Teal"></nb-radio>
              <nb-radio value="cyan" name="color" label="Cyan"></nb-radio>
              <nb-radio value="sky" name="color" label="Sky"></nb-radio>
              <nb-radio value="blue" name="color" label="Blue"></nb-radio>
              <nb-radio value="indigo" name="color" label="Indigo"></nb-radio>
              <nb-radio value="violet" name="color" label="Violet"></nb-radio>
              <nb-radio value="purple" name="color" label="Purple"></nb-radio>
              <nb-radio value="fuchsia" name="color" label="Fuchsia"></nb-radio>
              <nb-radio value="pink" name="color" label="Pink"></nb-radio>
              <nb-radio value="rose" name="color" label="Rose"></nb-radio>
            </div>
          </div>
          <wa-card
            ><div>Existing categories</div>
            <div class="wa-cluster gap-(--wa-space-2xs)!">
              ${this.existingCategories.map(
                (c) =>
                  html`<nb-category
                    name="${c.name}"
                    color="${c.color}"
                  ></nb-category>`
              )}
            </div></wa-card
          >
          <div class="wa-cluster w-full" slot="footer">
            <wa-button
              id="close-button"
              class="grow"
              appearance="outlined"
              data-dialog="close"
              >Cancel</wa-button
            >
            <wa-button
              id="submit-button"
              class="grow"
              variant="brand"
              type="submit"
              @click=${this.handleSubmitClick}
              >Create category</wa-button
            >
          </div>
        </div>
      </form></wa-dialog
    >`;
  }
}

customElements.define("nb-category-modal", CreateCategoryModal);
