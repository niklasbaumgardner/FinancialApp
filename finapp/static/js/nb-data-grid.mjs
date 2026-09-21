import { css } from "lit";
import { WaDataGrid } from "./main.mjs";

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
  size = "s";
  static css = [...WaDataGrid.css, autoRowHeight];

  async connectedCallback() {
    super.connectedCallback();

    await customElements.whenDefined("wa-data-grid");

    const allRulesText = Array.from(document.styleSheets)
      .map((sheet) => {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      })
      .join("\n");

    const globalSheet = new CSSStyleSheet();
    globalSheet.replaceSync(allRulesText);

    this.shadowRoot.adoptedStyleSheets = [
      globalSheet,
      ...this.shadowRoot.adoptedStyleSheets,
    ];
  }

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
