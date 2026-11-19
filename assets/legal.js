/* Language switch for Terms & Privacy (id | en). Priority: ?lang= > saved choice > browser language. */
(function () {
  var doc = document.documentElement;
  var q = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = q || saved;
  if (lang !== 'id' && lang !== 'en') {
    lang = (navigator.language || 'id').toLowerCase().indexOf('id') === 0 ? 'id' : 'en';
  }

  function apply(l, persist) {
    doc.setAttribute('data-lang', l);
    doc.lang = l;
    var t = document.querySelector('title');
    if (t && t.getAttribute('data-' + l)) t.textContent = t.getAttribute('data-' + l);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === l));
    });
    if (persist) {
      try { localStorage.setItem('lang', l); } catch (e) {}
      var u = new URL(location.href); u.searchParams.set('lang', l);
      history.replaceState(null, '', u);
    }
  }

  apply(lang, false);
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang, false);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-set'), true); });
    });
    var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
  });
})();
