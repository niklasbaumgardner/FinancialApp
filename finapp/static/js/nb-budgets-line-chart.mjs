import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import { Colors } from "./colors.mjs";

class BudgetsLineChart extends NikElement {
  static properties = {
    data: { type: Object },
    datasets: { type: Array },
  };

  static queries = {
    lineChartEl: "#lineChart",
    selectEl: "#budgets",
  };

  connectedCallback() {
    super.connectedCallback();

    this.colors = new Colors();

    this.init();
  }

  async init() {
    let { data, start_date, end_date } = this.data;

    let { keys, datasets } = this.parseData(data, start_date, end_date);

    let allBudgetsDataset = this.getAllBudgetsData(datasets);

    this.keys = keys;
    this.datasets = [allBudgetsDataset, ...datasets];

    this.names = this.datasets.map((dataset) => {
      return { id: dataset.id, name: dataset.label };
    });
    this.names.sort((a, b) => a.name.localeCompare(b.name));

    // this.startDateEl = document.getElementById("startDate");
    // this.startDateEl.addEventListener("change", this);

    // this.selectEl.addEventListener("change", () => this.updateLineChart());

    await this.updateComplete;
    await this.createLineChart();
    this.setupThemeWatcher();
  }

  handleEvent(event) {
    switch (event.type) {
      case "change":
        this.handleSlChangeEvent(event);
    }
  }

  async handleSlChangeEvent(event) {
    // Do this in js

    this.updateLineChart();
  }

  updateChartColors() {
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

  getDatesFromRange(startDate, endDate) {
    let start = new Date(startDate + "T00:00:00");
    let end = new Date(endDate + "T00:00:00");

    let step = Math.floor((end - start) / 10);
    let dates = [];
    let curr = start.getTime();
    while (curr < end.getTime()) {
      dates.push(new Date(curr));
      curr += step;
    }
    dates.push(end);

    return dates;
  }

  parseData(data, startDate, endDate) {
    let keys = this.getDatesFromRange(startDate, endDate);
    let datasets = [];

    for (let { budget, line_data } of Object.values(data)) {
      let budgetData = { id: budget.id, label: budget.name };
      let data = [];
      for (let key of keys) {
        let result = line_data.findLast((el) => {
          let [d, _] = el;

          return new Date(d + "T00:00:00") <= key;
        });
        data.push(result ? result.at(1) : 0);
      }

      budgetData.data = data;

      datasets.push(budgetData);
    }

    let prettyKeys = keys.map((d) => d.toLocaleDateString());
    return { keys: prettyKeys, datasets };
  }

  getAllBudgetsData(datasets) {
    let allBudgetsDataset = { id: -1, label: "All Budgets" };
    let data = [];
    for (let i = 0; i < datasets[0].data.length; i++) {
      let sum = 0;
      for (let dataset of datasets) {
        sum += dataset.data[i];
      }
      data.push(sum);
    }
    allBudgetsDataset.data = data;
    return allBudgetsDataset;
  }

  async createLineChart() {
    const ctx = this.lineChartEl.getContext("2d");
    this.lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.keys,
        datasets: [
          {
            ...this.datasets[0],
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
    for (let id of this.selectEl.value) {
      let color;
      let colorName;
      let dataset = this.datasets.find((o) => o.id == id);
      let name = dataset.label;
      if (id == -1) {
        color = this.colors.getColor("neutral0");
        colorName = "neutral0";
      } else {
        let index = (this.names.findIndex((el) => el.id == id) - 1) % 17;
        color = this.colors.getColor(index.toString());
        colorName = index.toString();
      }

      arr.push({
        id: id,
        label: name,
        data: dataset.data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
        color: this.colors.getColor("neutral0"),
        colorName,
      });
    }

    this.lineChart.data.datasets = arr;

    this.lineChart.update();
  }

  optionsTemplate() {
    return this.names.map(
      (o) =>
        html`<wa-option value=${o.id} ?selected=${o.id === -1}
          >${o.name}</wa-option
        >`
    );
  }

  setupThemeWatcher() {
    this.themeObserver = new MutationObserver(() => {
      this.updateChartColors();
    });
    this.themeObserver.observe(document.documentElement, { attributes: true });
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
            @change=${this.updateLineChart}
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
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </wa-details>`;
  }
}

customElements.define("nb-budgets-line-chart", BudgetsLineChart);
