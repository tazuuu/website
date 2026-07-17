// Home page: draggable filmstrip.
(function () {
  var el = document.getElementById('filmstrip');
  if (!el) return;
  var down = false, sx = 0, sl = 0, moved = false;

  el.addEventListener('pointerdown', function (e) {
    down = true; moved = false; sx = e.clientX; sl = el.scrollLeft;
    el.classList.add('dragging');
  });
  window.addEventListener('pointerup', function () {
    if (down) { down = false; el.classList.remove('dragging'); }
  });
  window.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - sx;
    if (Math.abs(dx) > 4) moved = true;
    el.scrollLeft = sl - dx;
  });
  // Prevent link click firing right after a drag.
  el.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); }
  }, true);
})();
