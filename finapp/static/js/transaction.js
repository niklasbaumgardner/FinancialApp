"use strict";

function createElement(options) {
  if (!options.type) {
    options.type = "div";
  }

  let ele = document.createElement(options.type);

  if (options.id) {
    ele.id = options.id;
  }

  if (options.classString) {
    ele.classList.add(...options.classString.split(" "));
  }

  if (options.href) {
    ele.href = options.href;
  }

  if (options.onclick) {
    ele.onclick = options.onclick;
  }

  if (options.content) {
    ele.textContent = options.content;
  }

  if (options.action) {
    ele.action = options.action;
  }

  if (options.name) {
    ele.name = options.name;
  }

  if (options.hidden) {
    ele.hidden = true;
  }

  if (options.value !== undefined) {
    ele.value = options.value;
  }

  if (options.autocomplete) {
    ele.autocomplete = options.autocomplete;
  }

  if (options.step) {
    ele.step = options.step;
  }

  if (options.innerHTML) {
    ele.innerHTML = options.innerHTML;
  }

  if (options.inputType) {
    ele.type = options.inputType;
  }

  if (options.method) {
    ele.method = options.method;
  }

  if (options.required) {
    ele.required = options.required;
  }

  if (options.for) {
    ele.for = options.for;
  }

  if (options.onpointerdown) {
    ele.onpointerdown = options.onpointerdown;
  }

  if (options.onpointerup) {
    ele.onpointerup = options.onpointerup;
  }

  if (options.onpointercancel) {
    ele.onpointercancel = options.onpointercancel;
  }

  return ele;
}

class Transaction {
  constructor(
    id,
    name,
    amount,
    stringAmount,
    date,
    isTransfer,
    budgetId,
    editURL
  ) {
    this.id = id;
    this.name = name.replace("&#39;", "'");
    this.amount = amount;
    this.stringAmount = stringAmount;
    this.date = date;
    this.isTransfer = isTransfer === "True";
    this.budgetId = budgetId;
    this.editURL = editURL;
    this.created = false;
    this.element = null;

    this.deleteModal = new DeleteModal(this);
    this.moveModal = new MoveModal(this);
  }

