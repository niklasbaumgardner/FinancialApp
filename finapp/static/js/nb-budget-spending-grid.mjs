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

class BudgetSpendingGrid extends NikElement {
  dataCache = {};

  static properties = {
    data: { type: Array },
  };

  static queries = {
    spendingGridEl: "#spending-by-budget-grid",
    netSpendingSelect: "#netSpendingSelect",
  };

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

  getCurrentURL(budgetURL) {
    let searchParams = "";
    if (this.currentSelection?.month || this.currentSelection?.year) {
      searchParams =
        "?" + new URLSearchParams(this.currentSelection).toString();
    }

    return `${budgetURL}${searchParams}`;
  }

  async init() {
    this.startDate = new Date(START_DATE + "T00:00:00");

    await this.updateComplete;

    await this.getData();

    this.createWaDataGrid();
  }

  async handleEvent() {
    if (!this.dataCache[this.key]) {
      await this.getData();
    }

    this.updateSpendingGrid();
  }

  parseData(data) {
    let { income, spent } = data;

    let budgets = {};

    for (let [b, c, a] of income) {
      c.total = NaN;
      let budget = budgets[b.id];
      let category = budget?.categories?.[c.id];

      if (budget) {
        if (category) {
          category.in += a;
        } else {
          c.in = a;
          c.out = 0;
          budget.categories[c.id] = c;
        }

        budget.in += a;
      } else {
        b.categories = {};
        b.in = 0;
        b.out = 0;
        c.in = 0;
        c.out = 0;

        c.in += a;
        b.categories[c.id] = c;
        b.in += a;
        budgets[b.id] = b;
      }
    }

    for (let [b, c, a] of spent) {
      c.total = NaN;
      let budget = budgets[b.id];
      let category = budget?.categories?.[c.id];

      if (budget) {
        if (category) {
          category.out += a;
        } else {
          c.in = 0;
          c.out = a;
          budget.categories[c.id] = c;
        }

        budget.out += a;
      } else {
        b.categories = {};
        b.in = 0;
        b.out = 0;
        c.in = 0;
        c.out = 0;

        c.out += a;
        b.categories[c.id] = c;
        b.out += a;
        budgets[b.id] = b;
      }
    }

    const parsed = Object.values(budgets)
      .map((b) => {
        b.categories = Object.values(b.categories).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        b.categories.forEach((c) => {
          c.net = c.in + c.out;
        });
        return b;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    this.dataCache[this.key] = parsed;
  }

  async getData() {
    let response = await fetch(
      GET_BUDGET_SPENDING_URL +
        "?" +
        new URLSearchParams(this.currentSelection),
    );
    let data = await response.json();
    this.parseData(data);
  }

  updateSpendingGrid() {
    this.spendingGridEl.data = this.dataCache[this.key];
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
        >`,
      );
    }
    options.push(
      html`<wa-option
        value=${JSON.stringify({ month: null, year: null, ytd: false })}
        >All time</wa-option
      >`,
    );
    options = options.reverse();
    return options;
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
    if (value === null) {
      return "";
    }
    return html`<wa-format-number
      class=${this.getCellClass(value ?? 0)}
      type="currency"
      currency="USD"
      value=${value ?? 0}
      lang="en-US"
    ></wa-format-number>`;
  }

  createWaDataGrid() {
    const minWidth = 200;
    const columns = [
      {
        field: "name",
        label: "Budget",
        sortable: true,
        filterable: true,
        filterType: "set",
        formatter: (_, row) => {
          if (row.url) {
            return html`<a href=${this.getCurrentURL(row.url)}>${row.name}</a>`;
          } else if (row.name && row.color) {
            return html`<nb-category
              name=${row.name}
              color=${row.color}
            ></nb-category>`;
          }
          return row.name;
        },
        flex: 1,
        minWidth,
      },
      {
        field: "total",
        label: "Current total",
        sortable: true,
        formatter: (value) => this.moneyFormatter(value),
        flex: 1,
        minWidth,
      },
      {
        field: "in",
        label: "Income",
        sortable: true,
        formatter: (value) => this.moneyFormatter(value),
        flex: 1,
        minWidth,
      },
      {
        field: "out",
        label: "Spent",
        sortable: true,
        formatter: (value) => this.moneyFormatter(value),
        flex: 1,
        minWidth,
      },
      {
        field: "net",
        label: "Net",
        sortable: true,
        formatter: (value) => this.moneyFormatter(value),
        flex: 1,
        minWidth,
      },
    ];

    this.spendingGridEl.columns = columns;
    this.spendingGridEl.data = this.dataCache[this.key];
  }

  render() {
    return html`<wa-details
      summary="Spending by budget"
      appearance="filled-outlined"
      open
    >
      <div class="wa-stack">
        <nb-combobox
          @change=${this.handleEvent}
          id="netSpendingSelect"
          label="Spending in"
          class="w-fit"
          >${this.optionsTemplate()}</nb-combobox
        >

        <nb-data-grid
          id="spending-by-budget-grid"
          child-rows="categories"
        ></nb-data-grid>
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-budget-spending-grid", BudgetSpendingGrid);
