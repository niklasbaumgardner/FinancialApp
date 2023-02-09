"use strict";

async function sendUsernameRequest(username) {
  return getRequest(USERNAME_UNIQUE_URL, { username });
}

async function sendEmailRequest(email) {
  return getRequest(EMAIL_UNIQUE_URL, { email });
}

function enableSubmitButton() {
  let ele = document.querySelector('button[type="submit"]');
  console.log(ele);
  ele.disabled = false;
}

function disableSubmitButton() {
  let ele = document.querySelector('button[type="submit"]');
  console.log(ele);
  ele.disabled = true;
}

let usernameInput = document.getElementById("username");
usernameInput.addEventListener("input", async (event) => {
  let orginalValue = event.target.getAttribute("original-value");
  let newValue = event.target.value;
  let invalidMessage = event.target.nextElementSibling;

  if (orginalValue === newValue) {
    // don't need to send request
    invalidMessage.classList.remove("display-block");
    disableSubmitButton();
  } else {
    let result = await sendUsernameRequest(newValue);
    console.log("username is unique", result.isUnique);

    if (result.isUnique) {
      invalidMessage.classList.remove("display-block");
      enableSubmitButton();
    } else {
      invalidMessage.classList.add("display-block");
      disableSubmitButton();
    }
  }
});

let emailInput = document.getElementById("email");
emailInput.addEventListener("input", async (event) => {
  let orginalValue = event.target.getAttribute("original-value");
  let newValue = event.target.value;
  let invalidMessage = event.target.nextElementSibling;

  if (orginalValue === newValue) {
    // don't need to send request
    invalidMessage.classList.remove("display-block");
    disableSubmitButton();
  } else {
    let result = await sendEmailRequest(event.target.value);
    console.log("email is unique", result.isUnique);

    if (result.isUnique) {
      invalidMessage.classList.remove("display-block");
      enableSubmitButton();
    } else {
      invalidMessage.classList.add("display-block");
      disableSubmitButton();
    }
  }
});
