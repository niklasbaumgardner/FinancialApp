import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

export class Transfer extends NikElement {
  static properties = {
    budgets: { type: Array },
    sourceOptions: { type: Array },
    destOptions: { type: Array },
  };

  static queries = {
    form: "form",
    sourceBudgetSelect: "#source-budget",
    destBudgetSelect: "#dest-budget",
  };

  get sourceBudgetOptions() {
    return Array.from(
      this.budgets.filter((b) => b.id != this.destBudgetSelect?.value)
    );
  }

  get destBudgetOptions() {
    return Array.from(
      this.budgets.filter((b) => b.id != this.sourceBudgetSelect?.value)
    );
  }

  connectedCallback() {
    super.connectedCallback();

    this.sourceOptions = this.sourceBudgetOptions;
    this.destOptions = this.destBudgetOptions;
  }

  sourceOptionsTemplate() {
    return this.sourceOptions.map(
      (b) => html`<wa-option value=${b.id}
        ><span class="">${b.name}</span>:
        ${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(b.total)}</wa-option
      >`
    );
  }

  sourceBudgetTemplate() {
    return html`<nb-combobox
      label="Source budget"
      placeholder="Please select"
      name="source_budget"
      id="source-budget"
      @input=${this.handleInput}
      required
    >
      ${this.sourceOptionsTemplate()}
    </nb-combobox>`;
  }

  destOptionsTemplate() {
    return this.destOptions.map(
      (b) => html`<wa-option value=${b.id}
        ><span class="">${b.name}</span>:
        ${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(b.total)}</wa-option
      >`
    );
  }

  destBudgetTemplate() {
    return html`<nb-combobox
      label="Destination budget"
      placeholder="Please select"
      name="dest_budget"
      id="dest-budget"
      @input=${this.handleInput}
      required
    >
      ${this.destOptionsTemplate()}
    </nb-combobox>`;
  }

  handleInput() {
    this.sourceOptions = this.sourceBudgetOptions;
    this.destOptions = this.destBudgetOptions;
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
          value=${CURRENT_DATE}
        />
        <h2>Transfer</h2>
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
