"use strict";

const ChartDataLabels = window.ChartDataLabels;

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const CHART_COLORS_ARRAY = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

// const COLORS = [
//     'rgb(201, 203, 207)', // grey keep
//     'rgb(85, 239, 196)',
//     'rgb(129, 236, 236)',
//     'rgb(116, 185, 255)',
//     'rgb(162, 155, 254)',
//     'rgb(0, 184, 148)',
//     'rgb(0, 206, 201)',
//     'rgb(9, 132, 227)',
//     'rgb(108, 92, 231)',
//     'rgb(255, 118, 117)',
//     'rgb(214, 48, 49)',
//     'rgb(253, 121, 168)',
//     'rgb(232, 67, 147)',
//     'rgb(254, 202, 87)',
//     'rgb(255, 159, 67)',
//     'rgb(255, 107, 107)',
//     'rgb(238, 82, 83)',
//     'rgb(72, 219, 251)',
//     'rgb(10, 189, 227)',
//     'rgb(0, 210, 211)',
//     'rgb(1, 163, 164)',
//     'rgb(95, 39, 205)',
//     'rgb(52, 31, 151)',
//     'rgb(200, 214, 229)',
//     'rgb(131, 149, 167)',
//     'rgb(87, 101, 116)',
//     'rgb(29, 209, 161)',
// ];

const COLORS = [
  "hsl(240 5.3% 58%)", // "rgb(201, 203, 207)", // light grey
  "rgb(255, 234, 167)", // light pale yellow
  "rgb(250, 177, 160)", // light pale orange
  "rgb(116, 185, 255)", // light baby blue
  "rgb(129, 236, 236)", // light teal
  "rgb(162, 155, 254)", // light pale purple
  "hsl(0 98.6% 67.9%)", // "rgb(214, 48, 49)", // red
  "rgb(0, 184, 148)", // green
  "rgb(95, 39, 205)", // purple
  "rgb(6, 82, 221)", // blue
  "rgb(255, 250, 101)", // yellow
  "hsl(27.2 100% 57.7%)", //"rgb(255, 99, 72)", // orange
  "rgb(248, 165, 194)", // light pale pink
];

// American yellow #ffeaa7
// American peach #fab1a0#fab1a0#fab1a0
// American blue #81ecec#81ecec
// American blue #74b9ff
// American purple #a29bfe#a29bfe
// Aussie green #badc58#badc58
// Russian pink #f8a5c2#f8a5c2
// Russian yellow #f7d794#f7d794
// Russian orange #e77f67#e77f67
// Russian pink #c44569
// Russian blue #546de5
// Russian red #e66767

const COLORS_DICT = {};
let names;

class ChartHandler {
  constructor() {
    this.init();
  }

  async init() {
    let response = await getAllBudgetsLineData();

    this.names = (await getAllBudgetNames()).names;

    this.data = response.data;
    this.keys = response.keys;

    this.minDate = setLineBudgetStartDate(this.keys[0], true);
    addOptionsToNetspendingAndSpendingForMonth(this.minDate);
    this.assignColors();
    this.createOrUpdateLineChart();
    this.createOrUpdatePieChart("", storage.getItem("showPercentage"));
    this.addLineChartButtons();

    let arr = [
      "lineGraphButton",
      "pieChartButton",
      "spendingButton",
      "netSpendingButton",
    ];
    for (let id of arr) {
      let collapsed = storage.getItem(id);
      if (collapsed === "true") {
        let btn = document.getElementById(id);
        btn.click();
      }
    }
  }

  get startDate() {
    return this.keys[0];
  }

  fixValues(oldValues) {
    let newValues = {};
    for (let k of this.keys) {
      let temp = oldValues[k];
      if (temp != undefined) {
        newValues[k] = temp;
      }
    }
    return newValues;
  }

