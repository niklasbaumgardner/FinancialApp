import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-budget-card.mjs";

export class ViewBudgets extends NikElement {
  static properties = {
    budgets: { type: Array },
    total: { type: String },
  };

  static queries = { active: "#active", inactive: "#inactive" };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("Budget:ToggleActive", this);
    document.addEventListener("Budget:AddBudget", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "Budget:ToggleActive":
        this.handleToggleActive(event);
        break;
      case "Budget:AddBudget":
        this.handleAddBudget(event);
        break;
    }
  }

  findNewIndex(name, isActive) {
    let [active, inactive] = this.budgets;
    let arr = isActive ? active : inactive;

    if (arr.length === 0) {
      return 0;
    }
    for (let [index, budget] of arr.entries()) {
      let test = name.localeCompare(budget.name, "en");

      if (test < 1) {
        return index;
      }
    }
    return arr.length;
  }

  handleToggleActive(event) {
    const budget = event.target;
    budget.remove();
    const active = budget.budget.is_active;

    if (active) {
      let index = INACTIVE.findIndex((element) => element === budget);
      INACTIVE.splice(index, 1);

      let newIndex = findNewIndex(budget.budget.name, active);
      ACTIVE.splice(newIndex, 0, budget);

      addToActive(newIndex, budget);
    } else {
      let index = ACTIVE.findIndex((element) => element === budget);
      ACTIVE.splice(index, 1);

      let newIndex = findNewIndex(budget.budget.name, active);
      INACTIVE.splice(newIndex, 0, budget);

      addToInactive(newIndex, budget);
    }
  }

  handleAddBudget(event) {
    const budget = event.detail.budget;

    let newIndex = this.findNewIndex(budget.name, true);
    this.budgets[0].splice(newIndex, 0, budget);

    this.requestUpdate();
  }

  handleAddBudgetClick() {
    let newBudgetCard = document.createElement("nb-add-budget-card");
    this.active.insertBefore(newBudgetCard, this.active.firstChild);
  }

  budgetsTemplate() {
    let [active, inactive] = this.budgets;

    let activeBudgets = active.map(
      (b) =>
        html`<nb-budget-card
          class="button-div"
          .budget=${b}
          .transferBudgets=${active}
        ></nb-budget-card>`
    );
    let inactiveBudgets = inactive.map(
      (b) =>
        html`<nb-budget-card
          class="button-div"
          .budget=${b}
          .transferBudgets=${active}
        ></nb-budget-card>`
    );

    return html`<div class="index-grid mb-5 pb-5 budget-row" id="active">
        ${activeBudgets}
      </div>
      <div class="index-grid mb-5 pb-5 budget-row" id="inactive">
        ${inactiveBudgets}
      </div>`;
  }

  render() {
    return html`<div class="row justify-content-between mx-0 welcome mb-5">
        <div class="col-auto me-auto px-0">
          <div class="fs-1">Welcome</div>
          <div class="fs-4 mb-0 subhead">
            Your total of all budgets is ${this.total}
          </div>
        </div>
        <div class="col-auto pt-5 px-0 mr-0">
          <sl-button variant="nik" outline @click=${this.handleAddBudgetClick}
            >Add New Budget</sl-button
          >
        </div>
      </div>
      ${this.budgetsTemplate()}`;
  }
}
customElements.define("nb-view-budgets", ViewBudgets);
