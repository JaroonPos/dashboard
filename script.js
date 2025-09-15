const btn = document.getElementById('btn');
const msg = document.getElementById('msg');
btn.addEventListener('click', () => {
  msg.textContent = 'คุณเพิ่งกดปุ่ม — ยินดีด้วย!';
});