  createOrUpdateLineChart() {
    let values = this.data.allBudgets;

    let fixedValues = this.fixValues(values);

    if (this.lineChart) {
      this.lineChart.destroy();
    }

    const ctx = document.getElementById("lineChart").getContext("2d");
    this.lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.keys,
        datasets: [
          {
            id: "allBudgets",
            label: "All Budgets",
            data: fixedValues,
            backgroundColor: COLORS_DICT["allBudgets"],
            borderColor: COLORS_DICT["allBudgets"],
            borderWidth: 2,
            color: "rgba(255, 255, 255)",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255)",
            },
          },
          title: {
            display: true,
            text: "Budgets",
            color: "rgba(255, 255, 255)",
            font: {
              size: 19,
              weight: "normal",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            labels: {
              color: "rgba(255, 255, 255)",
            },
            grid: {
              color: "rgba(255, 255, 255, .11)",
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return "$" + value;
              },
              color: "rgba(255, 255, 255, .79)",
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, .11)",
            },
            ticks: {
              color: "rgba(255, 255, 255, .79)",
            },
          },
        },
      },
    });
  }

  addDataForLineChart(name) {
    let temp = {
      id: name,
      label: name,
      data: this.fixValues(this.data[name]),
      backgroundColor: COLORS_DICT[name], //'rgba(40, 114, 251)',
      borderColor: COLORS_DICT[name], //'rgba(40, 114, 251)',
      borderWidth: 2,
      color: "rgba(255, 255, 255)",
    };
    this.lineChart.data.datasets.push(temp);
    this.lineChart.update();
  }

  removeDataForLineChart(name) {
    let indx = 0;
    for (let data of this.lineChart.data.datasets) {
      if (data.id === name) {
        this.lineChart.data.datasets.splice(indx, 1);
        break;
      }
      indx += 1;
    }
    this.lineChart.update();
  }

  async createOrUpdatePieChart(date = "", showPercentages = false) {
    let pieData = await getPieData(date);
    let keys = pieData["keys"];
    let values = pieData["values"];

    let colors = [];
    // console.log(keys);
    for (let name of keys) {
      colors.push(COLORS_DICT[name]);
    }

    if (this.pieChart) {
      this.pieChart.destroy();
    }

    let percentages = {
      formatter: (value, ctx) => {
        let sum = ctx.chart._metasets[0].total;
        let percentage = ((value * 100) / sum).toFixed(2) + "%";
        return percentage;
      },
      color: "rgb(0, 0, 0)",
    };
    percentages = showPercentages === "true" ? percentages : null;

    const ctx = document.getElementById("pieChart").getContext("2d");
    this.pieChart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: "pie",
      data: {
        labels: keys,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            color: "rgba(255, 255, 255)",
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Breakdown of budgets (Amount > 0)",
            color: "rgb(255, 255, 255)",
            font: {
              size: 19,
              weight: "normal",
            },
          },
          datalabels: percentages,
        },
        responsive: true,
        borderColor: "rgba(0, 0, 0, .79)",
        color: "rgba(255, 255, 255, .79)",
      },
    });
  }

  togglePercentagePieChart(showPercentages) {
    const ctx = document.getElementById("pieChart").getContext("2d");

    let percentages = {
      formatter: (value, ctx) => {
        let sum = ctx.chart._metasets[0].total;
        let percentage = ((value * 100) / sum).toFixed(2) + "%";
        return percentage;
      },
      color: "rgb(0, 0, 0)",
    };
    percentages = showPercentages ? percentages : null;

    let options = {
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Breakdown of budgets (Amount > 0)",
          color: "rgb(255, 255, 255)",
          font: {
            size: 19,
            weight: "normal",
          },
        },
        datalabels: percentages,
      },
      responsive: true,
      borderColor: "rgba(0, 0, 0, .79)",
      color: "rgba(255, 255, 255, .79)",
    };

    let data = this.pieChart.data;

    this.pieChart.destroy();

    this.pieChart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: "pie",
      data: data,
      options: options,
    });
  }

  async spendingPerMonth(month, monthName) {
    let spendData = await getMonthSpending(month);

    let keys = Object.keys(spendData);

    let colors = [];
    for (let name of keys) {
      colors.push(COLORS_DICT[name]);
    }

    let tempChart = Chart.getChart("spendingChart");
    if (tempChart) {
      tempChart.destroy();
    }

    let expenses = [];
    let income = [];

    for (let [k, v] of Object.entries(spendData)) {
      expenses.push(v.expenses);
      income.push(v.income);
    }

    console.log(expenses, income);

    const ctx = document.getElementById("spendingChart").getContext("2d");
    this.spendingChart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: "bar",
      data: {
        labels: keys,
        datasets: [
          {
            label: "Expenses",
            data: expenses,
            borderColor: CHART_COLORS.red,
            borderWidth: 2,
            backgroundColor: "rgba(255, 99, 132, .5)",
            color: "rgba(255, 255, 255)",
            hoverOffset: 4,
            stack: "stack 0",
          },
          {
            label: "Income",
            data: income,
            borderColor: CHART_COLORS.green,
            borderWidth: 2,
            backgroundColor: "rgba(75, 192, 192, .5)",
            color: "rgba(255, 255, 255)",
            hoverOffset: 4,
            stack: "stack 0",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            color: "rgb(255, 255, 255)",
            font: {
              size: 19,
              weight: "normal",
            },
          },
          datalabels: null,
        },
        responsive: true,
        borderColor: "rgba(0, 0, 0, .79)",
        color: "rgba(255, 255, 255, .99)",
        scales: {
          y: {
            stacked: false,
            ticks: {
              color: "white",
            },
          },
          x: {
            ticks: {
              color: "white",
            },
          },
        },
      },
    });
  }

  async netSpending(value) {
    let spendingData = await getNetSpending(value);

    let div = document.getElementById("net-spending");
    div.innerHTML = "";

    let row = document.getElementById("net-spending");
    for (let name of this.names) {
      if (spendingData[name]) {
        let name_ = name;
        if (name === "allBudgets") {
          name_ = "All Budgets Combined";
        }
        let card = createCard(
          name_,
          spendingData[name]["in"],
          spendingData[name]["out"],
          spendingData[name]["net"],
          this.names
        );

        row.appendChild(card);
      }
    }
  }

  addLineChartButtons() {
    let buttonGroup = document.getElementById("lineButtons");

    for (let name of this.names) {
      // console.log(typeof(name), typeof(id));
      if (name === "allBudgets" || !Object.keys(this.data).includes(name)) {
        continue;
      }
      let input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add("btn-check");
      input.id = name;

      let label = document.createElement("label");
      label.setAttribute("for", name);
      label.innerHTML = name;
      label.classList.add("btn");
      label.classList.add("btn-outline-light");

      label.addEventListener("click", (event) => {
        this.toggleShowLine(event);
      });

      buttonGroup.appendChild(input);
      buttonGroup.appendChild(label);
    }

    document
      .getElementById("allBudgetsLabel")
      .addEventListener("click", (event) => {
        this.toggleShowLine(event);
      });
  }

  assignColors() {
    let arr = [];
    for (let i = 0; i < COLORS.length; i++) {
      arr[arr.length] = i;
    }

    let difference = COLORS.length - this.names.length;
    let maxLength = difference > 0 ? difference : COLORS.length;

    let random = shuffle(arr, maxLength);

    let indx = 0;
    for (let name of this.names) {
      COLORS_DICT[name] = COLORS[random[indx % random.length]];
      indx += 1;
    }
  }

  toggleShowLine(event) {
    // event.preventDefault();
    let label = event.target;
    // label.blur();
    // console.log(label);
    let name = label.getAttribute("for");
    let checked = document.getElementById(name).checked;
    // console.log(name);
    // console.log(checked);

    if (!checked) {
      this.addDataForLineChart(name);
    } else {
      this.removeDataForLineChart(name);
    }
  }
}