  renderElement() {
    if (this.created) {
      return this.element;
    }

    this.element = createElement({
      type: "form",
      id: `transaction-${this.id}`,
      action: this.editURL,
      method: "POST",
      onpointerdown: () => {
        this.handelPointerDown();
      },
      onpointerup: () => {
        this.handlePointerUp();
      },
      onpointercancel: () => {
        this.handlePointerCancel();
      },
    });

    this.pageInput = createElement({
      type: "input",
      classString: "page-number",
      name: "page",
      inputType: "number",
      hidden: true,
    });
    this.element.appendChild(this.pageInput);

    let li = createElement({
      type: "li",
      classString:
        "list-group-item bg-dark border-start-0 border-top-0 border-end-0 border-transparent",
    });
    this.element.appendChild(li);

    let rowDiv = createElement({ classString: "row" });
    li.appendChild(rowDiv);

    let colDiv1 = createElement({ classString: "col" });
    rowDiv.appendChild(colDiv1);

    let div2 = createElement({ classString: "d-flex" });
    colDiv1.appendChild(div2);

    let div3 = createElement({ classString: "f-flex flex-column" });
    div2.appendChild(div3);

    div3.appendChild(
      createElement({
        type: "p",
        classString: `show-not-edit-${this.id} fs-5 my-0 text-white`,
        content: this.name,
      })
    );

    div3.appendChild(
      createElement({
        type: "input",
        id: `editName${this.id}`,
        classString: `show-edit-${this.id} form-control mb-2`,
        inputType: "text",
        name: `editName${this.id}`,
        value: this.name,
        autocomplete: "niklas",
        hidden: true,
      })
    );

    let div4 = createElement({ classString: "row text-white-50" });
    div3.appendChild(div4);

    let div5 = createElement({ classString: "col-12" });
    div4.appendChild(div5);

    div5.appendChild(
      createElement({
        type: "span",
        classString: `show-not-edit-${this.id} fs-75`,
        content: this.date,
      })
    );

    div5.appendChild(
      createElement({
        type: "input",
        id: `editDate${this.id}`,
        name: `editDate${this.id}`,
        classString: `show-edit-${this.id} form-control w-75`,
        inputType: "date",
        value: this.date,
        hidden: true,
      })
    );

    if (this.isTransfer) {
      let transferDiv = createElement({
        classString: `col-12 text-info-50 show-not-edit-${this.id}`,
      });
      div5.appendChild(transferDiv);

      transferDiv.appendChild(
        createElement({
          type: "span",
          classString: "fs-75",
          content: "Transer",
        })
      );
    }

    let colDiv2 = createElement({ classString: "col" });
    rowDiv.appendChild(colDiv2);

    let div6 = createElement({
      classString: "d-flex justify-content-center",
    });
    colDiv2.appendChild(div6);

    div6.appendChild(
      createElement({
        type: "p",
        classString: `show-not-edit-${this.id} fs-6 text-white`,
        content: this.stringAmount,
      })
    );

    div6.appendChild(
      createElement({
        type: "input",
        id: `editAmount${this.id}`,
        name: `editAmount${this.id}`,
        classString: `show-edit-${this.id} form-control w-25 amount-input-71`,
        inputType: "number",
        step: ".01",
        value: this.amount,
        autocomplete: "niklas",
        hidden: true,
      })
    );

    let colDiv3 = createElement({ classString: "col text-white" });
    rowDiv.appendChild(colDiv3);

    let div7 = createElement({
      classString: "d-flex justify-content-end",
    });
    colDiv3.appendChild(div7);

    this.showNotEdit = createElement({
      type: "span",
    });
    div7.appendChild(this.showNotEdit);

    let editButton = createElement({
      type: "button",
      classString: "btn btn-link padding-1-4",
      content: "edit",
      onclick: event => {
        this.handleEditTransaction(event);
      },
    });
    this.showNotEdit.appendChild(editButton);

    let separator = createElement({
      type: "span",
      content: "|",
    });
    this.showNotEdit.appendChild(separator);

    let moveButton = createElement({
      type: "button",
      classString: "btn btn-link padding-1-4",
      content: "move",
      onclick: event => {
        this.handleMoveTransaction(event);
      },
    });
    this.showNotEdit.appendChild(moveButton);

    separator = createElement({
      type: "span",
      content: "|",
    });
    this.showNotEdit.appendChild(separator);

    let deleteButton = createElement({
      type: "button",
      classString: "btn btn-link padding-1-4",
      content: "delete",
      onclick: event => {
        this.handleDeleteTransaction(event);
      },
    });
    this.showNotEdit.appendChild(deleteButton);

    this.showEdit = createElement({
      type: "span",
      hidden: true,
    });
    div7.appendChild(this.showEdit);

    let updateButton = createElement({
      type: "button",
      classString: "btn btn-link padding-1-4",
      content: "update",
      onclick: event => {
        this.handleUpdateTransaction(event);
      },
    });
    this.showEdit.appendChild(updateButton);

    separator = createElement({
      type: "span",
      content: "|",
    });
    this.showEdit.appendChild(separator);

    let cancelButton = createElement({
      type: "button",
      classString: "btn btn-link padding-1-4",
      content: "cancel",
      onclick: event => {
        this.handleCancelEditTransaction(event);
      },
    });
    this.showEdit.appendChild(cancelButton);

    this.deleteModal.renderElement();
    this.moveModal.renderElement();

    return this.element;
  }

  handelPointerDown() {
    this.isPointerDown = true;
    setTimeout(() => {
      this.handleHoldingPointerDown();
    }, 800);
  }

  handleHoldingPointerDown() {
    if (this.isPointerDown) {
      document.getElementById("name").value = this.name;
      document.getElementById("amount").value = this.amount;
      checkInput();
    }
  }

  handlePointerUp() {
    this.isPointerDown = false;
  }

  handlePointerCancel() {
    this.isPointerDown = false;
  }

  handleEditTransaction(event) {
    event.preventDefault();
    this.showNotEdit.hidden = true;
    for (let ele of this.element.getElementsByClassName(`show-not-edit-${this.id}`)) {
      ele.hidden = true;
    }

    this.showEdit.hidden = false;
    for (let ele of this.element.getElementsByClassName(`show-edit-${this.id}`)) {
      ele.hidden = false;
    }
  }

  handleMoveTransaction(event) {
    event.preventDefault();
    this.moveModal.show();
  }

  handleDeleteTransaction(event) {
    event.preventDefault();
    this.deleteModal.show();
  }

  handleUpdateTransaction(event) {
    event.preventDefault();
    this.pageInput.value = pagination.currentPage;
    this.element.submit();
  }

  handleCancelEditTransaction(event) {
    event.preventDefault();
    this.showNotEdit.hidden = false;
    for (let ele of this.element.getElementsByClassName(`show-not-edit-${this.id}`)) {
      ele.hidden = false;
    }

    this.showEdit.hidden = true;
    for (let ele of this.element.getElementsByClassName(`show-edit-${this.id}`)) {
      ele.hidden = true;
    }
  }
}

class DeleteModal {
  constructor(transaction) {
    //
    this.transaction = transaction;
    this.created = false;
    this.element = null;
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }

