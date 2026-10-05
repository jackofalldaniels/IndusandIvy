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

  /* 7. Shop dropdown (click for touch + keyboard; hover handled in CSS) */
  document.querySelectorAll('.ii-dd').forEach(function (dd) {
    var btn = dd.querySelector('.ii-dd-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  });

  /* 8. Join the list pop-up
     Opens from any [data-join] element (add data-interest="Moringa Body Oil Mist" to pre-tick a box).
     Also opens once per visitor after 20s or half-way down the page. */
  var modal = document.getElementById('join-modal');
  if (modal) {
    var lastFocus = null;
    var KEY = 'ii-join-seen';
    var store = {
      get: function () { try { return localStorage.getItem(KEY); } catch (e) { return '1'; } },
      set: function () { try { localStorage.setItem(KEY, '1'); } catch (e) {} }
    };
    var openModal = function (interest) {
      if (!modal.hidden) return;
      lastFocus = document.activeElement;
      if (drawer && drawer.classList.contains('is-open')) setMenu(false);
      modal.hidden = false;
      body.classList.add('modal-open');
      if (interest) {
        modal.querySelectorAll('input[name="interest"]').forEach(function (c) { if (c.value === interest) c.checked = true; });
      }
      var first = modal.querySelector('input:not([type=hidden]):not([name=company])');
      setTimeout(function () { if (first) first.focus(); }, 50);
      store.set();
    };
    var closeModal = function () {
      modal.hidden = true;
      body.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-join]');
      if (t) { e.preventDefault(); openModal(t.getAttribute('data-interest')); return; }
      if (e.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') { /* keep focus inside */
        var f = modal.querySelectorAll('button, input:not([type=hidden]):not([name=company]), a[href]');
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    if (location.hash === '#join') openModal();
    if (!body.hasAttribute('data-no-popup') && !store.get()) {
      var auto = function () { if (!store.get()) openModal(); cleanup(); };
      var timer = setTimeout(auto, 20000);
      var onS = function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        if (h > 0 && window.scrollY / h > 0.5) auto();
      };
      var cleanup = function () { clearTimeout(timer); window.removeEventListener('scroll', onS); };
      window.addEventListener('scroll', onS, { passive: true });
    }
  }

  /* 9. Melt slider on the product page */
  var melt = document.getElementById('melt-range');
  if (melt) {
    var blob = document.querySelector('.melt-blob');
    var label = document.querySelector('.melt-label');
    var states = ['Firm in the jar', 'Softening between your fingers', 'Melted into warm skin'];
    var paint = function () {
      var v = melt.value / 100;
      var r1 = 46 + v * 4, r2 = 54 - v * 4, ry = 55 - v * 35, ry2 = 45 + v * 10;
      blob.style.borderRadius = r1 + '% ' + r2 + '% 50% 50% / ' + ry + '% 50% ' + (50 - v * 30) + '% ' + ry2 + '%';
      blob.style.transform = 'scaleX(' + (1 + v * 0.55) + ') scaleY(' + (1 - v * 0.62) + ') translateY(' + (v * 70) + '%)';
      blob.style.filter = 'saturate(' + (1 + v * 0.3) + ') brightness(' + (1 + v * 0.06) + ')';
      label.textContent = states[v < 0.34 ? 0 : v < 0.67 ? 1 : 2];
    };
    melt.addEventListener('input', paint);
    paint();
  }
})();
