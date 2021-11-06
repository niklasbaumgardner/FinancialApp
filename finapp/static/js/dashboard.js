const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function lineChart() {
    let data = JSON.parse(getNetWorth());
    let keys = data['keys'];
    let values = data['values'];

    const ctx = document.getElementById('lineChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                label: 'Total Budgets Worth',
                data: values,
                backgroundColor: 'rgba(40, 114, 251)',
                borderColor: 'rgba(40, 114, 251)',
                borderWidth: 2,
                color: 'rgba(255, 255, 255)',
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255)',
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    labels: {
                        color: 'rgba(255, 255, 255)',
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, .11)',
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + value;
                        },
                        color: 'rgba(255, 255, 255, .79)',
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, .11)',
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, .79)',
                    }
                },
            }
        }
    });
}

function pieChart() {
    let data = JSON.parse(getPieData());
    let keys = data['keys'];
    let values = data['values'];

    const ctx = document.getElementById('pieChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: keys,
            datasets: [{
                data: values,
                backgroundColor: Object.values(CHART_COLORS),
                color: 'rgba(255, 255, 255)',
                hoverOffset: 4,
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Breakdown of budgets (Amount > 0)',
                    color: 'rgba(255, 255, 255, .79)',
                }
            },
            responsive: true,
            borderColor: 'rgba(0, 0, 0, .79)',
            color: 'rgba(255, 255, 255, .79)',
        }
    });

}

lineChart();
pieChart();