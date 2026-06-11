/* ============================================================
   v2 «Documento» — clock, i18n, índice expansível, tweaks
   Reusa window.FEATURED / SECONDARY / EXPERIENCE / EDUCATION / CERTS
   serializados inline pelo index.astro (fonte: src/data/portfolio.ts)
   ============================================================ */
(function () {
  'use strict';
  var lang = 'pt';

  var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "ink": "red",
    "stamp": true,
    "paper": "creme",
    "magnet": true,
    "type": "archivo",
    "photo": "pb",
    "boot": true,
    "scrollfx": true,
    "devbar": true
  }/*EDITMODE-END*/;

  var TYPES = {
    archivo:    { d: "'Archivo', sans-serif",             s: "'Newsreader', serif",       label: 'Industrial', sub: 'Archivo + Newsreader' },
    bricolage:  { d: "'Bricolage Grotesque', sans-serif", s: "'Lora', serif",             label: 'Com textura', sub: 'Bricolage + Lora' },
    space:      { d: "'Space Grotesk', sans-serif",       s: "'Instrument Serif', serif", label: 'Técnica', sub: 'Space Grotesk + Instrument' },
    instrument: { d: "'Instrument Sans', sans-serif",     s: "'Instrument Serif', serif", label: 'Estúdio', sub: 'Instrument Sans + Serif' }
  };

  /* fontes das opções não-padrão do tweak — só baixam se usadas (dieta de fontes) */
  var TYPE_FONTS = {
    bricolage: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Lora:ital,wght@0,400..600;1,400..600&display=swap',
    space: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400..700&family=Instrument+Serif:ital@0;1&display=swap',
    instrument: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700&family=Instrument+Serif:ital@0;1&display=swap'
  };
  function ensureTypeFont(k) {
    if (!TYPE_FONTS[k] || document.getElementById('gf-' + k)) return;
    var l = document.createElement('link');
    l.id = 'gf-' + k; l.rel = 'stylesheet'; l.href = TYPE_FONTS[k];
    document.head.appendChild(l);
  }

  var INKS = { red: '#c92f12', blue: '#1d3fbb', black: '#181611' };
  var INKS_NIGHT = { red: '#ff5a33', blue: '#7d92ff', black: '#efece3' };
  var PAPERS = {
    /* creme ajustado pelo Eduardo via edição direta (rgb 238,238,230) */
    creme:  { p: '#eeeee6', i: '#181611', i2: '#5b564a' },
    branco: { p: '#faf9f5', i: '#15130f', i2: '#555148' },
    jornal: { p: '#e2dfd4', i: '#1c1a15', i2: '#534f47' },
    noite:  { p: '#181611', i: '#efece3', i2: '#a59e8d' }
  };
  var tw = Object.assign({}, TWEAK_DEFAULTS);

  /* ---------- conteúdo ---------- */
  /* dicionário i18n, parágrafos do Sobre e meta dos projetos chegam
     serializados pelo index.astro a partir de src/data/portfolio.ts
     (fonte única — o build já pré-renderiza o PT destes mesmos objetos) */
  var S = window.EG_I18N;
  var ABOUT = window.EG_ABOUT;
  var STACKLINE = window.EG_STACKLINE;
  var WMETA = window.EG_WMETA;

  function loc(v) {
    if (v && typeof v === 'object' && !Array.isArray(v) && ('pt' in v || 'en' in v)) return v[lang] != null ? v[lang] : v.pt;
    return v;
  }
  function t(k) { return (S[lang] && S[lang][k]) || S.pt[k] || k; }

  /* ---------- clock ---------- */
  function tick() {
    var el = document.getElementById('clock');
    if (!el) return;
    try {
      el.textContent = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-GB', {
        timeZone: 'America/Fortaleza', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).format(new Date()) + ' GMT−3';
    } catch (e) { el.textContent = new Date().toLocaleTimeString(); }
  }

  /* ---------- work index ---------- */
  function workEntries() {
    var sec = window.SECONDARY.map(function (p, i) {
      return {
        id: i === 0 ? 'hat' : 'orc',
        title: loc(p.title),
        desc: loc(p.desc),
        tags: p.tags,
        links: [{ kind: 'code', href: p.href }],
        slot: i === 0 ? 'shot-hat' : 'shot-orc'
      };
    });
    var feat = window.FEATURED.map(function (p) {
      return {
        id: p.id,
        title: loc(p.title),
        desc: loc(p.desc),
        tags: p.tags,
        links: p.links.map(function (l) { return { kind: l.kind, href: l.href }; }),
        slot: p.slot,
        nda: p.id === 'llm'
      };
    });
    return feat.concat(sec);
  }

  /* liga o abre/fecha de uma ficha — usado no DOM pré-renderizado (build)
     e nas linhas recriadas pelo renderWork (troca de idioma) */
  function bindRow(row) {
    row.querySelector('.wrow-btn').addEventListener('click', function () {
      var open = row.classList.toggle('open');
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function renderWork() {
    var box = document.getElementById('windex');
    box.innerHTML = '';
    workEntries().forEach(function (p, i) {
      var m = WMETA[p.id] || { ty: '', yr: '' };
      var row = document.createElement('div');
      row.className = 'wrow';
      var links = p.links.map(function (l) {
        if (l.kind === 'live') return '<a href="' + l.href + '" target="_blank" rel="noopener">' + t('w.live') + '</a>';
        if (l.kind === 'code') return '<a href="' + l.href + '" target="_blank" rel="noopener">' + t('w.code') + '</a>';
        return '';
      }).join('');
      row.innerHTML =
        '<button class="wrow-btn" aria-expanded="false">' +
          '<span class="no">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="ti">' + p.title + '</span>' +
          '<span class="ty">' + loc(m.ty) + '</span>' +
          '<span class="yr">' + m.yr + '</span>' +
          '<span class="pm">+</span>' +
        '</button>' +
        '<div class="wbody"><div class="wbody-in">' +
          '<img class="wshot" id="' + p.slot + '" src="assets/projetos/' + p.slot + '.png" alt="Print do projeto: ' + p.title + '" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'assets/projetos/_placeholder.svg\'">' +
          '<div>' +
            '<p class="wdesc">' + p.desc + '</p>' +
            '<p class="wstack">' + p.tags.join(' · ') + '</p>' +
            (links ? '<div class="wlinks">' + links + '</div>' : '') +
            (p.nda ? '<p class="wnote">' + t('w.nda') + '</p>' : '') +
          '</div>' +
        '</div></div>';
      bindRow(row);
      box.appendChild(row);
    });
  }

  /* ---------- ledger ---------- */
  function renderLedger() {
    var box = document.getElementById('ledger');
    box.innerHTML = '';
    window.EXPERIENCE.forEach(function (x) {
      var row = document.createElement('div');
      row.className = 'lrow';
      row.innerHTML =
        '<div class="lw">' + loc(x.whenL) + '</div>' +
        '<div><h3>' + loc(x.role) + '</h3><div class="org">' + loc(x.org) + '</div><p>' + loc(x.desc) + '</p></div>' +
        '<div class="lm">' + (x.tag ? '→ ' + loc(x.tag) : '') + '</div>';
      box.appendChild(row);
    });
  }

  function renderCreds() {
    function item(it) {
      return '<div class="citem"><div><div class="cm">' + loc(it.main) + '</div><div class="cs">' + loc(it.sub) + '</div></div><div class="cy">' + loc(it.year) + '</div></div>';
    }
    document.getElementById('edu2').innerHTML = window.EDUCATION.map(item).join('');
    document.getElementById('cert2').innerHTML = window.CERTS.map(item).join('');
  }

  function renderAbout() {
    document.getElementById('about-txt').innerHTML =
      ABOUT[lang].map(function (p) { return '<p>' + p + '</p>'; }).join('') +
      '<p class="stackline">' + STACKLINE[lang] + '</p>';
  }

  /* ---------- i18n ---------- */
  function applyLang() {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      var v = t(n.getAttribute('data-i18n'));
      if (v) n.textContent = v;
    });
    document.getElementById('lang-pt').classList.toggle('on', lang === 'pt');
    document.getElementById('lang-en').classList.toggle('on', lang === 'en');
    document.getElementById('lang-pt').setAttribute('aria-pressed', String(lang === 'pt'));
    document.getElementById('lang-en').setAttribute('aria-pressed', String(lang === 'en'));
    renderWork(); renderLedger(); renderCreds(); renderAbout(); tick();
  }

  /* ---------- tweaks ---------- */
  function applyTweaks() {
    var rs = document.documentElement.style;
    var pap = PAPERS[tw.paper] || PAPERS.creme;
    /* o body tem background-color inline (edição direta) — limpa pra var(--paper) valer */
    document.body.style.backgroundColor = '';
    rs.setProperty('--paper', pap.p);
    rs.setProperty('--ink', pap.i);
    rs.setProperty('--ink-2', pap.i2);
    rs.setProperty('--rule', pap.i);
    var inkSet = tw.paper === 'noite' ? INKS_NIGHT : INKS;
    rs.setProperty('--red', inkSet[tw.ink] || inkSet.red);
    var ty = TYPES[tw.type] || TYPES.archivo;
    ensureTypeFont(tw.type);
    rs.setProperty('--f-disp', ty.d);
    rs.setProperty('--f-serif', ty.s);
    document.body.classList.remove('photo-cor', 'photo-pb', 'photo-tinta');
    document.body.classList.add('photo-' + (tw.photo || 'pb'));
    document.body.classList.toggle('no-stamp', !tw.stamp);
    window.__v2NoMagnet = !tw.magnet;
    /* boot: vale a partir do próximo load (persistido) + live se ainda não rodou */
    if (window.__bootCmd === undefined) window.__bootCmd = document.body.getAttribute('data-boot');
    if (!tw.boot) document.body.removeAttribute('data-boot');
    else if (window.__bootCmd != null) document.body.setAttribute('data-boot', window.__bootCmd);
    /* coreografia de scroll */
    document.body.classList.toggle('no-scrollfx', !tw.scrollfx);
    if (!tw.scrollfx) document.querySelectorAll('.mo-prep').forEach(function (el) { el.classList.add('mo-in'); });
    /* statusline */
    document.body.classList.toggle('no-devbar', !tw.devbar);
    var p = document.querySelector('.tw2'); if (!p) return;
    p.querySelectorAll('.sw[data-ink]').forEach(function (b) { b.classList.toggle('active', b.dataset.ink === tw.ink); });
    p.querySelectorAll('.sw[data-paper]').forEach(function (b) { b.classList.toggle('active', b.dataset.paper === tw.paper); });
    p.querySelectorAll('.ty-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.type === tw.type); });
    p.querySelectorAll('.ph-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.photo === tw.photo); });
    ['stamp', 'magnet', 'boot', 'scrollfx', 'devbar'].forEach(function (k) {
      var tg = p.querySelector('[data-tg="' + k + '"]');
      if (tg) { tg.classList.toggle('on', !!tw[k]); tg.textContent = tw[k] ? 'ON' : 'OFF'; }
    });
  }
  /* painel de tweaks removido em produção — os valores ficam congelados em
     TWEAK_DEFAULTS (escolha do Eduardo) e são aplicados por applyTweaks(). */

  /* ---------- intro: split name letters for stagger ---------- */
  function splitName() {
    var name = document.querySelector('.name');
    if (!name) return;
    var delay = 0.38, step = 0.045, idx = 0;
    function splitTextNode(node) {
      var text = node.textContent;
      var word = document.createElement('span');
      word.className = 'word';
      word.style.whiteSpace = 'nowrap';
      for (var i = 0; i < text.length; i++) {
        var c = text[i];
        if (c === ' ') { word.appendChild(document.createTextNode(' ')); continue; }
        var w = document.createElement('span'); w.className = 'chw';
        var s = document.createElement('span'); s.className = 'ch';
        s.style.setProperty('--d', (delay + step * idx).toFixed(3) + 's');
        s.textContent = c;
        w.appendChild(s); word.appendChild(w);
        idx++;
      }
      node.parentNode.replaceChild(word, node);
    }
    var l1 = name.querySelector('.l1'), l2 = name.querySelector('.l2');
    if (l1 && l1.firstChild && l1.firstChild.nodeType === 3) splitTextNode(l1.firstChild);
    if (l2 && l2.firstChild && l2.firstChild.nodeType === 3) splitTextNode(l2.firstChild);
    name.classList.add('ready');
  }

  /* ---------- init ---------- */
  function init() {
    try {
      var sl = localStorage.getItem('eg2_lang');
      if (sl === 'pt' || sl === 'en') {
        lang = sl; // preferência manual prevalece sempre
      } else {
        // primeira visita: detecta pelo idioma do navegador
        var bl = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        if (bl.toLowerCase().startsWith('en')) lang = 'en';
      }
    } catch (e) {}
    splitName();
    if (lang === 'pt') {
      /* PT já vem pré-renderizado no build (HTML idêntico ao que o applyLang
         produziria) — só liga os comportamentos das fichas e o relógio */
      document.querySelectorAll('#windex .wrow').forEach(bindRow);
      tick();
    } else {
      applyLang();
    }
    applyTweaks();
    setInterval(tick, 1000);

    document.getElementById('lang-pt').addEventListener('click', function () { lang = 'pt'; save(); applyLang(); });
    document.getElementById('lang-en').addEventListener('click', function () { lang = 'en'; save(); applyLang(); });
    function save() { try { localStorage.setItem('eg2_lang', lang); } catch (e) {} }

    var toTop = document.getElementById('to-top');
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    /* aba flutuante: aparece depois de ~meia tela de rolagem */
    function toTopVis() { toTop.classList.toggle('show', window.scrollY > window.innerHeight * 0.6); }
    window.addEventListener('scroll', toTopVis, { passive: true });
    toTopVis();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
