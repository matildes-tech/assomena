/* AssoMENA "How It Works" (section 2, dark band) — pinned-iPhone scroll
   transition. Replaces the 4-step grid post-hydration; keeps the section
   heading, subtitle and CTA. Uses the site font (Nunito Sans). */
(function () {
  'use strict';

  var STEPS = [
    {
      eyebrow: 'Step 01',
      title: ['Sign ', 'up.'],
      desc: 'Create your free account and choose the membership plan that fits your needs.',
      detail: { label: 'Includes', items: ['Free account', 'Choose your plan', 'Instant access'] },
      screen:
        '<div class="am-sc__bar"><span class="am-sc__dot"></span><span class="am-sc__brand">Asso<span>MENA</span></span></div>' +
        '<p class="am-sc__h">Create your account</p>' +
        '<div class="am-sc__input">✉&nbsp; you@company.com<span class="am-sc__caret"></span></div>' +
        '<p class="am-sc__kicker">Choose a plan</p>' +
        '<div class="am-sc__plans"><div class="am-sc__plan is-sel"><b>Free</b><span>Get started</span></div><div class="am-sc__plan"><b>Pro</b><span>Full access</span></div></div>' +
        '<button class="am-sc__btn">Create account</button>'
    },
    {
      eyebrow: 'Step 02',
      title: ['Create your ', 'profile.'],
      desc: 'Set up your company profile, showcase your products and services, and highlight your expertise.',
      detail: { label: 'Showcase', items: ['Company profile', 'Products & services', 'Your expertise'] },
      screen:
        '<div class="am-sc__head"><span class="am-sc__ava">A</span><div><div class="am-sc__name">Acme Industries</div><div class="am-sc__sub">Company profile</div></div></div>' +
        '<div class="am-sc__field"><span class="k">Products &amp; services</span><div class="am-sc__chips"><span>Steel</span><span>Logistics</span><span>Export</span></div></div>' +
        '<div class="am-sc__field"><span class="k">Expertise</span><div class="am-sc__chips"><span>Engineering</span><span>Trade</span><span>Sourcing</span></div></div>' +
        '<div class="am-sc__prog" style="--am-w:80%"><i></i></div>' +
        '<p class="am-sc__pcap">Profile 80% complete</p>'
    },
    {
      eyebrow: 'Step 03',
      title: ['Connect & ', 'match.'],
      desc: 'Discover companies, explore trade opportunities, and use B2B matchmaking to find the right partners.',
      detail: { label: 'Discover', items: ['Companies', 'Trade opportunities', 'B2B matchmaking'] },
      screen:
        '<p class="am-sc__kicker">B2B matchmaking</p>' +
        matchCard('G', 'Gulf Trade Co', 'Dubai · Trading', '91%') +
        matchCard('M', 'Med Logistics', 'Genoa · Logistics', '84%') +
        matchCard('N', 'Nile Steelworks', 'Cairo · Manufacturing', '78%')
    },
    {
      eyebrow: 'Step 04',
      title: ['Interact & ', 'grow.'],
      desc: 'Send messages, apply to jobs, attend events, and build lasting business relationships.',
      detail: { label: 'Engage', items: ['Messages', 'Jobs', 'Events', 'Partnerships'] },
      screen:
        '<p class="am-sc__kicker">Activity</p>' +
        '<div class="am-sc__msg"><div class="am-sc__bub">Hi! Interested in your export services.</div></div>' +
        '<div class="am-sc__msg"><div class="am-sc__bub me">Great — let’s set up a call this week.</div></div>' +
        '<div class="am-sc__note"><i>✓</i> Applied to: Export Manager</div>' +
        '<div class="am-sc__note"><i>⚑</i> MENA Expo 2026 · RSVP’d</div>' +
        '<div class="am-sc__note"><i>★</i> New partnership request</div>'
    }
  ];

  function matchCard(initial, name, meta, pct) {
    return '<div class="am-sc__match"><span class="am-sc__mava">' + initial + '</span>' +
      '<div><div class="am-sc__mname">' + name + '</div><div class="am-sc__mmeta">' + meta + '</div></div>' +
      '<span class="am-sc__pct">' + pct + '</span></div>';
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function titleHTML(p) { return p[0] + '<em>' + p[1] + '</em>'; }
  function detailHTML(d) {
    var items = d.items.map(function (it) { return '<li>' + it + '</li>'; }).join('');
    return '<p class="am-detail__label">' + d.label + '</p><ul class="am-detail__list">' + items + '</ul>';
  }

  function build() {
    var root = el('div', 'am-hiw');

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
    root.appendChild(desktop);
    /* No mobile fallback: this node lives inside the site's `hidden lg:block`
       container, so it only renders >=1024px. Below that the site shows its
       own original step timeline. */

    /* ---- scroll engine: IntersectionObserver over sentinel bands ---- */
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
        entries.forEach(function (e) { if (e.isIntersecting) setActive(+e.target.dataset.i); });
      }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
      sentinels.forEach(function (s) { io.observe(s); });
    }
    return root;
  }

  /* ---- mobile component: scroll-driven phone + step (renders <1024px) ----
     Same mechanic and 100vh-per-step ratio as desktop: a sticky phone + text
     pinned while a tall rail scrolls; IntersectionObserver sentinels switch
     the active step, so the screen and copy change with the scroll. */
  function buildMobile() {
    var root = el('div', 'am-hiwm');
    var rail = el('div', 'am-hiwm__rail');
    rail.style.height = (STEPS.length * 100) + 'vh';
    var pin = el('div', 'am-hiwm__pin');
    var phoneWrap = el('div', 'am-hiwm__phone');
    var phone = el('div', 'am-phone');
    phone.appendChild(el('div', 'am-phone__island'));
    var screenWrap = el('div', 'am-phone__screen');
    var textWrap = el('div', 'am-hiwm__text');
    var dots = el('div', 'am-hiwm__dots');

    STEPS.forEach(function (s, i) {
      var sc = el('div', 'am-screen', s.screen); sc.dataset.i = i; screenWrap.appendChild(sc);
      var st = el('div', 'am-hiwm__step',
        '<p class="am-step__eyebrow">' + s.eyebrow + '</p>' +
        '<h3 class="am-step__title">' + titleHTML(s.title) + '</h3>' +
        '<p class="am-step__desc">' + s.desc + '</p>');
      st.dataset.i = i; textWrap.appendChild(st);
      var b = document.createElement('button'); b.dataset.i = i; b.setAttribute('aria-label', s.eyebrow);
      b.addEventListener('click', function () {
        var top = rail.getBoundingClientRect().top + window.scrollY;
        var travel = rail.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + (travel * (i + 0.5) / STEPS.length), behavior: 'smooth' });
      });
      dots.appendChild(b);
    });

    phone.appendChild(screenWrap); phoneWrap.appendChild(phone);
    pin.appendChild(phoneWrap); pin.appendChild(textWrap); pin.appendChild(dots);
    rail.appendChild(pin);

    var sentinels = [];
    for (var si = 0; si < STEPS.length; si++) {
      var sen = el('div', 'am-hiwm__sentinel');
      sen.style.top = (si * (100 / STEPS.length)) + '%';
      sen.style.height = (100 / STEPS.length) + '%';
      sen.dataset.i = si;
      rail.appendChild(sen);
      sentinels.push(sen);
    }
    root.appendChild(rail);

    var screens = screenWrap.children, texts = textWrap.children, dotEls = dots.children;
    var cur = -1;
    function setActive(i) {
      if (i === cur || i < 0 || i >= STEPS.length) return; cur = i;
      for (var k = 0; k < STEPS.length; k++) {
        var on = k === i;
        screens[k].classList.toggle('is-active', on);
        texts[k].classList.toggle('is-active', on);
        dotEls[k].classList.toggle('is-active', on);
      }
    }
    setActive(0);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) setActive(+e.target.dataset.i); });
      }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
      sentinels.forEach(function (s) { io.observe(s); });
    }
    return root;
  }

  /* Target = the 4-step grid inside the dark "How It Works" section. */
  function locateStepsNode() {
    var h2 = [].slice.call(document.querySelectorAll('h2')).find(function (e) {
      return e.textContent.trim() === 'How It Works';
    });
    if (!h2) return null;
    var sec = h2; while (sec && sec.tagName !== 'SECTION') sec = sec.parentElement;
    if (!sec) return null;
    var grid = [].slice.call(sec.querySelectorAll('div')).find(function (c) {
      return /grid-cols-4/.test(c.className) && /Sign Up/.test(c.innerText) && /Interact/.test(c.innerText);
    });
    if (!grid) return null;
    var parent = grid.parentElement;
    return (parent && /(^|\s)relative(\s|$)/.test(parent.className)) ? parent : grid;
  }

  /* Target = the site's `lg:hidden` mobile timeline container. */
  function locateMobileNode() {
    var h2 = [].slice.call(document.querySelectorAll('h2')).find(function (e) {
      return e.textContent.trim() === 'How It Works';
    });
    if (!h2) return null;
    var sec = h2; while (sec && sec.tagName !== 'SECTION') sec = sec.parentElement;
    if (!sec) return null;
    return [].slice.call(sec.querySelectorAll('div')).find(function (c) {
      return /lg:hidden/.test(c.className) && /Sign Up/.test(c.innerText) && /Interact/.test(c.innerText);
    }) || null;
  }

  function injectDesktop() {
    if (document.querySelector('.am-hiw')) return true;
    var target = locateStepsNode();
    if (!target) return false;
    target.replaceWith(build());
    return true;
  }
  function injectMobile() {
    if (document.querySelector('.am-hiwm')) return true;
    var target = locateMobileNode();
    if (!target) return false;
    var wrap = el('div', 'lg:hidden'); // keep mobile-only gating
    wrap.appendChild(buildMobile());
    target.replaceWith(wrap);
    return true;
  }

  function start() {
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      var d = injectDesktop(), m = injectMobile();
      if ((d && m) || tries > 40) clearInterval(t);
    }, 200);
  }

  if (document.readyState === 'complete') setTimeout(start, 400);
  else window.addEventListener('load', function () { setTimeout(start, 400); });
})();
