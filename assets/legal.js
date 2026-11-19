/* Language switch for Terms & Privacy (id | en). Priority: ?lang= > saved choice > browser language. */
(function () {
  var th = null;
  try { th = localStorage.getItem('theme'); } catch (e) {}
  if (!th) th = (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  function setTheme(v, persist) {
    document.documentElement.setAttribute('data-theme', v);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = v === 'dark' ? '#14130F' : '#F2EEE3';
    document.querySelectorAll('.brand img').forEach(function (i) {
      i.src = i.src.replace(/logo-(transparent|on-dark)\.svg/, v === 'dark' ? 'logo-on-dark.svg' : 'logo-transparent.svg');
    });
    if (persist) { try { localStorage.setItem('theme', v); } catch (e) {} }
  }
  document.documentElement.setAttribute('data-theme', th);
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
    setTheme(th, false);
    var tools = document.querySelector('.tools');
    if (tools) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'theme'; b.setAttribute('aria-label', 'Theme'); b.title = 'Theme';
      b.innerHTML = '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg><svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>';
      b.addEventListener('click', function () { th = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; setTheme(th, true); });
      tools.appendChild(b);
    }
    var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
  });
})();