// const data = await getAllBudgetsLineData();
// console.log(data);
// const names = data['names'];

// console.log(data);

function shuffle(array, len) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  if (len === COLORS.length) {
    return array;
  }
  return array.splice(len);
}

function reAssignColors() {
  assignColors();
  let charts = document.querySelectorAll("canvas");

  for (let canvas of charts) {
    // console.log(canvas.id);
    let id = canvas.id;
    const myChart = Chart.getChart(id);
    if (id === "lineChart") {
      // console.log(chart.data.datasets);
      for (let data of myChart.data.datasets) {
        data.backgroundColor = COLORS_DICT[data.id];
        data.borderColor = COLORS_DICT[data.id];
      }
    } else if (id === "pieChart") {
      let colors = [];
      for (let name of myChart.data.labels) {
        colors.push(COLORS_DICT[name]);
      }
      myChart.data.datasets[0].backgroundColor = colors;
    } else if (id === "spendingChart") {
      let colors = [];
      for (let name of myChart.data.labels) {
        colors.push(COLORS_DICT[name]);
      }
      myChart.data.datasets[0].backgroundColor = colors;
    }
    myChart.update();
  }
}

function addClasses(ele, classes) {
  for (let class_ of classes.trim().split(" ")) {
    ele.classList.add(class_);
  }
}

function createDivWithClass(classString) {
  let div = document.createElement("div");
  addClasses(div, classString);
  return div;
}

function createPtagWithClass(classString) {
  let p = document.createElement("p");
  addClasses(p, classString);
  return p;
}

