"use strict";

const ACTIVE = [];
const INACTIVE = [];

function categorizeBudgets() {
  let allBudgets = document.querySelectorAll(".budgets");

  for (let b of allBudgets) {
    let active = b.querySelector(".activeState").checked;
    if (active) {
      ACTIVE[ACTIVE.length] = [b.id, b.querySelector(".fs-4").innerHTML];
    } else {
      INACTIVE[INACTIVE.length] = [b.id, b.querySelector(".fs-4").innerHTML];
    }
  }

  // console.log(ACTIVE);
  // console.log(INACTIVE);
}

function findNewIndex(id, name, active) {
  let arr = active ? ACTIVE : INACTIVE;

  if (arr.length == 0) {
    return 0;
  }
  for (let [index, ele] of arr.entries()) {
    let test = name.localeCompare(ele[1], "en", { sensitivity: "accent" });
    // console.log(name, ele[1], test);
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

async function toggleBudgetActive(id, event) {
  let active = event.target.checked;
  const strId = `budget-${id}`;

  let temp = await sendToggle(id, active);

  await new Promise((r) => setTimeout(r, 500));

  if (active) {
    let index = INACTIVE.findIndex((element) => element[0] == strId);
    let name = INACTIVE[index][1];
    // console.log(index);
    INACTIVE.splice(index, 1);
    // console.log(INACTIVE);

    let ele = removeElement(strId);

    let newIndex = findNewIndex(strId, name, active);
    ACTIVE.splice(newIndex, 0, [strId, name]);
    // console.log(ACTIVE);

    addToActive(newIndex, ele);
  } else {
    let index = ACTIVE.findIndex((element) => element[0] == strId);
    let name = ACTIVE[index][1];
    // console.log(index);
    ACTIVE.splice(index, 1);
    // console.log(ACTIVE);

    let ele = removeElement(strId);

    let newIndex = findNewIndex(strId, name, active);
    INACTIVE.splice(newIndex, 0, [strId, name]);

    addToInactive(newIndex, ele);
  }
}

// function calls
categorizeBudgets();
