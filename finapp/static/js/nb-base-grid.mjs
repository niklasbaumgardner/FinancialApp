import { html, isServer, nothing, css } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { NikElement } from "./nik-element.mjs";
import * as agGrid from "./agGrid.mjs";
import { WaDataGrid } from "./main.mjs";
var EXPAND_COL = "__expand__";

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

const autoRowHeight = css`
  /* --row-height becomes a floor, not the height. */
  [part~="body"] .row,
  .row-main {
    height: auto;
    min-height: var(--row-height);
  }

  /* Plain-string cells ellipse on one line by default. */
  .cell-content-text {
    overflow: visible;
    white-space: normal;
    text-overflow: clip;
    overflow-wrap: anywhere;
  }
`;
export class WaBaseGrid extends WaDataGrid {
  static css = [...WaDataGrid.css, autoRowHeight];

  firstUpdated(changed) {
    super.firstUpdated(changed);

    // The size cache is keyed by getItemKey, which defaults to the index — so a sort or
    // filter would leave each measured height attached to the slot rather than the row.
    // Key it to the row id. configure() spreads existing options, so this survives.
    const v = this.virtualizer.virtualizer;
    v?.setOptions({
      ...v.options,
      getItemKey: (index) => this.previousRows?.[index]?.id ?? index,
    });
    this.virtualizer.clearMeasurements();
  }

  updated(changed) {
    super.updated(changed);

    // Re-measure every rendered row each pass rather than using lit's ref(): repeat() is
    // keyed by row id, so ref() wouldn't re-fire on reused elements, and the component
    // calls clearMeasurements() on sort/expand/resize — which wipes the cache. resizeItem
    // no-ops when the height is unchanged, so this can't loop.
    for (const row of this.shadowRoot.querySelectorAll(
      '[part~="body"] .row[data-index]',
    )) {
      this.virtualizer.measureElement(row);
    }
  }
}
customElements.define("nb-data-grid", WaBaseGrid);
