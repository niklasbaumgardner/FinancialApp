import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import "./nb-previous-paychecks.mjs";

export class AddPaycheck extends NikElement {
  static properties = {
    budgets: { type: Array },
    paychecks: { type: Array },
    formValid: { type: Boolean },
  };

  static queries = {
    form: "form",
    paycheckName: "#paycheck-name",
    paycheckAmount: "#paycheck-amount",
    allBudgets: { all: ".all-budgets" },
    submitButton: "#submit-button",
  };

  constructor() {
    super();

    this.formValid = false;
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("CopyFromPaycheck", this);
  }

  handleEvent(event) {
    console.log(event);

    switch (event.type) {
      case "CopyFromPaycheck": {
        let paycheck = event.detail.paycheck;
        this.copyFromPaycheck(paycheck);
        break;
      }
    }
  }

  copyFromPaycheck(paycheck) {
    this.paycheckAmount.value = paycheck.total;

    for (let transaction of paycheck.transactions) {
      let budget = transaction.budget;
      let budgetInput = document.getElementById(`${budget.name}${budget.id}`);
      if (budgetInput) {
        budgetInput.value = transaction.amount;
      }
    }

    this.validateForm();
  }

  checkPaycheckName() {
    let name = this.paycheckName.value;

    if (!name) {
      this.paycheckName.hint = "Please enter a name for the paycheck.";
      return false;
    } else {
      this.paycheckName.hint = "";
      return true;
    }
  }

  checkPaycheckAmount() {
    let total = this.paycheckAmount.value;

    if (total !== null) {
      let budgetsTotal = 0;
      for (let budget of this.allBudgets) {
        budgetsTotal += Number(budget.value);
      }

      total = parseFloat(total).toFixed(2);
      budgetsTotal = parseFloat(budgetsTotal).toFixed(2);

      if (budgetsTotal === total) {
        this.paycheckAmount.hint = "";
        return true;
      } else {
        this.paycheckAmount.hint = `$${total} is not equal to Budgets amount of $${budgetsTotal}.
        Difference of $${Math.abs((total - budgetsTotal).toFixed(2))}`;

        return false;
      }
    }

    return false;
  }

  validateForm() {
    let nameValid = this.checkPaycheckName();
    let amountValid = this.checkPaycheckAmount();
    let formValid = this.form.checkValidity();
    this.formValid = nameValid && amountValid && formValid;
  }

  handleSubmitClick() {
    this.submitButton.disabled = true;
    this.submitButton.loading = true;
  }

  budegtsTemplate() {
    return this.budgets
      .flatMap((b) => [
        html`<wa-input
          label=${b.name}
          type="number"
          step=".01"
          min="0"
          class="all-budgets"
          id="${b.name}${b.id}"
          name="${b.name}${b.id}"
          placeholder="$0.00"
          autocomplete="niklas"
        ></wa-input>`,
        html`<wa-divider></wa-divider>`,
      ])
      .slice(0, -1);
  }

  handlePreviousPaychecksButtonClick() {
    if (!this.previousPaychecks) {
      this.previousPaychecks = document.createElement("nb-previous-paychecks");
      this.previousPaychecks.paychecks = this.paychecks;
      document.body.append(this.previousPaychecks);
    }

    this.previousPaychecks.show();
  }

  render() {
    return html`<wa-card>
      <form
        action=${ADD_PAYCHECK_URL}
        method="POST"
        class="wa-stack"
        @input=${this.validateForm}
      >
        <h2>Add Paycheck</h2>
        <div class="wa-grid" style="--min-column-size: 20rem;">
          <div class="wa-stack grow">
            <wa-input
              id="paycheck-name"
              label="Paycheck Name"
              name="name"
              placeholder="I'm rich!"
              autocomplete="niklas"
              required
            ></wa-input>
            <wa-input
              id="paycheck-amount"
              label="Paycheck Amount"
              type="number"
              step=".01"
              min="0"
              name="amount"
              placeholder="$0.00"
              autocomplete="niklas"
              required
            ></wa-input>
            <wa-input
              class=""
              label="Date"
              type="date"
              id="date"
              name="date"
              value=${CURRENT_DATE}
              required
            ></wa-input>

            <wa-button
              variant="brand"
              appearance="outlined"
              @click=${this.handlePreviousPaychecksButtonClick}
              >Copy amounts from previous paycheck</wa-button
            >
          </div>
          <div class="grow">
            <label class="" for="budget-amounts">Budget Allocation</label>
            <wa-card name="budget-amounts" class="wa-card-p-0">
              <wa-scroller orientation="vertical" class="max-h-[400px]"
                ><div class="p-(--spacing)">
                  ${this.budegtsTemplate()}
                </div></wa-scroller
              >
            </wa-card>
          </div>
        </div>
        <wa-button
          id="submit-button"
          type="submit"
          variant="brand"
          ?disabled=${!this.formValid}
          @click=${this.handleSubmitClick}
          >Add Paycheck</wa-button
        >
      </form>
    </wa-card>`;
  }
}

customElements.define("nb-add-paycheck", AddPaycheck);
