/* AssoMENA — "What We Match You With" gradient cards.
   Replaces the 4-tile grid (post-hydration) with brand gradient cards.
   Keeps the existing copy; only the colours, icons and UI change. */
(function () {
  'use strict';

  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* professional line icons (inner geometry; stroke styling set on wrapper) */
  var ICONS = {
    grant: '<circle cx="12" cy="9" r="5"/><path d="M8.8 13.2 7 21l5-2.6L17 21l-1.8-7.8"/>',
    contract: '<path d="M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5z"/><path d="M14 3.5V8h4"/><path d="M9 12.5h6M9 15.5h6"/>',
    bank: '<path d="M12 3.5l8.5 4.5H3.5z"/><path d="M3.5 11h17"/><path d="M6 11v7M10 11v7M14 11v7M18 11v7"/><path d="M3.5 20.5h17"/>',
    briefcase: '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M8.5 7.5V6A2 2 0 0 1 10.5 4h3A2 2 0 0 1 15.5 6v1.5"/><path d="M3.5 12.5h17"/>'
  };

  /* copy preserved from the original tiles; variant/badge/icon are styling only */
  var CARDS = [
    { variant: 'grants',    icon: 'grant',     badge: 'Funding',   title: 'Grants',      desc: 'EU &amp; government funding' },
    { variant: 'tenders',   icon: 'contract',  badge: 'Public',    title: 'Tenders',     desc: 'Public procurement' },
    { variant: 'financing', icon: 'bank',      badge: 'Credit',    title: 'Financing',   desc: 'Subsidized credit lines' },
    { variant: 'rfp',       icon: 'briefcase', badge: 'Corporate', title: 'Private RFPs', desc: 'Corporate partnerships' }
  ];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function svg(cls, inner) {
    return '<svg class="' + cls + '" viewBox="0 0 24 24" fill="none" aria-hidden="true" ' +
      'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
      inner + '</svg>';
  }

  function cardHTML(c) {
    var geo = ICONS[c.icon];
    return svg('am-mcard__bg', geo) +
      '<span class="am-mcard__top">' +
        '<span class="am-mcard__icon">' + svg('', geo) + '</span>' +
        '<span class="am-mcard__badge"><i class="am-mcard__dot"></i>' + c.badge + '</span>' +
      '</span>' +
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
