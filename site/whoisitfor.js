/* AssoMENA — "Who Is It For?" cards, restyled in the dremonpro use-cases card
   manner: white card, Oswald uppercase eyebrow + title, paragraph below.
   Replaces the section's 4-card grid post-hydration; copy is preserved. */
(function () {
  'use strict';

  /* titles + descriptions preserved from the original cards */
  var CARDS = [
    { num: '01', title: 'European Companies',
      desc: 'Expand your business into MENA markets. Access trade leads, find local partners, and attend B2B events tailored to your industry.' },
    { num: '02', title: 'Startups &amp; Entrepreneurs',
      desc: 'Get visibility, connect with investors and mentors, and discover opportunities to scale your innovation across borders.' },
    { num: '03', title: 'Franchise Seekers',
      desc: 'Explore franchise opportunities in MENA countries or offer your brand to international partners looking to expand.' },
    { num: '04', title: 'Representatives &amp; Agents',
      desc: 'Represent companies in your country, earn commissions, and build a portfolio of European brands entering the MENA region.' }
  ];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function cardHTML(c) {
    return '<span class="wif-tag">' + c.num + '</span>' +
      '<h3 class="wif-title">' + c.title + '</h3>' +
      '<p class="wif-desc">' + c.desc + '</p>';
  }

  function build() {
    var root = el('div', 'wif');
    var grid = el('div', 'wif__grid');
    CARDS.forEach(function (c) { grid.appendChild(el('article', 'wif-card', cardHTML(c))); });
    root.appendChild(grid);
    return root;
  }

  /* Target = the card grid inside the "Who Is It For?" section. */
  function locate() {
    var h = [].slice.call(document.querySelectorAll('h2')).find(function (e) {
      return e.textContent.trim() === 'Who Is It For?';
    });
    if (!h) return null;
    var sec = h; while (sec && sec.tagName !== 'SECTION') sec = sec.parentElement;
    if (!sec) return null;
    return [].slice.call(sec.querySelectorAll('div')).find(function (c) {
      return /grid/.test(c.className) &&
        /European Companies/.test(c.innerText) && /Representatives/.test(c.innerText);
    }) || null;
  }

  function inject() {
    if (document.querySelector('.wif')) return true;
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
