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

class CategorySpendingGrid extends NikElement {
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

  getCurrentURL(budgetURL) {
    let searchParams = "";
    if (this.currentSelection?.month || this.currentSelection?.year) {
      searchParams =
        "?" + new URLSearchParams(this.currentSelection).toString();
    }

    return `${budgetURL}${searchParams}`;
  }

  async init() {
    await this.updateComplete;

    this.startDate = new Date(START_DATE + "T00:00:00");

    this.spendingMonths = new Set();
    this.spendingWeeks = {};
    this.dataCache = {};
    this.columnsCache = {};

    this.parseData();
    this.createWaDataGrid();
    this.updateSpendingGrid();
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
        }),
    );

    this.data = await response.json();

    this.parseData();
    this.createWaGridColumns();
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
      this.categories[a.id].name.localeCompare(this.categories[b.id].name),
    );
    this.dataCache[this.interval] = rows;
  }

  updateSpendingGrid() {
    this.categorySpendingGridEl.columns = this.columnsCache[this.interval];
    this.categorySpendingGridEl.data = this.dataCache[this.interval];
  }

  createWaGridColumns() {
    const minWidth = 200;
    const columns = [
      {
        field: "name",
        label: "Category Name",
        sortable: true,
        filterable: true,
        filterType: "set",
        formatter: (_, row) => {
          if (row.name && row.color) {
            return html`<nb-category
              name=${row.name}
              color=${row.color}
            ></nb-category>`;
          }
          return row.value;
        },
        flex: 1,
        minWidth,
      },
      {
        field: "average",
        label: "Average Spend",
        sortable: true,
        // filterable: true,
        // filterType: "number-range",
        formatter: (value) => this.moneyFormatter(value),
        flex: 1,
        minWidth,
      },
    ];

    if (this.interval === "weekly") {
      let weekIndexes = Object.keys(this.spendingWeeks);
      weekIndexes.sort((a, b) => this.spendingWeeks[b] - this.spendingWeeks[a]);

      for (let index of weekIndexes) {
        let dateString = this.spendingWeeks[index].toLocaleDateString(
          undefined,
          { month: "short", day: "numeric", year: "numeric" },
        );
        columns.push({
          field: index,
          label: `Week of ${dateString}`,
          formatter: (value) => this.moneyFormatter(value),
          flex: 1,
          minWidth,
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
            label: monthName + year,
            formatter: (value) => this.moneyFormatter(value),
            flex: 1,
            minWidth,
          });
        }
      }
    }

    this.columnsCache[this.interval] = columns;
  }

  createWaDataGrid() {
    this.createWaGridColumns();
    this.updateSpendingGrid();
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

        <nb-data-grid size="s" id="spending-by-category-grid"></nb-data-grid>
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-category-spending-grid", CategorySpendingGrid);