function createCard(name, in_, out, net, names) {
  let card;
  if (names.includes(name)) {
    card = createDivWithClass("card button-div");
    card.onclick = () => {
      let value = document.getElementById("netSpendingOptions").value;
      let object = JSON.parse(value);
      location.href = `${BUDGET_URLS[name]}?month=${object.month}&year=${object.year}&ytd=${object.ytd}`;
    };
  } else {
    card = createDivWithClass("card");
  }

  let cardHeader = createDivWithClass("card-header");

  let row = createDivWithClass("row");

  let col = createDivWithClass("col");

  let p = createPtagWithClass("fs-3 m-0");
  p.innerHTML = name;

  col.appendChild(p);
  row.appendChild(col);

  let col1 = createDivWithClass("col");

  let netSpending = createDivWithClass("text-end pt-1");

  let p1 = createPtagWithClass("m-0");
  p1.innerHTML = "Net income";

  let class_list = "fs-4 m-0 ";
  if (net[0] === "-") {
    class_list += "text-danger";
  } else {
    class_list += "text-success";
  }
  let p2 = createPtagWithClass(class_list);
  p2.innerHTML = net;

  netSpending.appendChild(p1);
  netSpending.appendChild(p2);

  col1.appendChild(netSpending);

  row.appendChild(col1);

  cardHeader.appendChild(row);

  card.appendChild(cardHeader);

  let cardFooter = createDivWithClass("card-footer");

  let row1 = createDivWithClass("row");

  let col2 = createDivWithClass("col");

  let p3 = createPtagWithClass("m-0");
  p3.innerHTML = "Expenses";
  let p4 = createPtagWithClass("fs-5 m-0 text-danger");
  p4.innerHTML = out;

  col2.appendChild(p3);
  col2.appendChild(p4);
  row1.appendChild(col2);

  let col3 = createDivWithClass("col");

  let income = createDivWithClass("text-end");

  let p5 = createPtagWithClass("m-0");
  p5.innerHTML = "Income";
  let p6 = createPtagWithClass("fs-5 m-0 text-success");
  p6.innerHTML = in_;

  income.appendChild(p5);
  income.appendChild(p6);

  col3.appendChild(income);

  row1.appendChild(col3);

  cardFooter.appendChild(row1);

  card.appendChild(cardFooter);

  let column3 = createDivWithClass(
    "col-10 col-sm-8 col-md-5 col-lg-4 col-xl-3 mb-5"
  );
  column3.appendChild(card);

  return column3;
}

function setLineBudgetStartDate(string, setAsMin = false) {
  let [month, day, year] = string.split("/");
  let date = new Date(year, month - 1, day);
  let startDate = document.getElementById("startDate");
  let strDate = year + "-" + month + "-" + day;
  startDate.valueAsDate = date;
  startDate.value = strDate;

  if (setAsMin) {
    startDate.min = strDate;
    return date;
  }
}

function createOptionElement(string, month, year, ytd, selected = false) {
  let option = document.createElement("option");
  let obj = { month, year, ytd };
  option.value = JSON.stringify(obj);
  option.innerText = string;
  option.selected = selected;
  return option;
}

function getOptionsFromStartDate(startDate) {
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  let endDate = new Date();
  let startYear = startDate.getFullYear();
  let endYear = endDate.getFullYear();

  let options = [];

  for (let year = startYear; year <= endYear; year++) {
    let startMonth = year === startYear ? startDate.getMonth() + 1 : 1;
    let endMonth = year === endYear ? endDate.getMonth() + 1 : 12;

    for (let month = startMonth; month <= endMonth; month++) {
      let string =
        year === endYear ? `${months[month]}` : `${months[month]} ${year}`;
      let option = createOptionElement(
        string,
        month,
        year,
        false,
        month === endMonth && year === endYear
      );
      options.push(option);
    }
    options.push(
      createOptionElement(
        year === endYear ? "YTD" : `All of ${year}`,
        null,
        year,
        true
      )
    );
  }
  options = options.reverse();

  return options;
}

function addOptionsToNetspendingAndSpendingForMonth(minDate) {
  let netSpendingSelect = document.getElementById("netSpendingOptions");
  let options = getOptionsFromStartDate(minDate);

  for (let option of options) {
    if (option.selected) {
      netSpendingSelect.appendChild(option);
      netSpendingSelect.value = option.value;
      netSpendingSelect.dispatchEvent(new Event("input"));
    } else {
      netSpendingSelect.appendChild(option);
    }
  }

  let spendingForMonthSelect = document.getElementById("spendingMonths");
  options = getOptionsFromStartDate(minDate);

  for (let option of options) {
    if (option.selected) {
      spendingForMonthSelect.appendChild(option);
      spendingForMonthSelect.value = option.value;
      spendingForMonthSelect.dispatchEvent(new Event("input"));
    } else {
      spendingForMonthSelect.appendChild(option);
    }
  }
}
