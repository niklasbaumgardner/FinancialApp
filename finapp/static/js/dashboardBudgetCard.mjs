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
    return html`<span class="col-4">${this.budget.name}</span
      ><span class="col-2 text-end"
        ><sl-format-number
          class="white-space-nowrap"
          type="currency"
          currency="USD"
          value="${this.budget.total}"
          lang="en-US"
        ></sl-format-number></span
      ><span class="col-2 text-end"
        ><sl-format-number
          class="white-space-nowrap ${this.budget.in > 0
            ? "nb-text-success"
            : this.budget.in < 0
            ? "nb-text-danger"
            : ""}"
          type="currency"
          currency="USD"
          value="${this.budget.in}"
          lang="en-US"
        ></sl-format-number></span
      ><span class="col-2 text-end"
        ><sl-format-number
          class="white-space-nowrap ${this.budget.out > 0
            ? "nb-text-success"
            : this.budget.out < 0
            ? "nb-text-danger"
            : ""}"
          type="currency"
          currency="USD"
          value="${this.budget.out}"
          lang="en-US"
        ></sl-format-number></span
      ><span class="col-2 text-end"
        ><sl-format-number
          class="white-space-nowrap ${this.budget.net > 0
            ? "nb-text-success"
            : this.budget.net < 0
            ? "nb-text-danger"
            : ""}"
          type="currency"
          currency="USD"
          value="${this.budget.net}"
          lang="en-US"
        ></sl-format-number
      ></span>`;
  }

  render() {
    if (this.budget.url) {
      return html`<div
        style="display:flex;justify-content:space-between;min-width:550px;"
        @click=${this.onClick}
      >
        ${this.template()}
      </div>`;
    }

    return html`<div
      style="display:flex;justify-content:space-between;min-width:550px;"
    >
      ${this.template()}
    </div>`;
  }
}

export default DashboardBudgetCard;

customElements.define("dashboard-budget-card", DashboardBudgetCard);
