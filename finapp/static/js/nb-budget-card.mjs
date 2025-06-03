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
    toggle: "sl-switch",
  };

  handleClick() {
    window.location.href = this.budget.url;
  }

  handleEditClick(event) {
    event.stopPropagation();
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

  handleDeleteClick(event) {
    event.stopPropagation();

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
    if (
      this.nameInput.value === "" ||
      this.nameInput.value === this.budget.name
    ) {
      this.saveButton.disabled = true;
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
      return html`<sl-tooltip
        content="This budget is shared with ${this.getSharedUsers()}"
      >
        <sl-icon
          name="person-circle"
          style="padding: var(--sl-spacing-x-small);"
        ></sl-icon
      ></sl-tooltip>`;
    }
  }

  editingTemplate() {
    return html`<sl-card
      ><div class="d-flex flex-column" style="gap:var(--sl-spacing-medium);">
        <div class="d-flex justify-content-between" style="height:40px;">
          <sl-input
            id="budget-name"
            name="name"
            value="${this.budget.name}"
            @input=${this.handleInput}
            autocomplete="niklas"
            size="small"
            required
          ></sl-input
          ><sl-tooltip content="Cancel"
            ><sl-icon-button
              name="x-lg"
              library="system"
              label="Cancel"
              @click=${this.handleCancelClick}
            ></sl-icon-button
          ></sl-tooltip>
        </div>
        <div class="d-flex justify-content-between">
          <sl-format-number
            type="currency"
            currency="USD"
            value="${this.budget.total}"
            lang="en-US"
          ></sl-format-number>
          <sl-switch ?checked=${this.budget.is_active}>Active</sl-switch>
        </div>
        <div class="d-flex gx-2">
          <sl-button
            class="w-50"
            variant="danger"
            id="delete-button"
            outline
            size="small"
            @click=${this.handleDeleteClick}
            >Delete</sl-button
          ><sl-button
            id="save-button"
            class="w-50"
            variant="primary"
            size="small"
            @click=${this.handleSaveClick}
            disabled
            >Save</sl-button
          >
        </div>
      </div></sl-card
    >`;
  }

  normalTemplate() {
    return html`<sl-card @click=${this.handleClick}
      ><div class="d-flex flex-column" style="gap:var(--sl-spacing-medium);">
        <div class="d-flex justify-content-between" style="height:40px;">
          <h4>${this.budget.name}</h4>
          ${this.sharedUserTemplate()}
        </div>
        <div class="d-flex justify-content-between">
          <sl-format-number
            type="currency"
            currency="USD"
            value="${this.budget.total}"
            lang="en-US"
          ></sl-format-number>
          <sl-tooltip content="Edit"
            ><sl-icon-button
              style="margin-left:auto;"
              class="icon-primary"
              name="pencil-square"
              label="Settings"
              @click=${this.handleEditClick}
            ></sl-icon-button
          ></sl-tooltip>
        </div></div
    ></sl-card>`;
  }

  render() {
    if (this.editing) {
      return this.editingTemplate();
    }

    return this.normalTemplate();
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
    return html`<sl-card
      ><div class="d-flex flex-column" style="gap:var(--sl-spacing-small);">
        <sl-input
          id="budget-name"
          name="name"
          label="Budget name"
          placeholder="Hello world"
          @input=${this.handleInput}
          autocomplete="niklas"
          size="small"
        ></sl-input>
        <sl-input
          id="starting-budget-amount"
          type="number"
          name="amount"
          label="Starting amout"
          placeholder="$0.00"
          autocomplete="niklas"
          size="small"
        ></sl-input>
        <div class="d-flex gx-2">
          <sl-button
            class="w-50"
            variant="neutral"
            size="small"
            @click=${this.handleCancelClick}
            outline
            >Cancel</sl-button
          >
          <sl-button
            class="w-50"
            id="save-button"
            variant="primary"
            size="small"
            @click=${this.handleSaveClick}
            disabled
            >Save</sl-button
          >
        </div>
      </div></sl-card
    >`;
  }
}
customElements.define("nb-add-budget-card", AddBudgetCard);
