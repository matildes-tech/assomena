/* AssoMENA "How It Works" — pinned-iPhone scroll transition (novu-style)
   Replaces the 3-step block post-hydration; keeps all other section content. */
(function () {
  'use strict';

  var STEPS = [
    {
      eyebrow: 'Step 01',
      title: ['Enter your ', 'website.'],
      desc: 'Paste your company URL and our AI crawler reads your public pages to understand what your business does, where you operate, and what you offer.',
      detail: {
        label: 'Pages AI reads',
        items: ['Homepage', '/about', '/services', '/products', '/contact']
      },
      screen:
        '<div class="am-sc__bar"><span class="am-sc__dot"></span><span class="am-sc__brand">Asso<span>MENA</span></span></div>' +
        '<p class="am-sc__kicker">Connect your site</p>' +
        '<div class="am-sc__input">🔗 https://acme-industries.eu<span class="am-sc__caret"></span></div>' +
        '<p class="am-sc__kicker">Scanning pages</p>' +
        '<div class="am-sc__row">Homepage <span class="am-chk am-chk--ok">✓</span></div>' +
        '<div class="am-sc__row">/about <span class="am-chk am-chk--ok">✓</span></div>' +
        '<div class="am-sc__row">/services <span class="am-chk am-chk--ok">✓</span></div>' +
        '<div class="am-sc__row">/products <span class="am-chk am-chk--load">◌</span></div>' +
        '<div class="am-sc__row" style="border:0">/contact <span class="am-chk" style="color:#5b6072">·</span></div>' +
        '<div class="am-sc__prog" style="--am-w:64%"><i></i></div>'
    },
    {
      eyebrow: 'Step 02',
      title: ['AI builds your ', 'profile.'],
      desc: 'Within minutes, AI extracts your industry, size, capabilities, and certifications into a structured profile ready for matching.',
      detail: {
        label: 'Profile includes',
        items: ['Industry sectors', 'Size & employees', 'Markets & geography', 'Capabilities', 'Certifications']
      },
      screen:
        '<div class="am-sc__head"><span class="am-sc__ava">A</span><div><div class="am-sc__name">Acme Industries</div><div class="am-sc__sub">Verified profile ✓</div></div></div>' +
        '<div class="am-sc__field"><span class="k">Industry</span><span class="am-sc__pill">Manufacturing</span></div>' +
        '<div class="am-sc__field"><span class="k">Size</span><span class="am-sc__pill">50–200</span></div>' +
        '<div class="am-sc__field"><span class="k">Markets</span><span class="am-sc__pill">EU · MENA</span></div>' +
        '<div class="am-sc__field" style="border:0"><span class="k">Capabilities</span></div>' +
        '<div class="am-sc__chips"><span>Steel</span><span>Logistics</span><span>Export</span><span>Engineering</span></div>' +
        '<div class="am-sc__field" style="margin-top:8px"><span class="k">Certifications</span><span class="am-sc__pill">ISO 9001 ✓</span></div>' +
        '<div class="am-sc__prog" style="--am-w:100%;margin-top:14px"><i></i></div>'
    },
    {
      eyebrow: 'Step 03',
      title: ['Get scored ', 'matches.'],
      desc: 'Each opportunity is scored on eligibility, relevance, and competitive advantage so you focus on the best-fit matches first.',
      detail: {
        label: 'Scoring',
        items: [['Eligibility', '40%'], ['Relevance', '40%'], ['Competitive', '20%']]
      },
      screen:
        '<p class="am-sc__kicker" style="margin-bottom:12px">Top matches for you</p>' +
        match('EU Green Deal Grant', '92', [92, 88, 70]) +
        match('GCC Infrastructure Tender', '87', [90, 82, 64]) +
        match('Italy–MENA Trade Lead', '81', [78, 86, 60])
    }
  ];

  function match(name, score, bars) {
    return '<div class="am-sc__match"><h5>' + name + '<span class="am-sc__score">' + score + '</span></h5>' +
      '<div class="am-sc__bars"><i style="--v:' + bars[0] + '%"></i><i style="--v:' + bars[1] + '%"></i><i style="--v:' + bars[2] + '%"></i></div></div>';
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function titleHTML(parts) { return parts[0] + '<em>' + parts[1] + '</em>'; }

  function detailHTML(d) {
    var items = d.items.map(function (it) {
      if (Array.isArray(it)) return '<li>' + it[0] + '<span class="am-val">' + it[1] + '</span></li>';
      return '<li>' + it + '</li>';
    }).join('');
    return '<p class="am-detail__label">' + d.label + '</p><ul class="am-detail__list">' + items + '</ul>';
  }

  function build() {
    var root = el('div', 'am-hiw');

    /* ---- desktop pinned transition ---- */
    var desktop = el('div', 'am-hiw__desktop');
    var rail = el('div', 'am-hiw__rail');
    rail.style.height = (STEPS.length * 100) + 'vh';
    var pin = el('div', 'am-hiw__pin');
    var grid = el('div', 'am-hiw__grid');

    var left = el('div', 'am-hiw__col am-hiw__col--left');
    var phoneCol = el('div', 'am-hiw__phone');
    var right = el('div', 'am-hiw__col am-hiw__col--right');

    var phone = el('div', 'am-phone');
    var screenWrap = el('div', 'am-phone__screen');
    phone.appendChild(el('div', 'am-phone__island'));

    STEPS.forEach(function (s, i) {
      var step = el('div', 'am-step',
        '<p class="am-step__eyebrow">' + s.eyebrow + '</p>' +
        '<h3 class="am-step__title">' + titleHTML(s.title) + '</h3>' +
        '<p class="am-step__desc">' + s.desc + '</p>');
      step.dataset.i = i; left.appendChild(step);

      var det = el('div', 'am-detail', detailHTML(s.detail)); det.dataset.i = i; right.appendChild(det);

      var sc = el('div', 'am-screen', s.screen); sc.dataset.i = i; screenWrap.appendChild(sc);
    });

    phone.appendChild(screenWrap);
    phoneCol.appendChild(phone);
    grid.appendChild(left); grid.appendChild(phoneCol); grid.appendChild(right);

    var dots = el('div', 'am-hiw__dots');
    STEPS.forEach(function (s, i) {
      var b = document.createElement('button'); b.dataset.i = i;
      b.setAttribute('aria-label', s.eyebrow);
      b.addEventListener('click', function () {
        var top = rail.getBoundingClientRect().top + window.scrollY;
        var travel = rail.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + (travel * (i + 0.5) / STEPS.length), behavior: 'smooth' });
      });
      dots.appendChild(b);
    });

    pin.appendChild(grid); pin.appendChild(dots); rail.appendChild(pin);

    /* sentinels: tile the rail in N bands; whichever crosses viewport
       center is the active step (robust to smooth-scroll libraries). */
    var sentinels = [];
    for (var si = 0; si < STEPS.length; si++) {
      var sen = el('div', 'am-hiw__sentinel');
      sen.style.top = (si * (100 / STEPS.length)) + '%';
      sen.style.height = (100 / STEPS.length) + '%';
      sen.dataset.i = si;
      rail.appendChild(sen);
      sentinels.push(sen);
    }
    desktop.appendChild(rail);

    /* ---- mobile fallback ---- */
    var mob = el('div', 'am-hiw__mobile');
    STEPS.forEach(function (s) {
      mob.appendChild(el('div', 'am-card',
        '<p class="am-step__eyebrow">' + s.eyebrow + '</p>' +
        '<h3 class="am-step__title">' + titleHTML(s.title) + '</h3>' +
        '<p class="am-step__desc" style="max-width:none">' + s.desc + '</p>' +
        '<div class="am-card__detail">' + detailHTML(s.detail) + '</div>'));
    });

    root.appendChild(desktop); root.appendChild(mob);

    /* ---- scroll engine ----
       IntersectionObserver tracks which sentinel band crosses the viewport
       centre line. Works with any scroll container / smooth-scroll library
       and without relying on scroll events or rAF polling. */
    var steps = left.children, dets = right.children, screens = screenWrap.children, dotEls = dots.children;
    var cur = -1;
    function setActive(i) {
      if (i === cur || i < 0 || i >= STEPS.length) return; cur = i;
      for (var k = 0; k < STEPS.length; k++) {
        var on = k === i;
        steps[k].classList.toggle('is-active', on);
        dets[k].classList.toggle('is-active', on);
        screens[k].classList.toggle('is-active', on);
        dotEls[k].classList.toggle('is-active', on);
      }
    }
    setActive(0);

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setActive(+e.target.dataset.i);
        });
      }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
      sentinels.forEach(function (s) { io.observe(s); });
    }

    return root;
  }

  function locateStepsNode() {
    var label = [].slice.call(document.querySelectorAll('*')).find(function (e) {
      return !e.children.length && e.textContent.trim() === 'HOW IT WORKS';
    });
    if (!label) return null;
    var inner = label.closest('[class*="max-w"]');
    if (!inner) return null;
    return [].slice.call(inner.children).find(function (c) {
      return /STEP 1/.test(c.innerText) && /STEP 3/.test(c.innerText);
    });
  }

  function inject() {
    if (document.querySelector('.am-hiw')) return true;
    var target = locateStepsNode();
    if (!target) return false;
    var section = build();
    target.replaceWith(section);
    // keep React from re-inserting: stop here. Static page => no re-render.
    return true;
  }

  function start() {
    if (inject()) return;
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      if (inject() || tries > 30) clearInterval(t);
    }, 200);
  }

  if (document.readyState === 'complete') setTimeout(start, 400);
  else window.addEventListener('load', function () { setTimeout(start, 400); });
})();
