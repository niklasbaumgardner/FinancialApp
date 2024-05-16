import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { getRequest, postRequest } from "./fetch.mjs";

class BudgetCard extends NikElement {
  static properties = {
    budget: {
      type: Object,
    },
    type: { type: String },
    editing: { type: Boolean, reflect: true },
  };

  static get queries() {
    return {
      toggleEl: "sl-switch",
      nameInputEl: "#budgetName",
      amountInputEl: "#budgetAmount",
      submitButtonEl: "#saveButton",
    };
  }

  getSharedUsers() {
    return this.budget.sharedUserIds?.reduce(
      (acc, curr) => acc + SHARED_USERS[curr].username,
      ""
    );
  }

  sharedUserTemplate() {
    if (this.budget.is_shared) {
      return html` <sl-tooltip
        content="This budget is shared with ${this.getSharedUsers()}"
      >
        <sl-icon
          name="person-circle"
          style="padding: var(--sl-spacing-x-small);"
        ></sl-icon
      ></sl-tooltip>`;
    }
  }

  nameTemplate() {
    if (this.editing) {
      return html`<div
        class="d-flex justify-content-between"
        style="height:40px;"
      >
        <sl-input
          id="budgetName"
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
      </div>`;
    }
    return html`<div
      class="d-flex justify-content-between"
      style="height:40px;"
    >
      <h3>${this.budget.name}</h3>
      ${this.sharedUserTemplate()}
    </div>`;
  }

  activeToggleTemplate() {
    if (!this.editing) {
      return null;
    }

    return html`<sl-switch ?checked=${this.budget.is_active}
      >Active</sl-switch
    >`;
  }

  deleteButtonTemplate() {
    if (!this.budget.is_shared) {
      return html`<sl-button
        class="w-50"
        variant="danger"
        outline
        size="small"
        @click=${this.handleDeleteClick}
        >Delete</sl-button
      >`;
    }
  }

  buttonsTemplate() {
    if (this.editing) {
      return html`${this.deleteButtonTemplate()}<sl-button
          id="saveButton"
          class="${this.budget.is_shared ? "w-100" : "w-50"}"
          variant="primary"
          size="small"
          @click=${this.handleSaveClick}
          >Save</sl-button
        >`;
    }

    return html`<sl-tooltip content="Edit"
      ><sl-icon-button
        style="margin-left:auto;"
        class="icon-primary"
        name="pencil-square"
        label="Settings"
        @click=${this.handleEditClick}
      ></sl-icon-button
    ></sl-tooltip>`;
  }

  template() {
    if (this.type === "new") {
      return html`<div
        class="d-flex flex-column"
        style="gap:var(--sl-spacing-small);"
      >
        <sl-input
          id="budgetName"
          name="name"
          label="Budget name"
          placeholder="Hello world"
          @input=${this.handleInput}
          autocomplete="niklas"
          size="small"
        ></sl-input>
        <sl-input
          id="budgetAmount"
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
            id="saveButton"
            variant="primary"
            size="small"
            @click=${this.handleSaveClick}
            disabled
            >Save</sl-button
          >
        </div>
      </div>`;
    }

    return html`<div
      class="d-flex flex-column"
      style="gap:var(--sl-spacing-medium);"
    >
      ${this.nameTemplate()}
      <div class="d-flex justify-content-between">
        <sl-format-number
          type="currency"
          currency="USD"
          value="${this.budget.total}"
          lang="en-US"
        ></sl-format-number>
        ${this.activeToggleTemplate()}
      </div>
      <div class="d-flex gx-2">${this.buttonsTemplate()}</div>
    </div>`;
  }

  handleInput(event) {
    event.stopPropagation();
    if (
      this.nameInputEl.value === "" ||
      this.nameInputEl.value === this.budget.name
    ) {
      this.submitButtonEl.disabled = true;
      return;
    }

    this.nameInputEl.setAttribute("help-text", "");
    this.submitButtonEl.disabled = false;
    for (let card of document.querySelectorAll("budget-card")) {
      if (this === card) {
        continue;
      }
      if (this.nameInputEl.value === card.budget.name) {
        this.nameInputEl.setAttribute(
          "help-text",
          "This budget name already exists. Please choose another."
        );
        this.submitButtonEl.disabled = true;
        break;
      }
    }
  }

  onClick(event) {
    event.stopPropagation();
    if (["SL-INPUT"].includes(event.target.tagName) || this.editing) {
      return;
    }
    window.location.href = this.budget.url;
  }

  handleEditClick(event) {
    event.stopPropagation();
    this.editing = true;
  }

  handleDeleteClick(event) {
    event.stopPropagation();
    const dialog = document.getElementById(`delete${this.budget.id}`);
    dialog.show();
  }

  async handleSaveClick(event) {
    event.stopPropagation();
    let formData = new FormData();
    if (this.type === "new") {
      // create budget
      formData.set("name", this.nameInputEl.value);
      formData.set("amount", this.amountInputEl.value ?? 0);
      formData.set("date", document.getElementById("date").value);
      let response = await postRequest(this.budget.addNewBudgetUrl, formData);
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
        this.nameInputEl.setAttribute(
          "help-text",
          "This budget name already exists. Please choose another."
        );
      }
    } else {
      // save budget
      const active = this.toggleEl.checked;
      if (active !== this.budget.is_active) {
        this.budget.is_active = active;
        // send request that
        await getRequest(this.budget.toggleActiveUrl, {
          id: this.budget.id,
          active,
        });

        // send event to budget manager to move this to active/inactive
        this.dispatchEvent(
          new CustomEvent("Budget:ToggleActive", {
            bubbles: true,
          })
        );
      }

      const name = this.nameInputEl.value;
      if (name !== this.budget.name) {
        formData.set("name", this.nameInputEl.value);
        let response = await postRequest(this.budget.editUrl, formData);
        if (response.ok) {
          this.budget.name = this.nameInputEl.value;
        } else {
          this.nameInputEl.setAttribute(
            "help-text",
            "This budget name already exists. Please choose another."
          );
          return;
        }
      }

      this.editing = false;
    }
  }

  handleCancelClick(event) {
    event.stopPropagation();
    if (this.type === "new") {
      this.remove();
    } else {
      this.editing = false;
    }
  }

  render() {
    if (this.type === "new") {
      return html`<sl-card>${this.template()}</sl-card>`;
    }

    return html`<sl-card @click=${this.onClick}>${this.template()}</sl-card>`;
  }
}

export default BudgetCard;

customElements.define("budget-card", BudgetCard);
