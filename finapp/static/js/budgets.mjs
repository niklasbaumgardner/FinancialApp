class Budgets {
  constructor() {
    addEventListener("UpdateBudgets", this);
  }

  handleEvent(event) {
    if (event.type === "UpdateBudgets") {
      this.#requestBudgets();
    }
  }

  async #requestBudgets() {
    const response = await fetch(GET_BUDGETS_URL);
    const { budgets, active, inactive } = await response.json();

    document.dispatchEvent(
      new CustomEvent("BudgetsUpdated", {
        bubbles: true,
        detail: { budgets, active, inactive },
      }),
    );
  }
}

const budgetsGlobal = new Budgets();
export { budgetsGlobal };
