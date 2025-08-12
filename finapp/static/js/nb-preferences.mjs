import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import {
  THEME_LIST,
  PRIMARY_COLOR_LIST,
  BACKGROUND_COLOR_LIST,
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
        <div class="wa-stack">
          <h2>Preferences</h2>

          <wa-select
            id="themes"
            label="Builtin Themes"
            @input=${this.handleThemeChange}
            >${THEME_LIST.map(
              (theme) =>
                html`<wa-option
                  ?selected=${this.theme.theme === theme}
                  value=${theme}
                  >${toUpper(theme)}</wa-option
                >`
            )}</wa-select
          >

          <wa-select id="mode" label="Mode" @input=${this.handleModeChange}
            ><wa-option value="light" ?selected=${this.theme.mode === "light"}
              >Light</wa-option
            ><wa-option value="dark" ?selected=${this.theme.mode === "dark"}
              >Dark</wa-option
            ></wa-select
          >

          <wa-divider></wa-divider>

          <p>Custom Theming Options</p>

          <wa-select
            with-clear
            id="primary-color"
            label="Primary Color"
            @input=${this.handlePrimaryColorChange}
            >${PRIMARY_COLOR_LIST.map(
              (color) =>
                html`<wa-option
                  ?selected=${this.theme.primaryColor === color}
                  value=${color}
                  >${toUpper(color)}</wa-option
                >`
            )}</wa-select
          >

          <wa-select
            with-clear
            id="background-color"
            label="Background Color"
            @input=${this.handleBackgroundColorChange}
            >${BACKGROUND_COLOR_LIST.map(
              (color) =>
                html`<wa-option
                  ?selected=${this.theme.backgroundColor === color}
                  value=${color}
                  >${toUpper(color)}</wa-option
                >`
            )}</wa-select
          >

          <wa-select
            with-clear
            id="color-palette"
            label="Color Palette"
            @input=${this.handleColorPaletteChange}
            >${COLOR_PALETTE_LIST.map(
              (color) =>
                html`<wa-option
                  ?selected=${this.theme.colorPalette === color}
                  value=${color}
                  >${toUpper(color)}</wa-option
                >`
            )}</wa-select
          >
        </div>
      </div>
    </wa-card>`;
  }

  previewTemplate() {
    return html`<wa-divider></wa-divider>
      <h3>Preview</h3>
      ${this.previewTemplate()}`;
    return html`<wa-scroller orientation="vertical" style="max-height: 50vh"
      ><div class="wa-grid">
        <wa-card appearance="outlined" with-header="" with-footer="">
          <div slot="header" class="wa-split">
            <h3 class="wa-heading-m">Your Cart</h3>
            <wa-button
              appearance="plain"
              size="small"
              tabindex="-1"
              variant="neutral"
            >
              <wa-icon
                name="xmark"
                label="Close"
                role="img"
                aria-label="Close"
              ></wa-icon>
            </wa-button>
          </div>
          <div class="wa-stack wa-gap-xl">
            <div class="wa-flank">
              <wa-avatar
                shape="rounded"
                style="background-color: var(--wa-color-green-60); color: var(--wa-color-green-95)"
              >
                <wa-icon
                  slot="icon"
                  name="sword-laser"
                  aria-hidden="true"
                ></wa-icon>
              </wa-avatar>
              <div class="wa-stack wa-gap-2xs">
                <div class="wa-split wa-gap-2xs">
                  <strong>Initiate Saber</strong>
                  <strong>$179.99</strong>
                </div>
                <div class="wa-split wa-gap-2xs wa-caption-m">
                  <span>Green</span>
                  <a href="#" tabindex="-1">Remove</a>
                </div>
              </div>
            </div>
            <wa-divider
              role="separator"
              aria-orientation="horizontal"
              orientation="horizontal"
            ></wa-divider>
            <div class="wa-flank">
              <wa-avatar
                shape="rounded"
                style="background-color: var(--wa-color-cyan-60); color: var(--wa-color-cyan-95)"
              >
                <wa-icon
                  slot="icon"
                  name="robot-astromech"
                  aria-hidden="true"
                ></wa-icon>
              </wa-avatar>
              <div class="wa-stack wa-gap-2xs">
                <div class="wa-split wa-gap-2xs">
                  <strong>Repair Droid</strong>
                  <strong>$3,049.99</strong>
                </div>
                <div class="wa-split wa-gap-2xs wa-caption-m">
                  <span>R-series</span>
                  <a href="#" tabindex="-1">Remove</a>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="wa-stack">
            <div class="wa-split">
              <strong>Subtotal</strong>
              <strong>$3,229.98</strong>
            </div>
            <span class="wa-caption-m"
              >Shipping and taxes calculated at checkout.</span
            >
            <wa-button
              tabindex="-1"
              variant="brand"
              appearance="accent"
              size="medium"
            >
              <wa-icon
                slot="start"
                name="shopping-bag"
                aria-hidden="true"
              ></wa-icon>
              Checkout
            </wa-button>
          </div>
        </wa-card>
        <wa-card appearance="outlined">
          <wa-avatar
            shape="rounded"
            style="--size: 1.8lh; float: left; margin-right: var(--wa-space-m)"
          >
            <wa-icon
              slot="icon"
              name="hat-wizard"
              style="font-size: 1.75em"
              aria-hidden="true"
            ></wa-icon>
          </wa-avatar>
          <p
            class="wa-body-l"
            style="margin: 0; font-family: var(--wa-font-family-longform); font-weight: var(--wa-font-weight-longform)"
          >
            “All we have to decide is what to do with the time that is given to
            us. There are other forces at work in this world, Frodo, besides the
            will of evil.”
          </p>
        </wa-card>
        <wa-card appearance="outlined">
          <div class="wa-stack">
            <h3 class="wa-heading-m">Sign In</h3>
            <wa-input
              tabindex="-1"
              label="Email"
              placeholder="ddjarin@mandalore.gov"
              inert=""
              type="text"
              size="medium"
              appearance="outlined"
            >
              <wa-icon
                slot="start"
                name="envelope"
                variant="regular"
                aria-hidden="true"
              ></wa-icon>
            </wa-input>
            <wa-input
              tabindex="-1"
              label="Password"
              type="password"
              inert=""
              size="medium"
              appearance="outlined"
            >
              <wa-icon
                slot="start"
                name="lock"
                variant="regular"
                aria-hidden="true"
              ></wa-icon>
            </wa-input>
            <wa-button
              tabindex="-1"
              variant="brand"
              appearance="accent"
              size="medium"
              >Sign In</wa-button
            >
            <a href="#" tabindex="-1" class="wa-body-s">I forgot my password</a>
          </div>
        </wa-card>
        <wa-card appearance="outlined" with-footer="">
          <div class="wa-stack">
            <div class="wa-split">
              <h3 class="wa-heading-m">To-Do</h3>
              <wa-button
                appearance="plain"
                size="small"
                tabindex="-1"
                variant="neutral"
              >
                <wa-icon
                  name="plus"
                  label="Add task"
                  role="img"
                  aria-label="Add task"
                ></wa-icon>
              </wa-button>
            </div>
            <wa-checkbox
              tabindex="-1"
              checked=""
              name=""
              size="medium"
              value="on"
              >Umbrella for Adelard</wa-checkbox
            >
            <wa-checkbox
              tabindex="-1"
              checked=""
              name=""
              size="medium"
              value="on"
              >Waste-paper basket for Dora</wa-checkbox
            >
            <wa-checkbox
              tabindex="-1"
              checked=""
              name=""
              size="medium"
              value="on"
              >Pen and ink for Milo</wa-checkbox
            >
            <wa-checkbox tabindex="-1" name="" size="medium" value="on"
              >Mirror for Angelica</wa-checkbox
            >
            <wa-checkbox tabindex="-1" name="" size="medium" value="on"
              >Silver spoons for Lobelia</wa-checkbox
            >
          </div>
          <div slot="footer">
            <a href="" tabindex="-1">View all completed</a>
          </div>
        </wa-card>
        <wa-card appearance="outlined">
          <div class="wa-stack">
            <div
              class="wa-frame wa-border-radius-m"
              style="align-self: center; max-inline-size: 25ch"
            >
              <img
                src="https://images.unsplash.com/photo-1667514627762-521b1c815a89?q=20"
                alt="Album art"
              />
            </div>
            <div class="wa-flank:end wa-align-items-start">
              <div class="wa-stack wa-gap-3xs">
                <div class="wa-cluster wa-gap-xs" style="height: 2.25em">
                  <strong>The Stone Troll</strong>
                  <small
                    ><wa-badge
                      variant="neutral"
                      appearance="filled"
                      attention="none"
                      >E</wa-badge
                    ></small
                  >
                </div>
                <span class="wa-caption-m">Samwise G</span>
              </div>
              <wa-button
                appearance="plain"
                size="small"
                tabindex="-1"
                variant="neutral"
              >
                <wa-icon
                  name="ellipsis"
                  label="Options"
                  role="img"
                  aria-label="Options"
                ></wa-icon>
              </wa-button>
            </div>
            <div class="wa-stack wa-gap-2xs">
              <wa-progress-bar
                value="34"
                style="--percentage: 34%;"
              ></wa-progress-bar>
              <div class="wa-split">
                <span class="wa-caption-xs">1:01</span>
                <span class="wa-caption-xs">-1:58</span>
              </div>
            </div>
            <div
              class="wa-grid wa-align-items-center"
              style="--min-column-size: 1em; justify-items: center"
            >
              <wa-button
                appearance="plain"
                tabindex="-1"
                variant="neutral"
                size="medium"
              >
                <wa-icon
                  name="backward"
                  label="Skip backward"
                  role="img"
                  aria-label="Skip backward"
                ></wa-icon>
              </wa-button>
              <wa-button
                appearance="plain"
                size="large"
                tabindex="-1"
                variant="neutral"
              >
                <wa-icon
                  name="pause"
                  label="Pause"
                  role="img"
                  aria-label="Pause"
                ></wa-icon>
              </wa-button>
              <wa-button
                appearance="plain"
                tabindex="-1"
                variant="neutral"
                size="medium"
              >
                <wa-icon
                  name="forward"
                  label="Skip forward"
                  role="img"
                  aria-label="Skip forward"
                ></wa-icon>
              </wa-button>
            </div>
          </div>
        </wa-card>
        <wa-card appearance="outlined">
          <div class="wa-stack">
            <h3 class="wa-heading-m">Chalmun's Spaceport Cantina</h3>
            <div class="wa-cluster wa-gap-xs">
              <wa-rating
                value="4.6"
                readonly=""
                tabindex="-1"
                size="medium"
              ></wa-rating>
              <strong>4.6</strong>
              <span>(419 reviews)</span>
            </div>
            <div class="wa-cluster wa-gap-xs">
              <div class="wa-cluster wa-gap-3xs">
                <wa-icon
                  name="dollar"
                  style="color: var(--wa-color-green-60)"
                  aria-hidden="true"
                ></wa-icon>
                <wa-icon
                  name="dollar"
                  style="color: var(--wa-color-green-60)"
                  aria-hidden="true"
                ></wa-icon>
                <wa-icon
                  name="dollar"
                  style="color: var(--wa-color-green-60)"
                  aria-hidden="true"
                ></wa-icon>
              </div>
              <span class="wa-caption-m">•</span>
              <wa-tag
                size="small"
                variant="neutral"
                appearance="outlined filled"
                >Cocktail Bar</wa-tag
              >
              <wa-tag
                size="small"
                variant="neutral"
                appearance="outlined filled"
                >Gastropub</wa-tag
              >
              <wa-tag
                size="small"
                variant="neutral"
                appearance="outlined filled"
                >Local Fare</wa-tag
              >
            </div>
            <div class="wa-flank wa-gap-xs">
              <wa-icon name="location-dot" aria-hidden="true"></wa-icon>
              <a href="#" class="wa-caption-m" tabindex="-1"
                >Mos Eisley, Tatooine</a
              >
            </div>
          </div>
        </wa-card>
        <wa-card appearance="plain" style="--spacing: 0;">
          <div class="wa-stack wa-gap-s">
            <wa-callout
              variant="success"
              appearance="outlined filled"
              size="medium"
            >
              <wa-icon
                slot="icon"
                name="user-bounty-hunter"
                aria-hidden="true"
              ></wa-icon>
              <div class="wa-split">
                <span>This is the way.</span>
                <wa-button variant="success" size="small" appearance="accent">
                  Follow the Creed
                </wa-button>
              </div>
            </wa-callout>
            <wa-callout
              variant="warning"
              appearance="outlined filled"
              size="medium"
            >
              <wa-icon
                slot="icon"
                name="starfighter-twin-ion-engine"
                aria-hidden="true"
              ></wa-icon>
              <div class="wa-split">
                <span>It's a trap!</span>
                <wa-button variant="warning" size="small" appearance="accent">
                  Take Evasive Action
                </wa-button>
              </div>
            </wa-callout>
            <wa-callout
              variant="danger"
              appearance="outlined filled"
              size="medium"
            >
              <wa-icon
                slot="icon"
                name="space-station-moon"
                aria-hidden="true"
              ></wa-icon>
              <div class="wa-split">
                <span>That's no moon.</span>
                <wa-button variant="danger" size="small" appearance="accent">
                  Turn Around
                </wa-button>
              </div>
            </wa-callout>
          </div>
        </wa-card>
        <wa-card appearance="outlined">
          <div class="wa-stack">
            <div class="wa-flank:end">
              <h3 id="odds-label" class="wa-heading-m">Tell Me the Odds</h3>
              <wa-switch
                size="large"
                aria-labelledby="odds-label"
                tabindex="-1"
                value="on"
              ></wa-switch>
            </div>
            <p class="wa-body-s">
              Allow protocol droids to inform you of probabilities, such as the
              success rate of navigating an asteroid field. We recommend setting
              this to "Never."
            </p>
          </div>
        </wa-card>
        <wa-card appearance="outlined" with-footer="">
          <div class="wa-stack">
            <div class="wa-split wa-align-items-start">
              <dl class="wa-stack wa-gap-2xs">
                <dt class="wa-heading-s">Amount</dt>
                <dd class="wa-heading-l">$5,610.00</dd>
              </dl>
              <wa-badge
                appearance="filled outlined"
                variant="success"
                attention="none"
                >Paid</wa-badge
              >
            </div>
            <wa-divider
              role="separator"
              aria-orientation="horizontal"
              orientation="horizontal"
            ></wa-divider>
            <dl class="wa-stack">
              <div class="wa-flank wa-align-items-center">
                <dt>
                  <wa-icon
                    name="user"
                    label="Name"
                    fixed-width=""
                    role="img"
                    aria-label="Name"
                  ></wa-icon>
                </dt>
                <dd>Tom Bombadil</dd>
              </div>
              <div class="wa-flank wa-align-items-center">
                <dt>
                  <wa-icon
                    name="calendar-days"
                    label="Date"
                    fixed-width=""
                    role="img"
                    aria-label="Date"
                  ></wa-icon>
                </dt>
                <dd><wa-format-date date="2025-03-15"></wa-format-date></dd>
              </div>
              <div class="wa-flank wa-align-items-center">
                <dt>
                  <wa-icon
                    name="coin-vertical"
                    fixed-width=""
                    aria-hidden="true"
                  ></wa-icon>
                </dt>
                <dd>Paid with copper pennies</dd>
              </div>
            </dl>
          </div>
          <div slot="footer">
            <a href="" class="wa-cluster wa-gap-2xs" tabindex="-1">
              <span>Download Receipt</span>
              <wa-icon name="arrow-right" aria-hidden="true"></wa-icon>
            </a>
          </div>
        </wa-card>
        <wa-card appearance="outlined" with-footer="">
          <div class="wa-stack">
            <div class="wa-split">
              <div class="wa-cluster wa-heading-l">
                <wa-icon name="book-sparkles" aria-hidden="true"></wa-icon>
                <h3>Fellowship</h3>
              </div>
              <wa-badge variant="brand" appearance="accent" attention="none"
                >Most Popular</wa-badge
              >
            </div>
            <span class="wa-flank wa-align-items-baseline wa-gap-2xs">
              <span class="wa-heading-2xl">$120</span>
              <span class="wa-caption-l">per year</span>
            </span>
            <p class="wa-caption-l">
              Carry great power (and great responsibility).
            </p>
            <wa-button
              variant="brand"
              tabindex="-1"
              appearance="accent"
              size="medium"
              >Get this Plan</wa-button
            >
          </div>
          <div slot="footer" class="wa-stack wap-gap-s">
            <h4 class="wa-heading-s">What You Get</h4>
            <div class="wa-stack">
              <div class="wa-flank">
                <wa-icon
                  name="user"
                  fixed-width=""
                  aria-hidden="true"
                ></wa-icon>
                <span class="wa-caption-m">9 users</span>
              </div>
              <div class="wa-flank">
                <wa-icon
                  name="ring"
                  fixed-width=""
                  aria-hidden="true"
                ></wa-icon>
                <span class="wa-caption-m">1 ring</span>
              </div>
              <div class="wa-flank">
                <wa-icon
                  name="chess-rook"
                  fixed-width=""
                  aria-hidden="true"
                ></wa-icon>
                <span class="wa-caption-m">API access to Isengard</span>
              </div>
              <div class="wa-flank">
                <wa-icon
                  name="feather"
                  fixed-width=""
                  aria-hidden="true"
                ></wa-icon>
                <span class="wa-caption-m">Priority eagle support</span>
              </div>
            </div>
          </div>
        </wa-card>
        <wa-card class="showcase-code-sample" appearance="outlined">
          <pre>&lt;<span class="tag">div</span> <span class="attribute">class</span>="<span class="value">fellowship</span>"&gt;
  &lt;<span class="tag">p</span> <span class="attribute">class</span>="<span class="value">ring-bearer</span>"&gt;Frodo carries the &lt;<span class="tag">span</span> <span class="attribute">id</span>="<span class="value">one-ring</span>"&gt;One Ring&lt;/<span class="tag">span</span>&gt;&lt;/<span class="tag">p</span>&gt;
  &lt;<span class="tag">ul</span> <span class="attribute">class</span>="<span class="value">companions</span>"&gt;
    &lt;<span class="tag">li</span> <span class="attribute">data-race</span>="<span class="value">wizard</span>"&gt;Gandalf the Grey&lt;/<span class="tag">li</span>&gt;
    &lt;<span class="tag">li</span> <span class="attribute">data-race</span>="<span class="value">elf</span>"&gt;Legolas&lt;/<span class="tag">li</span>&gt;
    &lt;<span class="tag">li</span> <span class="attribute">data-race</span>="<span class="value">dwarf</span>"&gt;Gimli&lt;/<span class="tag">li</span>&gt;
  &lt;/<span class="tag">ul</span>&gt;
&lt;/<span class="tag">div</span>&gt;</pre>
        </wa-card>
        <wa-card with-footer="" appearance="outlined">
          <div class="wa-flank:end">
            <div class="wa-stack wa-gap-xs">
              <div class="wa-cluster wa-gap-xs">
                <h3 class="wa-heading-s">Migs Mayfeld</h3>
                <wa-badge
                  pill=""
                  variant="brand"
                  appearance="accent"
                  attention="none"
                  >Admin</wa-badge
                >
              </div>
              <span class="wa-caption-m">Imperial Sharpshooter</span>
            </div>
            <wa-avatar
              image="https://images.unsplash.com/photo-1633268335280-a41fbde58707?q=80&amp;w=3348&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              label="Avatar of a man wearing a sci-fi helmet (Photograph by Nandu Vasudevan)"
              shape="circle"
            ></wa-avatar>
          </div>
          <div
            slot="footer"
            class="wa-grid wa-gap-xs"
            style="--min-column-size: 10ch"
          >
            <wa-button
              appearance="outlined"
              tabindex="-1"
              variant="neutral"
              size="medium"
            >
              <wa-icon slot="start" name="at" aria-hidden="true"></wa-icon>
              Email
            </wa-button>
            <wa-button
              appearance="outlined"
              tabindex="-1"
              variant="neutral"
              size="medium"
            >
              <wa-icon slot="start" name="phone" aria-hidden="true"></wa-icon>
              Phone
            </wa-button>
          </div>
        </wa-card>
        <wa-card appearance="outlined">
          <div class="wa-flank:end">
            <a href="" class="wa-flank wa-link-plain" tabindex="-1">
              <wa-avatar
                shape="rounded"
                style="background-color: var(--wa-color-yellow-90); color: var(--wa-color-yellow-50)"
              >
                <wa-icon
                  slot="icon"
                  name="egg-fried"
                  aria-hidden="true"
                ></wa-icon>
              </wa-avatar>
              <div class="wa-gap-2xs wa-stack">
                <span class="wa-heading-s">Second Breakfast</span>
                <span class="wa-caption-m">19 Items</span>
              </div>
            </a>
            <wa-dropdown size="medium" placement="bottom-start">
              <wa-button
                id="more-actions-2"
                slot="trigger"
                appearance="plain"
                size="small"
                tabindex="-1"
                variant="neutral"
                aria-labelledby=" wa-tooltip-Fn9IGBQklArHRXsxn4Sw-"
              >
                <wa-icon
                  name="ellipsis-vertical"
                  label="View menu"
                  role="img"
                  aria-label="View menu"
                ></wa-icon>
              </wa-button>
              <wa-dropdown-item
                variant="default"
                size="medium"
                type="normal"
                tabindex="0"
                aria-checked="false"
                aria-disabled="false"
                role="menuitem"
                >Copy link</wa-dropdown-item
              >
              <wa-dropdown-item
                variant="default"
                size="medium"
                type="normal"
                tabindex="-1"
                aria-checked="false"
                aria-disabled="false"
                role="menuitem"
                >Rename</wa-dropdown-item
              >
              <wa-dropdown-item
                variant="default"
                size="medium"
                type="normal"
                tabindex="-1"
                aria-checked="false"
                aria-disabled="false"
                role="menuitem"
                >Move to trash</wa-dropdown-item
              >
            </wa-dropdown>
            <wa-tooltip
              for="more-actions-2"
              id="wa-tooltip-Fn9IGBQklArHRXsxn4Sw-"
              >View menu</wa-tooltip
            >
          </div>
        </wa-card>
        <wa-card with-header="" with-footer="" appearance="outlined">
          <div slot="header" class="wa-stack wa-gap-xs">
            <h2 class="wa-heading-m">Decks</h2>
          </div>
          <div class="wa-stack wa-gap-xl">
            <p class="wa-caption-m">
              You haven't created any decks yet. Get started by selecting an
              aspect that matches your play style.
            </p>
            <div class="wa-grid wa-gap-xl" style="--min-column-size: 30ch">
              <a
                href=""
                class="wa-flank wa-align-items-start wa-link-plain"
                tabindex="-1"
              >
                <wa-avatar
                  shape="rounded"
                  style="background-color: var(--wa-color-blue-90); color: var(--wa-color-blue-50)"
                >
                  <wa-icon
                    slot="icon"
                    name="shield"
                    aria-hidden="true"
                  ></wa-icon>
                </wa-avatar>
                <div class="wa-stack wa-gap-2xs">
                  <span
                    class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s"
                  >
                    Vigilance
                    <wa-icon name="arrow-right" aria-hidden="true"></wa-icon>
                  </span>
                  <p class="wa-caption-m">
                    Protect, defend, and restore as you ready heavy-hitters.
                  </p>
                </div>
              </a>
              <a
                href=""
                class="wa-flank wa-align-items-start wa-link-plain"
                tabindex="-1"
              >
                <wa-avatar
                  shape="rounded"
                  style="background-color: var(--wa-color-green-90); color: var(--wa-color-green-50)"
                >
                  <wa-icon
                    slot="icon"
                    name="chevrons-up"
                    aria-hidden="true"
                  ></wa-icon>
                </wa-avatar>
                <div class="wa-stack wa-gap-2xs">
                  <span
                    class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s"
                  >
                    Command
                    <wa-icon name="arrow-right" aria-hidden="true"></wa-icon>
                  </span>
                  <p class="wa-caption-m">
                    Build imposing armies and stockpile resources.
                  </p>
                </div>
              </a>
              <a
                href=""
                class="wa-flank wa-align-items-start wa-link-plain"
                tabindex="-1"
              >
                <wa-avatar
                  shape="rounded"
                  style="background-color: var(--wa-color-red-90); color: var(--wa-color-red-50)"
                >
                  <wa-icon
                    slot="icon"
                    name="explosion"
                    aria-hidden="true"
                  ></wa-icon>
                </wa-avatar>
                <div class="wa-stack wa-gap-2xs">
                  <span
                    class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s"
                  >
                    Aggression
                    <wa-icon name="arrow-right" aria-hidden="true"></wa-icon>
                  </span>
                  <p class="wa-caption-m">
                    Relentlessly deal damage and apply pressure to your
                    opponent.
                  </p>
                </div>
              </a>
              <a
                href=""
                class="wa-flank wa-align-items-start wa-link-plain"
                tabindex="-1"
              >
                <wa-avatar
                  shape="rounded"
                  style="background-color: var(--wa-color-yellow-90); color: var(--wa-color-yellow-50)"
                >
                  <wa-icon
                    slot="icon"
                    name="moon-stars"
                    aria-hidden="true"
                  ></wa-icon>
                </wa-avatar>
                <div class="wa-stack wa-gap-2xs">
                  <span
                    class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s"
                  >
                    Cunning
                    <wa-icon name="arrow-right" aria-hidden="true"></wa-icon>
                  </span>
                  <p class="wa-caption-m">
                    Disrupt and frustrate your opponent with dastardly tricks.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div slot="footer">
            <a href="" class="wa-cluster wa-gap-xs" tabindex="-1">
              <span>Or start a deck from scratch</span>
              <wa-icon name="arrow-right" aria-hidden="true"></wa-icon>
            </a>
          </div>
        </wa-card></div
    ></wa-scroller>`;
  }
}

customElements.define("nb-preferences", PreferencesCard);
