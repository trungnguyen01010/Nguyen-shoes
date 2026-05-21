const LABS = [
  {
    num: 'Lab01', title: 'HTML',
    desc: 'Bài thực hành cấu trúc HTML cơ bản',
    files: [
      { name: 'index.html', path: 'Lab/Lab01/index.html' }
    ]
  },
  {
    num: 'Lab02', title: 'Table & List',
    desc: 'Thực hành tạo bảng và danh sách HTML',
    files: [
      { name: 'lab02_bai1.html', path: 'Lab/Lab02/Vi_du_Lab01/lab02_bai1.html' },
      { name: 'lab02_bai2.html', path: 'Lab/Lab02/Vi_du_Lab01/lab02_bai2.html' },
      { name: 'lab02_bai3.html', path: 'Lab/Lab02/Vi_du_Lab01/lab02_bai3.html' }
    ]
  },
  {
    num: 'Lab03', title: 'Frame & Form',
    desc: 'Thực hành về form và frame trong HTML',
    files: [
      { name: 'lab03_bai1.html', path: 'Lab/Lab03/Vi_du_Lab01/lab03_bai1.html' },
      { name: 'lab03_bai2.html', path: 'Lab/Lab03/Vi_du_Lab01/lab03_bai2.html' },
      { name: 'lab03_bai3.html', path: 'Lab/Lab03/Vi_du_Lab01/lab03_bai3.html' },
      { name: 'trangchu.html',   path: 'Lab/Lab03/Vi_du_Lab01/trangchu.html' }
    ]
  },
  {
    num: 'Lab04', title: 'CSS cơ bản',
    desc: 'Thuộc tính CSS cơ bản: màu, font, kích thước',
    files: [
      { name: 'lab04_bai1.html', path: 'Lab/Lab04/Vi_du/lab04_bai1.html' },
      { name: 'lab04_bai2.html', path: 'Lab/Lab04/Vi_du/lab04_bai2.html' },
      { name: 'lab04_bai3.html', path: 'Lab/Lab04/Vi_du/lab04_bai3.html' }
    ]
  },
  {
    num: 'Lab05', title: 'Các thuộc tính CSS',
    desc: 'Box model, position, display, Flexbox',
    files: [
      { name: 'lab5_bai1 (index)', path: 'Lab/Lab05/Bai_2/index.html' },
      { name: 'lab5_bai2.html',    path: 'Lab/Lab05/Bai_2/lab5_bai2.html' },
      { name: 'lab5_bai3.html',    path: 'Lab/Lab05/Bai_2/lab5_bai3.html' }
    ]
  },
  {
    num: 'Lab06', title: 'Layout Responsive bằng CSS',
    desc: 'Flexbox, Grid, Media Queries — responsive hoàn toàn',
    files: [
      { name: 'lab06_bai1 (index)', path: 'Lab/Lab06/Bai_2_Minh_hoa_layout/index.html' },
      { name: 'lab06_bai2.html',    path: 'Lab/Lab06/Bai_2_Minh_hoa_layout/lab06_bai2.html' },
      { name: 'lab06_bai3.html',    path: 'Lab/Lab06/Bai_2_Minh_hoa_layout/lab06_bai3.html' }
    ]
  },
  {
    num: 'Lab07', title: 'Javascript',
    desc: 'JavaScript cơ bản: DOM, Event, hàm, biến',
    files: [
      { name: 'lab07_bai1.html',   path: 'Lab/Lab07/Vi_du/lab07_bai1.html' },
      { name: 'lab07_bai2 (demo)', path: 'Lab/Lab07/demo_bai_2/index.html' }
    ]
  }
];

function openModal(i) {
  const lab = LABS[i];
  document.getElementById('mLab').textContent = lab.num;
  document.getElementById('mTitle').textContent = lab.title;
  document.getElementById('mList').innerHTML = lab.files.map(f => `
    <div class="modal__row">
      <span class="modal__row-name">${f.name}</span>
      <button class="modal__btn-open" onclick="window.open('${f.path}','_blank')">Mở file →</button>
    </div>
  `).join('');
  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalBg').classList.remove('open');
  document.body.style.overflow = '';
}

function closeBg(e) {
  if (e.target === document.getElementById('modalBg')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Scroll animation
const cards = document.querySelectorAll('.lab-card');
cards.forEach((c, i) => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(20px)';
  c.style.transition = `opacity .4s ease ${i*0.07}s, transform .4s ease ${i*0.07}s, box-shadow .25s, border-color .25s`;
});
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
cards.forEach(c => obs.observe(c));