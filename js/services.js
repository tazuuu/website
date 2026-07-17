// Services page: interactive index + sticky preview panel.
(function () {
  var list = document.getElementById('svcList');
  if (!list) return;

  var data = [
    { title: 'LED Walls', img: 'assets/ledwall.png', desc: 'High-resolution indoor and outdoor LED screens for advertising, events, retail and corporate spaces. Vibrant colour, excellent brightness and long-lasting performance — supplied, installed and warrantied.' },
    { title: '3D Signage', img: 'assets/signage.png', desc: 'Illuminated and fabricated indoor and outdoor signage built to communicate and persuade. Signs that guide, inform and sell — engineered to last in the Gulf climate.' },
    { title: 'Vinyl Sticker', img: 'assets/events.png', desc: 'Frosted glass, one-way vision, banners, roll-ups, duratrans and vehicle graphics. Precision-cut and large-format printed vinyl for every surface.' },
    { title: 'Event Management', img: 'assets/cards.png', desc: 'Exhibitions, trade fairs and brand activations — from stand design and build to on-site production. Organised presentation that makes your brand the thing people remember.' },
    { title: 'ID & Loyalty Cards', img: 'assets/vehicle.png', desc: 'High-quality PVC ID and loyalty cards with barcode, QR, magnetic strip, smart chip and variable data printing. Durable, waterproof and professionally finished.' },
    { title: 'Vehicle Branding', img: 'assets/gifts.png', desc: 'The true definition of mobile advertising. Full and partial wraps and fleet graphics for cars, SUVs, trucks and buses — designed and printed to spec.' },
    { title: 'UV Printing', img: 'assets/uvprint.png', desc: 'Advanced UV digital printing on acrylic, PVC, wood, glass, metal and more — mugs, t-shirts, caps, pens and bags. Instant-cure, scratch-resistant, sharp detail.' },
    { title: 'Engraving', img: 'assets/screenprint.png', desc: 'Etching and engraving on hard surfaces — incised designs for signage, awards, gifts and commercial reproduction with a premium, permanent finish.' },
    { title: 'Promotional Gifts', img: 'assets/engraving.png', desc: 'Branded corporate merchandise and giveaways that carry your logo into the world — sourced, printed and delivered for launches, events and campaigns.' },
    { title: 'Branding', img: 'assets/signage.png', desc: 'We are passionate about developing and building brands — identity, strategy and the creative system that makes everything else consistent.' },
    { title: 'Media Service', img: 'assets/ledwall.png', desc: 'Media planning and buying backed by in-house market research, so every dirham of budget works as hard as possible across the right channels.' },
    { title: 'T-Shirt Printing', img: 'assets/engraving.png', desc: 'Custom apparel and team uniforms — DTG, vinyl and print for staff kit, events and merchandise runs of any size.' },
    { title: 'Screen Printing', img: 'assets/engraving.png', desc: 'Classic screen printing for bold, durable results on textiles, packaging and promotional items at volume.' },
    { title: 'Offset Printing', img: 'assets/events.png', desc: 'Sharp, colour-accurate offset printing for brochures, stationery, packaging and marketing collateral at commercial scale.' }
  ];

  var svcImg = document.getElementById('svcImg');
  var svcTitle = document.getElementById('svcTitle');
  var svcDesc = document.getElementById('svcDesc');
  var rows = [];
  var active = 0;

  data.forEach(function (s, i) {
    var row = document.createElement('div');
    row.className = 'svc-row' + (i === 0 ? ' active' : '');
    row.setAttribute('data-reveal', '');
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'button');
    row.innerHTML =
      '<span class="num anton">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span class="title anton">' + s.title + '</span>' +
      '<span class="arrow" aria-hidden="true">&#8594;</span>';
    var activate = function () { setActive(i); };
    row.addEventListener('mouseenter', activate);
    row.addEventListener('click', activate);
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
    list.appendChild(row);
    rows.push(row);
  });

  function setActive(i) {
    if (i === active) return;
    active = i;
    rows.forEach(function (r, idx) { r.classList.toggle('active', idx === i); });
    svcImg.style.opacity = '0';
    requestAnimationFrame(function () {
      svcImg.src = data[i].img;
      svcImg.alt = data[i].title;
      svcTitle.textContent = data[i].title;
      svcDesc.textContent = data[i].desc;
      requestAnimationFrame(function () { svcImg.style.opacity = '1'; });
    });
  }

  // Re-run reveal observer for rows injected after main.js already ran.
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    rows.forEach(function (r) { io.observe(r); });
  } else {
    rows.forEach(function (r) { r.classList.add('is-visible'); });
  }
})();
