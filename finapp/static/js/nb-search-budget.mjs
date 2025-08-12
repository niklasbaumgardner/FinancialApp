import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-search-item.mjs";
import "./nb-categories-select.mjs";

export class SearchBudget extends NikElement {
  #sortingValues = {
    0: '{"date":"desc"}',
    1: '{"date":"asc"}',
    2: '{"name":"asc"}',
    3: '{"name":"desc"}',
    4: '{"amount":"desc"}',
    5: '{"amount":"asc"}',
  };
  #defaultSortValue = 0;
  #searchingSortValue = 0;

  constructor() {
    super();

    this.numSearchItems = 1;
    this.searchItems = [document.createElement("nb-search-item")];
    this.exactAmount = true;
    this.exactDate = true;
    this.searchTotal = 0;

    document.addEventListener("SearchTotalChanged", (event) =>
      this.handleSearchTotalChanged(event)
    );
  }

  static properties = {
    searching: { type: Boolean, reflect: true },
    numSearchItems: { type: Number, reflect: true },
    exactAmount: { type: Boolean, reflect: true },
    exactDate: { type: Boolean, reflect: true },
    categories: { type: Array },
    searchTotal: { type: Number },
  };

  static get queries() {
    return {
      dropdownItems: { all: "wa-dropdown-item" },
      inputs: { all: "wa-input" },
      amountInput: "#searchAmount",
      maxAmountInput: "#maxAmount",
      minAmountInput: "#minAmount",
      dateInput: "#exactDate",
      startDateInput: "#startDate",
      endDateInput: "#endDate",
      searchCountEl: "#searchResultsCount",
      nbSelect: "nb-categories-select",
    };
  }

  get currentSortValue() {
    return this.searching ? this.#searchingSortValue : this.#defaultSortValue;
  }

  get currentSortValueAsJson() {
    return this.#sortingValues[this.currentSortValue ?? 0];
  }

  set currentSortValue(val) {
    if (this.searching) {
      this.#searchingSortValue = Number(val);
    } else {
      this.#defaultSortValue = Number(val);
    }
  }

  get searchItemValuesAsString() {
    return this.searchItems.reduce(
      (string, item) => string + item.input.value,
      ""
    );
  }

  get searchItemValuesAsJsonString() {
    let array = this.searchItems
      .filter((item) => item.input.value?.length > 0)
      .map((item) => item.input.value);
    return JSON.stringify(array);
  }

  get searchValuesObject() {
    if (!this.searching) {
      return null;
    }

    let searchValues = {};
    searchValues.name = this.searchItemValuesAsJsonString;

    searchValues.categories = this.nbSelect.value;

    if (this.exactAmount) {
      searchValues.amount = this.amountInput.value;
    } else {
      searchValues.minAmount = this.minAmountInput.value;
      searchValues.maxAmount = this.maxAmountInput.value;
    }

    if (this.exactDate) {
      searchValues.startDate = this.dateInput.value;
      searchValues.endDate = this.dateInput.value;
    } else {
      searchValues.startDate = this.startDateInput.value;
      searchValues.endDate = this.endDateInput.value;
    }

    return searchValues;
  }

  updated(changedProperties) {
    console.log(changedProperties);

    if (!changedProperties.has("searching") || !this.searching) {
      return;
    }

    this.searchItems[0].focus({ focusVisible: true });
  }

  toggleSearch(event) {
    this.searching = !this.searching;

    this.dispatchEvent(
      new CustomEvent("ToggleSearching", {
        bubbles: true,
        detail: {
          searching: !!this.searching,
        },
      })
    );
  }

  handleSortingSelcted(event) {
    let target = event.detail.item;
    if (target.value == this.currentSortValue) {
      // nothing changed
      target.checked = true;
      return;
    }

    this.currentSortValue = target.value;

    for (let el of this.dropdownItems) {
      if (el === target) {
        continue;
      }

      el.checked = false;
    }

    this.dispatchEvent(
      new CustomEvent("SortingChanged", {
        bubbles: true,
        detail: {
          sort: this.#sortingValues[this.currentSortValue],
        },
      })
    );
  }

  toggleAmountSearch() {
    this.exactAmount = !this.exactAmount;
  }

  toggleDateSearch() {
    this.exactDate = !this.exactDate;
  }

  addNewSearchItem() {
    this.searchItems.push(document.createElement("nb-search-item"));
    this.searchItems.at(-1).focus({ focusVisible: true });
    this.numSearchItems += 1;
  }

  handleSearchItemRemoved(event) {
    let searchItem = event.target;
    let index = this.searchItems.indexOf(searchItem);
    if (index > -1) {
      this.searchItems.splice(index, 1);
    }

    this.searchItems.at(-1)?.focus({ focusVisible: true });

    this.numSearchItems -= 1;
  }

  handleInputEvent(event) {
    console.log(event);
    if (this.lastSearchValues === JSON.stringify(this.searchValuesObject)) {
      return;
    }

    console.log(this.searchValuesObject);

    this.dispatchEvent(
      new CustomEvent("SearchInputChanged", {
        bubbles: true,
        composed: true,
        detail: this.searchValuesObject,
      })
    );

    this.lastSearchValues = JSON.stringify(this.searchValuesObject);
  }

  handleSearchTotalChanged(event) {
    if (!this.searching) {
      return;
    }

    let { searchCount, searchSum } = event.detail;
    this.searchCountEl.textContent =
      searchCount === 1 ? "1 transaction" : `${searchCount} transactions`;
    this.searchTotal = Math.round((searchSum + Number.EPSILON) * 100) / 100;
  }

  sortTemplate() {
    return html`<wa-dropdown @wa-select=${this.handleSortingSelcted}>
      <wa-button slot="trigger" with-caret appearance="outlined"
        >Sort by</wa-button
      >

      <wa-dropdown-item
        type="checkbox"
        value="0"
        ?checked=${0 === this.currentSortValue}
        >Date: Newest to oldest</wa-dropdown-item
      >
      <wa-dropdown-item
        type="checkbox"
        value="1"
        ?checked=${1 === this.currentSortValue}
        >Date: Oldest to newest</wa-dropdown-item
      >
      <wa-divider></wa-divider>
      <wa-dropdown-item
        type="checkbox"
        value="2"
        ?checked=${2 === this.currentSortValue}
        >Name: Alphabetical</wa-dropdown-item
      >
      <wa-dropdown-item
        type="checkbox"
        value="3"
        ?checked=${3 === this.currentSortValue}
        >Name: Reverse alphabetical</wa-dropdown-item
      >
      <wa-divider></wa-divider>
      <wa-dropdown-item
        type="checkbox"
        value="4"
        ?checked=${4 === this.currentSortValue}
        >Amount: Most income</wa-dropdown-item
      >
      <wa-dropdown-item
        type="checkbox"
        value="5"
        ?checked=${5 === this.currentSortValue}
        >Amount: Most expensive</wa-dropdown-item
      >
    </wa-dropdown>`;
  }

  searchAmountTemplate() {
    if (this.exactAmount) {
      return html`<div class="wa-cluster items-center!">
        <wa-input
          label="Amount"
          type="number"
          step=".01"
          id="searchAmount"
          placeholder="0.00"
          hint="Use + for positive numbers (income) and no symbol for negative (spent)."
          class="grow"
        ></wa-input>
        <wa-button
          variant="brand"
          appearance="outlined"
          class="grow"
          @click=${this.toggleAmountSearch}
        >
          Search by amount range
        </wa-button>
      </div>`;
    }

    return html`<div class="wa-cluster items-center!">
      <wa-input
        class="grow"
        label="Min amount"
        type="number"
        step=".01"
        id="minAmount"
        placeholder="0.00"
        hint="+ for positive numbers and - / no symbol for negative"
      ></wa-input>

      <wa-input
        class="grow"
        label="Max amount"
        type="number"
        step=".01"
        id="maxAmount"
        placeholder="0.00"
        hint="+ for positive numbers and - / no symbol for negative"
      ></wa-input>

      <wa-button
        variant="brand"
        appearance="outlined"
        class="grow"
        @click=${this.toggleAmountSearch}
      >
        Search by exact amount
      </wa-button>
    </div>`;
  }

  dateTemplate() {
    if (this.exactDate) {
      return html`<div class="wa-cluster items-end!">
        <wa-input
          class="grow"
          label="Date"
          type="date"
          id="exactDate"
        ></wa-input>

        <wa-button
          variant="brand"
          appearance="outlined"
          class="grow"
          @click=${this.toggleDateSearch}
        >
          Search by start and end date
        </wa-button>
      </div>`;
    }

    return html`<div class="wa-cluster items-end!">
      <wa-input
        class="grow"
        label="Start date"
        type="date"
        id="startDate"
      ></wa-input>

      <wa-input
        class="grow"
        label="End date"
        type="date"
        id="endDate"
      ></wa-input>

      <wa-button
        variant="brand"
        appearance="outlined"
        class="grow"
        @click=${this.toggleDateSearch}
      >
        Search by exact date
      </wa-button>
    </div>`;
  }

  template() {
    if (this.searching) {
      return html``;
    }

    return html``;
  }

  viewTemplate() {
    return html`<div class="wa-split">
      ${this.sortTemplate()}
      <wa-button
        class="icon-button"
        appearance="plain"
        @click=${this.toggleSearch}
        ><wa-icon
          label="Search"
          library="ion"
          name="search-outline"
          class="text-(length:--wa-font-size-xl)"
        ></wa-icon
      ></wa-button>
    </div>`;
  }

  searchTemplate() {
    return html`<div
      class="wa-stack"
      @input=${this.handleInputEvent}
      @change=${this.handleInputEvent}
    >
      <div class="wa-split">
        ${this.sortTemplate()}
        <span class="wa-body-l">
          <span id="searchResultsCount">0 transactions</span> totalling
          <span class="wa-heading-m"
            ><wa-format-number
              type="currency"
              currency="USD"
              value=${this.searchTotal}
              lang="en-US"
            ></wa-format-number
          ></span>
        </span>
        <wa-button
          class="icon-button"
          id="cancel-search"
          appearance="plain"
          @click=${this.toggleSearch}
          ><wa-icon
            library="remix"
            name="system/close-large-line"
            label="Cancel"
            class="text-(length:--wa-font-size-xl)"
          ></wa-icon
        ></wa-button>
      </div>

      <div
        class="wa-cluster flex-nowrap"
        @SearchItemRemoved=${this.handleSearchItemRemoved}
      >
        ${this.searchItems}
        <wa-button
          variant="brand"
          appearance="outlined"
          @click=${this.addNewSearchItem}
        >
          Add new search term
        </wa-button>
      </div>
      <nb-categories-select
        .categories=${this.categories}
      ></nb-categories-select>
      <div class="">${this.searchAmountTemplate()}</div>
      <div class="">${this.dateTemplate()}</div>
    </div> `;
  }

  render() {
    if (this.searching) {
      return html`<wa-card>${this.searchTemplate()}</wa-card>`;
    }

    return html`<wa-card>${this.viewTemplate()}</wa-card>`;
  }
}

customElements.define("nb-search-budget", SearchBudget);
