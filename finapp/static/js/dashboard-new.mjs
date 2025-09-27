import * as agGrid from "./agGrid.bundle.mjs";

const COLORS_OBJECT = {
  light: {
    neutral0: "rgb(0, 0, 0)",
    ticks: "rgba(0, 0, 0, .79)",
    grid: "rgba(0, 0, 0, .11)",
    0: "hsl(0, 80%, 25%)",
    1: "hsl(20, 80%, 25%)",
    2: "hsl(40 100% 25%)",
    3: "hsl(50 100% 25%)",
    4: "hsl(75, 80%, 25%)",
    5: "hsl(175, 80%, 25%)",
    6: "hsl(155 100% 25%)",
    7: "hsl(170 100% 25%)",
    8: "hsl(185 100% 25%)",
    9: "hsl(200 100% 25%)",
    10: "hsl(240 100% 25%)",
    11: "hsl(255 100% 25%)",
    12: "hsl(270 100% 25%)",
    13: "hsl(280 100% 25%)",
    14: "hsl(290 100% 25%)",
    15: "hsl(300 100% 25%)",
    16: "hsl(333 100% 25%)",
  },
  dark: {
    neutral0: "rgb(255, 255, 255)",
    ticks: "rgba(255, 255, 255, .79)",
    grid: "rgba(255, 255, 255, .11)",
    0: "hsl(0, 80%, 75%)",
    1: "hsl(20, 80%, 75%)",
    2: "hsl(40 100% 75%)",
    3: "hsl(50 100% 75%)",
    4: "hsl(75, 80%, 75%)",
    5: "hsl(175, 80%, 75%)",
    6: "hsl(155 100% 75%)",
    7: "hsl(170 100% 75%)",
    8: "hsl(185 100% 75%)",
    9: "hsl(200 100% 75%)",
    10: "hsl(240 100% 75%)",
    11: "hsl(255 100% 75%)",
    12: "hsl(270 100% 75%)",
    13: "hsl(280 100% 75%)",
    14: "hsl(290 100% 75%)",
    15: "hsl(300 100% 75%)",
    16: "hsl(333 100% 75%)",
  },
};

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

const options = { style: "currency", currency: "USD" };
const USDFormatter = new Intl.NumberFormat("en-US", options);

class Colors {
  constructor(chartManager) {
    this.chartManager = chartManager;
    this.theme = THEME;

    this.themeObserver = new MutationObserver(() => {
      this.chartManager.updateChartColors();
    });
    this.themeObserver.observe(document.documentElement, { attributes: true });
  }

  getColor(color) {
    return COLORS_OBJECT[this.theme.mode][color];
  }
}

async function getPieData(date = "") {
  let result;
  if (date !== "") {
    result = await fetch(
      GET_PIE_DATA_URL +
        "?" +
        new URLSearchParams({
          date,
        })
    );
  } else {
    result = await fetch(GET_PIE_DATA_URL);
  }
  return result;
}

async function getAllBudgetsLineData(startDate = "") {
  let result = await fetch(
    GET_ALL_BUDGETS_LINE_DATA_URL +
      "?" +
      new URLSearchParams({
        startDate,
      })
  );
  return result;
}

async function getNetSpending(object) {
  let result = await fetch(
    GET_NET_SPENDING_URL + "?" + new URLSearchParams(object)
  );
  return result;
}

async function getMonthSpending(value) {
  let object = JSON.parse(value);
  let result = await fetch(
    GET_SPENDING_FOR_MONTH_URL + "?" + new URLSearchParams(object)
  );
  return result;
}

async function getAllBudgetNames() {
  let result = await fetch(GET_BUDGET_NAME_URL);
  return result;
}

function currencyFormatter(params) {
  if (!params.value) {
    return USDFormatter.format(0);
  }

  let rounded = Math.round(params.value * 100) / 100;
  return USDFormatter.format(rounded + 0);
}

class CategorySpendingManager {
  constructor() {
    this.init();
  }

  get currentDate() {
    if (!this.strDate) {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      this.strDate = year + "-" + month + "-" + day;
    }
    return this.strDate;
  }

  get cellColorRules() {
    return {
      "text-greater-than-zero": "x > 0",
      "text-less-than-zero": "x < 0",
    };
  }

  get interval() {
    return this.categorySpendingSelect.value;
  }

  get currentColorScheme() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";

    let colorScheme =
      theme === "dark" ? agGrid.colorSchemeDark : agGrid.colorSchemeLight;
    return colorScheme;
  }

  async init() {
    this.spendingMonths = new Set();
    this.spendingWeeks = {};
    this.dataCache = {};
    this.columnsCache = {};

    this.categorySpendingSelect = document.getElementById(
      "categorySpendingSelect"
    );
    this.categorySpendingSelect.addEventListener("change", this);

    this.categorySpendingGridEl = document.getElementById(
      "spending-by-category-grid"
    );

    await this.getData();

    this.createDataGrid();

    this.updateSpendingGrid();

    this.setupThemeWatcher();
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
        valueFormatter: currencyFormatter,
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
          valueFormatter: currencyFormatter,
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
            valueFormatter: currencyFormatter,
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
      columnDefs,
      rowData: [],
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 150,
      },
      domLayout: "autoHeight",
      theme: agGrid.themeAlpine.withPart(this.currentColorScheme),
    };
    this.dataGrid = agGrid.createGrid(this.categorySpendingGridEl, gridOptions);
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
          date: this.currentDate,
          interval: this.interval,
        })
    );

    let data = await response.json();

    this.parseData(data);
    this.createGridColumns();
  }

  parseData(dataObj) {
    let { data, categories } = dataObj;
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

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver(() =>
      this.handleThemeChange()
    );

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });
  }

  handleThemeChange() {
    this.dataGrid.setGridOption(
      "theme",
      agGrid.themeAlpine.withPart(this.currentColorScheme)
    );
  }
}

Promise.all([
  customElements.whenDefined("wa-select"),
  customElements.whenDefined("wa-option"),
]).then(() => {
  new NetSpendingManager();
  new CategorySpendingManager();
});
