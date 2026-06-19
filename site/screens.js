/* AssoMENA — "one info per screen".
   Makes each real content section (hero + the heading sections) at least one
   viewport tall with its content vertically centered, so the page reads one
   idea at a time. Scrolling stays free (no snap).
   Skips the scroll-driven "How It Works" rail (already one-step-per-screen)
   and any section without a real heading (e.g. the partners ticker). */
(function () {
  'use strict';

  function applies(sec) {
    var h = sec.querySelector('h1, h2');
    if (!h) return false;                                   // real content only
    if (h.textContent.trim() === 'How It Works') return false; // scroll rail (by text, race-proof)
    if (sec.querySelector('.am-hiw, .am-hiwm')) return false;   // scroll rail (by node)
    return true;
  }

  function run() {
    [].slice.call(document.querySelectorAll('section')).forEach(function (s) {
      /* toggle, so a section wrongly tagged before its rail injected gets healed */
      s.classList.toggle('am-fullscreen', applies(s));
    });
  }

  function start() {
    run();
    var tries = 0;
    var iv = setInterval(function () { tries++; run(); if (tries > 25) clearInterval(iv); }, 200);
  }

  if (document.readyState === 'complete') setTimeout(start, 300);
  else window.addEventListener('load', function () { setTimeout(start, 300); });
})();
