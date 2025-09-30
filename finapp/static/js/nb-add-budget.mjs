import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

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
    this.setLoadingState(false);
    this.form.reset();
    this.hide();
  }

  handleDialogShow(event) {
    if (event.target !== this.dialog) {
      return;
    }

    this.nameInput.focus();
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

  setLoadingState(state) {
    this.saveButton.loading = state;
    this.saveButton.disabled = state;

    this.saveButton.requestUpdate();
    return this.saveButton.updateComplete;
  }

  async handleSaveClick() {
    if (!this.form.reportValidity()) {
      return;
    }

    await this.setLoadingState(true);

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
      await this.setLoadingState(false);

      this.nameInput.setAttribute(
        "help-text",
        "This budget name already exists. Please choose another."
      );
    }
  }

  render() {
    return html`<wa-dialog
      label="Add New Budget"
      @wa-after-show=${this.handleDialogShow}
    >
      <form class="wa-stack">
        <input hidden class="hidden" name="date" value=${CURRENT_DATE} />
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
