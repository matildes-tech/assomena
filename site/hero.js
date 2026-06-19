/* AssoMENA — cinematic hero builder.
   Replaces the handshake clipart with the rendered EU-MENA globe and turns
   the headline block into a two-column (text left / globe right) layout. */
(function () {
  'use strict';

  function inject() {
    if (document.querySelector('.am-hero-on')) return true;
    var secs = [].slice.call(document.querySelectorAll('section'));
    var hero = secs.find(function (s) { return /Connecting & Empowering/i.test(s.innerText); });
    if (!hero) return false;
    var img = hero.querySelector('img[src*="hands-network"]');
    if (!img) return false;
    var textBlock = hero.querySelector('[class*="max-w-xl"]');
    if (!textBlock) return false;
    var col = textBlock.parentElement;     // the centered flex column
    if (!col) return false;

    hero.classList.add('am-hero-on');
    col.classList.add('am-hero-row');
    textBlock.classList.add('am-hero-text');

    img.classList.add('am-hero-globe');
    img.removeAttribute('srcset');
    img.setAttribute('src', '/v3/images/hero-globe.webp');
    img.setAttribute('alt', 'EU-MENA business network globe');
    var wrap = img.parentElement;
    if (wrap && wrap !== col) wrap.classList.add('am-hero-globe-wrap');
    else img.classList.add('am-hero-globe-wrap');
    return true;
  }

  function start() {
    if (inject()) return;
    var tries = 0;
    var t = setInterval(function () { tries++; if (inject() || tries > 30) clearInterval(t); }, 200);
  }

  if (document.readyState === 'complete') setTimeout(start, 300);
  else window.addEventListener('load', function () { setTimeout(start, 300); });
})();
