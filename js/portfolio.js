// Portfolio page: category filters + grid render.
(function () {
  var filtersEl = document.getElementById('filters');
  var gridEl = document.getElementById('portfolioGrid');
  if (!filtersEl || !gridEl) return;

  var cats = ['All', 'Signage', 'Vehicle', 'Campaign', 'LED Wall', 'Printing'];
  var items = [
    { img: 'assets/signage.png', title: 'Nice Times Cafeteria', sub: 'Facade signage & lighting', cat: 'Signage', span: 7, ratio: '16/10' },
    { img: 'assets/gifts.png', title: 'Ahlnar Foods', sub: 'Refrigerated fleet wrap', cat: 'Vehicle', span: 5, ratio: '16/12' },
    { img: 'assets/ledwall.png', title: 'ColorLit 4K', sub: 'Indoor LED video wall', cat: 'LED Wall', span: 5, ratio: '16/12' },
    { img: 'assets/events.png', title: 'Big Deal Mart', sub: 'Retail campaign & display', cat: 'Campaign', span: 7, ratio: '16/10' },
    { img: 'assets/uvprint.png', title: 'Ten Markets', sub: 'Mega Shopping promotion', cat: 'Campaign', span: 7, ratio: '16/10' },
    { img: 'assets/vehicle.png', title: 'Loyalty & VIP Cards', sub: 'PVC card design & print', cat: 'Printing', span: 5, ratio: '16/12' },
    { img: 'assets/engraving.png', title: 'Diagram Merch', sub: 'Branded team apparel', cat: 'Printing', span: 5, ratio: '16/12' },
    { img: 'assets/screenprint.png', title: 'Etched Metal Badges', sub: 'Engraving & etching', cat: 'Printing', span: 7, ratio: '16/10' }
  ];

  var active = 'All';

  function renderFilters() {
    filtersEl.innerHTML = '';
    cats.forEach(function (c) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn' + (c === active ? ' active' : '');
      btn.textContent = c;
      btn.setAttribute('aria-pressed', c === active ? 'true' : 'false');
      btn.addEventListener('click', function () {
        if (active === c) return;
        active = c;
        renderFilters();
        renderGrid();
      });
      filtersEl.appendChild(btn);
    });
  }

  function renderGrid() {
    var list = active === 'All' ? items : items.filter(function (x) { return x.cat === active; });
    gridEl.innerHTML = '';
    list.forEach(function (w) {
      var a = document.createElement('a');
      a.href = 'contact.html';
      a.className = 'portfolio-card';
      a.setAttribute('data-reveal', '');
      a.style.gridColumn = 'span ' + w.span;
      a.innerHTML =
        '<div class="thumb" style="aspect-ratio:' + w.ratio + ';">' +
          '<img src="' + w.img + '" alt="' + w.title + '" loading="lazy">' +
          '<div class="thumb-shade" aria-hidden="true"></div>' +
          '<div class="cat">' + w.cat + '</div>' +
          '<div class="info"><div class="t anton">' + w.title + '</div><div class="s">' + w.sub + '</div></div>' +
        '</div>';
      gridEl.appendChild(a);
    });
    observeReveal(Array.from(gridEl.querySelectorAll('[data-reveal]')));
  }

  function observeReveal(els) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  renderFilters();
  renderGrid();
})();
