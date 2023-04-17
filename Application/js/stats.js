const ctx = document.getElementById("myChart");
const config = {
  type: "bar",
};

let stats = null;
let data = null;
let chart = new Chart(ctx, config);

setInterval(() => {
  if (localStorage.getItem("statistics") !== null) {
    let lineChartData = {
      labels: [],
      data: [],
    };

    stats = JSON.parse(localStorage.getItem("statistics"));
    let maxCherries = Math.max(...stats.cherries);
    let minuteCount = Math.floor(stats.cherries.length / 6);

    data = stats.cherries.map((cherries) => {
        return cherries;
    });

    for (let minute = 0; minute <= minuteCount; minute++) {
        for (let seconde = 0; seconde < 60; seconde += 10) {
            let time = minute.toString().padStart(1, "0") + ":" + seconde.toString().padStart(2, "0");
            lineChartData.labels.push(time);
        }
    }
    
    chart.data = {
        labels: lineChartData.labels,
        datasets: [{
            labels: "cerises récoltées",
            data: data,
            backgroundColor: 'rgba(0, 119, 204, 0.8)',
            hoverOffset: 4
        }]
    }
    chart.options = {
        plugins: {
            title: {
              display: true,
              text: 'Nombre de cerises récoltées',
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: maxCherries + 2,
          },
        },
      },

    chart.data.datasets[0].data = data;
    chart.update("none");
    
    ctx.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';

    document.getElementById("reset-stats").addEventListener("click", () => {
        if (chart) {
            document.getElementById('myChart').style.display = "none";
            chart.data.datasets[0].data = null;
            localStorage.clear('statistics');
        }
    });
  }
}, 2000);
