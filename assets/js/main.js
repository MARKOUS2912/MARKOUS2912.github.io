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
  const btns = document.querySelectorAll('.lang-btn');
  if (!btns.length) return;

  function applyLang(lang) {
    localStorage.setItem('skibidi-lang', lang);
    btns.forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      const elLang = el.dataset.lang;
      const show = lang === 'all' || elLang === lang || elLang === 'both';
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
