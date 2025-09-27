import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import { Colors } from "./colors.mjs";

class NetWorthLineChart extends NikElement {
  static properties = {
    data: { type: Array },
    datasets: { type: Array },
  };

  static queries = {
    lineChartEl: "#lineChart",
  };

  connectedCallback() {
    super.connectedCallback();

    this.colors = new Colors();

    this.init();
  }

  async init() {
    let { keys, datasets } = this.parseData(this.data);

    this.keys = keys;
    this.datasets = datasets;

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

  parseData(data) {
    let array = data.map((o) => o.amount);
    let keys = data.map((o) => {
      return new Date(o.date + "T00:00:00").toLocaleDateString();
    });

    return { keys, datasets: [{ label: "Net worth", data: array }] };
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

  setupThemeWatcher() {
    this.themeObserver = new MutationObserver(() => {
      this.updateChartColors();
    });
    this.themeObserver.observe(document.documentElement, { attributes: true });
  }

  render() {
    return html`<wa-details
      summary="Net worth"
      appearance="filled outlined"
      open
    >
      <div class="wa-stack">
        <div>
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </wa-details>`;
  }
}

customElements.define("nb-net-worth-chart", NetWorthLineChart);
