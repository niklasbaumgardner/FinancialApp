"use strict";

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
    this.name = name;
    this.amount = amount;
    this.stringAmount = stringAmount;
    this.date = date;
    this.isTransfer = isTransfer === "True";
    this.budgetId = budgetId;
    this.editURL = editURL;
    this.created = false;
    this.element = null;
  }

  renderElement() {
    // pass
    if (this.created) {
      return this.element;
    }

    this.element = this.createElement({
      type: "form",
      id: `trans${this.id}`,
      action: this.editURL,
      method: "POST",
    });
    this.element.appendChild(this.createElement({
      type: "input",
      classString: "page-number",
      name: "page",
      inputType: "number",
      hidden: true,
    }));
    let li = this.createElement({
      type: "li",
      classString:
        "list-group-item bg-dark border-start-0 border-top-0 border-end-0 border-transparent",
    });
    this.element.appendChild(li);

    let rowDiv = this.createElement({ classString: "row" });
    li.appendChild(rowDiv);

    let colDiv1 = this.createElement({ classString: "col" });
    rowDiv.appendChild(colDiv1);

    let div2 = this.createElement({ classString: "d-flex" });
    colDiv1.appendChild(div2);

    let div3 = this.createElement({ classString: "f-flex flex-column" });
    div2.appendChild(div3);

    div3.appendChild(
      this.createElement({
        type: "p",
        classString: `show-not-edit-${this.id} fs-5 my-0 text-white`,
        content: this.name,
      })
    );

    div3.appendChild(
      this.createElement({
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

    let div4 = this.createElement({ classString: "row text-white-50" });
    div3.appendChild(div4);

    let div5 = this.createElement({ classString: "col-12" });
    div4.appendChild(div5);

    div5.appendChild(
      this.createElement({
        type: "span",
        classString: `show-not-edit-${this.id} fs-75`,
        content: this.date,
      })
    );

    div5.appendChild(
      this.createElement({
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
      let transferDiv = this.createElement({
        classString: `col-12 text-info-50 show-not-edit-${this.id}`,
      });
      div5.appendChild(transferDiv);

      transferDiv.appendChild(
        this.createElement({
          type: "span",
          classString: "fs-75",
          content: "Transer",
        })
      );
    }

    let colDiv2 = this.createElement({ classString: "col" });
    rowDiv.appendChild(colDiv2);

    let div6 = this.createElement({
      classString: "d-flex justify-content-center",
    });
    colDiv2.appendChild(div6);

    div6.appendChild(
      this.createElement({
        type: "p",
        classString: `show-not-edit-${this.id} fs-6 text-white`,
        content: this.stringAmount,
      })
    );

    div6.appendChild(
      this.createElement({
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

    let colDiv3 = this.createElement({ classString: "col text-white" });
    rowDiv.appendChild(colDiv3);

    let div7 = this.createElement({
      classString: "d-flex justify-content-end",
    });
    colDiv3.appendChild(div7);

    let div8 = this.createElement({
      classList: "fs-6",
      innerHTML: `
        <span class="show-not-edit-${this.id}">
          <a class="show-not-edit-${this.id} no-underline p-0" href="javascript:void(0);" onclick="editTransaction('${this.id}')">
            edit <i class="material-icons fs-6">edit</i>
          </a> | </span>
        <a class="show-not-edit-${this.id} no-underline p-0" href="javascript:void(0);" onclick="moveTransaction('${this.id}')">move</a>
        <a class="show-edit-${this.id} no-underline p-0" href="javascript:void(0);" onclick="document.getElementById('trans${this.id}').submit();" hidden>update</a>
        |
        <a class="show-not-edit-${this.id} no-underline p-0" href="javascript:void(0);" onclick="deleteTransaction('${this.id}')">
          delete <i class="material-icons fs-6">delete</i>
        </a>
        <a class="show-edit-${this.id} no-underline p-0" href="javascript:void(0);" onclick="cancelEdit('${this.id}')" hidden>cancel</a>`,
    });
    div7.appendChild(div8);

    // TODO: create everything inside div6 dynamically
    // let span = this.createElement({
    //   classString: `show-not-edit-${this.id}`,
    // });

    // let a = this.createElement({
    //   type: "a",
    //   classString: `show-not-edit-${this.id} no-underline p-0`,
    //   href: "javascript:void(0);",
    //   onclick: () => { editTransaction(this.id) },
    //   innerHTML: "",
    // });

    return this.element;
  }

  createElement(options) {
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
      ele.onclick = options.onclick();
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

    if (options.value) {
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

    return ele;
  }
}
