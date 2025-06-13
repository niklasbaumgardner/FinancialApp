import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class AddPaycheck extends NikElement {
  static properties = {
    budgets: { type: Array },
  };

  static queries = { form: "form" };

  budegtsTemplate() {
    // return this.budgets.map((b) => html``);
    return this.budgets
      .flatMap((b) => [
        html`<wa-input
          label=${b.name}
          type="number"
          step=".01"
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

  handlePreviousPaychecksButtonClick() {}

  render() {
    return html`<wa-card>
      <form action=${ADD_PAYCHECK_URL} method="POST" class="wa-stack">
        <h2>Add paycheck</h2>
        <div class="wa-cluster items-start!">
          <div class="wa-stack grow">
            <wa-input
              id="paycheckName"
              label="Paycheck Name"
              name="name"
              placeholder="I'm rich!"
              autocomplete="niklas"
              required
            ></wa-input>
            <wa-input
              id="paycheck_amount"
              label="Paycheck Amount"
              type="number"
              step=".01"
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
              value=${new Date().toISOString().substring(0, 10)}
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
            <label class="" for="budget-amounts">Budget amount breakdown</label>
            <wa-card name="budget-amounts" class="wa-card-p-0">
              <wa-scroller orientation="vertical" class="max-h-[400px]"
                ><div class="p-(--spacing)">
                  ${this.budegtsTemplate()}
                </div></wa-scroller
              >
            </wa-card>
          </div>
        </div>
        <wa-button id="paycheckBtn" type="submit" variant="brand" disabled
          >Add Paycheck</wa-button
        >
      </form>
    </wa-card>`;
  }
}

customElements.define("nb-add-paycheck", AddPaycheck);
