import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-category.mjs";

class RoundActions extends NikElement {
  static properties = {
    round: { type: Object },
  };

  handleEditClick() {
    if (!this.editRoundModal) {
      this.editRoundModal = document.createElement("nb-edit-round");
      this.editRoundModal.round = this.round;
      document.body.appendChild(this.editRoundModal);
    }

    this.editRoundModal.show();
  }

  handleDeleteClick() {
    if (!this.deleteRoundModal) {
      this.deleteRoundModal = document.createElement("nb-delete-round");
      this.deleteRoundModal.round = this.round;
      document.body.appendChild(this.deleteRoundModal);
    }

    this.deleteRoundModal.show();
  }

  render() {
    return html`<div class="wa-cluster wa-align-items-center">
      <wa-button
        appearance="outlined"
        size="small"
        @click=${this.handleEditClick}
        >Edit</wa-button
      >
      <wa-button
        appearance="outlined"
        variant="danger"
        size="small"
        @click=${this.handleDeleteClick}
        >Delete</wa-button
      >
    </div>`;
  }
}
customElements.define("nb-round-actions", RoundActions);

export class TransactionsGrid extends NikElement {
  static properties = {
    transactions: {
      type: Array,
    },
    theme: {
      type: String,
    },
  };

  static queries = {
    transactionsGridEl: "#grid",
  };

  firstUpdated() {
    this.init();
  }

  async init() {
    await this.updateComplete;

    this.createDataGrid();
    this.setupThemeWatcher();
  }

  createDataGrid() {
    if (!this.transactions.length) {
      return;
    }

    const columnDefs = [
      {
        field: "name",
        filter: "agTextColumnFilter",
      },
      {
        field: "amount",
        filter: "agNumberColumnFilter",
        cellRenderer: (param) => {
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
          let budget = param.data.budget;

          return `<a href="${budget.url}">${budget.name}</a>`;
        },
      },
      {
        field: "user",
        filter: "agTextColumnFilter",
        cellRenderer: (param) => {
          let user = param.data.user;

          return user.username;
        },
      },
      {
        field: "categories",
        filter: "agTextColumnFilter",
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
            "items-center"
          );
          div.append(...nbCategories);

          return div;
        },
      },
      {
        field: "date",
        filter: "agDateColumnFilter",
        cellRenderer: (param) => {
          let date = param.data.date;

          return `<wa-format-date month="long" day="numeric" year="numeric" date="${
            date + "T00:00:00"
          }"></sl-format-date>`;
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
            colId: "date",
            minWidth: 175,
            maxWidth: 175,
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
        ],
      },
      defaultColDef: {
        resizable: false,
      },
      domLayout: "autoHeight",
      suppressCellFocus: true,
      suppressMovableColumns: true,
      pagination: true,
      paginationPageSize: 20,
      paginationPageSizeSelector: false,
    };
    this.dataGrid = agGrid.createGrid(this.transactionsGridEl, gridOptions);
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver((params) =>
      this.handleThemeChange(params)
    );

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });

    this.handleThemeChange();
  }

  handleThemeChange() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";
    this.transactionsGridEl.classList.toggle(
      "ag-theme-alpine-dark",
      theme === "dark"
    );
    this.transactionsGridEl.classList.toggle(
      "ag-theme-alpine",
      theme === "light"
    );
  }

  render() {
    if (!this.transactions.length) {
      return null;
    }

    return html`<div
      id="grid"
      style="--ag-grid-size: 4px;"
      class=${this.theme === "dark"
        ? "ag-theme-alpine-dark"
        : "ag-theme-alpine"}
    ></div>`;
  }
}

customElements.define("nb-transactions-grid", TransactionsGrid);
