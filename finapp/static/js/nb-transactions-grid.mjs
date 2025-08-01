import { html } from "./bundle.mjs";
import { NikElement } from "./nik-element.mjs";
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
        "nb-delete-transaction"
      );
      this.deleteTransactionModal.transaction = this.transaction;
      document.body.appendChild(this.deleteTransactionModal);
    }

    this.deleteTransactionModal.show();
  }

  render() {
    return html`<div class="wa-cluster wa-align-items-center">
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
    transactions: {
      type: Array,
    },
    theme: {
      type: String,
    },
    budgets: { type: Array },
  };

  static queries = {
    transactionsGridEl: "#grid",
    paginationButtons: { all: ".ag-paging-page-summary-panel > .ag-button" },
  };

  get currentColorScheme() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";

    let colorScheme =
      theme === "dark" ? agGrid.colorSchemeDark : agGrid.colorSchemeLight;
    return colorScheme;
  }

  constructor() {
    super();

    // this.queue = [];
    // this.disablePagination = true;
  }

  firstUpdated() {
    this.init();
  }

  async init() {
    await this.updateComplete;

    this.createDataGrid();
    this.setupThemeWatcher();
    // this.disablePaginationPanel();
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("UpdateTransactions", this);
    document.addEventListener("UpdateTransaction", this);
    document.addEventListener("AddTransaction", this);
    document.addEventListener("DeleteTransaction", this);
  }

  handleEvent(event) {
    switch (event.type) {
      case "UpdateTransactions": {
        let transactions = event.detail.transactions;
        this.updateTransactions(transactions);
        break;
      }
      case "UpdateTransaction": {
        let transaction = event.detail.transaction;
        this.updateTransaction(transaction);
        break;
      }
      case "AddTransaction": {
        let transaction = event.detail.transaction;
        this.addTransaction(transaction);
        break;
      }
      case "DeleteTransaction": {
        let transaction = event.detail.transaction;
        this.deleteTransaction(transaction);
        break;
      }
      case "click": {
        this.handleDisabledPaginationButtonClick(event);
        break;
      }
    }
  }

  updateTransactions(transactions) {
    this.transactions = transactions;
    this.dataGrid.setGridOption("rowData", transactions);

    // this.enablePaginationPanel();
    // this.doQueue();
  }

  updateTransaction(transaction) {
    this.dataGrid.applyTransaction({ update: [transaction] });

    this.requestNewData();
  }

  addTransaction(transaction) {
    let index = this.transactions.findIndex((t) => {
      if (transaction.date >= t.date) {
        return true;
      }

      return false;
    });

    if (index < 0) {
      this.requestNewData();
      return;
    }

    this.dataGrid.applyTransaction({ addIndex: index, add: [transaction] });

    this.requestNewData();
  }

  deleteTransaction(transaction) {
    this.dataGrid.applyTransaction({ remove: [transaction] });

    this.requestNewData();
  }

  requestNewData() {
    document.dispatchEvent(
      new CustomEvent("RequestNewData", { detail: { includeBudgets: true } })
    );
  }

  createDataGrid() {
    if (!this.transactions.length) {
      return;
    }

    const columnDefs = [
      {
        field: "name",
        filter: "agTextColumnFilter",
        autoHeight: true,
        cellRenderer: (param) => {
          if (!param.data.name) {
            return `<wa-spinner></wa-spinner>`;
          }

          let name = param.data.name;
          return `<span class="text-wrap">${name}</span>`;
        },
        cellClass: ["leading-(--wa-line-height-normal)!", "p-(--wa-space-2xs)"],
        spanRows: ({ valueA, valueB }) =>
          valueA != undefined && valueA === valueB,
      },
      {
        field: "amount",
        filter: "agNumberColumnFilter",
        cellRenderer: (param) => {
          if (!param.data.name) {
            return null;
          }

          let amount = param.data.amount;
          return `<wa-format-number
            type="currency"
            currency="USD"
            value="${amount}"
            lang="en-US"
          ></wa-format-number>`;
        },
      },
      {
        field: "budget",
        filter: "agTextColumnFilter",
        cellRenderer: (param) => {
          if (!param.data.name) {
            return null;
          }

          let budget = param.data.budget;
          let transaction = param.data;
          let id = `transaction-${transaction.id}-budget-info`;
          return `<wa-tooltip for="${id}" trigger="click">Budget total is <wa-format-number
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
            ><wa-icon library="ion" name="information-circle-outline" label="Info"></wa-icon
          ></wa-button>`;
        },
        valueGetter: (p) => {
          return p.data.budget.name;
        },
      },
      {
        field: "user",
        filter: "agTextColumnFilter",
        valueGetter: (p) => {
          return p.data.user.username;
        },
      },
      {
        field: "categories",
        filter: "agTextColumnFilter",
        autoHeight: true,
        cellRenderer: (param) => {
          let categories = param.data.categories;
          categories.sort((a, b) =>
            a.category.name.localeCompare(b.category.name)
          );

          let nbCategories = categories.map((c) => {
            {
              let el = document.createElement("nb-category");
              el.name = c.category.name;
              el.color = c.category.color;
              return el;
            }
          });

          let div = document.createElement("div");
          div.classList.add(
            "wa-cluster",
            "w-full",
            "h-full",
            "gap-(--wa-space-2xs)!",
            "items-center",
            "p-(--wa-space-2xs)"
          );
          div.append(...nbCategories);

          return div;
        },
        valueGetter: (p) => {
          let categories = p.data.categories;

          return categories.map((c) => c.category.name).join(" ");
        },
      },
      {
        field: "date",
        filter: "agDateColumnFilter",
        cellRenderer: (param) => {
          if (!param.data.name) {
            return null;
          }

          let date = param.data.date;

          return `<wa-format-date month="long" day="numeric" year="numeric" date="${
            date + "T00:00:00"
          }"></wa-format-date>`;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        cellRenderer: (param) => {
          if (!param.data.name) {
            return null;
          }

          let div = document.createElement("div");
          div.classList.add(
            "wa-cluster",
            "w-full",
            "h-full",
            "items-center",
            "py-(--wa-space-2xs)"
          );

          let actions = document.createElement("nb-transaction-actions");
          actions.transaction = param.data;
          actions.budgets = this.budgets;
          actions.categories = this.categories;

          div.append(actions);

          return div;
        },
      },
    ];

    const gridOptions = {
      columnDefs,
      rowData: this.transactions,
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 175,
        // defaultMaxWidth: 100,
        columnLimits: [
          {
            colId: "name",
            minWidth: 200,
            // maxWidth: 350,
          },
          {
            colId: "amount",
            minWidth: 125,
            maxWidth: 125,
          },
          {
            colId: "categories",
            minWidth: 200,
            // maxWidth: 200,
          },
          // {
          //   colId: "user",
          //   minWidth: 175,
          //   maxWidth: 175,
          // },
          // {
          //   colId: "budget",
          //   minWidth: 175,
          //   maxWidth: 175,
          // },
          {
            colId: "date",
            minWidth: 150,
            maxWidth: 150,
          },
          {
            colId: "actions",
            minWidth: 116,
            maxWidth: 116,
          },
        ],
      },
      defaultColDef: {
        resizable: false,
      },
      domLayout: "autoHeight",
      suppressCellFocus: true,
      suppressMovableColumns: true,
      enableCellSpan: true,
      pagination: true,
      paginationPageSize: 20,
      paginationPageSizeSelector: false,
      theme: agGrid.themeAlpine.withPart(this.currentColorScheme),
      getRowId: (params) => `${params.data.id}`,
    };
    this.dataGrid = agGrid.createGrid(this.transactionsGridEl, gridOptions);
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver(() =>
      this.handleThemeChange()
    );

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });

    this.handleThemeChange();
  }

  handleThemeChange() {
    this.dataGrid.setGridOption(
      "theme",
      agGrid.themeAlpine.withPart(this.currentColorScheme)
    );
  }

  handleDisabledPaginationButtonClick(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.queue.push(event.target.closest(".ag-button").dataset.ref);
  }

  disablePaginationPanel() {
    for (let button of this.paginationButtons) {
      button.addEventListener("click", this, { capture: true }, true);
    }
  }

  enablePaginationPanel() {
    for (let button of this.paginationButtons) {
      button.removeEventListener("click", this, { capture: true }, true);
    }

    this.disablePagination = false;
  }

  doQueue() {
    for (let ref of this.queue) {
      switch (ref) {
        case "btFirst": {
          this.dataGrid.paginationGoToFirstPage();
          break;
        }
        case "btPrevious": {
          this.dataGrid.paginationGoToPreviousPage();
          break;
        }
        case "btNext": {
          this.dataGrid.paginationGoToNextPage();
          break;
        }
        case "btLast": {
          this.dataGrid.paginationGoToLastPage();
          break;
        }
      }
    }

    this.queue = [];
  }

  render() {
    if (!this.transactions.length) {
      return null;
    }

    return html`<div id="grid" style="--ag-grid-size: 4px;"></div>`;
  }
}

customElements.define("nb-transactions-grid", TransactionsGrid);
