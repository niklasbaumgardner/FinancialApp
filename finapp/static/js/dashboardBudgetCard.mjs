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

  render() {
    if (this.budget.url) {
      return html`<sl-card @click=${this.onClick}>
        <div>${this.budget.name}</div>
        <div>
          Net income:
          <sl-format-number
            type="currency"
            currency="USD"
            value="${this.budget.net}"
            lang="en-US"
          ></sl-format-number>
        </div>
        <div>
          Income:
          <sl-format-number
            type="currency"
            currency="USD"
            value="${this.budget.in}"
            lang="en-US"
          ></sl-format-number>
          Spent:
          <sl-format-number
            type="currency"
            currency="USD"
            value="${this.budget.out}"
            lang="en-US"
          ></sl-format-number>
        </div>
      </sl-card>`;
    }

    return html`<sl-card>
      <div>${this.budget.name}</div>
      <div>
        Net income:
        <sl-format-number
          type="currency"
          currency="USD"
          value="${this.budget.net}"
          lang="en-US"
        ></sl-format-number>
      </div>
      <div>
        Income:
        <sl-format-number
          type="currency"
          currency="USD"
          value="${this.budget.in}"
          lang="en-US"
        ></sl-format-number>
        Spent:
        <sl-format-number
          type="currency"
          currency="USD"
          value="${this.budget.out}"
          lang="en-US"
        ></sl-format-number>
      </div>
    </sl-card>`;
  }
}

export default DashboardBudgetCard;

customElements.define("dashboard-budget-card", DashboardBudgetCard);
