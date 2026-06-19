/* AssoMENA — "What We Match You With" gradient cards.
   Replaces the 4-tile grid (post-hydration) with brand gradient cards.
   Keeps the existing copy; only the colours and UI change. */
(function () {
  'use strict';

  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* copy preserved from the original tiles; variant + badge are styling only */
  var CARDS = [
    { variant: 'grants',    glyph: '💰', badge: 'Funding',   title: 'Grants',      desc: 'EU &amp; government funding' },
    { variant: 'tenders',   glyph: '📜', badge: 'Public',    title: 'Tenders',     desc: 'Public procurement' },
    { variant: 'financing', glyph: '🏦', badge: 'Credit',    title: 'Financing',   desc: 'Subsidized credit lines' },
    { variant: 'rfp',       glyph: '🤝', badge: 'Corporate', title: 'Private RFPs', desc: 'Corporate partnerships' }
  ];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function cardHTML(c) {
    return '<span class="am-mcard__glyph" aria-hidden="true">' + c.glyph + '</span>' +
      '<span class="am-mcard__badge"><i class="am-mcard__dot"></i>' + c.badge + '</span>' +
      '<span class="am-mcard__body">' +
        '<h4 class="am-mcard__title">' + c.title + '</h4>' +
        '<p class="am-mcard__desc">' + c.desc + '</p>' +
        '<span class="am-mcard__cta">Learn more ' + ARROW + '</span>' +
      '</span>';
  }

  function build() {
    var root = el('div', 'am-match');
    var grid = el('div', 'am-match__grid');
    CARDS.forEach(function (c) {
      var a = el('a', 'am-mcard am-mcard--' + c.variant, cardHTML(c));
      a.setAttribute('href', '/intelligent-matching');
      grid.appendChild(a);
    });
    root.appendChild(grid);
    return root;
  }

  /* Target = the grid right after the "What We Match You With" heading. */
  function locate() {
    var h = [].slice.call(document.querySelectorAll('h2, h3')).find(function (e) {
      return e.textContent.trim() === 'What We Match You With';
    });
    if (!h) return null;
    var wrap = h.parentElement; if (!wrap) return null;
    return [].slice.call(wrap.querySelectorAll('div')).find(function (c) {
      return /grid/.test(c.className) && /Grants/.test(c.innerText) && /Private RFPs/.test(c.innerText);
    }) || null;
  }

  function inject() {
    if (document.querySelector('.am-match')) return true;
    var target = locate();
    if (!target) return false;
    target.replaceWith(build());
    return true;
  }

  function start() {
    if (inject()) return;
    var tries = 0;
    var t = setInterval(function () { tries++; if (inject() || tries > 30) clearInterval(t); }, 200);
  }

  if (document.readyState === 'complete') setTimeout(start, 400);
  else window.addEventListener('load', function () { setTimeout(start, 400); });
})();
