import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import {
  THEME_LIST,
  PRIMARY_COLOR_LIST,
  BACKGROUND_COLOR_LIST,
  COLOR_CONTRAST_LIST,
  COLOR_PALETTE_LIST,
} from "./theme.mjs";

function toUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class PreferencesCard extends NikElement {
  static properties = {
    theme: { type: Object },
  };

  static queries = {
    themesSelect: "#themes",
    modeSelect: "#mode",
    primaryColorSelect: "#primary-color",
    backgroundColorSelect: "#background-color",
    colorContrastSelect: "#color-contrast",
    colorPaletteSelect: "#color-palette",
  };

  connectedCallback() {
    super.connectedCallback();
    this.init();
  }

  init() {
    this.theme = THEME;
  }

  handleThemeChange() {
    let theme = this.themesSelect.value;
    console.log(theme);

    this.theme.theme = theme;
  }

  handleModeChange() {
    let mode = this.modeSelect.value;
    console.log(mode);

    this.theme.mode = mode;
  }

  handlePrimaryColorChange() {
    let primaryColor = this.primaryColorSelect.value;
    console.log(primaryColor);

    this.theme.primaryColor = primaryColor;
  }

  handleBackgroundColorChange() {
    let backgroundColor = this.backgroundColorSelect.value;
    console.log(backgroundColor);

    this.theme.backgroundColor = backgroundColor;
  }

  handleColorPaletteChange() {
    let colorPalette = this.colorPaletteSelect.value;
    console.log(colorPalette);

    this.theme.colorPalette = colorPalette;
  }

  handleColorContrastChange() {
    let colorContrast = this.colorContrastSelect.value;
    console.log(colorContrast);

    this.theme.colorContrast = colorContrast;
  }

  render() {
    if (!this.theme) {
      return null;
    }

    return html`<wa-card>
      <form id="profile-form" action="" method="POST" autocomplete="off"></form>
      <div class="wa-stack">
        <h2>Preferences</h2>

        <wa-select
          id="themes"
          label="Builtin Themes"
          value=${this.theme.theme}
          @input=${this.handleThemeChange}
          >${THEME_LIST.map(
            (theme) =>
              html`<wa-option value=${theme}>${toUpper(theme)}</wa-option>`
          )}</wa-select
        >

        <wa-select
          id="mode"
          label="Mode"
          value=${this.theme.mode}
          @input=${this.handleModeChange}
          ><wa-option value="light">Light</wa-option
          ><wa-option value="dark">Dark</wa-option></wa-select
        >

        <wa-divider></wa-divider>

        <p>Custom Theming Options</p>

        <wa-select
          clearable
          id="primary-color"
          label="Primary Color"
          value=${this.theme.primaryColor}
          @input=${this.handlePrimaryColorChange}
          >${PRIMARY_COLOR_LIST.map(
            (color) =>
              html`<wa-option value=${color}>${toUpper(color)}</wa-option>`
          )}</wa-select
        >

        <wa-select
          clearable
          id="background-color"
          label="Background Color"
          value=${this.theme.backgroundColor}
          @input=${this.handleBackgroundColorChange}
          >${BACKGROUND_COLOR_LIST.map(
            (color) =>
              html`<wa-option value=${color}>${toUpper(color)}</wa-option>`
          )}</wa-select
        >

        <wa-select
          clearable
          id="color-palette"
          label="Color Palette"
          value=${this.theme.colorPalette}
          @input=${this.handleColorPaletteChange}
          >${COLOR_PALETTE_LIST.map(
            (color) =>
              html`<wa-option value=${color}>${toUpper(color)}</wa-option>`
          )}</wa-select
        >

        <wa-select
          clearable
          id="color-contrast"
          label="Color Contrast"
          value=${this.theme.colorContrast}
          @input=${this.handleColorContrastChange}
          >${COLOR_CONTRAST_LIST.map(
            (color) =>
              html`<wa-option value=${color}>${toUpper(color)}</wa-option>`
          )}</wa-select
        >
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-preferences", PreferencesCard);
