/* AssoMENA — "What We Match You With" cards.
   Replaces the 4-tile grid (post-hydration) with all-white cards carrying the
   full info (title, description, feature checklist) and a "LEARN MORE" link
   with an animated arrow. No icons/emoji. Checklist points are distilled from
   the site's own intelligent-matching descriptions.
   Also enlarges the section heading by ~2px. */
(function () {
  'use strict';

  var ARROW =
    '<svg class="am-mcard__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var CHECK =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M5 12.5 9.5 17 19 7.5" stroke="#fff" stroke-width="2.6" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* titles + descriptions preserved; list items distilled from the
     "intelligent-matching" page copy. */
  var CARDS = [
    { title: 'Grants',       desc: 'EU &amp; government funding',
      items: ['EU &amp; national programmes', 'Bilateral incentives'] },
    { title: 'Tenders',      desc: 'Public procurement',
      items: ['Government procurement', 'Public contracts · MENA'] },
    { title: 'Financing',    desc: 'Subsidized credit lines',
      items: ['Loans &amp; credit lines', 'Development-bank instruments'] },
    { title: 'Private RFPs', desc: 'Corporate partnerships',
      items: ['Corporate RFPs', 'Joint-venture deals'] }
  ];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function cardHTML(c) {
    var items = c.items.map(function (it) {
      return '<li class="am-mcard__item">' +
        '<span class="am-mcard__check">' + CHECK + '</span>' +
        '<span class="am-mcard__itemtext">' + it + '</span></li>';
    }).join('');
    return '<span class="am-mcard__content">' +
        '<span class="am-mcard__title">' + c.title + '</span>' +
        '<span class="am-mcard__desc">' + c.desc + '</span>' +
        '<ul class="am-mcard__list">' + items + '</ul>' +
        '<span class="am-mcard__link">Learn more ' + ARROW + '</span>' +
      '</span>';
  }

  function build() {
    var root = el('div', 'am-match');
    var grid = el('div', 'am-match__grid');
    CARDS.forEach(function (c) {
      var a = el('a', 'am-mcard', cardHTML(c));
      a.setAttribute('href', '/intelligent-matching');
      a.setAttribute('aria-label', 'Learn more about ' + c.title.replace(/&amp;/g, '&'));
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
    h.classList.add('am-match-heading');  /* +2px via matching.css */
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
