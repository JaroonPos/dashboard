const salesData = [
  { name: "Alice", sales: 120, img: "images/alice.png" },
  { name: "Bob", sales: 95, img: "images/bob.png" },
  { name: "Charlie", sales: 140, img: "images/charlie.png" }
];

// เตรียมข้อมูลสำหรับกราฟ
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
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `ยอดขาย: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
  plugins: [{
    // custom plugin วาดรูปและยอดขายบนแท่ง
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      chart.data.datasets[0].data.forEach((value, index) => {
        const meta = chart.getDatasetMeta(0);
        const bar = meta.data[index];
        const x = bar.x;
        const y = bar.y;
        const sale = salesData[index];

        // วาดตัวเลขบนแท่ง
        ctx.fillStyle = '#000';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value, x, y - 25);

        // วาดรูปโปรไฟล์เล็กๆบนแท่ง
        const img = new Image();
        img.src = sale.img;
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y - 45, 15, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, x - 15, y - 60, 30, 30);
          ctx.restore();
        };
      });
      ctx.restore();
    }
  }]
});
