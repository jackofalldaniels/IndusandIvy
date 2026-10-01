/* Indus & Ivy — header behaviour, used by every page (mobile menu). */
(function () {
  var toggle = document.getElementById('ii-menu');
  var nav = document.getElementById('ii-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  });
})();
