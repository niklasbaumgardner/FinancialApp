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

    return html`<div class="wa-grid" id="active">${activeBudgets}</div>
      <div class="wa-grid" id="inactive">${inactiveBudgets}</div>`;
  }

  render() {
    return html`<div class="wa-stack">
      <div class="wa-split">
        <div>
          <h1>Welcome</h1>
          <h3>Combined budget total: ${this.total}</h3>
        </div>
        <wa-button
          variant="neutral"
          appearance="outlined"
          @click=${this.handleAddBudgetClick}
          >Add New Budget</wa-button
        >
      </div>
      ${this.budgetsTemplate()}
    </div>`;
  }
}
customElements.define("nb-view-budgets", ViewBudgets);
