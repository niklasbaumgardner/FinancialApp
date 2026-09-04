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
    const { budgets } = await response.json();
    console.log(budgets);

    document.dispatchEvent(
      new CustomEvent("BudgetsUpdated", { bubbles: true, detail: { budgets } }),
    );
  }
}

const budgetsGlobal = new Budgets();
export { budgetsGlobal };
