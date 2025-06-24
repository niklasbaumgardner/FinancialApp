const themeStorage = window.localStorage;

export const THEME_LIST = [
  "default",
  "classic",
  "awesome",
  "mellow",
  "active",
  "brutalist",
  "glossy",
  "matter",
  "playful",
  "premium",
  "tailspin",
];

export const THEME_MODE_LIST = ["light", "dark"];

export const PRIMARY_COLOR_LIST = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
];

export const BACKGROUND_COLOR_LIST = [
  "niks-favorite",
  "red",
  "gray",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

export const COLOR_CONTRAST_LIST = [
  "default",
  "classic",
  "awesome",
  "mellow",
  "active",
  "brutalist",
  "glossy",
  "matter",
  "playful",
  "premium",
  "tailspin",
];

export const COLOR_PALETTE_LIST = [
  "default",
  "anodized",
  "bright",
  "classic",
  "elegant",
  "mild",
  "natural",
  "rudimentary",
  "vogue",
];

export class Theme {
  #theme;
  #mode;
  #primaryColor;
  #backgroundColor;
  #colorContrast;
  #colorPalette;
  #initing;

  constructor(theme) {
    this.#initing = true;
    this.theme = theme.theme;
    this.mode = theme.mode;
    this.primaryColor = theme.primary_color;
    this.backgroundColor = theme.background_color;
    this.colorContrast = theme.color_contrast;
    this.colorPalette = theme.color_palette;

    this.#initing = false;

    if (!this.theme) {
      this.makeDefault();
    }
  }

  get theme() {
    return this.#theme;
  }

  get mode() {
    return this.#mode;
  }

  get primaryColor() {
    return this.#primaryColor;
  }

  get backgroundColor() {
    return this.#backgroundColor;
  }

  get colorContrast() {
    return this.#colorContrast;
  }

  get colorPalette() {
    return this.#colorPalette;
  }

  set theme(theme) {
    if (theme === this.theme) {
      return;
    }

    if (THEME_LIST.includes(theme)) {
      this.#theme = theme;
    } else {
      this.#theme = "classic";
    }

    themeStorage.setItem("theme", this.theme);
    document.getElementById("theme-stylesheet").href = this.theme
      ? `https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/styles/themes/${this.theme}.css`
      : "";

    if (!this.#initing) {
      fetch(SET_THEME_URL + "?" + new URLSearchParams({ theme: this.theme }));
    }
  }

  set mode(mode) {
    if (mode && mode === this.mode) {
      return;
    }

    if (THEME_MODE_LIST.includes(mode)) {
      this.#mode = mode;
    } else {
      this.#mode = "light";
    }

    themeStorage.setItem("mode", this.mode);

    // Set theme mode on document
    document.documentElement.classList.toggle("wa-dark", this.mode === "dark");
    document.documentElement.classList.toggle(
      "wa-light",
      this.mode === "light"
    );

    if (!this.#initing) {
      fetch(
        SET_THEME_MODE_URL + "?" + new URLSearchParams({ mode: this.mode })
      );
    }
  }

  /**
   * Sets the primary color
   */
  set primaryColor(primaryColor) {
    if (primaryColor === this.primaryColor) {
      return;
    }

    document.documentElement.classList.remove(`${this.primaryColor}-brand`);

    if (PRIMARY_COLOR_LIST.includes(primaryColor)) {
      this.#primaryColor = primaryColor;
    } else {
      this.#primaryColor = null;
    }

    themeStorage.setItem("primaryColor", this.primaryColor);
    document.getElementById("primary-color-stylesheet").href = this.primaryColor
      ? `https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/styles/brand/${this.primaryColor}.css`
      : "";
    if (this.primaryColor) {
      document.documentElement.classList.add(`${this.primaryColor}-brand`);
    }

    if (!this.#initing) {
      fetch(
        SET_PRIMARY_COLOR_URL +
          "?" +
          new URLSearchParams({ primary_color: this.primaryColor })
      );
    }
  }

  /**
   * Sets the background color
   */
  set backgroundColor(backgroundColor) {
    if (backgroundColor === this.backgroundColor) {
      return;
    }

    document
      .querySelector("main")
      .classList.remove(`${this.backgroundColor}-background`);
    document
      .querySelector("wa-page")
      .classList.remove(`${this.backgroundColor}-background`);

    if (BACKGROUND_COLOR_LIST.includes(backgroundColor)) {
      this.#backgroundColor = backgroundColor;
    } else {
      this.#backgroundColor = null;
    }

    themeStorage.setItem("backgroundColor", this.backgroundColor);
    if (this.backgroundColor) {
      document
        .querySelector("main")
        .classList.add(`${this.backgroundColor}-background`);
      document
        .querySelector("wa-page")
        .classList.add(`${this.backgroundColor}-background`);
    }

    if (!this.#initing) {
      fetch(
        SET_BACKGROUND_COLOR_URL +
          "?" +
          new URLSearchParams({ background_color: this.backgroundColor })
      );
    }
  }

  /**
   * Sets the color contrast
   */
  set colorContrast(colorContrast) {
    if (colorContrast === this.colorContrast) {
      return;
    }

    if (COLOR_CONTRAST_LIST.includes(colorContrast)) {
      this.#colorContrast = colorContrast;
    } else {
      this.#colorContrast = null;
    }

    themeStorage.setItem("colorContrast", this.colorContrast);
    document.getElementById("color-contrast-stylesheet").href = this
      .colorContrast
      ? `https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/styles/themes/${this.colorContrast}/color.css`
      : "";

    if (!this.#initing) {
      fetch(
        SET_COLOR_CONTRAST_URL +
          "?" +
          new URLSearchParams({ color_contrast: this.colorContrast })
      );
    }
  }

  /**
   * Sets the color palette
   */
  set colorPalette(colorPalette) {
    if (colorPalette === this.colorPalette) {
      return;
    }

    if (COLOR_PALETTE_LIST.includes(colorPalette)) {
      this.#colorPalette = colorPalette;
    } else {
      this.#colorPalette = null;
    }

    themeStorage.setItem("colorPalette", this.colorPalette);
    document.getElementById("color-pallete-stylesheet").href = this.colorPalette
      ? `https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/styles/color/${this.colorPalette}.css`
      : "";

    if (!this.#initing) {
      fetch(
        SET_COLOR_PALETTE_URL +
          "?" +
          new URLSearchParams({ color_palette: this.colorPalette })
      );
    }
  }

  makeDefault() {
    this.theme = "classic";
    this.mode = "light";
  }

  migrateTheme(themeMode) {
    this.theme = "classic";
    this.mode = themeMode;
  }
}
