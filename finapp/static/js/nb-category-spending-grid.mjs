import { html } from "./lit.bundle.mjs";
import "./nb-transactions-grid.mjs";
import "./nb-add-transaction.mjs";
import * as agGrid from "./agGrid.bundle.mjs";
import { BaseGrid } from "./nb-base-grid.mjs";

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

class CategorySpendingGrid extends BaseGrid {
  static properties = {
    data: { type: Array },
    key: { type: String },
  };

  static queries = {
    categorySpendingGridEl: "#spending-by-category-grid",
    categorySpendingSelect: "#categorySpendingSelect",
  };

  get interval() {
    return this.categorySpendingSelect.value;
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

    this.spendingMonths = new Set();
    this.spendingWeeks = {};
    this.dataCache = {};
    this.columnsCache = {};

    this.parseData();
    this.createDataGrid();
    this.updateSpendingGrid();
    this.setupThemeWatcher();
  }

  async handleEvent(event) {
    if (!this.dataCache[this.interval]) {
      await this.getData();
    }

    this.updateSpendingGrid();
  }

  async getData() {
    let response = await fetch(
      GET_CATEGORY_SPENDING_URL +
        "?" +
        new URLSearchParams({
          date: CURRENT_DATE,
          interval: this.interval,
        })
    );

    this.data = await response.json();

    this.parseData();
    this.createGridColumns();
  }

  parseData() {
    let { data, categories } = this.data;
    this.categories = categories;
    let rows = [];
    for (let [cId, obj] of Object.entries(data)) {
      let row = { ...categories[cId] };
      let average = 0;
      for (let [i, spendList] of Object.entries(obj)) {
        let [spend, date] = spendList;
        let index = Number(i);
        if (this.interval === "weekly") {
          this.spendingWeeks[index] = new Date(date);
          row[i] = spend;
        } else {
          let month = MONTHS[index];
          this.spendingMonths.add(month);
          row[month] = spend;
        }

        average += spend;
      }
      if (average !== 0) {
        average = average / Object.keys(obj).length;
      }
      row.average = average;
      rows.push(row);
    }
    rows.sort((a, b) =>
      this.categories[a.id].name.localeCompare(this.categories[b.id].name)
    );
    this.dataCache[this.interval] = rows;
  }

  updateSpendingGrid() {
    this.dataGrid.setGridOption("columnDefs", this.columnsCache[this.interval]);
    this.dataGrid.setGridOption("rowData", this.dataCache[this.interval]);
  }

  createGridColumns() {
    const columns = [
      {
        field: "name",
        headerName: "Category Name",
        cellRenderer: (param) => {
          if (param.data.name && param.data.color) {
            return `<nb-category
              name="${param.data.name}"
              color="${param.data.color}"
            ></nb-category>`;
          }
          return param.value;
        },
      },
      {
        field: "average",
        headerName: "Average Spend",
        cellRenderer: (param) => {
          return `<wa-format-number
            type="currency"
            currency="USD"
            value=${param.value ?? 0}
            lang="en-US"
          ></wa-format-number>`;
        },
        cellClassRules: this.cellColorRules,
      },
    ];

    if (this.interval === "weekly") {
      let weekIndexes = Object.keys(this.spendingWeeks);
      weekIndexes.sort((a, b) => this.spendingWeeks[b] - this.spendingWeeks[a]);

      for (let index of weekIndexes) {
        let dateString = this.spendingWeeks[index].toLocaleDateString(
          undefined,
          { month: "short", day: "numeric", year: "numeric" }
        );
        columns.push({
          field: index,
          headerName: `Week of ${dateString}`,
          cellRenderer: (param) => {
            return `<wa-format-number
              type="currency"
              currency="USD"
              value=${param.value ?? 0}
              lang="en-US"
            ></wa-format-number>`;
          },
          cellClassRules: this.cellColorRules,
        });
      }
    } else {
      let date = new Date();
      let currentMonth = date.getMonth();
      let currentYear = date.getFullYear();
      for (let i = 0; i < 12; i++) {
        let month = 1 + ((12 + currentMonth - i) % 12);
        let monthName = MONTHS[month];

        if (this.spendingMonths.has(monthName)) {
          let year = "";
          if (month > 1 + currentMonth) {
            year = ` ${currentYear - 1}`;
          }
          columns.push({
            field: monthName,
            headerName: monthName + year,
            cellRenderer: (param) => {
              return `<wa-format-number
                type="currency"
                currency="USD"
                value=${param.value ?? 0}
                lang="en-US"
              ></wa-format-number>`;
            },
            cellClassRules: this.cellColorRules,
          });
        }
      }
    }

    this.columnsCache[this.interval] = columns;
  }

  createDataGrid() {
    this.createGridColumns();
    const columnDefs = this.columnsCache[this.interval];
    const gridOptions = {
      ...this.defaultGridOptions,
      columnDefs,
      rowData: [],
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 150,
      },
    };
    this.dataGrid = agGrid.createGrid(this.categorySpendingGridEl, gridOptions);
  }

  render() {
    return html`<wa-details
      summary="Spending by category"
      appearance="filled-outlined"
      open
    >
      <div class="wa-stack">
        <wa-select
          @change=${this.handleEvent}
          id="categorySpendingSelect"
          label="Spending interval"
          class="w-fit"
          hoist
        >
          <wa-option selected value="monthly">Monthly</wa-option>
          <wa-option value="weekly">Weekly</wa-option>
        </wa-select>

        <div id="spending-by-category-grid"></div>
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-category-spending-grid", CategorySpendingGrid);
