// Portfolio page: category filters + grid render.
(function () {
  var filtersEl = document.getElementById('filters');
  var gridEl = document.getElementById('portfolioGrid');
  if (!filtersEl || !gridEl) return;

  var services = [
    { slug: '3d-signage', cat: '3D Signage', sub: 'Illuminated & fabricated signage' },
    { slug: 'led-wall', cat: 'LED Wall', sub: 'Indoor & outdoor displays' },
    { slug: 'vehicle-graphics', cat: 'Vehicle Graphics', sub: 'Wraps & fleet branding' },
    { slug: 'vinyl-sticker', cat: 'Vinyl Sticker', sub: 'Cut & large-format vinyl' },
    { slug: 'uv-printing', cat: 'UV Printing', sub: 'Direct-to-surface printing' },
    { slug: 'engraving', cat: 'Engraving', sub: 'Etching & engraving' },
    { slug: 'loyalty-id-cards', cat: 'ID & Loyalty Cards', sub: 'PVC card design & print' },
    { slug: 'event-management', cat: 'Event Management', sub: 'Exhibitions & stands' },
    { slug: 'event-promotion', cat: 'Event Promotion', sub: 'Activations & promos' }
  ];

  var cats = ['All'].concat(services.map(function (s) { return s.cat; }));

  var items = [
    { img: 'assets/signage.png', title: 'Nice Times Cafeteria', sub: 'Facade signage & lighting', cat: '3D Signage' },
    { img: 'assets/gifts.png', title: 'Ahlnar Foods', sub: 'Refrigerated fleet wrap', cat: 'Vehicle Graphics' },
    { img: 'assets/ledwall.png', title: 'ColorLit 4K', sub: 'Indoor LED video wall', cat: 'LED Wall' },
    { img: 'assets/events.png', title: 'Big Deal Mart', sub: 'Retail campaign & display', cat: 'Event Promotion' },
    { img: 'assets/uvprint.png', title: 'Ten Markets', sub: 'Mega Shopping promotion', cat: 'Event Promotion' },
    { img: 'assets/vehicle.png', title: 'Loyalty & VIP Cards', sub: 'PVC card design & print', cat: 'ID & Loyalty Cards' },
    { img: 'assets/engraving.png', title: 'Diagram Merch', sub: 'Branded team apparel', cat: 'UV Printing' },
    { img: 'assets/screenprint.png', title: 'Etched Metal Badges', sub: 'Engraving & etching', cat: 'Engraving' }
  ];

  // Interleave the PDF image sets round-robin so 'All' mixes categories.
  var sets = window.SERVICE_IMAGES || {};
  var queues = services.map(function (s) {
    return (sets[s.slug] || []).map(function (img) {
      return { img: img, title: s.cat, sub: s.sub, cat: s.cat };
    });
  });
  var added = true;
  while (added) {
    added = false;
    queues.forEach(function (q) {
      if (q.length) { items.push(q.shift()); added = true; }
    });
  }

  // Alternate wide/narrow cards for a varied grid rhythm.
  items.forEach(function (w, i) {
    var wide = i % 4 === 0 || i % 4 === 3;
    w.span = wide ? 7 : 5;
    w.ratio = wide ? '16/10' : '16/12';
  });

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
      a.href = '/contact';
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
