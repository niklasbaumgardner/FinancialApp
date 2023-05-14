"use strict";

function openDeletePrefillModa(id) {
  document.getElementById(id).style.display = "block";
}

function openPreviousPaycheckModal() {
  document.getElementById("previousPaycheckModal").style.display = "block";
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
  document.getElementById("previousPaycheckModal").style.display = "none";

  let table = document.getElementById(id);
  let list = [];
  for (let r = 1; r < table.rows.length - 1; r++) {
    let name = table.rows[r].cells[0].innerText;
    let id = table.rows[r].cells[1].id;
    let amount = table.rows[r].cells[1].innerText;
    list.push({
      id: name + id,
      amount: amount.replace("$", "").replace(",", ""),
    });
  }

  for (let prefill of list) {
    let input = document.getElementById(prefill.id);
    input.value = prefill.amount;
  }

  if (!isPercentage()) {
    document.getElementById("paycheck_amount").value = totalAmount;
  }
  isPaycheckValid();
}

function isPaycheckNameValid() {
  let name = document.getElementById("paycheckName").value;
  let name_error = document.getElementById("name_error");

  if (!name) {
    name_error.classList.add("display-block");
    return false;
  } else {
    name_error.classList.remove("display-block");
    return true;
  }
}

const isPercentage = () => document.getElementById("isPercentage").checked;

function isPaycheckValid() {
  console.log("percent?", isPercentage());

  let amountValid;

  if (isPercentage()) {
    amountValid = isPercentagesValid();
  } else {
    amountValid = isDollarAmountsValid();
  }

  let nameValid = isPaycheckNameValid();
  console.log("name valid", nameValid);

  let submitBtn = document.getElementById("paycheckBtn");
  submitBtn.disabled = !(nameValid && amountValid);
  console.log(!(nameValid && amountValid));
}

function isDollarAmountsValid() {
  let amountValid = false;

  let total = document.getElementById("paycheck_amount").value;
  // prefillBudgets(total);
  if (total !== null) {
    let budgets = document.getElementsByClassName("all-budgets");
    let b_total = 0;
    for (let i = 0; i < budgets.length; i++) {
      b_total += Number(budgets[i].value);
    }
    total = parseFloat(total).toFixed(2);
    b_total = parseFloat(b_total).toFixed(2);

    if (b_total == total) {
      let total_error = document.getElementById("amount_error");
      total_error.classList.remove("display-block");
      amountValid = true;
    } else {
      let total_error = document.getElementById("amount_error");
      total_error.innerText = `$${total} is not equal to Budgets amount of $${b_total}.
      Difference of $${Math.abs((total - b_total).toFixed(2))}`;
      total_error.classList.add("display-block");
    }
  }

  return amountValid;
}

function isPercentagesValid() {
  let amountValid = false;

  let paycheckAmount = document.getElementById("paycheck_amount").value;
  let total = 100;
  // prefillBudgets(total);
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
      let total_error = document.getElementById("amount_error");
      total_error.classList.add("display-none");
      amountValid = true;
    } else {
      let total_error = document.getElementById("amount_error");
      total_error.innerText = `Budgets breakdown (${b_total}%) does not add up too 100%.`;
      total_error.classList.remove("display-none");
    }
  }

  return amountValid;
}

function toggleBudgetBreakdown() {
  let budgets = document.getElementsByClassName("all-budgets");
  let budgetsLi = document.getElementsByClassName("all-budgets-li");

  if (!isPercentage()) {
    for (let b of budgets) {
      b.placeholder = "$0.00";
    }
    for (let b of budgetsLi) {
      let p = b.querySelector("p");
      p.classList.add("display-none");
    }
  } else {
    for (let b of budgets) {
      b.placeholder = "0.00%";
    }
    for (let b of budgetsLi) {
      let p = b.querySelector("p");
      p.classList.remove("display-none");
    }
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
