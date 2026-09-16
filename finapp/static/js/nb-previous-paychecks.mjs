import { html } from "lit";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class PreviousPaychecks extends BaseDialog {
  static properties = {
    paychecks: { type: Array },
  };

  static queries = {
    dialog: "wa-dialog",
  };

  handlePaycheckClick(paycheck) {
    this.hide();

    document.dispatchEvent(
      new CustomEvent("CopyFromPaycheck", {
        detail: { paycheck },
      }),
    );
  }

  paychecksTemplate() {
    return html`<wa-accordion mode="single-collapsible"
      >${this.paychecks.map(
        (p) =>
          html`<wa-accordion-item>
            <div slot="label">
              Paycheck on
              <wa-format-date
                month="long"
                day="numeric"
                year="numeric"
                date="${p.date}T00:00:00"
              ></wa-format-date>
              for
              <wa-format-number
                type="currency"
                currency="USD"
                value=${p.total}
                lang="en-US"
              ></wa-format-number>
            </div>
            <div class="wa-stack wa-font-size-smaller wa-color-text-normal">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Budget Name</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${p.transactions.map(
                    (t) =>
                      html`<tr>
                        <td>${t.budget.name}</td>
                        <td id="${t.budget.id}">
                          <wa-format-number
                            type="currency"
                            currency="USD"
                            value="${t.amount}"
                            lang="en-US"
                          ></wa-format-number>
                        </td>
                      </tr>`,
                  )}
                </tbody>
              </table>

              <wa-button
                size="s"
                variant="brand"
                appearance="filled"
                @click=${() => this.handlePaycheckClick(p)}
                >Copy from this paycheck</wa-button
              >
            </div>
          </wa-accordion-item>`,
      )}</wa-accordion
    >`;
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
