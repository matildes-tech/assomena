/* AssoMENA — "Three steps to your next opportunity" horizontal accordion.
   Replaces the 3-step block (post-hydration), removes the "HOW IT WORKS"
   eyebrow, keeps the heading and the exact existing step content. */
(function () {
  'use strict';

  // Exact existing content of the assomena section.
  var STEPS = [
    {
      title: 'Enter Your Website',
      desc: 'Paste your company URL and our AI crawler reads your public pages to understand what your business does, where you operate, and what you offer.',
      label: 'Pages AI reads',
      items: ['Homepage', '/about', '/services', '/products', '/contact']
    },
    {
      title: 'AI Builds Your Profile',
      desc: 'Within minutes, AI extracts your industry, size, capabilities, and certifications into a structured profile ready for matching.',
      label: 'Profile includes',
      items: ['Industry sectors', 'Size & employees', 'Markets & geography', 'Capabilities', 'Certifications']
    },
    {
      title: 'Get Scored Matches',
      desc: 'Each opportunity is scored on eligibility, relevance, and competitive advantage so you focus on the best-fit matches first.',
      label: 'Scoring',
      items: ['Eligibility 40%', 'Relevance 40%', 'Competitive 20%']
    }
  ];

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  var CHEV = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function panelHTML(s, i) {
    var chips = s.items.map(function (it) { return '<span>' + esc(it) + '</span>'; }).join('');
    return '<div class="rs-panel' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '">' +
      '<div class="rs-head">' +
        '<span class="rs-num">' + (i + 1) + '</span>' +
        '<div class="rs-nav"><button class="rs-prev" aria-label="Previous step">‹</button><button class="rs-next" aria-label="Next step">›</button></div>' +
        '<span class="rs-htitle">' + esc(s.title) + '</span>' +
        '<span class="rs-chev">' + CHEV + '</span>' +
      '</div>' +
      '<span class="rs-vtitle">' + esc(s.title) + '</span>' +
      '<div class="rs-content">' +
        '<h3 class="rs-title">' + esc(s.title) + '</h3>' +
        '<p class="rs-desc">' + esc(s.desc) + '</p>' +
        '<div class="rs-detail"><p class="rs-detail__label">' + esc(s.label) + '</p>' +
        '<div class="rs-chips">' + chips + '</div></div>' +
      '</div></div>';
  }

  function build() {
    var root = document.createElement('div');
    root.className = 'rs-accordion';
    root.innerHTML = '<div class="rs-track">' + STEPS.map(panelHTML).join('') + '</div>';

    var track = root.querySelector('.rs-track');
    var panels = [].slice.call(track.children);
    var cur = 0, timer = null, stopped = false;

    function setActive(i) {
      cur = (i + STEPS.length) % STEPS.length;
      panels.forEach(function (p, k) { p.classList.toggle('is-active', k === cur); });
    }
    function advance() { if (!stopped) setActive(cur + 1); }
    function startAuto() { if (!stopped && !timer && window.innerWidth > 768) timer = setInterval(advance, 5500); }
    function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

    track.addEventListener('click', function (e) {
      var panel = e.target.closest('.rs-panel'); if (!panel) return;
      stopped = true; stopAuto();
      if (e.target.closest('.rs-prev')) { setActive(cur - 1); return; }
      if (e.target.closest('.rs-next')) { setActive(cur + 1); return; }
      setActive(+panel.dataset.i);
    });
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);
    startAuto();

    return root;
  }

  function locate() {
    var heading = [].slice.call(document.querySelectorAll('*')).find(function (e) {
      return e.children.length <= 2 && e.textContent.trim() === 'Three steps to your next opportunity';
    });
    if (!heading) return null;
    var inner = heading.closest('[class*="max-w"]');
    if (!inner) return null;
    var stepsBlock = [].slice.call(inner.children).find(function (c) {
      return /STEP 1/.test(c.innerText) && /STEP 3/.test(c.innerText);
    });
    var eyebrow = [].slice.call(inner.querySelectorAll('*')).find(function (e) {
      return !e.children.length && e.textContent.trim() === 'HOW IT WORKS';
    });
    return { stepsBlock: stepsBlock, eyebrow: eyebrow };
  }

  function inject() {
    if (document.querySelector('.rs-accordion')) return true;
    var t = locate();
    if (!t || !t.stepsBlock) return false;
    if (t.eyebrow) t.eyebrow.remove();
    t.stepsBlock.replaceWith(build());
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
