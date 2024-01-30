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
    if (this.budget.isShared) {
      return html`<div class="col text-end">
        <sl-tooltip
          content="This budget is shared with ${this.getSharedUsers()}"
        >
          <sl-icon
            name="person-circle"
            style="padding: var(--sl-spacing-x-small);"
          ></sl-icon
        ></sl-tooltip>
      </div>`;
    }
  }

  nameTemplate() {
    if (this.editing) {
      return html`<div class="col text-start">
          <div class="d-flex flex-column">
            <sl-input
              id="budgetName"
              name="name"
              value="${this.budget.name}"
              @input=${this.handleInput}
              autocomplete="niklas"
              required
            ></sl-input>
          </div>
        </div>
        <div class="col text-end">
          <sl-switch
            ?checked=${this.budget.isActive}
            @click=${this.handleToggle}
            >Active</sl-switch
          >
        </div>`;
    }
    return html`<div class="col text-start">
        <div class="d-flex flex-column">
          <p class="fs-4 mb-0">${this.budget.name}</p>
        </div>
      </div>
      ${this.sharedUserTemplate()}`;
  }

  deleteButtonTemplate() {
    if (!this.budget.isShared) {
      return html`<sl-button
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
          variant="primary"
          size="small"
          @click=${this.handleSaveClick}
          >Save</sl-button
        ><sl-tooltip content="Cancel"
          ><sl-icon-button
            name="x-lg"
            library="system"
            label="Cancel"
            @click=${this.handleCancelClick}
          ></sl-icon-button
        ></sl-tooltip>`;
    }

    return html`<sl-tooltip content="Edit"
      ><sl-icon-button
        class="icon-primary"
        name="pencil-square"
        label="Settings"
        @click=${this.handleEditClick}
      ></sl-icon-button
    ></sl-tooltip>`;
  }

  template() {
    if (this.type === "new") {
      return html`<div class="nb-row-sm">
        <sl-input
          id="budgetName"
          name="name"
          label="Budget name"
          placeholder="Hello world"
          @input=${this.handleInput}
          autocomplete="niklas"
        ></sl-input>
        <div class="row">
          <div class="col">
            <sl-input
              id="budgetAmount"
              type="number"
              name="amount"
              label="Starting amout"
              placeholder="$0.00"
              autocomplete="niklas"
            ></sl-input>
          </div>
          <div class="col d-flex justify-content-end align-items-end gx-2">
            <sl-icon-button
              name="x-lg"
              library="system"
              label="Cancel"
              style="max-height:32px;"
              @click=${this.handleCancelClick}
            ></sl-icon-button>
            <sl-button
              id="saveButton"
              variant="primary"
              size="small"
              @click=${this.handleSaveClick}
              disabled
              >Save</sl-button
            >
          </div>
        </div>
      </div>`;
    }

    return html`<div class="row">${this.nameTemplate()}</div>
      <p class="mt-3">
        <sl-format-number
          type="currency"
          currency="USD"
          value="${this.budget.total}"
          lang="en-US"
        ></sl-format-number>
      </p>
      <div class="d-flex justify-content-end gx-2">
        ${this.buttonsTemplate()}
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
      formData.set("name", this.nameInputEl.value);
      let response = await postRequest(this.budget.editUrl, formData);
      if (response.ok) {
        this.budget.name = this.nameInputEl.value;
        this.editing = false;
      } else {
        this.nameInputEl.setAttribute(
          "help-text",
          "This budget name already exists. Please choose another."
        );
      }
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

  async handleToggle(event) {
    event.stopPropagation();
    const active = this.toggleEl.checked;
    this.budget.isActive = active;
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
    this.editing = false;
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
