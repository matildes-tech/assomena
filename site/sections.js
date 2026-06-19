/* AssoMENA — unified section headers.
   Gives every interior homepage section the same header system: an uppercase
   accent eyebrow (section label), one uniform title size/weight, and a muted
   subtitle — all left-aligned on a single type scale. This creates a clear,
   repeating "new section" signal and a consistent hierarchy. The hero (H1) is
   left untouched so the page title still outranks the section titles.

   Decoration is idempotent and re-applied via a MutationObserver, because some
   sections re-render after hydration (scroll-reveal toggles) and would
   otherwise lose their injected classes/eyebrow. */
(function () {
  'use strict';

  /* exact section title -> short category eyebrow */
  var EYEBROWS = {
    'Three steps to your next opportunity': 'The Process',
    'Who Is It For?': 'Who It Serves',
    'How It Works': 'The Platform',
    'Our Member Companies': 'Members',
    'Latest News': 'Newsroom',
    'Why Join AssoMENA?': 'Why AssoMENA',
    'Ready to Grow Your Business in MENA?': 'Get Started'
  };

  function luminance(rgb) {
    var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(rgb || '');
    if (!m) return 255;
    return 0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3];
  }

  /* find the section's painted background (walk up if the <section> is clear) */
  function sectionBg(node) {
    var el = node;
    while (el && el !== document.body) {
      var bg = getComputedStyle(el).backgroundColor;
      if (bg && !/rgba?\(0,\s*0,\s*0,\s*0\)|transparent/.test(bg)) return bg;
      el = el.parentElement;
    }
    return 'rgb(255,255,255)';
  }

  function decorate(h2) {
    var title = h2.textContent.trim();
    var label = EYEBROWS[title];
    if (!label) return;

    var head = h2.parentElement;
    if (!head) return;

    h2.classList.add('am-sec-title');
    head.classList.add('am-sec-head');

    var sec = h2.closest('section') || head;
    var dark = luminance(sectionBg(sec)) < 140;
    head.classList.toggle('am-sec--dark', dark);

    var nx = h2.nextElementSibling;
    if (nx && nx.tagName === 'P') nx.classList.add('am-sec-sub');

    /* hide any legacy decorative rule bar in the header block */
    [].slice.call(head.children).forEach(function (c) {
      if (c !== h2 && !c.contains(h2) && !(c.textContent || '').trim() &&
          c.offsetHeight > 0 && c.offsetHeight <= 8) {
        c.classList.add('am-sec-hiderule');
      }
    });

    /* ensure exactly one eyebrow, placed immediately before the title */
    var eb = head.querySelector(':scope > .am-sec-eyebrow');
    if (!eb) {
      eb = document.createElement('span');
      eb.className = 'am-sec-eyebrow';
      eb.textContent = label;
    }
    if (h2.previousElementSibling !== eb) head.insertBefore(eb, h2);
  }

  function run() {
    [].slice.call(document.querySelectorAll('h2')).forEach(function (h2) {
      if (EYEBROWS[h2.textContent.trim()]) decorate(h2);
    });
  }

  function needsWork() {
    return [].slice.call(document.querySelectorAll('h2')).some(function (h2) {
      if (!EYEBROWS[h2.textContent.trim()]) return false;
      var head = h2.parentElement;
      return !head || !head.classList.contains('am-sec-head') ||
        !head.querySelector(':scope > .am-sec-eyebrow') ||
        h2.previousElementSibling !== head.querySelector(':scope > .am-sec-eyebrow');
    });
  }

  function start() {
    run();
    var scheduled = false;
    var obs = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        if (needsWork()) run();   /* only touch the DOM when something regressed */
      }, 120);
    });
    obs.observe(document.body, {
      subtree: true, childList: true,
      attributes: true, attributeFilter: ['class']
    });
  }

  if (document.readyState === 'complete') setTimeout(start, 300);
  else window.addEventListener('load', function () { setTimeout(start, 300); });
})();
