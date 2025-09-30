import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-net-worth-chart.mjs";
import "./nb-budgets-line-chart.mjs";
import "./nb-budget-spending-grid.mjs";
import "./nb-category-spending-grid.mjs";

class Dashboard extends NikElement {
  static properties = {
    netWorthData: { type: Array },
    lineChartData: { type: Object },
    budgetSpendingData: { type: Array },
    categorySpendingData: { type: Array },
    budgetSpendingDataCache: { type: Object },
  };

  static queries = {
    downloadLink: "a",
  };

  connectedCallback() {
    super.connectedCallback();

    this.requestInitialData();
  }

  async requestInitialData() {
    fetch(GET_NET_WORTH_DATA_URL).then(async (response) => {
      this.netWorthData = (await response.json()).data;
    });

    fetch(GET_LINE_CHART_DATA_URL).then(async (response) => {
      this.lineChartData = await response.json();
    });

    fetch(
      GET_BUDGET_SPENDING_URL + `?month=${month}&year=${year}&ytd=${false}`
    ).then(async (response) => {
      this.budgetSpendingData = await response.json();
    });

    fetch(
      GET_CATEGORY_SPENDING_URL + `?date=${CURRENT_DATE}&interval=monthly`
    ).then(async (response) => {
      this.categorySpendingData = await response.json();
    });
  }

  netWorthTemplate() {
    if (!this.netWorthData) {
      return;
    }

    return html`<nb-net-worth-chart
      .data=${this.netWorthData}
    ></nb-net-worth-chart>`;
  }

  budgetsLineChartTemplate() {
    if (!this.lineChartData) {
      return;
    }

    return html`<nb-budgets-line-chart
      .data=${this.lineChartData}
    ></nb-budgets-line-chart>`;
  }

  budgetSpendingTemplate() {
    if (!this.budgetSpendingData) {
      return;
    }

    return html`<nb-budget-spending-grid
      .data=${this.budgetSpendingData}
    ></nb-budget-spending-grid>`;
  }

  categorySpendingTemplate() {
    if (!this.categorySpendingData) {
      return;
    }

    return html`<nb-category-spending-grid
      .data=${this.categorySpendingData}
    ></nb-category-spending-grid>`;
  }

  render() {
    return html`<div class="wa-stack">
      ${this.netWorthTemplate()} ${this.budgetsLineChartTemplate()}
      ${this.budgetSpendingTemplate()} ${this.categorySpendingTemplate()}
    </div>`;
  }
}
customElements.define("nb-dashboard", Dashboard);
