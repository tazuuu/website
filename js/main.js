// Shared behaviour: nav scroll state + scroll-reveal animations.
(function () {
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile hamburger menu.
  var toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Close when a link is chosen or when tapping outside the nav.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-links a')) nav.classList.remove('menu-open');
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('menu-open') && !nav.contains(e.target)) {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Hero headline rise-in (home + page heroes)
  var lines = document.querySelectorAll('[data-line]');
  lines.forEach(function (l, i) {
    l.style.transitionDelay = (0.15 + i * 0.12) + 's';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { l.style.transform = 'translateY(0)'; });
    });
  });
})();
