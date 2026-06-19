/* AssoMENA — "Our Member Companies" logo grid (VideoTouch-style).
   Replaces the member-cards grid (post-hydration) with a staggered 5-4-5
   grid of invented member-company logo cards; keeps the section header. */
(function () {
  'use strict';

  // 14 invented member companies, monochrome wordmarks (icon = currentColor).
  var COMPANIES = [
    { name: 'Almaris Group', svg: '<path d="M12 2l7 10-7 10-7-10z" fill="currentColor"/>' },
    { name: 'Tessera Foods', svg: '<g fill="currentColor"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></g>' },
    { name: 'Borealis Steel', svg: '<path d="M2 20L9 7l4 7 2.5-4L22 20z" fill="currentColor"/>' },
    { name: 'Qasr Textiles', svg: '<g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="13" height="12" rx="3"/><rect x="8" y="6" width="13" height="12" rx="3"/></g>' },
    { name: 'Veluna Pharma', svg: '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v10M7 12h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' },
    { name: 'Helvar Logistics', svg: '<path d="M2 17c4.5 0 4.5-9 9-9s4.5 9 9 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17 5l4 3-4 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' },
    { name: 'Marisol Agro', svg: '<circle cx="12" cy="12" r="4" fill="currentColor"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M5 19l2-2"/></g>' },
    { name: 'Onyx Maritime', svg: '<path d="M12 3v15M12 18c-4 0-7-3-7-7M12 18c4 0 7-3 7-7M8 7h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="4" r="1.8" fill="currentColor"/>' },
    { name: 'Cobalt Energy', svg: '<path d="M13 2L4 14h6l-1 8 9-12h-6z" fill="currentColor"/>' },
    { name: 'Dunara Capital', svg: '<g fill="currentColor"><rect x="3" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></g>' },
    { name: 'Saphir Tech', svg: '<path d="M12 2l8.7 5v10L12 22 3.3 17V7z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" fill="currentColor"/>' },
    { name: 'Verdant Mills', svg: '<path d="M12 3C7 7 4 11 4 15a8 8 0 0016 0c0-4-3-8-8-12z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 22V10" stroke="currentColor" stroke-width="1.6"/>' },
    { name: 'Tramonti & Co', svg: '<path d="M5 17a7 7 0 0114 0" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2 17h20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 4v3M5 8l1.5 1.5M19 8l-1.5 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' },
    { name: 'Nilora Trade', svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18.5" cy="12" r="2.2" fill="currentColor"/>' }
  ];

  // distribute as 5 / 4 / 5 across three staggered rows (VideoTouch layout)
  var ROWS = [5, 4, 5];

  function nameHTML(name) {
    var p = name.split(' ');
    if (p.length === 1) return name;
    return p[0] + ' <i>' + p.slice(1).join(' ') + '</i>';
  }
  var MOBILE_SHOW = 6;   // cards visible on mobile before the "All companies" button
  var MOBILE_FADE = 4;   // fade cards from this index up to MOBILE_SHOW

  function cardHTML(c, gi) {
    var cls = 'vt-card';
    if (gi >= MOBILE_SHOW) cls += ' vt-hide-m';
    else if (gi >= MOBILE_FADE) cls += ' vt-fade-m';
    return '<div class="' + cls + '">' +
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + c.svg + '</svg>' +
      '<span>' + nameHTML(c.name) + '</span></div>';
  }

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'vt-members';
    var rows = '', idx = 0;
    ROWS.forEach(function (n) {
      var cells = '';
      for (var k = 0; k < n && idx < COMPANIES.length; k++, idx++) cells += cardHTML(COMPANIES[idx], idx);
      rows += '<div class="vt-row">' + cells + '</div>';
    });
    wrap.innerHTML = '<div class="vt-grid">' + rows + '</div>' +
      '<a class="vt-more" href="/companies-directory">All companies <span aria-hidden="true">→</span></a>';
    return wrap;
  }

  function locate() {
    var h2 = [].slice.call(document.querySelectorAll('h2')).find(function (e) {
      return e.textContent.trim() === 'Our Member Companies';
    });
    if (!h2) return null;
    var sec = h2; while (sec && sec.tagName !== 'SECTION') sec = sec.parentElement;
    if (!sec) return null;
    var header = [].slice.call(sec.children).find(function (c) { return c.contains(h2); });
    var target = [].slice.call(sec.children).find(function (c) { return c !== header; });
    return target || null;
  }

  function inject() {
    if (document.querySelector('.vt-members')) return true;
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
