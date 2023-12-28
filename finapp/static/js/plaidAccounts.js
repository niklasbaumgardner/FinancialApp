"use strict";

async function getPlaidAccounts() {
  let accounts = await getRequest(PLAID_ACOUNTS_URL);
  console.log(accounts);

  let accountsList = document.getElementById("accounts-list");
  for (let account of accounts) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = account.official_name;
    accountsList.appendChild(li);
  }
}

getPlaidAccounts();
