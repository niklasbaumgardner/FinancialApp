import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-budget-card.mjs";
import "./nb-add-budget.mjs";

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
    const budgetEl = event.target;
    const budget = budgetEl.budget;
    budgetEl.remove();
    const isActive = budget.is_active;

    let newIndex = this.findNewIndex(budget.name, isActive);
    this.budgets[isActive ? 0 : 1].splice(newIndex, 0, budget);

    this.requestUpdate();
  }

  handleAddBudget(event) {
    const budget = event.detail.budget;

    let newIndex = this.findNewIndex(budget.name, true);
    this.budgets[0].splice(newIndex, 0, budget);

    this.requestUpdate();
  }

  handleAddBudgetClick() {
    if (!this.newBudget) {
      this.newBudget = document.createElement("nb-add-budget");
      document.body.append(this.newBudget);
    }

    this.newBudget.show();
  }

  budgetsTemplate() {
    let [active, inactive] = this.budgets;

    let activeBudgets = active.map(
      (b) =>
        html`<nb-budget-card
          .budget=${b}
          .transferBudgets=${active}
        ></nb-budget-card>`
    );
    let inactiveBudgets = inactive.map(
      (b) =>
        html`<nb-budget-card
          .budget=${b}
          .transferBudgets=${active}
        ></nb-budget-card>`
    );

    return html`<label for="active" class="wa-heading-m">Active Budgets:</label>
      <div class="wa-grid view-budgets-grid" id="active">${activeBudgets}</div>
      <label for="inactive" class="wa-heading-m">Inactive Budgets:</label>
      <div class="wa-grid view-budgets-grid" id="inactive">
        ${inactiveBudgets}
      </div>`;
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
          appearance="filled outlined"
          @click=${this.handleAddBudgetClick}
          >Add New Budget</wa-button
        >
      </div>
      ${this.budgetsTemplate()}
    </div>`;
  }
}
customElements.define("nb-view-budgets", ViewBudgets);
