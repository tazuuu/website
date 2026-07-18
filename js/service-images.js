// Image sets extracted from the service PDFs. Shared by home, services and portfolio pages.
(function () {
  var counts = {
    'led-wall': 6,
    '3d-signage': 6,
    'vehicle-graphics': 7,
    'vinyl-sticker': 8,
    'uv-printing': 6,
    'engraving': 6,
    'loyalty-id-cards': 6,
    'event-management': 6,
    'event-promotion': 4
  };
  var sets = {};
  Object.keys(counts).forEach(function (slug) {
    sets[slug] = [];
    for (var i = 1; i <= counts[slug]; i++) {
      sets[slug].push('images/services/' + slug + '/' + slug + '-' + String(i).padStart(2, '0') + '.jpg');
    }
  });
  window.SERVICE_IMAGES = sets;
})();
