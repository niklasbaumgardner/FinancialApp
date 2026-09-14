import { NikElement } from "./nik-element.mjs";
import { html } from "lit";
import "./nb-add-budget.mjs";
import "./nb-delete-budget-modal.mjs";
import "./nb-edit-budget.mjs";
import { _createColumnTreeWithIds } from "ag-grid-community";

class BudgetActions extends NikElement {
  static properties = {
    budget: { type: Object },
    activeBudgets: { type: Array },
    inactiveBudgets: { type: Array },
  };

  get transferBudgets() {
    return;
  }

  handleEditClick() {
    if (!this.editBudgetModal) {
      this.editBudgetModal = document.createElement("nb-edit-budget");
      this.editBudgetModal.budget = this.budget;
      this.editBudgetModal.budgets = [
        ...this.activeBudgets,
        ...this.inactiveBudgets,
      ];
      document.body.appendChild(this.editBudgetModal);
    }

    this.editBudgetModal.show();
  }

  handleDeleteClick() {
    if (!this.deleteBudgetModal) {
      this.deleteBudgetModal = document.createElement("nb-delete-budget-modal");
      this.deleteBudgetModal.budget = this.budget;
      this.deleteBudgetModal.transferBudgets = this.activeBudgets;
      document.body.appendChild(this.deleteBudgetModal);
    }

    this.deleteBudgetModal.show();
  }

  render() {
    return html`<div class="wa-cluster items-center gap-4">
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
customElements.define("nb-budget-actions", BudgetActions);

export class ViewBudgets extends NikElement {
  static properties = {
    budgets: { type: Array },
    total: { type: String },
  };

  static queries = {
    active: "#active",
    inactive: "#inactive",
    waDataGrid: "nb-data-grid",
  };

  connectedCallback() {
    super.connectedCallback();

    this.sortBudgets();

    document.addEventListener("BudgetsUpdated", this);
    this.addEventListener("wa-cell-click", this);

    this.createDataGrid();
  }

  sortBudgets() {
    this.budgets[0].sort((a, b) => a.name.localeCompare(b.name));
    this.budgets[1].sort((a, b) => a.name.localeCompare(b.name));
  }

  async createDataGrid() {
    await customElements.whenDefined("wa-data-grid");
    const columns = [
      {
        field: "name",
        label: "Name",
        sortable: true,
        filterable: true,
        formatter: (value, row) => {
          if (row.url) {
            return html`<a href=${row.url}>${row.name}</a>`;
          }

          return html`<span class="wa-color-text-quiet">${value}</span>`;
        },
        flex: 2,
        minWidth: 200,
      },
      {
        field: "total",
        label: "Balance",
        sortable: true,
        filterable: true,
        formatter: (value) => {
          let classString = "";
          if (value > 0) {
            classString = "text-greater-than-zero";
          } else if (value < 0) {
            classString = "text-less-than-zero";
          }
          return html`<wa-format-number
            class=${classString}
            type="currency"
            currency="USD"
            value=${value}
            lang="en-US"
          ></wa-format-number>`;
        },
        flex: 1,
        minWidth: 200,
      },
      {
        field: "user",
        label: "Owner",
        sortable: true,
        sortFn: "alphanumeric",
        filterable: true,
        filterType: "set",
        value: (row) => {
          return row.user.username;
        },
        formatter: (value, row) => {
          if (row.shared_users?.length) {
            return html`${value}
              <wa-tooltip for="shared-users-${row.id}"
                >This budget is shared with
                ${row.shared_users
                  .map((u) => u.username)
                  .join(", ")}</wa-tooltip
              ><wa-icon
                library="ion"
                name="person-circle-outline"
                id="shared-users-${row.id}"
              ></wa-icon>`;
          }

          return html`${value}`;
        },
        flex: 1,
        minWidth: 200,
      },
      {
        id: "actions",
        label: "Actions",
        sortable: false,
        filterable: false,
        // align: "end",
        formatter: (_, row) => {
          if (row.children?.length) {
            return null;
          }

          let [active, inactive] = this.budgets;

          return html`<nb-budget-actions
            .budget=${row}
            .activeBudgets=${active}
            .inactiveBudgets=${inactive}
          ></nb-budge-actions>`;
        },
        width: 116,
      },
    ];

    this.waDataGrid.columns = columns;

    this.setGridData();

    this.waDataGrid.expandRow("active");
  }

  setGridData() {
    let [active, inactive] = this.budgets;
    const data = [
      {
        id: "active",
        name: "Active",
        user: {},
        children: active,
        total: active.reduce((acc, cur) => acc + cur.total, 0),
      },
      {
        id: "inactive",
        name: "Inactive",
        user: {},
        children: inactive,
        total: inactive.reduce((acc, cur) => acc + cur.total, 0),
      },
    ];
    this.waDataGrid.data = data;
  }

  handleEvent(event) {
    switch (event.type) {
      case "BudgetsUpdated": {
        const { active, inactive } = event.detail;

        this.budgets = [active, inactive];
        this.sortBudgets();
        this.setGridData();
      }
      case "wa-cell-click": {
        let { row } = event.detail;
        if (!row) {
          return;
        }
        if (row.id === "active" || row.id === "inactive") {
          if (this.waDataGrid.expandedKeys.includes(row.id)) {
            this.waDataGrid.collapseRow(row.id);
          } else {
            this.waDataGrid.expandRow(row.id);
          }
        }
        break;
      }
    }
  }

  handleAddBudgetClick() {
    if (!this.addBudgetModal) {
      let [active, inactive] = this.budgets;
      this.addBudgetModal = document.createElement("nb-add-budget");
      this.addBudgetModal.budgets = [...active, ...inactive];
      document.body.append(this.addBudgetModal);
    }

    this.addBudgetModal.show();
  }

  render() {
    return html`<wa-card>
      <div class="wa-stack">
        <div class="wa-split">
          <div>
            <h1>Welcome</h1>
            <h3>
              Combined budget total:
              <wa-format-number
                type="currency"
                currency="USD"
                value=${this.total}
                lang="en-US"
              ></wa-format-number>
            </h3>
          </div>
          <wa-button
            variant="neutral"
            appearance="filled-outlined"
            @click=${this.handleAddBudgetClick}
          >
            <wa-icon
              library="remix"
              slot="start"
              name="system/add-large-line"
              nname="add-outline"
            ></wa-icon>
            Add New Budget</wa-button
          >
        </div>

        <nb-data-grid
          row-key="id"
          child-rows="children"
          size="s"
          filter-from-leaf-rows
        ></nb-data-grid>
      </div>
    </wa-card>`;
  }
}
customElements.define("nb-view-budgets", ViewBudgets);
