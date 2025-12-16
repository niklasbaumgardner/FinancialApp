import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-transactions-grid.mjs";
import "./nb-add-transaction.mjs";
import * as agGrid from "./agGrid.bundle.mjs";

const MONTHS = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

class BudgetSpendingGrid extends NikElement {
  static properties = {
    data: { type: Array },
  };

  static queries = {
    spendingGridEl: "#spending-by-budget-grid",
    netSpendingSelect: "#netSpendingSelect",
  };

  get currentColorScheme() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";

    let colorScheme =
      theme === "dark" ? agGrid.colorSchemeDark : agGrid.colorSchemeLight;

    return colorScheme;
  }

  get currentSelection() {
    if (!this.key) {
      return null;
    }
    return JSON.parse(this.key);
  }

  get key() {
    return this.netSpendingSelect?.value;
  }

  get cellColorRules() {
    return {
      "text-greater-than-zero": "x > 0",
      "text-less-than-zero": "x < 0",
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.startDate = new Date(START_DATE + "T00:00:00");
  }

  getCurrentURL(budgetURL) {
    let searchParams = "";
    if (this.currentSelection?.month || this.currentSelection?.year) {
      searchParams =
        "?" + new URLSearchParams(this.currentSelection).toString();
    }

    return `${budgetURL}${searchParams}`;
  }

  firstUpdated() {
    this.init();
  }

  async init() {
    await this.updateComplete;

    this.dataCache = {};
    this.dataCache[this.key] = this.data;

    this.createDataGrid();
    this.setupThemeWatcher();
  }

  async handleEvent() {
    if (!this.dataCache[this.key]) {
      await this.getData();
    }

    this.updateSpendingGrid();
  }

  async getData() {
    let response = await fetch(
      GET_BUDGET_SPENDING_URL + "?" + new URLSearchParams(this.currentSelection)
    );
    let data = await response.json();

    this.dataCache[this.key] = data;
  }

  updateSpendingGrid() {
    this.dataGrid.setGridOption("rowData", this.dataCache[this.key]);
  }

  createDataGrid() {
    const columnDefs = [
      {
        field: "name",
        headerName: "Budget",
        cellRenderer: (param) => {
          if (param.data.id) {
            return `<a href="${this.getCurrentURL(param.data.budget.url)}">${
              param.value
            }</a>`;
          }
          return param.value;
        },
      },
      {
        field: "total",
        headerName: "Current total",
        cellRenderer: (param) => {
          return `<wa-format-number
            type="currency"
            currency="USD"
            value=${param.value}
            lang="en-US"
          ></wa-format-number>`;
        },
        cellClassRules: this.cellColorRules,
      },
      {
        field: "in",
        headerName: "Income",
        cellRenderer: (param) => {
          return `<wa-format-number
            type="currency"
            currency="USD"
            value=${param.value}
            lang="en-US"
          ></wa-format-number>`;
        },
        cellClassRules: this.cellColorRules,
      },
      {
        field: "out",
        headerName: "Spent",
        cellRenderer: (param) => {
          return `<wa-format-number
            type="currency"
            currency="USD"
            value=${param.value}
            lang="en-US"
          ></wa-format-number>`;
        },
        cellClassRules: this.cellColorRules,
      },
      {
        field: "net",
        cellRenderer: (param) => {
          return `<wa-format-number
            type="currency"
            currency="USD"
            value=${param.value}
            lang="en-US"
          ></wa-format-number>`;
        },
        cellClassRules: this.cellColorRules,
      },
    ];
    const gridOptions = {
      columnDefs,
      rowData: this.data,
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 200,
      },
      domLayout: "autoHeight",
      theme: agGrid.themeAlpine.withPart(this.currentColorScheme),
    };
    this.dataGrid = agGrid.createGrid(this.spendingGridEl, gridOptions);
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver(() =>
      this.dataGrid.setGridOption(
        "theme",
        agGrid.themeAlpine.withPart(this.currentColorScheme)
      )
    );

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });
  }

  optionsTemplate() {
    let endDate = new Date();
    let startYear = this.startDate.getFullYear();
    let endYear = endDate.getFullYear();

    let options = [];

    for (let year = startYear; year <= endYear; year++) {
      let startMonth = year === startYear ? this.startDate.getMonth() + 1 : 1;
      let endMonth = year === endYear ? endDate.getMonth() + 1 : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        let string =
          year === endYear ? `${MONTHS[month]}` : `${MONTHS[month]} ${year}`;
        let option = html`<wa-option
          value=${JSON.stringify({ month, year, ytd: false })}
          ?selected=${month === endMonth && year === endYear}
          >${string}</wa-option
        >`;
        options.push(option);
      }
      options.push(
        html`<wa-option
          value=${JSON.stringify({ month: null, year, ytd: true })}
          >${year === endYear ? "YTD" : `All of ${year}`}</wa-option
        >`
      );
    }
    options.push(
      html`<wa-option
        value=${JSON.stringify({ month: null, year: null, ytd: false })}
        >All time</wa-option
      >`
    );
    options = options.reverse();
    return options;
  }

  render() {
    return html`<wa-details
      summary="Spending by budget"
      appearance="filled-outlined"
      open
    >
      <div class="wa-stack">
        <wa-select
          @change=${this.handleEvent}
          id="netSpendingSelect"
          label="Spending in"
          class="w-fit"
          hoist
          >${this.optionsTemplate()}</wa-select
        >

        <div id="spending-by-budget-grid"></div>
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-budget-spending-grid", BudgetSpendingGrid);
