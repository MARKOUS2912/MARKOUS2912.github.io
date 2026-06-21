// Mobile menu
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
})();

// Language switcher
(function () {
  var btns = document.querySelectorAll('.lang-btn');
  if (!btns.length) return;

  function applyLang(lang) {
    localStorage.setItem('skibidi-lang', lang);

    // sync all lang buttons (desktop + mobile)
    btns.forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    // filter cards — but never touch .featured-post (slider handles those)
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      if (el.classList.contains('featured-post')) return;
      var elLang = el.dataset.lang;
      var show = lang === 'all' || elLang === lang || elLang === 'both';
      el.style.display = show ? '' : 'none';
    });
  }

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.dataset.lang);
    });
  });

  applyLang(localStorage.getItem('skibidi-lang') || 'all');
})();

// Search filter
(function () {
  const input = document.querySelector('.search-input');
  if (!input) return;
  input.addEventListener('input', function () {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.post-card, .post-list-item').forEach(function (card) {
      const title = card.querySelector('.post-card-title, .post-list-title');
      if (!title) return;
      card.style.display = (!q || title.textContent.toLowerCase().includes(q)) ? '' : 'none';
    });
  });
})();

// Featured slider
(function () {
  var slider = document.getElementById('featuredSlider');
  if (!slider) return;

  var slides = slider.querySelectorAll('.featured-post');
  var dots   = slider.querySelectorAll('.slider-dot');
  var prev   = document.getElementById('sliderPrev');
  var next   = document.getElementById('sliderNext');
  var current = 0;
  var timer;

  if (slides.length <= 1) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
    if (dots.length) dots[0].parentElement.style.display = 'none';
    return;
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  if (prev) prev.addEventListener('click', function (e) { e.preventDefault(); goTo(current - 1); resetAuto(); });
  if (next) next.addEventListener('click', function (e) { e.preventDefault(); goTo(current + 1); resetAuto(); });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  startAuto();
})();

// Active nav highlight
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    const isHome = href === '/' && path === '/';
    const isSection = href !== '/' && path.startsWith(href);
    if (isHome || isSection) link.classList.add('active');
  });
})();
