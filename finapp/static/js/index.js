"use strict";

const ACTIVE = [];
const INACTIVE = [];

function addNewBudget() {
  let budgetCard = document.createElement("budget-card");
  budgetCard.type = "new";
  budgetCard.budget = { addNewBudgetUrl: ADD_NEW_BUDGET_URL };

  addToActive(0, budgetCard);
}

function closeDeleteBudgetDialog(id) {
  const dialog = document.getElementById(id);
  dialog.hide();
}

async function deleteBudgetRequest(event, id) {
  const dialog = document.getElementById(id);
  let form = dialog.querySelector("form");
  let formData = new FormData(form);
  await deleteRequest(form.action, formData);
  dialog.remove();
  let budgetCard = document.getElementById(`budget${id.replace("delete", "")}`);
  budgetCard.remove();
}

async function categorizeBudgets() {
  let activeRow = document
    .querySelector(".budget-row")
    .querySelectorAll("budget-card");
  for (let b of activeRow) {
    ACTIVE[ACTIVE.length] = b;
  }

  let inactiveRow = document
    .querySelectorAll(".budget-row")[1]
    .querySelectorAll("budget-card");
  for (let b of inactiveRow) {
    INACTIVE[INACTIVE.length] = b;
  }
}

function findNewIndex(name, active) {
  let arr = active ? ACTIVE : INACTIVE;

  if (arr.length === 0) {
    return 0;
  }
  for (let [index, budgetCard] of arr.entries()) {
    let test = name.localeCompare(budgetCard.budget.name, "en", {
      sensitivity: "accent",
    });

    if (test < 1) {
      return index;
    }
  }
  return arr.length;
}

function addToActive(index, ele) {
  let activeRow = document.querySelectorAll(".budget-row")[0];
  activeRow.insertBefore(ele, activeRow.children[index]);
}

function addToInactive(index, ele) {
  let inactiveRow = document.querySelectorAll(".budget-row")[1];
  inactiveRow.insertBefore(ele, inactiveRow.children[index]);
}

function removeElement(id) {
  let ele = document.getElementById(id);
  ele.remove();
  return ele;
}

class BudgetManager {
  constructor() {
    window.addEventListener("Budget:ToggleActive", this);
    window.addEventListener("Budget:AddBudget", this);
  }

  handleEvent(event) {
    event.stopPropagation();
    event.preventDefault();

    switch (event.type) {
      case "Budget:ToggleActive":
        this.handleToggleActive(event);
        break;
      case "Budget:AddBudget":
        this.handleAddBudget(event);
        break;
    }
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
    const budgetData = event.detail.budget;
    const budget = document.createElement("budget-card");
    budget.classList.add("button-div");
    budget.budget = JSON.parse(budgetData);

    let newIndex = findNewIndex(budget.budget.name, true);
    ACTIVE.splice(newIndex, 0, budget);

    addToActive(newIndex, budget);
  }
}

// function calls
categorizeBudgets();
const budgetManager = new BudgetManager();
