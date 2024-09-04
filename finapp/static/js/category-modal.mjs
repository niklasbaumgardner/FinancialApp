import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { getRequest, postRequest } from "./fetch.mjs";
import "./nb-category.mjs";
import "./nb-radio.mjs";

export class CreateCategoryModal extends NikElement {
  static properties = {
    existingCategories: { type: Array },
  };

  static get queries() {
    return {
      dialog: "sl-dialog",
      form: "form",
      input: "sl-input",
      submitButton: "#submit-button",
      cancelButton: "#cancel-button",
    };
  }

  constructor() {
    super();

    this.existingCategories = [];

    this.randomColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
  }

  async show() {
    let request = await getRequest(GET_CATEGORIES_URL);
    this.existingCategories = await request.json();
    this.dialog.show();
  }

  hide() {
    this.dialog.hide();
  }

  async handleSubmitClick(event) {
    event.preventDefault();
    this.submitButton.loading = true;
    let formData = new FormData(this.form);

    let request = await postRequest(CREATE_CATEGORY_URL, formData);
    let data = await request.json();

    this.submitButton.loading = false;
    this.form.reset();
    this.existingCategories = data.categories;
  }

  render() {
    return html`<sl-dialog label="Create a new category"
      ><form method="POST" @submit=${this.handleSubmitClick}>
        <div class="nb-row">
          <sl-input
            label="Category name:"
            placeholder="Food"
            name="name"
            required
          ></sl-input>
          <div>
            <div>Select a color: *</div>
            <div class="color-picker">
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
          <sl-card
            ><div>Existing categories</div>
            <div class="existing-categories">
              ${this.existingCategories.map(
                (c) =>
                  html`<nb-category
                    name="${c.name}"
                    color="${c.color}"
                  ></nb-category>`
              )}
            </div></sl-card
          >
          <div class="row" slot="footer">
            <sl-button
              id="close-button"
              class="w-50"
              variant="neutral"
              outline
              @click=${this.hide}
              >Cancel</sl-button
            >
            <sl-button
              id="submit-button"
              class="w-50"
              variant="primary"
              type="submit"
              >Create category</sl-button
            >
          </div>
        </div>
      </form></sl-dialog
    >`;
  }
}
export default CreateCategoryModal;

customElements.define("create-category-modal", CreateCategoryModal);
