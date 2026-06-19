/* AssoMENA — cinematic hero builder.
   Replaces the handshake clipart with the rendered EU-MENA globe and turns
   the headline block into a two-column (text left / globe right) layout. */
(function () {
  'use strict';

  // Reorganized hero text — keeps all original copy (headline, the three
  // platform tags, the non-profit description), adds useful CTAs.
  var HERO_HTML =
    '<p class="am-hero-eyebrow">EU ↔ MENA business network</p>' +
    '<h1 class="am-hero-h1">Connecting &amp; Empowering <span class="am-hero-accent">EU-MENA</span> Businesses</h1>' +
    '<div class="am-hero-chips"><span>Intelligent platform</span><span>Advanced networking tools</span><span>Cross-border opportunities</span></div>' +
    '<p class="am-hero-lead">AssoMENA is a non-profit business association that connects EU and MENA companies.</p>' +
    '<div class="am-hero-cta">' +
      '<a class="am-hero-btn am-hero-btn--primary" href="/register">Get started</a>' +
      '<a class="am-hero-btn am-hero-btn--ghost" href="/companies-directory">Explore the network</a>' +
    '</div>';

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
    textBlock.innerHTML = HERO_HTML;

    img.classList.add('am-hero-globe');
    img.removeAttribute('srcset');
    img.setAttribute('src', '/v3/images/hero-globe.webp');
    img.setAttribute('alt', 'EU-MENA business network globe');
    var wrap = (img.parentElement && img.parentElement !== col) ? img.parentElement : img;
    wrap.classList.add('am-hero-globe-wrap');

    // cursor spotlight: brighten the globe where the cursor is
    if (wrap !== img) {
      var spot = document.createElement('div');
      spot.className = 'am-hero-spot';
      wrap.appendChild(spot);
      wrap.addEventListener('pointermove', function (e) {
        var r = wrap.getBoundingClientRect();
        wrap.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        wrap.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
        spot.style.opacity = '1';
      });
      wrap.addEventListener('pointerleave', function () { spot.style.opacity = '0'; });
    }

    // remove the "Intelligent Scanning & Matching" block inside the hero
    var scan = [].slice.call(hero.children).find(function (c) {
      return /Intelligent Scanning & Matching/i.test(c.innerText);
    });
    if (scan) scan.style.display = 'none';

    // remove the cursor-responsive background canvas
    var bgCanvas = hero.querySelector('canvas');
    if (bgCanvas) bgCanvas.style.setProperty('display', 'none', 'important');

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
