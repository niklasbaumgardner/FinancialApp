import { html } from "./lit.bundle.mjs";
import { BaseChart } from "./nb-base-chart.mjs";

class NetWorthLineChart extends BaseChart {
  static properties = {
    data: { type: Array },
  };

  get chartOptions() {
    return {
      ...this.defaultOptions,
      background: {
        visible: false,
      },
      data: this.data,
      title: {
        text: "Net Worth",
      },
      subtitle: {
        text: `Current Net Worth: ${this.data
          .at(-1)
          .amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`,
      },
      series: [
        {
          type: "line",
          xKey: "date",
          yKey: "amount",
          yName: "Net Worth",
          marker: { enabled: false },
          // fill: {
          //   type: "gradient",
          // },
        },
      ],
      axes: [
        {
          type: "time",
          position: "bottom",
          gridLine: {
            enabled: true,
          },
          // label: { format: "%b %d, %Y" },
        },
        {
          type: "number",
          position: "left",
          gridLine: {
            enabled: true,
          },
          label: {},
          nice: true,
          min: Math.min(0, ...this.data.map((o) => o.amount)),
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

  maybeCleanData() {
    let a = this.data.at(-1).amount;
    let b = this.data.at(-2).amount;

    let percentChange = (100 * Math.abs(a - b)) / ((a + b) / 2);

    if (percentChange > 100) {
      this.data.pop();
    }
  }

  async init() {
    await this.updateComplete;
    this.data.forEach((o) => (o.date = new Date(o.date + "T00:00:00")));
    this.maybeCleanData();
    await this.createChart();
    this.setupThemeWatcher();
  }

  render() {
    return html`<wa-details
      summary="Net worth"
      appearance="filled-outlined"
      open
    >
      <div class="wa-stack">
        <div>
          <div id="chart"></div>
        </div>
      </div>
    </wa-details>`;
  }
}

customElements.define("nb-net-worth-chart", NetWorthLineChart);
