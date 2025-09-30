import { html } from "./lit.bundle.mjs";
import { BaseChart } from "./nb-base-chart.mjs";

class BudgetsLineChart extends BaseChart {
  static properties = {
    data: { type: Object },
  };

  static queries = {
    ...BaseChart.queries,
    selectEl: "#budgets",
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
        dataset[id] = this.datasets[date][id];
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
      });
    }

    return series;
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
          label: { format: "%B %Y" },
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
    let { data, start_date, end_date } = this.data;

    this.dates = this.getDatesFromRange(start_date, end_date);

    this.datasets = this.parseDatasets(data);

    this.makeAllBudgetsData();

    data[-1] = { budget: { id: -1, name: "All Budgets" } };
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

  makeAllBudgetsData() {
    for (let [date, dataset] of Object.entries(this.datasets)) {
      let sum = 0;
      for (let amount of Object.values(dataset)) {
        sum += amount ?? 0;
      }
      dataset["-1"] = sum;
    }
  }

  getDatesFromRange(startDate, endDate) {
    let start = new Date(startDate + "T00:00:00");
    let end = new Date(endDate + "T00:00:00");

    let step = Math.floor((end - start) / 15);
    let dates = [];
    let curr = start.getTime();
    while (curr < end.getTime()) {
      dates.push(new Date(curr));
      curr += step;
    }
    dates.push(end);

    return dates;
  }

  parseDatasets(data) {
    let datasets = {};
    for (let date of this.dates) {
      datasets[date] = {};
      for (let { budget, line_data } of Object.values(data)) {
        let result = line_data.findLast((el) => {
          let [d, _] = el;

          return new Date(d + "T00:00:00") <= date;
        });
        datasets[date][`${budget.id}`] = result?.at(1);
      }
    }

    return datasets;
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
