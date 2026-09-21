import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import "./nb-data-grid.mjs";
import "./nb-category.mjs";
import "./nb-delete-transaction.mjs";
import "./nb-edit-transaction.mjs";

class TransactionActions extends NikElement {
  static properties = {
    transaction: { type: Object },
    budgets: { type: Array },
    categories: { type: Array },
  };

  handleEditClick() {
    if (!this.editTransactionModal) {
      this.editTransactionModal = document.createElement("nb-edit-transaction");
      this.editTransactionModal.transaction = this.transaction;
      this.editTransactionModal.budgets = this.budgets;
      this.editTransactionModal.categories = this.categories;
      document.body.appendChild(this.editTransactionModal);
    }

    this.editTransactionModal.show();
  }

  handleDeleteClick() {
    if (!this.deleteTransactionModal) {
      this.deleteTransactionModal = document.createElement(
        "nb-delete-transaction",
      );
      this.deleteTransactionModal.transaction = this.transaction;
      document.body.appendChild(this.deleteTransactionModal);
    }

    this.deleteTransactionModal.show();
  }

  render() {
    return html`<div class="wa-cluster items-center gap-4 flex-nowrap">
      <wa-button
        class="icon-button no-border"
        variant="brand"
        appearance="plain"
        @click=${this.handleEditClick}
        ><wa-icon library="ion" name="create-outline" label="Edit"></wa-icon
      ></wa-button>
      <wa-button
        class="icon-button no-border"
        variant="danger"
        appearance="plain"
        @click=${this.handleDeleteClick}
        ><wa-icon library="ion" name="trash-outline" label="Delete"></wa-icon
      ></wa-button>
    </div>`;
  }
}
customElements.define("nb-transaction-actions", TransactionActions);

export class TransactionsGrid extends NikElement {
  static properties = {
    budgets: { type: Array },
  };

  static queries = {
    transactionsGridEl: "#grid",
    paginationButtons: { all: ".ag-paging-page-summary-panel > .ag-button" },
    waGrid: "nb-data-grid",
  };

  init() {
    document.addEventListener("UpdateTransactions", this);
    document.addEventListener("UpdateTransaction", this);
    document.addEventListener("AddTransaction", this);
    document.addEventListener("DeleteTransaction", this);
    document.addEventListener("keydown", this);

    this.createWaDataGrid();
  }

  handleEvent(event) {
    switch (event.type) {
      case "UpdateTransactions":
      case "UpdateTransaction":
      case "AddTransaction":
      case "DeleteTransaction": {
        this.requestNewData();
        break;
      }
      case "keydown": {
        this.handleKeyDown(event);
        break;
      }
    }
  }

  handleKeyDown(event) {
    let tagName = event.target.localName;
    if (
      tagName === "input" ||
      tagName === "wa-input" ||
      tagName === "wa-option" ||
      tagName === "nb-data-grid"
    ) {
      return;
    }

    // add option key or something here
    let index = 0;
    switch (event.key) {
      case "n": {
        index = 0;
        break;
      }
      case "a": {
        index = 1;
        break;
      }
      case "b": {
        index = 2;
        break;
      }
      case "u": {
        index = 3;
        break;
      }
      case "c": {
        index = 4;
        break;
      }
      case "d": {
        index = 5;
        break;
      }
      default: {
        return;
      }
    }

    event.stopImmediatePropagation();
    event.preventDefault();

    let filters = this.waGrid.shadowRoot.querySelectorAll(".filter-trigger");
    filters[index].click();
  }

  requestNewData() {
    this.waGrid.reload();
  }

