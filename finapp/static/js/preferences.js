"use strict";

function setColor(color) {
  fetch(COLOR_URL + "?" + new URLSearchParams({ color }));
}

let themeSelector = document.getElementById("preferences-theme-selector");
themeSelector.addEventListener("sl-input", () => setTheme(themeSelector.value));

let primaryColorSelector = document.getElementById(
  "preferences-primary-color-selector"
);
primaryColorSelector.addEventListener("sl-input", () => {
  let newColor = primaryColorSelector.value;
  for (let classString of document.documentElement.classList) {
    if (classString.includes("-primary")) {
      document.documentElement.classList.remove(classString);
    }
  }

  document.documentElement.classList.add(`${newColor}-primary`);

  setColor(newColor);
});
