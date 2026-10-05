/* Indus & Ivy | site behaviour (every page)
   1. Header state on scroll   2. Mobile menu   3. Scroll reveals
   4. Light parallax           5. Product gallery   6. Netlify forms  */
(function () {
  var doc = document.documentElement;
  var body = document.body;
  doc.classList.remove('no-js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Header: transparent over the hero, solid after scrolling */
  var announce = document.getElementById('ii-announce');
  function setAnnounce() {
    if (announce) doc.style.setProperty('--announce-h', announce.offsetHeight + 'px');
  }
  function onScroll() {
    var limit = announce ? announce.offsetHeight : 0;
    body.classList.toggle('is-scrolled', window.scrollY > limit + 10);
  }
  setAnnounce(); onScroll();
  window.addEventListener('resize', setAnnounce);
  window.addEventListener('scroll', onScroll, { passive: true });

  /* 2. Mobile menu */
  var menu = document.getElementById('ii-menu');
  var drawer = document.getElementById('ii-drawer');
  var close = document.getElementById('ii-close');
  function setMenu(open) {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.style.overflow = open ? 'hidden' : '';
    if (open) close.focus(); else menu.focus();
  }
  if (menu && drawer) {
    menu.addEventListener('click', function () { setMenu(true); });
    close.addEventListener('click', function () { setMenu(false); });
    drawer.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) setMenu(false); });
  }

  /* 3. Reveal on scroll */
  var items = document.querySelectorAll('.reveal, .img-reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* 4. Parallax: elements with data-parallax="0.15" drift as you scroll */
  var px = document.querySelectorAll('[data-parallax]');
  if (px.length && !reduce) {
    var ticking = false;
    var run = function () {
      var vh = window.innerHeight;
      px.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var offset = (r.top + r.height / 2 - vh / 2) * speed * -1;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(run); ticking = true; }
    }, { passive: true });
    run();
  }

  /* 5. Product gallery: thumbnails swap the main image */
  document.querySelectorAll('[data-gallery]').forEach(function (g) {
    var main = g.querySelector('.stage img');
    var buttons = g.querySelectorAll('.thumbs button');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var img = b.querySelector('img');
        main.style.opacity = 0;
        setTimeout(function () {
          main.src = b.getAttribute('data-full') || img.getAttribute('src');
          main.alt = img.alt;
          main.style.opacity = 1;
        }, 220);
        buttons.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
      });
    });
  });

  /* 6. Netlify forms: send without leaving the page, then show the message */
  document.querySelectorAll('form[data-netlify]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return; // old browsers fall back to a normal submit
      e.preventDefault();
      form.classList.remove('is-error');
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending'; }
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.classList.add('is-done');
      }).catch(function () {
        form.classList.add('is-error');
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
      });
    });
  });
})();
