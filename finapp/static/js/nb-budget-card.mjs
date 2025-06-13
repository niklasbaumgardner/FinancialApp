import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-delete-budget-modal.mjs";

export class BudgetCard extends NikElement {
  static properties = {
    budget: { type: Object },
    transferBudgets: { type: Array },
    editing: { type: Boolean },
  };

  static queries = {
    saveButton: "#save-button",
    deleteButton: "#delete-button",
    nameInput: "#budget-name",
    toggle: "wa-switch",
  };

  handleEditClick(event) {
    event.preventDefault();
    this.editing = true;
  }

  handleCancelClick() {
    this.setEditingFalse();
  }

  setEditingFalse() {
    this.saveButton.disabled = true;
    this.saveButton.loading = false;

    this.deleteButton.disabled = false;
    this.deleteButton.loading = false;

    this.editing = false;
  }

  handleDeleteClick() {
    if (!this.deleteModal) {
      this.deleteModal = document.createElement("nb-delete-budget-modal");
      this.deleteModal.budget = this.budget;
      this.deleteModal.transferBudgets = this.transferBudgets;
      document.body.appendChild(this.deleteModal);
    }

    this.deleteModal.show();
  }

  async handleSaveClick() {
    this.saveButton.disabled = true;
    this.saveButton.loading = true;

    let formData = new FormData();

    // save budget
    const active = this.toggle.checked;
    if (active !== this.budget.is_active) {
      this.budget.is_active = active;
      let params = {
        id: this.budget.id,
        active,
      };
      await fetch(
        this.budget.toggle_active_url + "?" + new URLSearchParams(params)
      );

      // send event to budget manager to move this to active/inactive
      this.dispatchEvent(
        new CustomEvent("Budget:ToggleActive", {
          bubbles: true,
        })
      );
    }

    const name = this.nameInput.value;
    if (name !== this.budget.name || active !== this.budget.is_active) {
      formData.set("name", this.nameInput.value);
      let response = await fetch(this.budget.edit_url, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        this.budget.name = this.nameInput.value;
      } else {
        this.nameInput.setAttribute(
          "help-text",
          "This budget name already exists. Please choose another."
        );
        return;
      }

      this.setEditingFalse();
    }
  }

  handleInput() {
    if (this.nameInput.value === "") {
      this.saveButton.disabled = true;
      return;
    }

    if (this.nameInput.value === this.budget.name) {
      this.saveButton.disabled = this.toggle.checked === this.budget.is_active;
      return;
    }

    this.nameInput.setAttribute("help-text", "");
    this.saveButton.disabled = false;
    for (let card of document.querySelectorAll("nb-budget-card")) {
      if (this === card) {
        continue;
      }
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

  getSharedUsers() {
    return this.budget.shared_users?.map((u) => u.username).join(", ");
  }

  sharedUserTemplate() {
    if (this.budget.is_shared) {
      return html`<wa-tooltip for="shared-user-budget-${this.budget.id}"
          >This budget is shared with ${this.getSharedUsers()}</wa-tooltip
        ><wa-icon
          id="shared-user-budget-${this.budget.id}"
          library="ion"
          name="person-circle-outline"
        ></wa-icon>`;
    }
  }

  editingTemplate() {
    return html`<wa-card class="w-14"
      ><div class="wa-stack" @input=${this.handleInput}>
        <div class="wa-split flex-nowrap!">
          <wa-input
            class="grow"
            id="budget-name"
            name="name"
            value="${this.budget.name}"
            autocomplete="niklas"
            size="small"
            required
          ></wa-input>
          <div>
            <wa-tooltip for="cancel-budget-${this.budget.id}"
              >Cancel</wa-tooltip
            >
            <wa-icon-button
              id="cancel-budget-${this.budget.id}"
              name="system/close-large-line"
              library="remix"
              label="Cancel"
              @click=${this.handleCancelClick}
            ></wa-icon-button>
          </div>
        </div>
        <div class="wa-split">
          <wa-format-number
            type="currency"
            currency="USD"
            value=${this.budget.total}
            lang="en-US"
          ></wa-format-number>
          <wa-switch ?checked=${this.budget.is_active}>Active</wa-switch>
        </div>
        <div class="flex gap-(--wa-space-m)">
          <wa-button
            class="grow"
            variant="danger"
            id="delete-button"
            appearance="outlined"
            size="small"
            @click=${this.handleDeleteClick}
            >Delete</wa-button
          ><wa-button
            id="save-button"
            class="grow"
            variant="brand"
            size="small"
            @click=${this.handleSaveClick}
            disabled
            >Save</wa-button
          >
        </div>
      </div></wa-card
    >`;
  }

  viewTemplate() {
    return html`<wa-card class="w-14 wa-card-p-0"
      ><a
        class="wa-stack text-[unset]! no-underline! p-(--spacing)"
        href=${this.budget.url}
      >
        <div class="wa-split">
          <span class="wa-heading-m">${this.budget.name}</span>
          ${this.sharedUserTemplate()}
        </div>
        <div class="wa-split flex-nowrap!">
          <wa-format-number
            type="currency"
            currency="USD"
            value="${this.budget.total}"
            lang="en-US"
          ></wa-format-number>
          <div>
            <wa-tooltip for="edit-budget-${this.budget.id}">Edit</wa-tooltip>
            <wa-button
              appearance="plain"
              variant="brand"
              id="edit-budget-${this.budget.id}"
              @click=${this.handleEditClick}
              ><wa-icon
                library="ion"
                name="create-outline"
                class="text-(length:--wa-font-size-m)"
              ></wa-icon
            ></wa-button>
          </div></div></a
    ></wa-card>`;
  }

  render() {
    if (this.editing) {
      return this.editingTemplate();
    }

    return this.viewTemplate();
  }
}
customElements.define("nb-budget-card", BudgetCard);

export class AddBudgetCard extends NikElement {
  static properties = {
    budget: { type: Object },
  };

  static queries = {
    saveButton: "#save-button",
    nameInput: "#budget-name",
    amountInput: "#starting-budget-amount",
  };

  handleInput() {
    if (this.nameInput.value === "") {
      this.saveButton.disabled = true;
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

  handleCancelClick() {
    this.remove();
  }

  async handleSaveClick() {
    this.saveButton.disabled = true;
    this.saveButton.loading = true;

    let formData = new FormData();
    formData.set("name", this.nameInput.value);
    formData.set("amount", this.amountInput.value ?? 0);
    formData.set("date", new Date().toISOString().slice(0, 10));

    let response = await fetch(ADD_NEW_BUDGET_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let data = await response.json();
      this.remove();

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
    return html`<wa-card class="w-14"
      ><div class="wa-stack">
        <wa-input
          id="budget-name"
          name="name"
          label="Budget name"
          placeholder="Hello world"
          autocomplete="niklas"
          size="small"
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
          size="small"
        ></wa-input>
        <div class="flex gap-(--wa-space-m)">
          <wa-button
            class="grow"
            variant="neutral"
            size="small"
            appearance="outlined"
            @click=${this.handleCancelClick}
            >Cancel</wa-button
          >
          <wa-button
            class="grow"
            id="save-button"
            variant="brand"
            size="small"
            @click=${this.handleSaveClick}
            disabled
            >Save</wa-button
          >
        </div>
      </div></wa-card
    >`;
  }
}
customElements.define("nb-add-budget-card", AddBudgetCard);
