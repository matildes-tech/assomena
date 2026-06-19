/* AssoMENA — "Partners & Collaborators" client-logo marquee (Lifer-style).
   Inserted just below the hero section, post-hydration. Invented companies. */
(function () {
  'use strict';

  // Minimalist monochrome wordmarks (icon uses currentColor) — invented brands.
  var LOGOS = [
    { name: 'Medora', accent: '', svg: '<circle cx="13" cy="13" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="13" cy="13" r="3.2" fill="currentColor"/>' },
    { name: 'NovaTrade', svg: '<path d="M13 3l2.6 6.6L22 12l-6.4 2.4L13 21l-2.6-6.6L4 12l6.4-2.4z" fill="currentColor"/>' },
    { name: 'Cedarstone', svg: '<path d="M13 3l8.7 5v8L13 21l-8.7-5V8z" fill="none" stroke="currentColor" stroke-width="1.6"/>' },
    { name: 'Atlas Mercantile', svg: '<circle cx="13" cy="13" r="9.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 13h18M13 3.8c3 2.4 3 14 0 18.4M13 3.8c-3 2.4-3 14 0 18.4" fill="none" stroke="currentColor" stroke-width="1.4"/>' },
    { name: 'Lumen', svg: '<circle cx="13" cy="13" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M13 2.5v3M13 20.5v3M2.5 13h3M20.5 13h3M5.8 5.8l2.1 2.1M18.1 18.1l2.1 2.1M18.1 7.9l2.1-2.1M5.8 20.2l2.1-2.1"/></g>' },
    { name: 'Sahara Logistics', svg: '<path d="M3 17c4 0 4-8 8-8s4 8 8 8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16 6l4 3-4 3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' },
    { name: 'Verde Capital', svg: '<path d="M13 3C8 7 5 11 5 15a8 8 0 0016 0c0-4-3-8-8-12z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M13 22V10" stroke="currentColor" stroke-width="1.4"/>' },
    { name: 'Orontes', svg: '<path d="M3 9c3.3 0 3.3 4 6.7 4S13 9 16.3 9 19.7 13 23 13M3 16c3.3 0 3.3-4 6.7-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' }
  ];

  // split each name to render the second word lighter, like real wordmarks
  function nameHTML(name) {
    var parts = name.split(' ');
    if (parts.length === 1) return name;
    return parts[0] + ' <i>' + parts.slice(1).join(' ') + '</i>';
  }

  function logoHTML(l) {
    return '<a class="am-logo" href="#" tabindex="-1" aria-label="' + l.name + '" onclick="return false">' +
      '<svg viewBox="0 0 26 26" fill="none" aria-hidden="true">' + l.svg + '</svg>' +
      '<span>' + nameHTML(l.name) + '</span></a>';
  }

  function groupHTML() {
    return '<div class="am-partners__group" aria-hidden="false">' + LOGOS.map(logoHTML).join('') + '</div>';
  }

  function build() {
    var sec = document.createElement('section');
    sec.className = 'am-partners';
    sec.setAttribute('aria-label', 'Partners and collaborators');
    sec.innerHTML =
      '<p class="am-partners__title">Partners &amp; Collaborators</p>' +
      '<div class="am-partners__viewport"><div class="am-partners__track">' +
      groupHTML() + groupHTML() +
      '</div></div>';
    return sec;
  }

  function findHero() {
    var secs = [].slice.call(document.querySelectorAll('section'));
    // prefer the section that holds the hero headline
    var hero = secs.find(function (s) { return /Connecting & Empowering|EU-MENA Businesses/i.test(s.innerText); });
    return hero || secs[0] || null;
  }

  function inject() {
    if (document.querySelector('.am-partners')) return true;
    var hero = findHero();
    if (!hero) return false;
    hero.insertAdjacentElement('afterend', build());
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
