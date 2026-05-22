/* ===========================
   NIKE STORE – script.js
   =========================== */

'use strict';

// ============================================================
// DATA
// ============================================================
const PRODUCTS = [
  {
    id: 1,
    name: 'Nike Air Max DN8',
    brand: 'NIKE',
    category: 'chạy bộ',
    price: 3500000,
    oldPrice: 4200000,
    image: "images/shoe/AIR+MAX+DN8.avif",     
    rating: 4.8,
    reviews: 214,
    badges: ['new', 'hot']
  },
  {
    id: 2, name: 'Nike Air Force 1 \'07 Low', brand: 'NIKE',
    category: 'lifestyle', price: 2800000, oldPrice: 3200000,
    image: "images/shoe/AIR+FORCE+1+'07.avif",
    rating: 4.9, reviews: 512,
    badges: [],
  },
  {
    id: 3, name: 'Nike Zoom Alphafly 3', brand: 'NIKE',
    category: 'chạy bộ', price: 5200000, oldPrice: 6000000,
    image: "images/shoe/AIR+ZOOM+ALPHAFLY+NEXT3.avif",     // ← Thêm dòng này
    rating: 4.7, reviews: 89,
    badges: ['sale'],
  },
  {
    id: 4, name: 'Nike Dunk Low Retro', brand: 'NIKE',
    category: 'lifestyle', price: 2500000, oldPrice: 3000000,
    rating: 4.8, reviews: 380,
    image: "images/shoe/NIKE+DUNK+LOW+RETRO+SE.avif",
    badges: ['sale'],
  },
  {
    id: 5, name: 'Nike LeBron NXXT Gen', brand: 'NIKE',
    category: 'bóng rổ', price: 4800000, oldPrice: 5500000,
    image: "images/shoe/Nike LeBron NXXT Gen.webp",
    rating: 4.6, reviews: 143,
    badges: ['new'],
  },
  {
    id: 6, name: 'Nike Mercurial Vapor 16 Elite', brand: 'NIKE',
    category: 'bóng đá', price: 5900000, oldPrice: 7000000,
    rating: 4.9, reviews: 67,
    badges: ['sale', 'hot'],
    image: "images/shoe/ZM+VAPOR+16+ACADEMY+FG_MG.avif"
  },
  {
    id: 7, name: 'Nike Pegasus 41', brand: 'NIKE',
    category: 'chạy bộ', price: 3100000, oldPrice: 3600000,
    rating: 4.7, reviews: 298,
    badges: [],
    image: "images/shoe/AIR+ZOOM+PEGASUS+42.avif"
  },
  {
    id: 8, name: 'Nike Air Jordan 1 Retro High', brand: 'NIKE',
    category: 'lifestyle', price: 4200000, oldPrice: 4800000,
    rating: 5.0, reviews: 634,
    badges: ['hot'],
    image: "images/shoe/Nike Air Jordan 1 Retro High.jpg"
  }
];

const NEW_ARRIVALS = [
  {
    id: 101, name: 'Nike Air Max Dn', price: 3200000,
    image: "images/shoe/Nike Air Max Dn.jpg"
  },
  {
    id: 102, name: 'Nike Vomero 18', price: 3800000,
    image: "images/shoe/Nike Vomero 18.webp"
  },
  {
    id: 103, name: 'Nike Free Run 5.0', price: 2600000,
    image: "images/shoe/Nike Free Run 5.0.jpg"
  },
  {
    id: 104, name: 'Nike Infinity Run 4', price: 4100000,
    image: "images/shoe/Nike Infinity Run 4.jpg"
  },
  {
    id: 105, name: 'Nike Cortez G Nrg', price: 2900000,
    image: "images/shoe/Nike Cortez G Nrg.jpg"
  },
  {
    id: 106, name: 'Nike React Infinity 4', price: 3700000,
    image: "images/shoe/Nike React Infinity 4.jpg"
  }
];

