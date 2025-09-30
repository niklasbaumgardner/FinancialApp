import { NikElement } from "./nik-element.mjs";

export class BaseChart extends NikElement {
  static properties = {
    data: { type: Array },
  };

  static queries = {
    chartEl: "#chart",
  };

  get currentColorScheme() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";

    let colorScheme = theme === "dark" ? "ag-polychroma-dark" : "ag-polychroma";

    return colorScheme;
  }

  get defaultOptions() {
    return {
      theme: this.currentColorScheme,
      background: {
        visible: false,
      },
      container: this.chartEl,
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.init();
  }

  async createChart() {
    this.chart = agCharts.AgCharts.create(this.chartOptions);
  }

  updateChart() {
    this.chart.update(this.chartOptions);
  }

  setupThemeWatcher() {
    this.themeObserver = new MutationObserver(() => {
      this.updateChart();
    });
    this.themeObserver.observe(document.documentElement, { attributes: true });
  }
}
