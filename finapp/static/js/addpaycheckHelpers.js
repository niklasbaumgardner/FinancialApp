"use strict";

function openPreviousPaycheckDialog() {
  const dialog = document.getElementById("prefills");
  dialog.show();
}

function closePreviousPaycheckDialog() {
  const dialog = document.getElementById("prefills");
  dialog.hide();
}

function openDeletePrefillDialog(id) {
  const dialog = document.getElementById(id);
  dialog.show();
}

function closeDeletePrefillDialog(id) {
  const dialog = document.getElementById(id);
  dialog.hide();
}

async function sendDeletePrefillRequest(event, id, amount, url) {
  let button = event.target;
  if (button.tagName !== "BUTTON") {
    button = button.parentElement;
  }

  let message = button.querySelector(".value");
  message.hidden = true;

  let spinner = button.querySelector(".spinner");
  spinner.hidden = false;

  let loading = button.querySelector(".loading");
  loading.hidden = false;

  let response = await getRequest(url);
  console.log(response);

  document.getElementById(id).remove();

  document.getElementById(`prefill${amount}`).remove();
}

function fillBudgetAmountsFromPrefill(id, totalAmount) {
  closePreviousPaycheckDialog();

  let table = document.getElementById(id);
  for (let row of table.querySelectorAll("tbody > tr")) {
    let budgetName = row.innerText.trim();
    let budgetId = row.cells[1].id;
    let id = budgetName + budgetId;
    let amount = row.querySelector("sl-format-number").value;

    let input = document.getElementById(id);
    if (input) {
      input.value = amount;
    }
  }

  document.getElementById("paycheck_amount").value = totalAmount;
  isPaycheckValid();
}

function isPaycheckValid() {
  let amountValid;

  amountValid = isDollarAmountsValid();

  let nameValid = isPaycheckNameValid();
  console.log("name valid", nameValid);

  let submitBtn = document.getElementById("paycheckBtn");
  submitBtn.disabled = !(nameValid && amountValid);
  console.log(!(nameValid && amountValid));
}

function isPaycheckNameValid() {
  let nameEl = document.getElementById("paycheckName");
  let name = nameEl.value;

  if (!name) {
    nameEl.setAttribute("help-text", "Please enter a name for the paycheck.");
    return false;
  } else {
    nameEl.setAttribute("help-text", "");
    return true;
  }
}

function isDollarAmountsValid() {
  let amountValid = false;
  let amountEl = document.getElementById("paycheck_amount");
  let total = amountEl.value;

  if (total !== null) {
    let budgets = document.getElementsByClassName("all-budgets");
    let b_total = 0;
    for (let i = 0; i < budgets.length; i++) {
      b_total += Number(budgets[i].value);
    }
    total = parseFloat(total).toFixed(2);
    b_total = parseFloat(b_total).toFixed(2);

    if (b_total == total) {
      amountEl.setAttribute("help-text", "");
      amountValid = true;
    } else {
      amountEl.setAttribute(
        "help-text",
        `$${total} is not equal to Budgets amount of $${b_total}.
        Difference of $${Math.abs((total - b_total).toFixed(2))}`
      );
    }
  }

  return amountValid;
}

function isPercentagesValid() {
  let amountValid = false;
  let amountEl = document.getElementById("paycheck_amount");
  let paycheckAmount = amountEl.value;
  let total = 100;

  if (total !== null) {
    let budgets = document.getElementsByClassName("all-budgets");
    let b_total = 0;
    for (let b of budgets) {
      let temp = Number(b.value);
      b_total += temp;
      let p = b.parentElement.parentElement.querySelector("p");
      p.innerText = "$" + (Number(paycheckAmount).toFixed(2) * temp) / 100;
    }
    total = parseFloat(total).toFixed(2);
    b_total = parseFloat(b_total).toFixed(2);

    if (b_total == total) {
      amountEl.setAttribute("help-text", "");
      amountValid = true;
    } else {
      amountEl.setAttribute(
        "help-text",
        `Budgets breakdown (${b_total}%) does not add up too 100%.`
      );
    }
  }

  return amountValid;
}

function toggleBudgetBreakdown() {
  let budgets = document.getElementsByClassName("all-budgets");
  let budgetsLi = document.getElementsByClassName("all-budgets-li");

  for (let b of budgets) {
    b.placeholder = "$0.00";
  }
  for (let b of budgetsLi) {
    let p = b.querySelector("p");
    p.classList.add("display-none");
  }
  isPaycheckValid();

  // fix this
  let accordionItems = document.getElementsByClassName("accordion-item");
  for (let item of accordionItems) {
    if (item.classList.contains("display-none")) {
      item.classList.remove("display-none");
    } else {
      item.classList.add("display-none");
    }
  }
}

function addEventListeners() {
  document
    .getElementById("paycheckName")
    .addEventListener("input", isPaycheckValid);
  document
    .getElementById("paycheck_amount")
    .addEventListener("input", isPaycheckValid);

  let budgets = document.getElementsByClassName("all-budgets");

  for (let budget of budgets) {
    budget.addEventListener("input", isPaycheckValid);
  }
}

addEventListeners();