// ============================================================
// HELPERS
// ============================================================
function formatPrice(n) {
  return n.toLocaleString('vi-VN') + '₫';
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

function badgeHTML(badges) {
  const map = { 
    sale: ['badge--sale', 'SALE'], 
    new: ['badge--new', 'NEW'], 
    hot: ['badge--hot', 'HOT'] 
  };
  return badges.map(b => `<span class="badge ${map[b][0]}">${map[b][1]}</span>`).join('');
}

function discountPct(price, oldPrice) {
  return Math.round((1 - price / oldPrice) * 100);
}

// Tạo ảnh giày thật
function createProductImage(product) {
  return `<img src="${product.image}" alt="${product.name}" class="product-real-img" loading="lazy">`;
}

// ============================================================
// RENDER PRODUCTS
// ============================================================
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';

  setTimeout(() => {
    grid.innerHTML = list.map(p => `
      <div class="product-card" data-id="${p.id}">
        <div class="product-card__img">
          ${createProductImage(p)}
          <div class="product-card__badges">${badgeHTML(p.badges || [])}</div>
          <button class="product-card__wishlist" data-id="${p.id}" aria-label="Yêu thích">♡</button>
        </div>
        <div class="product-card__body">
          <div class="product-card__brand">${p.brand}</div>
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__cat">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</div>
          <div class="product-card__stars">
            <span class="stars">${renderStars(p.rating)}</span>
            <span class="reviews">(${p.reviews})</span>
          </div>
          <div class="product-card__footer">
            <div class="product-price">
              <div class="product-price__current">${formatPrice(p.price)}</div>
              ${p.oldPrice ? `<div class="product-price__old">${formatPrice(p.oldPrice)} · -${discountPct(p.price, p.oldPrice)}%</div>` : ''}
            </div>
            <button class="add-to-cart" data-id="${p.id}" aria-label="Thêm vào giỏ">+</button>
          </div>
        </div>
      </div>
    `).join('');

    grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';

    // Bind events
    grid.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(parseInt(btn.dataset.id));
      });
    });

    grid.querySelectorAll('.product-card__wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(btn);
      });
    });
  }, 150);
}

// ============================================================
// RENDER NEW ARRIVALS
// ============================================================
function renderArrivals() {
  const scroll = document.getElementById('arrivalsScroll');
  if (!scroll) return;

  scroll.innerHTML = NEW_ARRIVALS.map(p => `
    <div class="arrival-card" data-id="${p.id}">
      <div class="arrival-card__img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="arrival-card__body">
        <span class="arrival-card__badge">MỚI VỀ</span>
        <p>${p.name}</p>
        <div class="new-price">${formatPrice(p.price)}</div>
      </div>
    </div>
  `).join('');
}

// ============================================================
// CART (ĐÃ SỬA)
// ============================================================
let cart = JSON.parse(localStorage.getItem('nikeCart') || '[]');

function saveCart() {
  localStorage.setItem('nikeCart', JSON.stringify(cart));
}
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  addToCartById(p);
}
function addToCartById(p) {
  const existing = cart.find(x => x.id === p.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ 
      id: p.id, 
      name: p.name, 
      price: p.price, 
      qty: 1,
      image: p.image   // Quan trọng: thêm image
    });
  }
  saveCart();
  updateCartUI();
  showToast(`✓ Đã thêm ${p.name} vào giỏ hàng`);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, x) => s + x.qty, 0);
  
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = total;
  document.getElementById('cartCount').textContent = total;

  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.innerHTML = '';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item__img">
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: auto; object-fit: contain;">
        </div>
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__cat">Số lượng: ${item.qty}</div>
          <div class="cart-item__price">${formatPrice(item.price * item.qty)}</div>
        </div>
        <button class="cart-item__remove" data-id="${item.id}" aria-label="Xóa">×</button>
      </div>
    `).join('');

    // Bind xóa item
    cartItems.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });

    const grandTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
    document.getElementById('cartTotal').textContent = formatPrice(grandTotal);
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

// ============================================================
// WISHLIST
// ============================================================
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  const isActive = btn.classList.contains('active');
  btn.textContent = isActive ? '♥' : '♡';
  btn.style.color = isActive ? '#ff3e00' : '';
  if (isActive) showToast('❤️ Đã thêm vào yêu thích');
}

// ============================================================
// HERO SLIDER
// ============================================================
let currentSlide = 0;
let slideInterval;

function goToSlide(n) {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startSlider() {
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

// ============================================================
// FILTER TABS
// ============================================================
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProducts(tab.dataset.filter);
    });
  });
}

// ============================================================
// SEARCH
// ============================================================
function initSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  if (!searchToggle || !searchBar) return;

  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) {
      setTimeout(() => searchInput.focus(), 300);
    }
  });

  function doSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) return;

    const results = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    );

    // Scroll đến phần sản phẩm
    document.getElementById('sale')?.scrollIntoView({ behavior: 'smooth' });

    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    // Reset filter tabs
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.filter-tab[data-filter="all"]')?.classList.add('active');

    grid.style.opacity = '0';

    setTimeout(() => {
      if (results.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #888;">
            <div style="font-size: 60px; margin-bottom: 16px;">🔍</div>
            <p>Không tìm thấy sản phẩm cho "<strong>${q}</strong>"</p>
          </div>`;
      } else {
        grid.innerHTML = results.map(p => `
          <div class="product-card" data-id="${p.id}">
            <div class="product-card__img">
              ${createProductImage(p)}
              <div class="product-card__badges">${badgeHTML(p.badges || [])}</div>
              <button class="product-card__wishlist" data-id="${p.id}" aria-label="Yêu thích">♡</button>
            </div>
            <div class="product-card__body">
              <div class="product-card__brand">${p.brand}</div>
              <div class="product-card__name">${p.name}</div>
              <div class="product-card__cat">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</div>
              <div class="product-card__stars">
                <span class="stars">${renderStars(p.rating)}</span>
                <span class="reviews">(${p.reviews})</span>
              </div>
              <div class="product-card__footer">
                <div class="product-price">
                  <div class="product-price__current">${formatPrice(p.price)}</div>
                  ${p.oldPrice ? `<div class="product-price__old">${formatPrice(p.oldPrice)} · -${discountPct(p.price, p.oldPrice)}%</div>` : ''}
                </div>
                <button class="add-to-cart" data-id="${p.id}" aria-label="Thêm vào giỏ">+</button>
              </div>
            </div>
          </div>
        `).join('');
      }

      grid.style.transition = 'opacity 0.4s ease';
      grid.style.opacity = '1';

      // Bind events cho sản phẩm trong kết quả tìm kiếm
      grid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          addToCart(parseInt(btn.dataset.id));
        });
      });

      grid.querySelectorAll('.product-card__wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleWishlist(btn);
        });
      });
    }, 200);

    searchBar.classList.remove('open');
    showToast(`🔍 Tìm thấy ${results.length} sản phẩm cho "${q}"`);
  }

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
}

