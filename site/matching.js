/* AssoMENA — "What We Match You With" gradient cards.
   Replaces the 4-tile grid (post-hydration) with deep-blue gradient cards.
   Keeps the existing copy; only the colours, icons and UI change. */
(function () {
  'use strict';

  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* premium line icons (inner geometry; stroke styling set on wrapper) */
  var ICONS = {
    grant: '<circle cx="12" cy="8.5" r="4.5"/><path d="M8.9 12.6 7.4 20l4.6-2.4 4.6 2.4-1.5-7.4"/>',
    contract: '<path d="M13.5 3.75H7.6A1.6 1.6 0 0 0 6 5.35v13.3A1.6 1.6 0 0 0 7.6 20.25h8.8A1.6 1.6 0 0 0 18 18.65V8.25z"/><path d="M13.5 3.75V8.25H18"/><path d="M9 12.5h6M9 15.5h6"/>',
    bank: '<path d="M12 3.6 20.4 8H3.6z"/><path d="M3.6 11h16.8"/><path d="M6.2 11v6.6M10 11v6.6M14 11v6.6M17.8 11v6.6"/><path d="M3.6 20.4h16.8"/>',
    briefcase: '<rect x="3.6" y="7.6" width="16.8" height="11.8" rx="2.2"/><path d="M8.6 7.6V6.1A2 2 0 0 1 10.6 4.1h2.8A2 2 0 0 1 15.4 6.1V7.6"/><path d="M3.6 12.6h16.8"/>'
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
      'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
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
