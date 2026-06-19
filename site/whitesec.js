/* AssoMENA — tag the "Latest News" and "Why Join AssoMENA" sections so they
   can be re-themed white (Why cards kept black). Runs post-hydration. */
(function () {
  'use strict';

  function classify() {
    var news = [].slice.call(document.querySelectorAll('h2')).find(function (e) {
      return e.textContent.trim() === 'Latest News';
    });
    var newsOk = false;
    if (news) {
      news.classList.add('am-white-head');
      var s = news.closest('section');
      if (s) { s.classList.add('am-white-sec', 'am-white-news'); newsOk = true; }
    }

    var why = [].slice.call(document.querySelectorAll('h2')).find(function (e) {
      return /Why Join AssoMENA/i.test(e.textContent);
    });
    var whyOk = false;
    if (why) {
      why.classList.add('am-white-head');
      var s2 = why.closest('section');
      if (s2) {
        s2.classList.add('am-white-sec', 'am-white-why');
        var grid = [].slice.call(s2.querySelectorAll('div')).find(function (d) {
          return /grid-cols/.test(d.className) && d.children.length >= 3;
        });
        if (grid) {
          [].slice.call(grid.children).forEach(function (c) { c.classList.add('am-why-card'); });
        }
        // subtitle (and any non-card text) -> dark
        [].slice.call(s2.querySelectorAll('p')).forEach(function (p) {
          if (!p.closest('.am-why-card')) p.classList.add('am-white-sub');
        });
        whyOk = true;
      }
    }
    return newsOk && whyOk;
  }

  function start() {
    if (classify()) return;
    var tries = 0;
    var iv = setInterval(function () { tries++; if (classify() || tries > 40) clearInterval(iv); }, 200);
  }

  if (document.readyState === 'complete') setTimeout(start, 400);
  else window.addEventListener('load', function () { setTimeout(start, 400); });
})();
