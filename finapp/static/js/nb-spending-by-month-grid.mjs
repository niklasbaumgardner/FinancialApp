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

class SpendingByMonth extends BaseGrid {
  static properties = {
    data: { type: Object },
    dataArray: { type: Array },
  };

  static queries = {
    spendingGridEl: "#spending-by-month-grid",
  };

  get cellColorRules() {
    return {
      "text-greater-than-zero": "x > 0",
      "text-less-than-zero": "x < 0",
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.parseData();
  }

  firstUpdated() {
    this.init();
  }

  async init() {
    await this.updateComplete;

    this.createDataGrid();
    this.setupThemeWatcher();
  }

  parseData() {
    let { budgets, income, spending } = this.data;

    let date = new Date();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    let spendingDataObject = {}; // {budget, months...}
    for (let s of spending) {
      let { amount, budget_id, month, year } = s;
      if (currentMonth === month && !(currentYear === year)) {
        continue;
      }

      let budget = budgets[budget_id];
      // if (!budget) {
      //   continue;
      // }
      if (!spendingDataObject[budget_id]) {
        spendingDataObject[budget_id] = {
          budget_id,
          budget,
          name: budget.name, //`${budget?.name ?? budget_id} spent`,
        };
      }
      let monthString = MONTHS[month];
      if (!spendingDataObject[budget_id][monthString]) {
        spendingDataObject[budget_id][monthString] = 0;
      }

      spendingDataObject[budget_id][monthString] += amount;
    }

    // let incomeDataObject = {};
    // for (let i of income) {
    //   let { amount, budget_id, month, year } = i;
    //   if (currentMonth === month && !(currentYear === year)) {
    //     continue;
    //   }

    //   let budget = budgets[budget_id];
    //   if (!budget) {
    //     continue;
    //   }
    //   if (!incomeDataObject[budget_id]) {
    //     incomeDataObject[budget_id] = {
    //       budget_id,
    //       budget,
    //       name: `${budget?.name ?? budget_id} income`,
    //     };
    //   }
    //   let monthString = MONTHS[month];
    //   if (!incomeDataObject[budget_id][monthString]) {
    //     incomeDataObject[budget_id][monthString] = 0;
    //   }

    //   incomeDataObject[budget_id][monthString] += amount;
    // }

    let dataArray = [];
    // for (let income of Object.values(incomeDataObject)) {
    //   dataArray.push(income);
    // }
    for (let spent of Object.values(spendingDataObject)) {
      dataArray.push(spent);
    }

    dataArray.sort((a, b) => a.name.localeCompare(b.name));
    this.dataArray = dataArray;
  }

  createDataGrid() {
    const columnDefs = [
      {
        field: "name",
        headerName: "Budget",
        cellRenderer: (param) => {
          return `<a href="${param.data.budget.url}">${param.value}</a>`;
        },
      },
    ];

    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    for (let i = 0; i < 12; i++) {
      let month = 1 + ((12 + currentMonth - i) % 12);
      let monthName = MONTHS[month];

      let year = "";
      if (month > 1 + currentMonth) {
        year = ` ${currentYear - 1}`;
      }
      columnDefs.push({
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

    const gridOptions = {
      ...this.defaultGridOptions,
      columnDefs,
      rowData: this.dataArray,
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 150,
        columnLimits: [
          {
            colId: "name",
            minWidth: 200,
          },
        ],
      },
    };
    this.dataGrid = agGrid.createGrid(this.spendingGridEl, gridOptions);
  }

  render() {
    return html`<wa-details
      summary="Monthly spending"
      appearance="filled-outlined"
      open
    >
      <div class="wa-stack">
        <div id="spending-by-month-grid"></div>
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-spending-by-month-grid", SpendingByMonth);
