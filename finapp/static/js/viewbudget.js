"use strict";

function checkInput() {
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  if (name !== "" && amount !== "") {
    if (!isNaN(amount)) {
      // success
      let btn = document.getElementById("transSubmit");
      btn.disabled = false;
      let nameEle = document.getElementById("name");
      // name.className.replace(' w3-border-red', '');
      if (nameEle.classList.contains("w3-border-red")) {
        nameEle.classList.remove("w3-border-red");
      }
      let amountEle = document.getElementById("amount");
      if (amountEle.classList.contains("w3-border-red")) {
        amountEle.classList.remove("w3-border-red");
      }
      return;
    } else {
      let amountEle = document.getElementById("amount");
      if (!amountEle.classList.contains("w3-border-red")) {
        amountEle.classList.add("w3-border-red");
      }
    }
  }
  if (name == "") {
    let nameEle = document.getElementById("name");
    if (!nameEle.classList.contains("w3-border-red")) {
      nameEle.classList.add("w3-border-red");
    }
  }
  if (amount === "") {
    let amountEle = document.getElementById("amount");
    if (!amountEle.classList.contains("w3-border-red")) {
      amountEle.classList.add("w3-border-red");
    }
  }
  let btn = document.getElementById("transSubmit");
  btn.disabled = true;
}

// Focus the transaction name input on first tab click
function keydownHandler(event) {
  event.preventDefault();
  if (event.key === "Tab") {
    document.getElementById("name").focus();
    console.log(document.activeElement);
  }
}
window.addEventListener("keydown", keydownHandler, { once: true });
