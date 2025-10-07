import { html } from "./lit.bundle.mjs";
import { BaseChart } from "./nb-base-chart.mjs";

class BudgetsLineChart extends BaseChart {
  #firstTransactionDate;
  #lastTransactionDate;

  static properties = {
    initialData: { type: Object },
  };

  static queries = {
    ...BaseChart.queries,
    selectEl: "#budgets",
    radioGroup: "#time",
  };

  get selectedBudgets() {
    if (this.selectEl?.value) {
      return this.selectEl.value;
    }
    return ["-1"];
  }

  get currentData() {
    let arr = [];
    for (let date of this.dates) {
      let dataset = { date: date };
      for (let id of this.selectedBudgets) {
        dataset[id] = this.currentDatasets[date][id];
      }
      arr.push(dataset);
    }

    return arr;
  }

  get currentSeries() {
    let series = [];
    for (let key of Object.keys(this.currentData[0])) {
      if (key === "date") {
        continue;
      }
      series.push({
        type: "line",
        xKey: "date",
        yKey: key,
        yName: this.namesObject[key],
        marker: { enabled: false },
      });
    }

    return series;
  }

  get currentTimeSelection() {
    return Number(this.radioGroup?.value ?? "1");
  }

  get chartOptions() {
    return {
      ...this.defaultOptions,
      background: {
        visible: false,
      },
      data: this.currentData,
      title: {
        text: "Budgets Over Time",
      },
      series: this.currentSeries,
      legend: {
        enabled: true,
      },
      axes: [
        {
          type: "unit-time",
          position: "bottom",
          gridLine: {
            enabled: true,
          },
          label: { format: "%b %d, %Y" },
        },
        {
          type: "number",
          position: "left",
          gridLine: {
            enabled: true,
          },
          label: {},
        },
      ],
      formatter: {
        y(params) {
          if (params.source === "axis-label") {
            return params.value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            });
          }

          return params.value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
        },
      },
    };
  }

  async init() {
    this.datasetsMap = {};

    let { data, start_date, end_date } = this.initialData;
    this.data = data;
    this.#firstTransactionDate = new Date(start_date + "T00:00:00");
    this.#lastTransactionDate = new Date(end_date + "T00:00:00");

    this.updateCurrentData(false);

    this.data[-1] = { budget: { id: -1, name: "All Budgets" }, line_data: [] };
    this.names = Object.values(data).map((o) => {
      return { id: o.budget.id, name: o.budget.name };
    });
    this.names.sort((a, b) => a.name.localeCompare(b.name));
    this.namesObject = {};
    Object.values(data).forEach((o) => {
      this.namesObject[`${o.budget.id}`] = o.budget.name;
    });

    await this.updateComplete;
    await this.createChart();
    this.setupThemeWatcher();
  }

  updateDates() {
    let startDate;
    if (this.currentTimeSelection === -1) {
      startDate = new Date(this.#firstTransactionDate);
    } else {
      startDate = new Date(this.#lastTransactionDate).setMonth(
        this.#lastTransactionDate.getMonth() - this.currentTimeSelection
      );

      startDate = new Date(Math.max(startDate, this.#firstTransactionDate));
    }

    this.dates = this.getDatesFromRange(startDate, this.#lastTransactionDate);
  }

  updateCurrentData(updateChart = true) {
    this.updateDates();

    if (!this.datasetsMap[this.currentTimeSelection]) {
      let currentDatasets = this.parseDatasets();
      this.datasetsMap[this.currentTimeSelection] = currentDatasets;
      this.currentDatasets = currentDatasets;

      this.makeAllBudgetsData();
    } else {
      this.currentDatasets = this.datasetsMap[this.currentTimeSelection];
    }

    if (updateChart) {
      this.updateChart();
    }
  }

  makeAllBudgetsData() {
    for (let [date, dataset] of Object.entries(this.currentDatasets)) {
      let sum = 0;
      for (let amount of Object.values(dataset)) {
        sum += amount ?? 0;
      }
      dataset["-1"] = sum;
    }
  }

  getDatesFromRange(startDate, endDate) {
    let step = 1000 * 24 * 60 * 60;
    let dates = [];
    let curr = startDate.getTime();
    while (curr < endDate.getTime()) {
      dates.push(new Date(curr));
      curr += step;
    }
    dates.push(endDate);

    return dates;
  }

  parseDatasets() {
    let datasets = {};
    for (let date of this.dates) {
      datasets[date] = {};
      for (let { budget, line_data } of Object.values(this.data)) {
        let result = line_data.findLast((el) => {
          let [d, _] = el;

          return new Date(d + "T00:00:00") <= date;
        });
        datasets[date][`${budget.id}`] = result?.at(1);
      }
    }

    return datasets;
  }

  handleTimeChange() {
    this.updateCurrentData();
  }

  optionsTemplate() {
    return this.names.map(
      (o) =>
        html`<wa-option value=${o.id} ?selected=${o.id === -1}
          >${o.name}</wa-option
        >`
    );
  }

  render() {
    return html`<wa-details
      summary="Budgets line chart"
      appearance="filled outlined"
      open
    >
      <div class="wa-stack">
        <div class="wa-split">
          <wa-select
            @change=${this.updateChart}
            id="budgets"
            label="Select the budgets to show"
            class="w-fit"
            multiple
            hoist
          >
            ${this.optionsTemplate()}
          </wa-select>
          <wa-radio-group
            @change=${this.handleTimeChange}
            orientation="horizontal"
            value="1"
            id="time"
          >
            <wa-radio appearance="button" value="1">1 Month</wa-radio>
            <wa-radio appearance="button" value="3">3 Months</wa-radio>
            <wa-radio appearance="button" value="6">6 Months</wa-radio>
            <wa-radio appearance="button" value="12">1 Year</wa-radio>
            <wa-radio appearance="button" value="-1">All Time</wa-radio>
          </wa-radio-group>
          <wa-input
            class="w-fit hidden"
            id="startDate"
            type="date"
            label="Start date"
          ></wa-input>
        </div>
        <div>
          <div id="chart"></div>
        </div>
      </div>
    </wa-details>`;
  }
}

customElements.define("nb-budgets-line-chart", BudgetsLineChart);
