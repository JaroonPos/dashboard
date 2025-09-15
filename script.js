const salesData = [
  { name: "Alice", sales: 120, img: "images/alice.jpg" },
  { name: "Bob", sales: 95, img: "images/bob.jpg" },
  { name: "Charlie", sales: 140, img: "images/charlie.jpg" }
];

const ctx = document.getElementById('salesChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: salesData.map(s => s.name),
    datasets: [{
      label: 'ยอดขาย',
      data: salesData.map(s => s.sales),
      backgroundColor: '#4e79a7'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});