// ============================================================
// MOBILE NAV - PHIÊN BẢN AN TOÀN
// ============================================================
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const overlay = document.getElementById('overlay');

  if (!hamburger || !mobileNav || !mobileClose) {
    console.warn("Mobile nav elements not found!");
    return;
  }

  // Mở menu
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Đóng menu
  function closeMobileNav() {
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileClose.addEventListener('click', closeMobileNav);

  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMobileNav();
      closeCart();
    });
  }
}
// ============================================================
// STICKY HEADER
// ============================================================
function initStickyHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 100) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    }
    lastScroll = current;
  }, { passive: true });
}

// ============================================================
// TOAST
// ============================================================
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ============================================================
// NEWSLETTER
// ============================================================
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    showToast(`✓ Đã đăng ký thành công: ${email}`);
    form.reset();
  });
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const targets = document.querySelectorAll('.product-card, .cat-card, .news-card, .arrival-card, .promo-card');
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });
}

// ============================================================
// CART INIT
// ============================================================
// ============================================================
// CART INIT (ĐÃ SỬA)
// ============================================================
function initCart() {
  const cartToggle = document.getElementById('cartToggle');
  const cartClose = document.getElementById('cartClose');
  const overlay = document.getElementById('overlay');

  if (cartToggle) {
    cartToggle.addEventListener('click', openCart);
  }

  if (cartClose) {
    cartClose.addEventListener('click', () => {
      closeCart();
    });
  }

  // Đóng khi click overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeCart();
    });
  }

  updateCartUI();
}

// ============================================================
// CATEGORY CARDS
// ============================================================
// ============================================================
// CATEGORY CARDS - CLICK ĐỂ LỌC SẢN PHẨM
// ============================================================
// ============================================================
// CATEGORY CARDS
// ============================================================
function initCategoryCards() {
  const catCards = document.querySelectorAll('.cat-card');
  
  catCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      
      const saleSection = document.getElementById('sale');
      if (saleSection) {
        saleSection.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        const tabs = document.querySelectorAll('.filter-tab');
        const match = [...tabs].find(t => t.dataset.filter === cat);
        
        if (match) {
          tabs.forEach(t => t.classList.remove('active'));
          match.classList.add('active');
          renderProducts(cat);
        } else {
          renderProducts('all');
        }
      }, 800);
    });
  });
}

