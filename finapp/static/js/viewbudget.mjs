import { PaginationOwner } from "./pagination.mjs";

let shareBudgetDialog = document.getElementById("share-budget-dialog");
function handleShareButtonClick() {
  shareBudgetDialog.show();
}

// Focus the transaction name input on first tab click
function keydownHandler(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    document.getElementById("name").focus();
    console.log(document.activeElement);
  }
}
window.addEventListener("keydown", keydownHandler, { once: true });

const transactionArray = [];
for (let t of transactionsPy) {
  let transaction = document.createElement("nb-transaction");
  transaction.transaction = JSON.parse(t);
  transactionArray.push(transaction);
}

const paginationOwner = new PaginationOwner(
  transactionArray,
  TOTAL_TRANSACTIONS,
  CURRENT_PAGE,
  NUM_PAGES
);

document.getElementById("name").addEventListener("input", checkInput);
document.getElementById("amount").addEventListener("input", checkInput);
document
  .getElementById("share-budget-button")
  .addEventListener("click", handleShareButtonClick);
