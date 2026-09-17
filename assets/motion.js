// Спільна анімація: поява блоків (.rv), лічильники ([data-count]), текст, що засвічується (.v-text)
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  var rv = document.querySelectorAll('.rv');
  if (!hasIO || reduce) rv.forEach(function (e) { e.classList.add('is-in'); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    rv.forEach(function (e) { io.observe(e); });
  }

  if (hasIO && !reduce) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        var el = e.target, to = +el.dataset.count, from = +(el.dataset.from || 0), suf = el.dataset.suffix || '', t0 = null;
        requestAnimationFrame(function step(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1800, 1);
          el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))) + suf;
          if (p < 1) requestAnimationFrame(step);
        });
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = (el.dataset.from || 0) + (el.dataset.suffix || ''); co.observe(el);
    });
  }

  var texts = document.querySelectorAll('.v-text');
  if (!texts.length || reduce) return;
  texts.forEach(function (text) {
    (function wrap(node) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span'); w.className = 'vw'; w.textContent = part; frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) wrap(n);
      });
    })(text);
  });
  function update() {
    var vh = innerHeight;
    texts.forEach(function (text) {
      var r = text.getBoundingClientRect(), words = text.querySelectorAll('.vw');
      var p = (vh * 0.9 - r.top) / (r.height + vh * 0.15);
      var lit = Math.round(Math.max(0, Math.min(1, p)) * words.length * 1.1);
      words.forEach(function (w, i) { w.classList.toggle('on', i < lit); });
    });
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();

// Галерея: кнопки прокрутки (data-gal-prev / data-gal-next = id стрічки)
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-gal-prev],[data-gal-next]');
  if (!b) return;
  var id = b.getAttribute('data-gal-prev') || b.getAttribute('data-gal-next');
  var g = document.getElementById(id);
  if (g) g.scrollBy({ left: (b.hasAttribute('data-gal-next') ? 1 : -1) * g.clientWidth * 0.8, behavior: 'smooth' });
});

// Відео YouTube: спершу обкладинка, плеєр вантажиться лише після натискання
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-yt]');
  if (!b) return;
  var f = document.createElement('iframe');
  f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.yt + '?autoplay=1&rel=0';
  f.title = b.dataset.ytTitle || 'YouTube';
  f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
  f.allowFullscreen = true;
  f.className = b.className.replace('group', '');
  b.replaceWith(f);
});
