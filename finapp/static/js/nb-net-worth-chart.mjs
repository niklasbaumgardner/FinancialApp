import { html } from "lit";
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
      axes: {
        x: {
          type: "time",
          position: "bottom",
          gridLine: {
            enabled: true,
          },
          // label: { format: "%b %d, %Y" },
        },
        y: {
          type: "number",
          position: "left",
          gridLine: {
            enabled: true,
          },
          label: {},
          nice: true,
          min: Math.min(0, ...this.data.map((o) => o.amount)),
        },
      },
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
    // Sometimes the simplefin records can be inaccurate so this is the attempt to clean it
    let cleanData = [this.data.at(0)];

    for (let i = 1; i < this.data.length; i++) {
      let a = this.data.at(i).amount;
      let b = this.data.at(i - 1).amount;

      let percentChange = (100 * Math.abs(a - b)) / ((a + b) / 2);

      if (percentChange < 100) {
        cleanData.push(this.data.at(i));
      }
    }

    this.data = cleanData;
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
