import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import * as agGrid from "./agGrid.bundle.mjs";

export class BaseGrid extends NikElement {
  get currentColorScheme() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";

    let colorScheme =
      theme === "dark" ? agGrid.colorSchemeDark : agGrid.colorSchemeLight;
    return colorScheme;
  }

  get defaultGridOptions() {
    return {
      defaultColDef: {
        resizable: false,
      },
      domLayout: "autoHeight",
      suppressCellFocus: true,
      suppressMovableColumns: true,
      theme: agGrid.themeAlpine.withPart(this.currentColorScheme),
    };
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver(() => {
      this.dataGrid.setGridOption(
        "theme",
        agGrid.themeAlpine.withPart(this.currentColorScheme)
      );
    });

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });
  }

  render() {
    return html`<div id="grid" style="--ag-grid-size: 4px;"></div>`;
  }
}
