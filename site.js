/* Shared: posts forms to Netlify without a page reload, then swaps in
   the confirmation. If anything fails, the form submits normally. */
document.querySelectorAll('.signup').forEach(function (form) {
  var fallingBack = false;
  form.addEventListener('submit', function (e) {
    if (fallingBack) return;
    e.preventDefault();
    var data = new URLSearchParams(new FormData(form)).toString();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    }).then(function (r) {
      if (!r.ok) throw new Error('rejected');
      form.classList.add('is-done');
    }).catch(function () {
      fallingBack = true;
      form.submit();
    });
  });
});
