import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./searchItem.mjs";
import "./nb-select.mjs";
import nbSelect from "./nb-select.mjs";

class BudgetSearchCard extends NikElement {
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
    this.searchItems = [document.createElement("search-item")];
    this.exactAmount = true;
    this.exactDate = true;

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
  };

  static get queries() {
    return {
      dropdownItems: { all: "sl-menu-item" },
      inputEls: { all: "sl-input" },
      amountInputEl: "#searchAmount",
      maxAmountInputEl: "#maxAmount",
      minAmountInputEl: "#minAmount",
      dateInputEl: "#exactDate",
      startDateInputEl: "#startDate",
      endDateInputEl: "#endDate",
      searchCountEl: "#searchResultsCount",
      searchSumEl: "#searchResultsSum",
      nbSelect: "nb-select",
    };
  }

  get currentSortValue() {
    return this.searching ? this.#searchingSortValue : this.#defaultSortValue;
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
      (string, item) => string + item.inputEl.value,
      ""
    );
  }

  get searchItemValuesAsJsonString() {
    let array = this.searchItems
      .filter((item) => item.inputEl.value.length > 0)
      .map((item) => item.inputEl.value);
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
      searchValues.amount = this.amountInputEl.value;
    } else {
      searchValues.minAmount = this.minAmountInputEl.value;
      searchValues.maxAmount = this.maxAmountInputEl.value;
    }

    if (this.exactDate) {
      searchValues.startDate = this.dateInputEl.value;
      searchValues.endDate = this.dateInputEl.value;
    } else {
      searchValues.startDate = this.startDateInputEl.value;
      searchValues.endDate = this.endDateInputEl.value;
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
    this.searchItems.push(document.createElement("search-item"));
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
    if (this.lastSearchValues === JSON.stringify(this.searchValuesObject)) {
      return;
    }

    console.log(this.searchValuesObject);

    this.dispatchEvent(
      new CustomEvent("SearchInputChanged", {
        bubbles: true,
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
    this.searchSumEl.textContent = searchSum;
  }

  sortTemplate() {
    return html`<sl-dropdown @sl-select=${this.handleSortingSelcted}>
      <sl-button slot="trigger" caret>Sort by</sl-button>
      <sl-menu>
        <sl-menu-item
          type="checkbox"
          value="0"
          ?checked=${0 === this.currentSortValue}
          >Date: Newest to oldest</sl-menu-item
        >
        <sl-menu-item
          type="checkbox"
          value="1"
          ?checked=${1 === this.currentSortValue}
          >Date: Oldest to newest</sl-menu-item
        >
        <sl-divider></sl-divider>
        <sl-menu-item
          type="checkbox"
          value="2"
          ?checked=${2 === this.currentSortValue}
          >Name: Alphabetical</sl-menu-item
        >
        <sl-menu-item
          type="checkbox"
          value="3"
          ?checked=${3 === this.currentSortValue}
          >Name: Reverse alphabetical</sl-menu-item
        >
        <sl-divider></sl-divider>
        <sl-menu-item
          type="checkbox"
          value="4"
          ?checked=${4 === this.currentSortValue}
          >Amount: Most income</sl-menu-item
        >
        <sl-menu-item
          type="checkbox"
          value="5"
          ?checked=${5 === this.currentSortValue}
          >Amount: Most expensive</sl-menu-item
        >
      </sl-menu>
    </sl-dropdown>`;
  }

  searchAmountTemplate() {
    if (this.exactAmount) {
      return html`<div class="col-12 col-lg-7">
          <sl-input
            label="Amount"
            type="number"
            step=".01"
            id="searchAmount"
            placeholder="0.00"
            help-text="Use + for positive numbers (income) and no symbol for negative (spent)."
          ></sl-input>
        </div>
        <div class="col-12 col-lg-5 d-flex align-items-center">
          <sl-button
            variant="primary"
            outline
            class="w-100"
            @click=${this.toggleAmountSearch}
          >
            Search by amount range
          </sl-button>
        </div>`;
    }

    return html`<div class="col-12 col-md-6 col-xl-4">
        <sl-input
          label="Min amount"
          type="number"
          step=".01"
          id="minAmount"
          placeholder="0.00"
          help-text="+ for positive numbers and - / no symbol for negative"
        ></sl-input>
      </div>
      <div class="col-12 col-md-6 col-xl-4">
        <sl-input
          label="Max amount"
          type="number"
          step=".01"
          id="maxAmount"
          placeholder="0.00"
          help-text="+ for positive numbers and - / no symbol for negative"
        ></sl-input>
      </div>
      <div class="col-12 col-xl-4 d-flex align-items-center">
        <sl-button
          variant="primary"
          outline
          class="w-100"
          @click=${this.toggleAmountSearch}
        >
          Search by exact amount
        </sl-button>
      </div>`;
  }

  dateTemplate() {
    if (this.exactDate) {
      return html`<div class="col-12 col-md-6">
          <sl-input label="Date" type="date" id="exactDate"></sl-input>
        </div>
        <div class="col-12 col-md-6 d-flex align-items-end">
          <sl-button
            variant="primary"
            outline
            class="w-100"
            @click=${this.toggleDateSearch}
          >
            Search by start and end date
          </sl-button>
        </div>`;
    }

    return html`<div class="col-12 col-xl-5">
        <sl-input label="Start date" type="date" id="startDate"></sl-input>
      </div>
      <div class="col-12 col-xl-5">
        <sl-input label="End date" type="date" id="endDate"></sl-input>
      </div>
      <div class="col-12 col-xl-2 d-flex align-items-end">
        <sl-button
          variant="primary"
          outline
          class="w-100"
          @click=${this.toggleDateSearch}
        >
          Search by exact date
        </sl-button>
      </div>`;
  }

  template() {
    if (this.searching) {
      return html`<div class="row mb-3">
          <div class="col">
            <div class="row gy-2">
              <div class="col-12 col-md-3">${this.sortTemplate()}</div>
              <div class="col">
                <p class="fs-4">
                  <span id="searchResultsCount">0 transactions</span> totalling
                  <span class="fw-bold" id="searchResultsSum">$0</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col-2 col-md-1 text-end">
            <sl-icon-button
              name="x-lg"
              library="system"
              label="Cancel"
              @click=${this.toggleSearch}
              style="font-size: 22px;"
            ></sl-icon-button>
          </div>
        </div>
        <div class="row mb-2">
          <div
            class="col search-items-grid"
            @SearchItemRemoved=${this.handleSearchItemRemoved}
          >
            ${this.searchItems}<sl-button
              variant="primary"
              class="col-12 col-md-5 col-lg-4 col-xl-3"
              outline
              @click=${this.addNewSearchItem}
            >
              Add new search term
            </sl-button>
          </div>
        </div>
        <div class="row gy-2 mb-2">
          <nb-select .categories=${this.categories}></nb-select>
        </div>
        <div class="row gy-2 mb-2">${this.searchAmountTemplate()}</div>
        <div class="row gy-2">${this.dateTemplate()}</div>`;
    }

    return html`<div class="row">
      <div class="col">${this.sortTemplate()}</div>
      <div class="col text-end">
        <sl-icon-button
          name="search"
          label="Search"
          @click=${this.toggleSearch}
          style="font-size: 22px;"
        ></sl-icon-button>
      </div>
    </div>`;
  }

  render() {
    return html`<sl-card @sl-input=${this.handleInputEvent} class="mb-4"
      >${this.template()}</sl-card
    >`;
  }
}

export default BudgetSearchCard;

customElements.define("search-budget-card", BudgetSearchCard);
