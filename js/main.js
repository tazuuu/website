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
