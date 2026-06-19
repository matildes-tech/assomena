/* AssoMENA — "Latest News" blog section (dremonpro structure).
   Replaces the articles grid (post-hydration), keeps the section header.
   Mock articles (the live snapshot only ships one real post). */
(function () {
  'use strict';

  var FEATURED = {
    cat: 'Press', date: 'June 12, 2026',
    title: 'AssoMENA connects 340+ EU–MENA companies in its first quarter',
    grad: 'linear-gradient(135deg, #4c2a86 0%, #2a1b52 60%, #1b1330 100%)',
    href: '/news'
  };
  var ROWS = [
    { cat: 'Product', date: 'June 4, 2026', title: 'How AI company matching cuts deal-discovery time by 80%', grad: 'linear-gradient(135deg, #3b4fd1, #1e2a72)', href: '/news' },
    { cat: 'Markets', date: 'May 28, 2026', title: 'New trade corridors: Italy–Gulf partnerships to watch in 2026', grad: 'linear-gradient(135deg, #0e8a8f, #134b53)', href: '/news' },
    { cat: 'Tech', date: 'May 20, 2026', title: 'Inside the scoring engine: how opportunities get ranked', grad: 'linear-gradient(135deg, #7c3aed, #3f1d80)', href: '/news' },
    { cat: 'Update', date: 'May 16, 2026', title: 'Welcome to AssoMENA', grad: 'linear-gradient(135deg, #2563eb, #16306e)', href: '/news/welcome' }
  ];

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'bl-wrap';

    var rowsHTML = ROWS.map(function (a) {
      return '<a class="bl-row" href="' + a.href + '">' +
        '<div class="bl-thumb" style="background:' + a.grad + '"></div>' +
        '<div class="bl-rtext">' +
          '<div class="bl-rmeta"><span class="bl-cat">' + esc(a.cat) + '</span><span class="bl-dot"></span><span>' + esc(a.date) + '</span></div>' +
          '<h4 class="bl-rtitle">' + esc(a.title) + '</h4>' +
        '</div></a>';
    }).join('');

    wrap.innerHTML =
      '<a class="bl-featured" href="' + FEATURED.href + '">' +
        '<div class="bl-cover" style="background:' + FEATURED.grad + '"><span class="bl-tag">' + esc(FEATURED.cat) + '</span></div>' +
        '<div class="bl-fbody">' +
          '<h3 class="bl-ftitle">' + esc(FEATURED.title) + '</h3>' +
          '<div class="bl-meta"><span class="bl-cat">' + esc(FEATURED.cat) + '</span><span class="bl-dot"></span><span>' + esc(FEATURED.date) + '</span></div>' +
        '</div>' +
      '</a>' +
      '<div class="bl-rows">' + rowsHTML + '</div>';
    return wrap;
  }

  function locate() {
    var h2 = [].slice.call(document.querySelectorAll('h2')).find(function (e) {
      return e.textContent.trim() === 'Latest News';
    });
    if (!h2) return null;
    var sec = h2; while (sec && sec.tagName !== 'SECTION') sec = sec.parentElement;
    if (!sec) return null;
    var header = [].slice.call(sec.children).find(function (c) { return c.contains(h2); });
    // the articles container = the section child that isn't the header
    return [].slice.call(sec.children).find(function (c) { return c !== header && !c.contains(h2); }) || null;
  }

  function inject() {
    if (document.querySelector('.bl-wrap')) return true;
    var target = locate();
    if (!target) return false;
    target.replaceWith(build());
    return true;
  }

  function start() {
    if (inject()) return;
    var tries = 0;
    var iv = setInterval(function () { tries++; if (inject() || tries > 30) clearInterval(iv); }, 200);
  }

  if (document.readyState === 'complete') setTimeout(start, 400);
  else window.addEventListener('load', function () { setTimeout(start, 400); });
})();
