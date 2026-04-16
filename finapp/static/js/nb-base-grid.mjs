import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import * as agGrid from "./agGrid.mjs";

export class BaseGrid extends NikElement {
  get currentColorScheme() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";

    let colorScheme =
      theme === "dark" ? agGrid.colorSchemeDark : agGrid.colorSchemeLight;
    return colorScheme;
  }

  get gridTheme() {
    const borderRadius = 4 * window.THEME.rounding;

    return agGrid.themeAlpine.withPart(this.currentColorScheme).withParams({
      borderRadius: borderRadius,
      wrapperBorderRadius: borderRadius,
      borderWidth: 1,
      headerRowBorder: true,
      rowBorder: true,
      backgroundColor: `var(--wa-color-surface-raised)`,
      borderColor: "var(--wa-color-surface-border-raised)",
      cellTextColor: "var(--wa-color-text-normal)",
      headerTextColor: "var(--wa-color-text-normal)",
      fontFamily: "inherit",
    });
  }

  get baseGridOptions() {
    return {
      defaultColDef: {
        resizable: false,
      },
      domLayout: "autoHeight",
      suppressCellFocus: true,
      suppressMovableColumns: true,
      theme: this.gridTheme,
    };
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver(() => {
      this.dataGrid?.setGridOption("theme", this.gridTheme);
    });

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });
  }

  render() {
    return html`<div id="grid" style="--ag-grid-size: 4px;"></div>`;
  }
}