  renderElement() {
    if (this.created) {
      return;
    }

    this.element = createElement({
      id: `deleteTransaction${this.transaction.id}`,
      classString: "modal",
      style: "display:none;",
    });

    let div1 = createElement({ classString: "modal-dialog" });
    this.element.appendChild(div1);

    let div2 = createElement({ classString: "modal-content" });
    div1.appendChild(div2);

    let div3 = createElement({ classString: "modal-header" });
    div2.appendChild(div3);

    div3.appendChild(
      createElement({
        type: "h5",
        classString: "modal-title",
        content: `Delete transaction ${this.transaction.name} ?`,
      })
    );

    div3.appendChild(
      createElement({
        type: "button",
        onclick: () => {
          this.hide();
        },
        classString: "btn-close",
      })
    );

    let div4 = createElement({ classString: "modal-body" });
    div2.appendChild(div4);

    div4.appendChild(
      createElement({
        type: "p",
        content: "Are you sure you want to delete this transaction?",
      })
    );

    let div5 = createElement({ classString: "modal-footer" });
    div2.appendChild(div5);

    let form = createElement({
      type: "form",
      method: "POST",
      action: DELETE_TRANSACTION_URL + this.transaction.id,
    });
    div5.appendChild(form);

    form.appendChild(
      createElement({
        type: "input",
        classString: "page-number",
        name: "page",
        inputType: "number",
        value: 1,
        hidden: true,
      })
    );

    form.appendChild(
      createElement({
        type: "button",
        inputType: "submit",
        classString: "btn btn-danger me-1",
        content: "Delete",
      })
    );

    form.appendChild(
      createElement({
        type: "button",
        onclick: () => {
          this.hide();
        },
        inputType: "button",
        classString: "btn btn-outline-secondary",
        content: "Cancel",
      })
    );

    this.parentElement = document.getElementById("deleteModals");
    this.parentElement.appendChild(this.element);

    this.created = true;
  }
}

class MoveModal {
  constructor(transaction) {
    //
    this.transaction = transaction;
    this.created = false;
    this.element = null;
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }

  renderElement() {
    if (this.created) {
      return;
    }

    this.element = createElement({
      id: `moveTransaction${this.transaction.id}`,
      classString: "modal",
      style: "display:none;",
    });

    let div1 = createElement({ classString: "modal-dialog" });
    this.element.appendChild(div1);

    let form = createElement({
      type: "form",
      method: "POST",
      action: MOVE_TRANSACTION_URL + this.transaction.id,
    });
    div1.appendChild(form);

    form.appendChild(
      createElement({
        type: "input",
        classString: "page-number",
        name: "page",
        inputType: "number",
        value: 1,
        hidden: true,
      })
    );

    let div2 = createElement({ classString: "modal-content" });
    form.appendChild(div2);

    let div3 = createElement({ classString: "modal-header" });
    div2.appendChild(div3);

    div3.appendChild(
      createElement({
        type: "h5",
        classString: "modal-title",
        content: `Move transaction ${this.transaction.name} ?`,
      })
    );

    div3.appendChild(
      createElement({
        type: "button",
        onclick: () => {
          this.hide();
        },
        inputType: "button",
        classString: "btn-close",
      })
    );

    let div4 = createElement({ classString: "modal-body" });
    div2.appendChild(div4);

    div4.appendChild(
      createElement({
        type: "p",
        content: "Which budget would you like to move this transaction to?",
      })
    );

    let div5 = createElement({ classString: "form-outline form-white mb-4" });
    div4.appendChild(div5);

    div5.appendChild(
      createElement({
        type: "label",
        for: "new_budget",
        content: "Select budget:",
      })
    );

    let select = createElement({
      type: "select",
      id: "new_budget",
      classString: "form-select form-select-sm w-75",
      name: "new_budget",
    });
    div5.appendChild(select);

    for (let budg of budgetsArray) {
      let tempOption = createElement({
        type: "option",
        value: budg.id,
        content: budg.budgetString,
      });

      select.appendChild(tempOption);
    }

    let div6 = createElement({ classString: "modal-footer" });
    div2.appendChild(div6);

    div6.appendChild(
      createElement({
        type: "button",
        inputType: "submit",
        classString: "btn btn-primary me-1",
        content: "Move",
      })
    );

    div6.appendChild(
      createElement({
        type: "button",
        onclick: () => {
          this.hide();
        },
        inputType: "button",
        classString: "btn btn-outline-secondary",
        content: "Cancel",
      })
    );

    this.parentElement = document.getElementById("moveModals");
    this.parentElement.appendChild(this.element);
  }
}
