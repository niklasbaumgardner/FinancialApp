import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class Transfer extends NikElement {
  static properties = {
    budgets: { type: Array },
  };

  static queries = {
    form: "form",
    sourceBudgetSelect: "#source-budget",
    destBudgetSelect: "#dest-budget",
  };

  sourceOptionsTemplate() {
    const availBudgets = Array.from(
      this.budgets.filter((b) => b.id != this.destBudgetSelect?.value)
    );

    return availBudgets.map(
      (b) => html`<wa-option value=${b.id}
        ><span class="wa-heading-s">${b.name}</span>:
        ${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(b.total)}</wa-option
      >`
    );
  }

  sourceBudgetTemplate() {
    return html`<wa-select
      label="Source budget"
      placeholder="Please select"
      name="source_budget"
      id="source-budget"
      @input=${this.handleInput}
      required
    >
      ${this.sourceOptionsTemplate()}
    </wa-select>`;
  }

  destOptionsTemplate() {
    const availBudgets = Array.from(
      this.budgets.filter((b) => b.id != this.sourceBudgetSelect?.value)
    );

    return availBudgets.map(
      (b) => html`<wa-option value=${b.id}
        ><span class="wa-heading-s">${b.name}</span>:
        ${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(b.total)}</wa-option
      >`
    );
  }

  destBudgetTemplate() {
    return html`<wa-select
      label="Destination budget"
      placeholder="Please select"
      name="dest_budget"
      id="dest-budget"
      @input=${this.handleInput}
      required
    >
      ${this.destOptionsTemplate()}
    </wa-select>`;
  }

  handleInput() {
    this.requestUpdate();
  }

  render() {
    return html`<wa-card>
      <form action=${TRANSFER_URL} method="POST" class="wa-stack">
        <input
          type="date"
          id="date"
          name="date"
          hidden
          class="hidden"
          value=${new Date().toISOString().substring(0, 10)}
        />
        <h2>Transfer money</h2>
        <div class="wa-grid" style="--min-column-size: 20rem;">
          <wa-input
            label="Transaction name"
            id="paycheckName"
            name="name"
            placeholder="Transfer Me"
            autocomplete="niklas"
            required
          ></wa-input>
          <wa-input
            label="Transfer amount"
            type="number"
            step=".01"
            id="paycheck_amount"
            name="amount"
            placeholder="0.00"
            autocomplete="niklas"
            required
          ></wa-input>
        </div>
        <div class="wa-grid" style="--min-column-size: 20rem;">
          ${this.sourceBudgetTemplate()}${this.destBudgetTemplate()}
        </div>
        <wa-button class="w-full" variant="brand" type="submit"
          >Transfer</wa-button
        >
      </form>
    </wa-card>`;
  }
}
customElements.define("nb-transfer", Transfer);
