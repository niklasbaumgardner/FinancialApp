"use strict";

async function linkTokenFunc() {
  let configs = {
    onSuccess: (public_token, metadata) => {
      console.log("HERE");
      // Upon successful linking of a bank account,
      // Link will return a public token.
      // Exchange the public token for an access token
      // to make calls to the Plaid API.

      localStorage.setItem("link_token", public_token);

      let formData = new FormData();
      formData.append("public_token", public_token);

      postRequest("/exchange_public_token", formData);
    },

    onLoad: () => {},

    onExit: (err, metadata) => {
      // Optionally capture when your user exited the Link flow.
      // Storing this information can be helpful for support.
    },

    onEvent: (eventName, metadata) => {
      // Optionally capture Link flow events, streamed through
      // this callback as your users connect an Item to Plaid.
    },

    token: (await postRequest(PLAID_CLIENT_LINK_TOKEN_URL)).link_token,
  };

  const handler = Plaid.create(configs);
  handler.open();
}

document.getElementById("link-button").onclick = (event) => {
  linkTokenFunc();
};
