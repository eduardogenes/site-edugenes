/* ============================================================
   v2 «Documento» — modo dev
   Statusline estilo vim + modo inspeção (tecla i): outlines,
   tags de elemento e grid de colunas sobre o próprio site.
   ============================================================ */
(function () {
  'use strict';

  var SECT_LABEL = { pt: 'seção', en: 'section' };

  /* ---------- statusline ---------- */
  var bar = document.createElement('div');
  bar.className = 'devbar';
  bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML =
    '<span class="mode">-- NORMAL --</span>' +
    '<span class="file">~/eduardo-genes/portfolio.html</span>' +
    '<span class="sect">§ masthead</span>' +
    '<span class="sp"></span>' +
    '<button class="hint" type="button" tabindex="-1">[i] inspecionar</button>' +
    '<span class="dim pct">0%</span>' +
    '<span class="dim dims"></span>' +
    '<span class="dim">utf-8</span>' +
    '<span class="caret"></span>';
  document.body.appendChild(bar);
  document.body.classList.add('has-devbar');

  var modeEl = bar.querySelector('.mode');
  var sectEl = bar.querySelector('.sect');
  var pctEl = bar.querySelector('.pct');
  var dimsEl = bar.querySelector('.dims');
  var hintEl = bar.querySelector('.hint');

  function fmtSect(el) {
    var id = el.id ? '#' + el.id : '';
    return '§ ' + (id ? id.slice(1) : (el.getAttribute('data-screen-label') || el.tagName.toLowerCase()));
  }

  /* seção atual via IO */
  var watch = Array.prototype.slice.call(document.querySelectorAll('[data-screen-label]'));
  if ('IntersectionObserver' in window && watch.length) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) sectEl.textContent = fmtSect(en.target);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    watch.forEach(function (el) { sio.observe(el); });
  }

  /* scroll % + dimensões */
  function upd() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.round(window.scrollY / max * 100) : 0;
    pctEl.textContent = p <= 0 ? 'topo' : (p >= 99 ? 'fim' : p + '%');
    dimsEl.textContent = window.innerWidth + '×' + window.innerHeight;
  }
  window.addEventListener('scroll', upd, { passive: true });
  window.addEventListener('resize', upd);
  upd();

  /* ---------- modo inspeção ---------- */
  var built = false;
  function buildOverlays() {
    if (built) return;
    built = true;
    /* grid de 12 colunas + baseline */
    var grid = document.createElement('div');
    grid.className = 'dev-grid';
    grid.setAttribute('aria-hidden', 'true');
    var cols = document.createElement('div'); cols.className = 'cols';
    for (var i = 0; i < 12; i++) {
      var col = document.createElement('i');
      col.style.left = 'calc(48px + (100% - 96px) * ' + (i / 12) + ')';
      col.style.width = 'calc((100% - 96px) / 12 - 14px)';
      cols.appendChild(col);
    }
    var rows = document.createElement('div'); rows.className = 'rows';
    grid.appendChild(rows); grid.appendChild(cols);
    document.body.appendChild(grid);
    /* tags de elemento */
    document.querySelectorAll('[data-screen-label]').forEach(function (el) {
      if (el.querySelector(':scope > .dev-tag')) return;
      var tag = document.createElement('span');
      tag.className = 'dev-tag';
      var t = el.tagName.toLowerCase();
      tag.textContent = '<' + t + (el.id ? ' id="' + el.id + '"' : '') + '>';
      el.appendChild(tag);
    });
  }

  function setInspect(on) {
    if (on) buildOverlays();
    document.body.classList.toggle('dev-inspect', on);
    modeEl.textContent = on ? '-- INSPECT --' : '-- NORMAL --';
    hintEl.textContent = on ? '[esc] sair' : '[i] inspecionar';
  }
  function toggleInspect() { setInspect(!document.body.classList.contains('dev-inspect')); }

  window.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key === 'i' || e.key === 'I') { toggleInspect(); }
    else if (e.key === 'Escape') { setInspect(false); }
  });
  hintEl.addEventListener('click', toggleInspect);
})();
