import { html } from "lit";
import "./nb-transactions-grid.mjs";
import "./nb-add-transaction.mjs";
import "./nb-data-grid.mjs";
import { NikElement } from "./nik-element.mjs";

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

class SpendingByMonth extends NikElement {
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

  getCellClass(value) {
    if (value > 0) {
      return "text-greater-than-zero";
    } else if (value < 0) {
      return "text-less-than-zero";
    } else {
      return "";
    }
  }

  moneyFormatter(value) {
    return html`<wa-format-number
      class=${this.getCellClass(value ?? 0)}
      type="currency"
      currency="USD"
      value=${value ?? 0}
      lang="en-US"
    ></wa-format-number>`;
  }

  async init() {
    await this.updateComplete;

    this.parseData();

    this.createWaDataGrid();
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

    let dataArray = [];
    for (let spent of Object.values(spendingDataObject)) {
      dataArray.push(spent);
    }

    dataArray.sort((a, b) => a.name.localeCompare(b.name));
    this.dataArray = dataArray;
  }

  createWaDataGrid() {
    const columns = [
      {
        field: "name",
        label: "Budget",
        sortable: true,
        filterable: true,
        filterType: "set",
        formatter: (_, row) => {
          return html`<a href="${row.budget.url}">${row.name}</a>`;
        },
        flex: 1,
        minWidth: 200,
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
      columns.push({
        field: monthName,
        label: monthName + year,
        sortable: true,
        // filterable: true,
        // filterType: "number-range",
        formatter: (value) => this.moneyFormatter(value),
        flex: 1,
        minWidth: 150,
      });
    }

    this.spendingGridEl.columns = columns;
    this.spendingGridEl.data = this.dataArray;
  }

  render() {
    return html`<wa-details
      summary="Monthly spending"
      appearance="filled-outlined"
      open
    >
      <div class="wa-stack">
        <nb-data-grid size="s" id="spending-by-month-grid"></nb-data-grid>
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-spending-by-month-grid", SpendingByMonth);
