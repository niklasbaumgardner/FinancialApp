import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-category.mjs";
import "./nb-radio.mjs";
import { PRIMARY_COLOR_LIST } from "./theme.mjs";

function toUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    this.existingCategories.sort((a, b) => a.name.localeCompare(b.name));

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

  handleDialogShow(event) {
    if (event.target !== this.dialog) {
      return;
    }

    this.input.focus();
  }

  setLoadingState(state) {
    this.submitButton.loading = state;
    this.submitButton.disabled = state;

    this.submitButton.requestUpdate();
    return this.submitButton.updateComplete;
  }

  async handleSubmitClick() {
    if (!this.form.reportValidity()) {
      return;
    }

    await this.setLoadingState(true);

    let formData = new FormData(this.form);

    let request = await fetch(CREATE_CATEGORY_URL, {
      method: "POST",
      body: formData,
    });
    let data = await request.json();

    await this.setLoadingState(false);
    this.form.reset();
    this.setExistingCategories(data.categories);
  }

  render() {
    return html`<wa-dialog
      label="Create a new category"
      @wa-after-show=${this.handleDialogShow}
    >
      <form>
        <div class="wa-stack">
          <wa-input
            id="name"
            label="Category name:"
            placeholder="Food"
            name="name"
            required
          ></wa-input>
          <div class="wa-stack gap-(--wa-space-xs)!">
            <div>Select a color: *</div>
            <div class="wa-cluster">
              ${PRIMARY_COLOR_LIST.map(
                (color) =>
                  html`<nb-radio
                    name="color"
                    value=${color}
                    label=${toUpper(color)}
                  ></nb-radio>`
              )}
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
