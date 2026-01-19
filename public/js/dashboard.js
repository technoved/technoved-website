const ctx = document.getElementById('quoteChart');

let chart;

function drawChart() {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed Quotes', 'Remaining Target'],
      datasets: [
        {
          data: [
            totalQuotes,
            Math.max(target - totalQuotes, 0)
          ],
          backgroundColor: ['#7c3aed', '#1e293b'],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function updateChart() {
  const input = document.getElementById('targetInput').value;
  target = Number(input) || 10;
  drawChart();
}

drawChart();