// ============================================================
// INIT - DOMContentLoaded
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  
  // Render nội dung
  renderProducts('all');
  renderArrivals();

  // Hero Slider
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  
  heroPrev?.addEventListener('click', () => { 
    goToSlide(currentSlide - 1); 
    resetSlider(); 
  });
  
  heroNext?.addEventListener('click', () => { 
    goToSlide(currentSlide + 1); 
    resetSlider(); 
  });

  document.querySelectorAll('.hero__dot').forEach(dot => {
    dot.addEventListener('click', () => { 
      goToSlide(parseInt(dot.dataset.index)); 
      resetSlider(); 
    });
  });

  // Touch swipe cho Hero
  let touchStartX = 0;
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('touchstart', e => { 
      touchStartX = e.touches[0].clientX; 
    }, { passive: true });
    
    heroSection.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        goToSlide(currentSlide + (dx < 0 ? 1 : -1));
        resetSlider();
      }
    });
  }

  startSlider();

  // Khởi tạo các chức năng
  initFilterTabs();
  initSearch();
  initMobileNav();
  initStickyHeader();
  initNewsletter();
  initCart();
  initCategoryCards();

  // Scroll animations
  setTimeout(initScrollAnimations, 400);
});
/* =========================================
   MOBILE DROPDOWN NAV
   ========================================= */
(function () {
  const mobBar      = document.getElementById('mobBar');
  const mobToggle   = document.getElementById('mobToggle');
  const mobDropdown = document.getElementById('mobDropdown');
  const iconOpen    = mobToggle ? mobToggle.querySelector('.mob-icon--open')  : null;
  const iconClose   = mobToggle ? mobToggle.querySelector('.mob-icon--close') : null;
  const overlay     = document.getElementById('overlay');

  if (!mobToggle || !mobDropdown) return;

  function openMenu() {
    mobDropdown.classList.add('open');
    mobBar.classList.add('open');
    iconOpen.style.display  = 'none';
    iconClose.style.display = 'flex';
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = '';   // cho phép cuộn
  }

  function closeMenu() {
    mobDropdown.classList.remove('open');
    mobBar.classList.remove('open');
    iconOpen.style.display  = 'flex';
    iconClose.style.display = 'none';
    if (overlay) overlay.classList.remove('active');
  }

  function toggleMenu() {
    mobDropdown.classList.contains('open') ? closeMenu() : openMenu();
  }

  mobToggle.addEventListener('click', toggleMenu);

  // Click vào phần "Danh mục sản phẩm" cũng toggle
  if (mobBar) {
    const left = mobBar.querySelector('.mob-bar__left');
    if (left) left.addEventListener('click', toggleMenu);
  }

  // Đóng khi click overlay
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Đóng khi click link trong menu
  mobDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Đóng khi nhấn ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}());
// ========== MODAL THANH TOÁN ==========
const checkoutModal = document.getElementById('checkoutModal');
const checkoutClose = document.getElementById('checkoutClose');
const completeOrder = document.getElementById('completeOrder');

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Giỏ hàng trống!");
    return;
  }
  
  // Hiển thị danh sách sản phẩm
  let html = '';
  let total = 0;
  
  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    html += `
      <div class="checkout-item">
        <span>${item.name} × ${item.qty}</span>
        <span>${subtotal.toLocaleString('vi-VN')}₫</span>
      </div>`;
  });
  
  document.getElementById('modalCheckoutItems').innerHTML = html;
  document.getElementById('modalCheckoutTotal').textContent = total.toLocaleString('vi-VN') + '₫';
  
  checkoutModal.style.display = 'flex';
}

// Mở modal khi click nút Thanh Toán trong giỏ hàng
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'btnCheckout') {
    openCheckoutModal();
  }
});

checkoutClose.addEventListener('click', () => {
  checkoutModal.style.display = 'none';
});

completeOrder.addEventListener('click', () => {
  alert('✅ Đơn hàng của bạn đã được đặt thành công!\nCảm ơn bạn đã mua sắm tại Nike Store ❤️');
  cart = [];                    // Xóa giỏ hàng
  saveCart();
  updateCartUI();
  checkoutModal.style.display = 'none';
  closeCart();                  // Đóng giỏ hàng
});
// ========== LIÊN KẾT NÚT THANH TOÁN VỚI MODAL ==========
const btnCheckout = document.getElementById('btnCheckout');

if (btnCheckout) {
  btnCheckout.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast("Giỏ hàng của bạn đang trống!");
      return;
    }
    openCheckoutModal();     // Mở modal thanh toán
  });
}
// ============================================================
// MODAL ĐĂNG NHẬP / ĐĂNG KÝ
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const accountBtn = document.getElementById('accountBtn');
  const authModal = document.getElementById('authModal');
  const modalClose = document.getElementById('modalClose');

  if (!authModal) {
    console.error("Không tìm thấy modal đăng nhập! Kiểm tra HTML có id='authModal' không.");
    return;
  }

  // Click icon người → mở modal
  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      authModal.style.display = 'flex';
    });
  }

  // Click nút X → đóng modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      authModal.style.display = 'none';
    });
  }

  // Click ra ngoài modal → đóng
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.style.display = 'none';
    }
  });

