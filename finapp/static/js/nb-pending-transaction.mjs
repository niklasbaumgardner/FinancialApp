import { html } from "./lit.bundle.mjs";
import "./nb-categories-select.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-delete-pending-transaction.mjs";

export class PendingTransaction extends NikElement {
  static properties = {
    transaction: { type: Object },
    budgets: { type: Array },
    categories: { type: Array },
    sharedUsers: { type: Array },
  };

  static queries = {
    form: "form",
    budgetsSelect: "#budgets-select",
    usersSelect: "#user-select",
    categoriesSelect: "nb-categories-select",
    submitButton: "#submit-button",
    discardButton: "#discard-button",
    nameInput: "#name",
    dateInput: "#date",
    amountInput: "#amount",
  };

  get selectedBudget() {
    let currentBudgetId = this.budgetsSelect?.value;
    if (!currentBudgetId) {
      return null;
    }

    let budget = this.budgets.find((b) => b.id == currentBudgetId);
    return budget;
  }

  connectedCallback() {
    super.connectedCallback();

    this.budgets.sort((a, b) => a.name.localeCompare(b.name));
  }

  openCategoriesModal() {
    document.querySelector("nb-category-modal").show();
  }

  getPotentialCategories() {
    let selectedCategories = [];

    for (let categorie of this.categories) {
      let lowerCategoryName = categorie.name.toLowerCase();
      let lowerTransactionName = this.transaction.name.toLowerCase();
      let lowerAccountName = this.transaction.account.name.toLowerCase();

      if (
        lowerCategoryName.includes(lowerTransactionName) ||
        lowerCategoryName.includes(lowerAccountName) ||
        lowerTransactionName.includes(lowerCategoryName) ||
        lowerAccountName.includes(lowerCategoryName)
      ) {
        selectedCategories.push(categorie.id);
      }
    }

    return selectedCategories;
  }

  async setLoadingState() {
    this.submitButton.loading = true;
    this.submitButton.disabled = true;

    this.submitButton.requestUpdate();
    await this.submitButton.updateComplete;

    this.discardButton.disabled = true;

    this.discardButton.requestUpdate();
    await this.discardButton.updateComplete;
  }

  async handleTransactionAdd() {
    if (!this.form.reportValidity()) {
      return;
    }

    await this.setLoadingState();

    let formData = new FormData(this.form);

    let response = await fetch(
      this.transaction.convert_pending_transaction_url,
      {
        method: "POST",
        body: formData,
      }
    );

    let { transaction, pending_transactions } = await response.json();

    document.dispatchEvent(
      new CustomEvent("AddTransaction", {
        bubbles: true,
        composed: true,
        detail: { transaction },
      })
    );

    this.updatePendingTransactions(pending_transactions);
  }

  async handleTransactionDiscard() {
    if (!this.deletePendingTransactionModal) {
      this.deletePendingTransactionModal = document.createElement(
        "nb-delete-pending-transaction"
      );
      this.deletePendingTransactionModal.pendingTransaction = this.transaction;
      document.body.appendChild(this.deletePendingTransactionModal);
    }

    this.deletePendingTransactionModal.show();
  }

  updatePendingTransactions(pendingTransactions) {
    document.dispatchEvent(
      new CustomEvent("UpdatePendingTransactions", {
        bubbles: true,
        composed: true,
        detail: { pendingTransactions },
      })
    );
  }

  async budgetChange() {
    if (!this.selectedBudget) {
      return;
    }

    let users = [this.selectedBudget.user];
    users.push(...this.selectedBudget.shared_users);
    users.sort((a, b) => a.username.localeCompare(b.username));
    this.sharedUsers = users;
  }

  budgetOptionsTemplate() {
    return this.budgets.map(
      (b) => html`<wa-option
        value=${b.id}
        ?selected=${b.id === this.transaction.budget_id}
        ><span class="wa-heading-s">${b.name}</span>:
        ${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(b.total)}</wa-option
      >`
    );
  }

  budgetsTemplate() {
    return html`<wa-select
      size="small"
      label="Select Budget"
      id="budgets-select"
      name="budget"
      required
      @input=${this.budgetChange}
      >${this.budgetOptionsTemplate()}</wa-select
    >`;
  }

  sharedUsersOptionsTemplate() {
    if (!this.selectedBudget || !this.sharedUsers) {
      return null;
    }

    return this.sharedUsers.map(
      (u) =>
        html`<wa-option
          ?selected=${u.id === this.transaction.user_id}
          value=${u.id}
          >${u.username}</wa-option
        >`
    );
  }

  sharedUsersSelectTemplate() {
    return html`<wa-select
      size="small"
      id="user-select"
      label="Select user for this transaction"
      name="user"
      ?disabled=${!this.selectedBudget}
      required
      >${this.sharedUsersOptionsTemplate()}</wa-select
    >`;
  }

  render() {
    if (!this.transaction.id) {
      return null;
    }

    return html`<wa-details name="pending-transaction"
      ><div class="wa-stack gap-(--wa-space-xs)! w-full" slot="summary">
        <span
          ><b class="wa-split"
            ><p
              class="text-ellipsis overflow-hidden whitespace-nowrap max-w-[32ch] m-0!"
            >
              ${this.transaction.name}
            </p>
            <wa-format-number
              type="currency"
              currency=${this.transaction.account.currency}
              value=${this.transaction.amount}
            ></wa-format-number></b
        ></span>
        <div class="wa-split">
          <small>${this.transaction.account.name}</small>
          <small>
            <wa-format-date
              date="${this.transaction.date}T00:00:00"
              month="long"
              day="numeric"
              year="numeric"
            ></wa-format-date>
          </small>
        </div>
        <wa-button
          id="discard-button"
          class="w-fit"
          size="small"
          variant="danger"
          appearance="outlined"
          @click=${this.handleTransactionDiscard}
          >Discard This Transaction</wa-button
        >
      </div>
      <div class="wa-stack">
        <form class="wa-stack">
          <input
            name="return-transaction"
            type="text"
            class="hidden!"
            value="True"
            hidden
          />
          <div class="wa-stack">
            <wa-input
              size="small"
              label="Name"
              class="grow"
              type="text"
              id="name"
              name="name"
              placeholder="Spent too much?"
              autocomplete="niklas"
              value=${this.transaction.name}
              required
            ></wa-input>
            <div class="wa-cluster flex-nowrap!">
              <wa-input
                size="small"
                label="Amount"
                class="grow min-w-[0]"
                type="number"
                step=".01"
                id="amount"
                name="amount"
                placeholder="0.00"
                autocomplete="niklas"
                value=${this.transaction.amount}
                required
              ></wa-input>
              <wa-input
                size="small"
                label="Date"
                class="grow min-w-min"
                type="date"
                id="date"
                name="date"
                value=${this.transaction.date}
                required
              ></wa-input>
            </div>
          </div>
          ${this.budgetsTemplate()} ${this.sharedUsersSelectTemplate()}
          <nb-categories-select
            size="small"
            .selected=${this.getPotentialCategories()}
            .categories=${this.categories}
          ></nb-categories-select>
        </form>
        <div class="wa-cluster w-full">
          <wa-button
            size="small"
            id="submit-button"
            class="grow"
            variant="brand"
            @click=${this.handleTransactionAdd}
            >Add Transaction</wa-button
          >
        </div>
      </div>
    </wa-details>`;
  }
}
customElements.define("nb-pending-transaction", PendingTransaction);
