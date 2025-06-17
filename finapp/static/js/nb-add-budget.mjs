import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class AddBudget extends NikElement {
  static properties = {
    budget: { type: Object },
  };

  static queries = {
    dialog: "wa-dialog",
    form: "form",
    saveButton: "#submit-button",
    nameInput: "#budget-name",
    amountInput: "#starting-budget-amount",
  };

  show() {
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

  reset() {
    this.saveButton.disabled = false;
    this.saveButton.loading = false;
    this.form.reset();
    this.hide();
  }

  handleInput() {
    if (this.nameInput.value === "") {
      this.saveButton.disabled = false;
      return;
    }

    this.nameInput.setAttribute("help-text", "");
    this.saveButton.disabled = false;
    for (let card of document.querySelectorAll("nb-budget-card")) {
      if (this.nameInput.value === card.budget.name) {
        this.nameInput.setAttribute(
          "help-text",
          "This budget name already exists. Please choose another."
        );
        this.saveButton.disabled = true;
        break;
      }
    }
  }

  async handleSaveClick() {
    if (!this.form.reportValidity()) {
      return;
    }

    this.saveButton.disabled = true;
    this.saveButton.loading = true;

    let formData = new FormData(this.form);

    let response = await fetch(ADD_NEW_BUDGET_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let data = await response.json();
      this.reset();

      document.dispatchEvent(
        new CustomEvent("Budget:AddBudget", {
          bubbles: true,
          detail: { budget: data.budget },
        })
      );
    } else {
      this.saveButton.disabled = false;
      this.saveButton.loading = false;

      this.nameInput.setAttribute(
        "help-text",
        "This budget name already exists. Please choose another."
      );
    }
  }

  render() {
    return html`<wa-dialog label="Add New Budget">
      <form class="wa-stack">
        <input
          hidden
          class="hidden"
          name="date"
          value=${new Date().toISOString().slice(0, 10)}
        />
        <wa-input
          id="budget-name"
          name="name"
          label="Budget name"
          placeholder="Hello world"
          autocomplete="niklas"
          @input=${this.handleInput}
          required
        ></wa-input>
        <wa-input
          id="starting-budget-amount"
          type="number"
          name="amount"
          label="Starting amout"
          placeholder="$0.00"
          autocomplete="niklas"
        ></wa-input>
      </form>

      <div class="wa-cluster w-full" slot="footer">
        <wa-button
          class="grow"
          variant="neutral"
          appearance="outlined"
          data-dialog="close"
          >Cancel</wa-button
        >
        <wa-button
          id="submit-button"
          class="grow"
          variant="brand"
          @click=${this.handleSaveClick}
          >Add Budget</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}
customElements.define("nb-add-budget", AddBudget);
