import "./dashboardBudgetCard.mjs";

const dashboardStorage = window["localStorage"];

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
    this.storage = window["localStorage"];
    this.themeObserver = new MutationObserver(() => {
      this.setTheme();
      this.chartManager.updateChartColors();
    });
    this.themeObserver.observe(document.documentElement, { attributes: true });
    this.setTheme();
  }

  setTheme() {
    this.theme = this.storage.getItem("theme") === "light" ? "light" : "dark";
  }

  getColor(color) {
    return COLORS_OBJECT[this.theme][color];
  }
}

async function getPieData(date = "") {
  let result;
  if (date !== "") {
    result = await getRequest(GET_PIE_DATA_URL, {
      date,
    });
  } else {
    result = await getRequest(GET_PIE_DATA_URL);
  }
  return result;
}

async function getAllBudgetsLineData(startDate = "") {
  let result = await getRequest(GET_ALL_BUDGETS_LINE_DATA_URL, { startDate });
  return result;
}

async function getNetSpending(object) {
  let result = await getRequest(GET_NET_SPENDING_URL, object);
  return result;
}

async function getMonthSpending(value) {
  let object = JSON.parse(value);
  let result = await getRequest(GET_SPENDING_FOR_MONTH_URL, object);
  return result;
}

async function getAllBudgetNames() {
  let result = await getRequest(GET_BUDGET_NAME_URL);
  return result;
}

function currencyFormatter(params) {
  let rounded = Math.round(params.value * 100) / 100;
  return USDFormatter.format(rounded + 0);
}

class ChartManager {
  constructor() {
    this.colors = new Colors(this);
    this.init();
  }

  async init() {
    this.startDateEl = document.getElementById("startDate");
    this.startDateEl.addEventListener("sl-change", this);

    this.selectEl = document.getElementById("budgets");
    this.selectEl.addEventListener("sl-change", () => this.updateLineChart());

    await this.createLineChart();
    this.addBudgetsToLineChart();
  }

  handleEvent(event) {
    switch (event.type) {
      case "sl-change":
        this.handleSlChangeEvent(event);
    }
  }

  async handleSlChangeEvent(event) {
    let date = event.target.value;
    let currentDate = this.lastDate;

    if (date === currentDate) {
      return;
    }

    let response = await getAllBudgetsLineData(date);
    this.lineChartData = response.data;
    this.lineChartKeys = response.keys;

    this.updateLineChart();
  }

  updateChartColors() {
    this.updateLineChartColors();
  }

  async addBudgetsToLineChart() {
    this.names = (await getAllBudgetNames()).names;

    for (let name of this.names) {
      if (
        name === "allBudgets" ||
        !Object.keys(this.lineChartData).includes(name)
      ) {
        continue;
      }

      let item = document.createElement("sl-option");
      item.value = name.replaceAll(" ", "_");
      item.textContent = name;

      this.selectEl.appendChild(item);
    }

    this.selectEl.disabled = false;
  }

  updateLineChartColors() {
    if (!this.lineChart) {
      return;
    }

    for (let dataset of this.lineChart.data.datasets) {
      let color = this.colors.getColor(dataset.colorName);
      dataset.backgroundColor = color;
      dataset.borderColor = color;
      dataset.color = this.colors.getColor("neutral0");
    }

    this.lineChart.options.plugins.legend.labels.color =
      this.colors.getColor("neutral0");
    this.lineChart.options.plugins.title.color =
      this.colors.getColor("neutral0");

    this.lineChart.options.scales.y.labels.color = this.colors.getColor("text");
    this.lineChart.options.scales.y.grid.color = this.colors.getColor("grid");
    this.lineChart.options.scales.y.ticks.color = this.colors.getColor("ticks");

    this.lineChart.options.scales.x.grid.color = this.colors.getColor("grid");
    this.lineChart.options.scales.x.ticks.color = this.colors.getColor("ticks");

    this.lineChart.update();
  }

  fixBudgetValues(oldValues) {
    let newValues = {};
    for (let k of this.lineChartKeys) {
      let temp = oldValues[k];
      if (temp != undefined) {
        newValues[k] = temp;
      }
    }
    return newValues;
  }

  setLineBudgetStartDate(string, setAsMin = false) {
    let [month, day, year] = string.split("/");
    let date = new Date(year, month - 1, day);
    let strDate = year + "-" + month + "-" + day;
    this.startDateEl.valueAsDate = date;
    this.startDateEl.value = strDate;

    this.lastDate = strDate;

    if (setAsMin) {
      this.startDateEl.min = strDate;
      return date;
    }
  }