  async createWaDataGrid() {
    await customElements.whenDefined("wa-data-grid");

    this.waGrid.pageSizeOptions = [];

    const columns = [
      {
        field: "name",
        label: "Name",
        sortable: true,
        sortFn: "alphanumeric",
        filterable: true,
        flex: 2,
        minWidth: 200,
      },
      {
        field: "amount",
        label: "Amount",
        sortable: true,
        filterable: true,
        filterType: "number-range",
        minWidth: 150,
        formatter: (amount) => {
          return html`<wa-format-number
            type="currency"
            currency="USD"
            value="${amount}"
            lang="en-US"
          ></wa-format-number>`;
        },
      },
      {
        field: "budget",
        label: "Budget",
        sortable: true,
        sortFn: "alphanumeric",
        filterable: true,
        filterType: "set",
        minWidth: 200,
        value: (row) => {
          return row.budget?.name;
        },
        formatter: (_, row) => {
          if (!row?.budget?.name) {
            return null;
          }

          let budget = row.budget;
          let transaction = row;
          let id = `transaction-${transaction.id}-budget-info`;
          return html`<wa-tooltip for="${id}" trigger="click"
              >Budget total is
              <wa-format-number
                type="currency"
                currency="USD"
                value="${budget.total}"
                lang="en-US"
              ></wa-format-number>
            </wa-tooltip>
            <a href="${budget.url}">${budget.name}</a>
            <wa-button
              id="${id}"
              class="icon-button no-border"
              appearance="plain"
              ><wa-icon
                library="ion"
                name="information-circle-outline"
                label="Info"
              ></wa-icon
            ></wa-button>`;
        },
      },
      {
        field: "user",
        label: "User",
        sortable: true,
        sortFn: "alphanumeric",
        filterable: true,
        filterType: "set",
        minWidth: 175,
        value: (row) => {
          return row.user.username;
        },
      },
      {
        field: "categories",
        label: "Categories",
        sortable: false,
        // sortFn: "alphanumeric",
        filterable: true,
        filterType: "set",
        filterOptions: this.categories
          .map((c) => ({
            value: c.id,
            label: c.name,
          }))
          .sort((a, b) => a.label.localeCompare(b.label)),
        value: (row) => {
          let categories = row.categories;

          return categories.map((c) => c.category.name).join(" ");
        },
        formatter: (_, row) => {
          let categories = row.categories;
          categories.sort((a, b) =>
            a.category.name.localeCompare(b.category.name),
          );

          return html`<div
            class="wa-cluster w-full h-full gap-(--wa-space-2xs)! items-center p-(--wa-space-2xs)"
          >
            ${categories.map(
              (c) =>
                html`<nb-category
                  name=${c.category.name}
                  color=${c.category.color}
                ></nb-category>`,
            )}
          </div>`;
        },
        minWidth: 200,
      },
      {
        field: "date",
        label: "Date",
        sortable: true,
        sortFn: "datetime",
        filterable: true,
        filterType: "date-range",
        formatter: (_, row) => {
          let date = row.date;

          return html`<wa-format-date month="short" day="numeric" year="numeric" date="${
            date + "T00:00:00"
          }"></sl-format-date>`;
        },
        width: 150,
      },
      {
        field: "actions",
        label: "Actions",
        sortable: false,
        filterable: false,
        // align: "end",
        formatter: (_, row) => {
          if (!row.name) {
            return null;
          }

          return html`<nb-transaction-actions
            .transaction=${row}
            .budgets=${this.budgets}
            .categories=${this.categories}
          ></nb-transaction-actions>`;
        },
        width: 116,
      },
    ];

    this.waGrid.columns = columns;

    this.waGrid.dataSource = async ({
      sort,
      filters,
      search,
      page,
      pageSize,
      signal,
    }) => {
      const params = new URLSearchParams({
        sort: JSON.stringify(sort),
        filters: JSON.stringify(filters),
        search,
        page,
        pageSize,
      });

      let response = await fetch(
        "/api/data_grid_transactions?" + params.toString(),
        { signal },
      );
      let { transactions, total } = await response.json();
      return { rows: transactions, total };
    };
  }

  render() {
    return html`<nb-data-grid
      child-rows="children"
      row-key="id"
      paginate
      page-size="20"
    ></nb-data-grid>`;
  }
}

customElements.define("nb-transactions-grid", TransactionsGrid);
