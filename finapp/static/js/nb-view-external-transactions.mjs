import { NikElement } from "./nik-element.mjs";
import { html } from "lit";
import "./nb-transactions-grid.mjs";
import "./nb-add-transaction.mjs";
import "./budgets.mjs";

class ViewExternalTransactions extends NikElement {
  static queries = {
    waGrid: "nb-data-grid",
  };

  init() {
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

  async createWaDataGrid() {
    await customElements.whenDefined("wa-data-grid");

    this.waGrid.pageSizeOptions = [];

    const columns = [
      {
        field: "description",
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
        // footer: () =>
        //   html`<wa-format-number
        //     type="currency"
        //     currency="USD"
        //     value="${this.total_sum ?? 0}"
        //     lang="en-US"
        //   ></wa-format-number>`,
      },
      {
        field: "account",
        label: "Account",
        sortable: true,
        sortFn: "alphanumeric",
        filterable: true,
        filterType: "set",
        minWidth: 200,
        value: (row) => {
          return row.account?.name;
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
      // {
      //   field: "categories",
      //   label: "Categories",
      //   sortable: false,
      //   // sortFn: "alphanumeric",
      //   filterable: true,
      //   filterType: "set",
      //   filterOptions: this.categories
      //     .map((c) => ({
      //       value: c.id,
      //       label: c.name,
      //     }))
      //     .sort((a, b) => a.label.localeCompare(b.label)),
      //   value: (row) => {
      //     let categories = row.categories;

      //     return categories.map((c) => c.category.name).join(" ");
      //   },
      //   formatter: (_, row) => {
      //     let categories = row.categories;
      //     categories.sort((a, b) =>
      //       a.category.name.localeCompare(b.category.name),
      //     );

      //     return html`<div
      //       class="wa-cluster w-full h-full gap-(--wa-space-2xs)! items-center p-(--wa-space-2xs)"
      //     >
      //       ${categories.map(
      //         (c) =>
      //           html`<nb-category
      //             name=${c.category.name}
      //             color=${c.category.color}
      //           ></nb-category>`,
      //       )}
      //     </div>`;
      //   },
      //   minWidth: 200,
      // },
      {
        id: "date",
        label: "Date",
        sortable: true,
        filterable: true,
        filterType: "date-range",
        value: (row) => {
          return row.transacted_at ?? row.posted;
        },
        formatter: (_, row) => {
          let date = row.transacted_at ?? row.posted;

          return html`<wa-format-date
            month="short"
            day="numeric"
            year="numeric"
            date="${new Date(date * 1000)}"
          ></wa-format-date>`;
        },
        width: 150,
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
        page: page + 1, // server is 1 based
        pageSize,
      });

      let response = await fetch(
        API_GET_TRANSACTIONS_URL + "?" + params.toString(),
        {
          signal,
        },
      );
      let {
        transactions,
        total,
        page: actualPage,
        total_sum,
      } = await response.json();

      console.log({
        transactions,
        total,
        page: actualPage,
        total_sum,
      });

      return { rows: transactions, total };
    };
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

  transactionsTemplate() {
    return html`<nb-data-grid
      row-key="id"
      paginate
      page-size="20"
    ></nb-data-grid>`;
  }

  render() {
    return html`<div class="wa-stack">
      <h2>All External Transactions</h2>

      ${this.transactionsTemplate()}
    </div>`;
  }
}
customElements.define(
  "nb-view-external-transactions",
  ViewExternalTransactions,
);
