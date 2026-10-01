/* Indus & Ivy — shared site script.
   Sends signup/contact forms to Netlify Forms without a page reload,
      then shows the confirmation message. */

(function () {
  document.querySelectorAll('form.signup').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.remove('is-error');
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      }).then(function (r) {
        if (!r.ok) throw new Error('Form rejected: ' + r.status);
        form.classList.add('is-done');
      }).catch(function () {
        form.classList.add('is-error');
      });
    });
  });
})();
