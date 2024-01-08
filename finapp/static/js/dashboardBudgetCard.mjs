import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class DashboardBudgetCard extends NikElement {
  static properties = {
    budget: {
      type: Object,
    },
  };

  static get queries() {
    return {
      toggleEl: "sl-switch",
      nameInputEl: "#budgetName",
      amountInputEl: "#budgetAmount",
      submitButtonEl: "#saveButton",
    };
  }

  onClick() {
    window.location.href = this.budget.url;
  }

  template() {
    return html`<span class="fs-4">${this.budget.name}</span>
      <sl-divider></sl-divider>
      <div class="mb-3 d-flex justify-content-between">
        Current total:
        <sl-format-number
          class="white-space-nowrap"
          type="currency"
          currency="USD"
          value="${this.budget.total}"
          lang="en-US"
        ></sl-format-number>
      </div>
      <div class="d-flex justify-content-between">
        Net income:
        <sl-format-number
          class="white-space-nowrap ${this.budget.net > 0
            ? "nb-text-success"
            : this.budget.net < 0
            ? "nb-text-danger"
            : ""}"
          type="currency"
          currency="USD"
          value="${this.budget.net}"
          lang="en-US"
        ></sl-format-number>
      </div>
      <sl-divider></sl-divider>
      <div class="d-flex justify-content-between">
        <span
          >Income:
          <sl-format-number
            class="white-space-nowrap ${this.budget.in > 0
              ? "nb-text-success"
              : this.budget.in < 0
              ? "nb-text-danger"
              : ""}"
            type="currency"
            currency="USD"
            value="${this.budget.in}"
            lang="en-US"
          ></sl-format-number
        ></span>
        <span class="text-end"
          >Spent:
          <sl-format-number
            class="white-space-nowrap ${this.budget.out > 0
              ? "nb-text-success"
              : this.budget.out < 0
              ? "nb-text-danger"
              : ""}"
            type="currency"
            currency="USD"
            value="${this.budget.out}"
            lang="en-US"
          ></sl-format-number
        ></span>
      </div>`;
  }

  render() {
    if (this.budget.url) {
      return html`<sl-card @click=${this.onClick}>${this.template()}</sl-card>`;
    }

    return html`<sl-card>${this.template()}</sl-card>`;
  }
}

export default DashboardBudgetCard;

customElements.define("dashboard-budget-card", DashboardBudgetCard);
