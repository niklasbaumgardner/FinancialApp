// import {Chart} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// const Chart = window.Chart;
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
  "rgb(201, 203, 207)", // light grey
  "rgb(255, 234, 167)", // light pale yellow
  "rgb(250, 177, 160)", // light pale orange
  "rgb(116, 185, 255)", // light baby blue
  "rgb(129, 236, 236)", // light teal
  "rgb(162, 155, 254)", // light pale purple
  "rgb(214, 48, 49)", // red
  "rgb(0, 184, 148)", // green
  "rgb(95, 39, 205)", // purple
  "rgb(6, 82, 221)", // blue
  "rgb(255, 250, 101)", // yellow
  "rgb(255, 99, 72)", // orange
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
let data;
let names;

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

function assignColors() {
  let arr = [];
  for (let i = 0; i < COLORS.length; i++) {
    arr[arr.length] = i;
  }

  let difference = COLORS.length - names.length;
  let maxLength = difference > 0 ? difference : COLORS.length;

  let random = shuffle(arr, maxLength);

  let indx = 0;
  for (let name of names) {
    COLORS_DICT[name] = COLORS[random[indx % random.length]];
    indx += 1;
  }
}

function fixValues(oldValues, keys = data["keys"]) {
  let newValues = {};
  for (let k of keys) {
    let temp = oldValues[k];
    if (temp != undefined) {
      newValues[k] = temp;
    }
  }
  return newValues;
}

function lineChart() {
  let keys = data["keys"];
  let values = data["data"]["allBudgets"];

  let newValues = fixValues(values);

  const ctx = document.getElementById("lineChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: keys,
      datasets: [
        {
          id: "allBudgets",
          label: "All Budgets",
          data: newValues,
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

async function pieChart(date = "", showPercentages = false) {
  let pieData = await getPieData(date);
  let keys = pieData["keys"];
  let values = pieData["values"];

  let colors = [];
  // console.log(keys);
  for (let name of keys) {
    colors.push(COLORS_DICT[name]);
  }

  let tempChart = Chart.getChart("pieChart");
  if (tempChart) {
    tempChart.destroy();
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
  const myChart = new Chart(ctx, {
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

function togglePercentage(showPercentages) {
  const ctx = document.getElementById("pieChart").getContext("2d");
  let myChart = Chart.getChart("pieChart");

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

  let data = myChart.data;

  myChart.destroy();

  myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: data,
    options: options,
  });
}

function addDataForBudget(name) {
  const myChart = Chart.getChart("lineChart");
  let temp = {
    id: name,
    label: name,
    data: fixValues(data["data"][name]),
    backgroundColor: COLORS_DICT[name], //'rgba(40, 114, 251)',
    borderColor: COLORS_DICT[name], //'rgba(40, 114, 251)',
    borderWidth: 2,
    color: "rgba(255, 255, 255)",
  };
  myChart.data.datasets.push(temp);
  myChart.update();
}

function removeDataForBudget(name) {
  const myChart = Chart.getChart("lineChart");
  // console.log(chart.data.datasets);
  // console.log(typeof(chart.data.datasets));

  let indx = 0;
  for (let data of myChart.data.datasets) {
    if (data.id === name) {
      myChart.data.datasets.splice(indx, 1);
      break;
    }
    indx += 1;
  }
  myChart.update();
}

function toggleShowLine(event) {
  // event.preventDefault();
  let label = event.target;
  // label.blur();
  // console.log(label);
  let name = label.getAttribute("for");
  let checked = document.getElementById(name).checked;
  // console.log(name);
  // console.log(checked);

  if (!checked) {
    addDataForBudget(name);
  } else {
    removeDataForBudget(name);
  }
}

function addButtons() {
  let buttonGroup = document.getElementById("lineButtons");

  for (let name of names) {
    // console.log(typeof(name), typeof(id));
    if (name === "allBudgets" || !data["names"].includes(name)) {
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

    label.addEventListener("click", toggleShowLine);

    buttonGroup.appendChild(input);
    buttonGroup.appendChild(label);
  }

  document
    .getElementById("allBudgetsLabel")
    .addEventListener("click", toggleShowLine);
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

function createCard(name, in_, out, net, month) {
  let card;
  if (names.includes(name)) {
    card = createDivWithClass("card bg-lighter-grey button-div");
    card.onclick = () => {
      location.href = `${BUDGET_URLS[name]}?month=${month}`;
    };
  } else {
    card = createDivWithClass("card bg-lighter-grey");
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
  p1.innerHTML = "Net Spending";

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
  p3.innerHTML = "Spent";
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

async function netSpending(month) {
  let spendingData = await getNetSpending(month);
  // let dataKeys = Object.keys(data)

  let div = document.getElementById("net-spending");
  div.innerHTML = "";

  // let date = new Date();
  // let year = date.getFullYear();
  // let month = (date.getMonth() + 1).toString().padStart(2, '0');
  // let day = date.getDate().toString().padStart(2, '0');
  // let strDate = year + '-' + month + '-' + day;

  let count = 0;
  let row = document.getElementById("net-spending");
  for (let name of names) {
    if (spendingData[name]) {
      // if (count % 4 === 0) {
      //     if (row) {
      //         div.appendChild(row);
      //     }
      //     row = createDivWithClass('row');
      // }
      let name_ = name;
      if (name === "allBudgets") {
        name_ = "All Budgets Combined";
      }
      let card = createCard(
        name_,
        spendingData[name]["in"],
        spendingData[name]["out"],
        spendingData[name]["net"],
        month
      );

      row.appendChild(card);
    }
  }
  if (count % 4 !== 0) {
    div.appendChild(row);
  }
}

async function spendingPerMonth(month, monthName) {
  let spendData = await getMonthSpending(month);

  let keys = spendData["keys"];
  let values = spendData["values"];

  let total = values.reduce((a, b) => a + b, 0);

  let colors = [];
  for (let name of keys) {
    colors.push(COLORS_DICT[name]);
  }

  let tempChart = Chart.getChart("spendingChart");
  if (tempChart) {
    tempChart.destroy();
  }

  const ctx = document.getElementById("spendingChart").getContext("2d");
  const myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: "doughnut",
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
          text: `You spent $${total.toFixed(2)} in ${monthName}`,
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
      color: "rgba(255, 255, 255, .79)",
    },
  });
}

// function calls
(async () => {
  names = await getAllBudgetNames();
  names = names["names"];

  data = await getAllBudgetsLineData();
  // console.log(data);

  assignColors();
  lineChart();
  pieChart("", storage.getItem("showPercentage"));
  addButtons();
  let monthInt = date.getMonth() + 1;
  let monthName = date.toLocaleString("default", { month: "long" });
  spendingPerMonth(monthInt, monthName);
  netSpending(monthInt);

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
})();
