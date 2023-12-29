"use strict";

const storage = window["localStorage"];

function getTheme() {
  return storage.getItem("theme");
}

function getThemeButton(theme) {
  return document.getElementById(theme);
}

function getThemeButtons() {
  let menu = document.getElementById("theme-selector");
  return menu.querySelectorAll("sl-menu-item");
}

function getThemeIcon(theme) {
  return document.getElementById(`${theme}-icon`);
}

function getThemeIcons() {
  let button = document.getElementById("theme-button");
  return button.querySelectorAll("sl-icon");
}

function setTheme(theme, options) {
  theme = theme === "dark" ? "dark" : "light";

  console.log("setting theme", theme);

  // Set html element theme
  document.documentElement.setAttribute("data-bs-theme", theme);
  document.documentElement.setAttribute("class", `sl-theme-${theme}`);

  // Set all buttons to inactive
  for (let button of getThemeButtons()) {
    button.checked = button.id === theme;
  }

  // Set theme button to active
  // let currentThemeButton = getThemeButton(theme);
  // currentThemeButton.checked = true;

  for (let icon of getThemeIcons()) {
    icon.hidden = true;
  }

  let currentThemeIcon = getThemeIcon(theme);
  currentThemeIcon.hidden = false;

  if (theme === getTheme()) {
    return;
  }

  storage.setItem("theme", theme);
  if (!(options?.dontSend === true)) {
    fetch(THEME_URL + "?" + new URLSearchParams({ theme }));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (THEME === "") {
    let storedTheme = getTheme();
    setTheme(storedTheme);
  } else {
    setTheme(THEME, { dontSend: true });
  }

  let themeSelector = document.getElementById("theme-selector");
  themeSelector.addEventListener("sl-select", (event) => {
    let theme = event.detail.item.id;
    setTheme(theme);
  });
});