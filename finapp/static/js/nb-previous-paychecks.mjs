import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

class Paycheck extends NikElement {
  static properties = {
    paycheck: { type: Object },
  };

  handlePaycheckClick() {
    this.closest("nb-previous-paychecks").hide();

    document.dispatchEvent(
      new CustomEvent("CopyFromPaycheck", {
        detail: { paycheck: this.paycheck },
      })
    );
  }

  render() {
    return html`<wa-details appearance="filled outlined">
      <div slot="summary">
        Paycheck on
        <wa-format-date
          month="long"
          day="numeric"
          year="numeric"
          date="${this.paycheck.date}T00:00:00"
        ></wa-format-date>
        for
        <wa-format-number
          type="currency"
          currency="USD"
          value=${this.paycheck.total}
          lang="en-US"
        ></wa-format-number>
      </div>
      <div class="wa-stack">
        <table>
          <thead>
            <tr>
              <th scope="col">Budget Name</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${this.paycheck.transactions.map(
              (t) => html`<tr>
                <td>${t.budget.name}</td>
                <td id="${t.budget.id}">
                  <wa-format-number
                    type="currency"
                    currency="USD"
                    value="${t.amount}"
                    lang="en-US"
                  ></wa-format-number>
                </td>
              </tr>`
            )}
          </tbody>
        </table>

        <wa-button
          variant="brand"
          appearance="filled"
          @click=${this.handlePaycheckClick}
          >Copy from this paycheck</wa-button
        >
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-paycheck", Paycheck);

export class PreviousPaychecks extends BaseDialog {
  static properties = {
    paychecks: { type: Array },
  };

  static queries = {
    dialog: "wa-dialog",
  };

  paychecksTemplate() {
    return this.paychecks.map(
      (p) => html`<nb-paycheck .paycheck=${p}></nb-paycheck>`
    );
  }

  render() {
    return html`<wa-dialog label="Copy from Previous Paycheck">
      <div>${this.paychecksTemplate()}</div>
      <wa-button
        slot="footer"
        class="w-full"
        variant="neutral"
        appearance="outlined"
        data-dialog="close"
        >Cancel</wa-button
      >
    </wa-dialog>`;
  }
}
customElements.define("nb-previous-paychecks", PreviousPaychecks);
