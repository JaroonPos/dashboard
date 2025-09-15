const salesData = [
  { name: "Alice", sales: 120, img: "images/alice.png" },
  { name: "Bob", sales: 95, img: "images/bob.png" },
  { name: "Charlie", sales: 140, img: "images/charlie.png" }
];

// โหลดภาพทั้งหมดก่อน
Promise.all(salesData.map(s => loadImage(s.img))).then(images => {
  const ctx = document.getElementById('salesChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: salesData.map(s => s.name),
      datasets: [{
        label: 'ยอดขาย',
        data: salesData.map(s => s.sales),
        backgroundColor: '#4e79a7',
        borderRadius: 10
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
        y: { beginAtZero: true }
      }
    },
    plugins: [{
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);

        ctx.save();
        salesData.forEach((sale, index) => {
          const bar = meta.data[index];
          const x = bar.x;
          const y = bar.y;

          // วาดตัวเลขบนแท่ง
          ctx.fillStyle = '#000';
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(sale.sales, x, y - 25);

          // วาดรูปที่โหลดเสร็จแล้ว
          const img = images[index];
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y - 45, 15, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, x - 15, y - 60, 30, 30);
          ctx.restore();
        });
        ctx.restore();
      }
    }]
  });
});

// ฟังก์ชันช่วยโหลดภาพ
function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
}