  async createLineChart() {
    let response = await getAllBudgetsLineData();

    let { data, keys } = response;
    this.lineChartKeys = keys;
    this.setLineBudgetStartDate(this.lineChartKeys[0], true);
    this.lineChartData = data;
    let fixedData = this.fixBudgetValues(data.allBudgets);
    this.fixedLineChartData = { allBudgets: fixedData };
    const ctx = document.getElementById("lineChart").getContext("2d");
    this.lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: keys,
        datasets: [
          {
            id: "allBudgets",
            label: "All Budgets",
            data: fixedData,
            backgroundColor: this.colors.getColor("neutral0"),
            borderColor: this.colors.getColor("neutral0"),
            borderWidth: 2,
            color: this.colors.getColor("neutral0"),
            colorName: "neutral0",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: this.colors.getColor("neutral0"),
            },
          },
          title: {
            display: true,
            text: "Budgets",
            color: this.colors.getColor("neutral0"),
            font: {
              size: 19,
              weight: "normal",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            labels: {
              color: this.colors.getColor("text"),
            },
            grid: {
              color: this.colors.getColor("grid"),
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return "$" + value;
              },
              color: this.colors.getColor("ticks"),
            },
          },
          x: {
            grid: {
              color: this.colors.getColor("grid"),
            },
            ticks: {
              color: this.colors.getColor("ticks"),
            },
          },
        },
      },
    });
  }

  updateLineChart() {
    let arr = [];
    for (let item of this.selectEl.value) {
      let budgetName = item.replaceAll("_", " ");
      let index;
      let color;
      let colorName;
      if (budgetName === "allBudgets") {
        color = this.colors.getColor("neutral0");
        colorName = "neutral0";
      } else {
        index = (this.names.indexOf(budgetName) - 1) % 17;
        color = this.colors.getColor(index.toString());
        colorName = index.toString();
      }

      arr.push({
        id: budgetName,
        label: budgetName,
        data: this.fixBudgetValues(this.lineChartData[budgetName]),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
        color: this.colors.getColor("neutral0"),
        colorName,
      });
    }

    this.lineChart.data.datasets = arr;
    this.lineChart.data.labels = this.lineChartKeys;

    this.lineChart.update();
  }
}

class NetSpendingManager {
  constructor() {
    this.cardsCache = {};
    this.dataCache = {};
    this.init();
  }

  get currentSelection() {
    return JSON.parse(this.netSpendingSelect.value);
  }

  get key() {
    return this.netSpendingSelect.value;
  }

  get cellColorRules() {
    return {
      "text-greater-than-zero": "x > 0",
      "text-less-than-zero": "x < 0",
    };
  }

  async init() {
    this.netSpendingSelect = document.getElementById("netSpendingSelect");
    this.netSpendingSelect.addEventListener("sl-change", this);

    this.spendingGridEl = document.getElementById("spending-grid");
    this.createDataGrid();

    this.addOptions();
    await this.getData();
    this.updateSpendingGrid();

    this.setupThemeWatcher();
  }

  getURLForBudgetId(id) {
    return `${DEFAULT_BUDGET_URL}/${id}?month=${this.currentSelection.month}&year=${this.currentSelection.year}&ytd=${this.currentSelection.ytd}`;
  }

  createDataGrid() {
    const columnDefs = [
      {
        field: "name",
        cellRenderer: (param) => {
          if (param.data.id) {
            return `<a href="${this.getURLForBudgetId(param.data.id)}">${
              param.value
            }</a>`;
          }
          return param.value;
        },
      },
      {
        field: "total",
        headerName: "Current total",
        valueFormatter: currencyFormatter,
        cellClassRules: this.cellColorRules,
      },
      {
        field: "in",
        headerName: "Income",
        valueFormatter: currencyFormatter,
        cellClassRules: this.cellColorRules,
      },
      {
        field: "out",
        headerName: "Spent",
        valueFormatter: currencyFormatter,
        cellClassRules: this.cellColorRules,
      },
      {
        field: "net",
        valueFormatter: currencyFormatter,
        cellClassRules: this.cellColorRules,
      },
    ];
    const gridOptions = {
      columnDefs,
      rowData: [],
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 200,
      },
      onRowDataUpdated: (event) => {
        let height =
          document.querySelector(".ag-center-cols-container").scrollHeight +
          document.querySelector(".ag-header-row").scrollHeight;

        if (height < 192) {
          height = 192;
        }

        this.spendingGridEl.style.height = `${height + 3}px`;
      },
    };
    this.dataGrid = agGrid.createGrid(this.spendingGridEl, gridOptions);
  }

  async getData() {
    let data = await getNetSpending(this.currentSelection);
    this.dataCache[this.key] = data;
    console.log(this.dataCache);
  }

  async handleEvent(event) {
    if (!this.cardsCache[this.key]) {
      await this.getData();
    }

    this.updateSpendingGrid();
  }

  updateSpendingGrid() {
    this.dataGrid.setGridOption("rowData", this.dataCache[this.key]);
  }

  createOptionElement(string, month, year, ytd) {
    let option = document.createElement("sl-option");
    let obj = { month, year, ytd };
    option.value = JSON.stringify(obj);
    option.textContent = string;
    return option;
  }

  getOpiontsFromDate(startDate) {
    let endDate = new Date();
    let startYear = startDate.getFullYear();
    let endYear = endDate.getFullYear();

    let options = [];

    for (let year = startYear; year <= endYear; year++) {
      let startMonth = year === startYear ? startDate.getMonth() + 1 : 1;
      let endMonth = year === endYear ? endDate.getMonth() + 1 : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        let string =
          year === endYear ? `${MONTHS[month]}` : `${MONTHS[month]} ${year}`;
        let option = this.createOptionElement(string, month, year, false);
        options.push(option);
      }
      options.push(
        this.createOptionElement(
          year === endYear ? "YTD" : `All of ${year}`,
          null,
          year,
          true
        )
      );
    }
    options = options.reverse();

    return options;
  }

  addOptions() {
    let minDate = new Date(START_DATE + "T00:00:00");
    let options = this.getOpiontsFromDate(minDate);

    for (let option of options) {
      this.netSpendingSelect.appendChild(option);
    }

    this.netSpendingSelect.value = options[1].value;
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver((params) =>
      this.handleThemeChange(params)
    );

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });
  }

  handleThemeChange(params) {
    console.log(params);

    let theme = document.documentElement.getAttribute("data-bs-theme");
    this.spendingGridEl.classList.toggle(
      "ag-theme-alpine-dark",
      theme === "dark"
    );
    this.spendingGridEl.classList.toggle("ag-theme-alpine", theme === "light");
  }
}

new ChartManager();
new NetSpendingManager();
