/* ============================================================
   v2 «Documento» — clock, i18n, índice expansível, tweaks
   Reusa window.FEATURED / SECONDARY / EXPERIENCE / EDUCATION /
   CERTS de portfolio.data.js
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

  /* ---------- strings ---------- */
  var S = {
    pt: {
      'm.doc': 'Portfólio — rev. 02 / 2026',
      'm.now': 'agora, hora local',
      'm.stamp': 'em produção',
      'm.tail': 'Desenvolvedor full stack — construo o produto inteiro, com queda assumida por front-end e experiência do usuário. Hoje na IMTS Group.',
      'm.since': 'escrevendo interfaces desde 2022',
      'toc.1': 'Trabalhos', 'toc.1n': '6 fichas',
      'toc.2': 'Trajetória', 'toc.2n': '4 períodos',
      'toc.3': 'Sobre', 'toc.3n': '1 pessoa',
      'toc.4': 'Contato', 'toc.4n': '3 canais',
      'w.note': 'Clique numa linha para abrir a ficha do projeto.',
      'x.note': 'Operação, dados e processos antes do código — virou vantagem.',
      'x.edu': 'Formação', 'x.cert': 'Certificações & cursos',
      'a.cap': 'Fortaleza, 2026',
      'c.lead': 'Sem formulário — mensagem boa não merece morrer num inbox de formulário. Me escreve direto:',
      'c.phone': 'Telefone',
      'c.cv': 'versão pra imprimir →',
      'f.colo': '// Tipografia: Archivo & Newsreader · Nada gerado, nada clonado — cada detalhe foi uma escolha · Rev. 02, junho de 2026 · Fortaleza',
      'f.metrics': 'métricas anônimas e sem cookies (Umami) — nenhum dado pessoal é coletado',
      'f.top': '↑ voltar ao topo',
      'w.live': 'ver no ar ↗', 'w.code': 'código ↗',
      'w.nda': 'Produto comercial — demonstro com prazer numa conversa.',
      'w.shot': 'Print do projeto — arraste aqui'
    },
    en: {
      'm.doc': 'Portfolio — rev. 02 / 2026',
      'm.now': 'now, local time',
      'm.stamp': 'in production',
      'm.tail': 'Full stack developer — I build the whole product, with an admitted soft spot for front-end and user experience. Currently at IMTS Group.',
      'm.since': 'writing interfaces since 2022',
      'toc.1': 'Work', 'toc.1n': '6 entries',
      'toc.2': 'Track record', 'toc.2n': '4 chapters',
      'toc.3': 'About', 'toc.3n': '1 person',
      'toc.4': 'Contact', 'toc.4n': '3 channels',
      'w.note': 'Click a row to open the project file.',
      'x.note': 'Operations, data and process before code — it became an edge.',
      'x.edu': 'Education', 'x.cert': 'Certifications & courses',
      'a.cap': 'Fortaleza, 2026',
      'c.lead': "No contact form — good messages shouldn't die in a form inbox. Write me directly:",
      'c.phone': 'Phone',
      'c.cv': 'print-ready version →',
      'f.colo': '// Type: Archivo & Newsreader · Nothing generated, nothing cloned — every detail was a choice · Rev. 02, June 2026 · Fortaleza',
      'f.metrics': 'anonymous, cookie-free metrics (Umami) — no personal data is collected',
      'f.top': '↑ back to top',
      'w.live': 'see it live ↗', 'w.code': 'source ↗',
      'w.nda': 'Commercial product — happy to demo it in a call.',
      'w.shot': 'Project screenshot — drop it here'
    }
  };

  /* about paragraphs (kept here: voice differs from v1) */
  var ABOUT = {
    pt: [
      'Passei quatro anos entre auditorias, hotéis e planilhas antes de escrever código profissionalmente. Foi lá que aprendi o que bootcamp nenhum ensina: a pessoa do outro lado da tela está com pressa — e interface boa é a que respeita isso.',
      'Hoje sou full stack na IMTS Group, uma software house onde cada projeto traz uma stack diferente — React, Angular e TypeScript no front; Node, Python e APIs REST no back. Termino a graduação em ADS em julho de 2026. <span class="red">Desenvolvi a experiência do aluno do zero e melhorei fluxos no painel admin</span> de uma plataforma educacional usada por colégios pelo Brasil.',
      'Inglês C1: leio documentação, escrevo, converso. Presencial, híbrido ou remoto, a partir de Fortaleza.'
    ],
    en: [
      "I spent four years in audits, hotels and spreadsheets before writing code for a living. That's where I learned what no bootcamp teaches: the person on the other side of the screen is in a hurry — and a good interface respects that.",
      "Today I'm a full stack developer at IMTS Group, a software house where each project brings a different stack — React, Angular and TypeScript on the front; Node, Python and REST APIs on the back. Finishing my degree in July 2026. <span class=\"red\">I built the student experience from scratch and improved admin panel flows</span> for an education platform used by schools across Brazil.",
      'English at C1: I read docs, write and hold a conversation. On-site, hybrid or remote, based in Fortaleza.'
    ]
  };
  var STACKLINE = {
    pt: '<b>Caixa de ferramentas:</b> React · Next.js · TypeScript · Angular · Tailwind · SCSS · Vite · Node · SQL · Supabase · Git · Figma · Vercel · AWS — o resto se aprende.',
    en: '<b>Toolbox:</b> React · Next.js · TypeScript · Angular · Tailwind · SCSS · Vite · Node · SQL · Supabase · Git · Figma · Vercel · AWS — the rest can be learned.'
  };

  /* per-project meta for the index (type label + year) */
  var WMETA = {
    'wviana':     { ty: { pt: 'cliente real — no ar', en: 'real client — live' }, yr: '2025' },
    'llm':        { ty: { pt: 'edtech · em produção', en: 'edtech · in production' }, yr: '2025–26' },
    'garimpeiro': { ty: { pt: 'open source',          en: 'open source' },        yr: '2025' },
    'mulheres':   { ty: { pt: 'produto próprio',      en: 'own product' },        yr: '2026' },
    'hat':        { ty: { pt: 'open source',          en: 'open source' },        yr: '2025' },
    'orc':        { ty: { pt: 'ferramenta interna',   en: 'internal tool' },      yr: '2023' }
  };

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
      row.querySelector('.wrow-btn').addEventListener('click', function () {
        var open = row.classList.toggle('open');
        this.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
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
    try { var sl = localStorage.getItem('eg2_lang'); if (sl === 'pt' || sl === 'en') lang = sl; } catch (e) {}
    splitName();
    applyLang();
    applyTweaks();
    setInterval(tick, 1000);

    document.getElementById('lang-pt').addEventListener('click', function () { lang = 'pt'; save(); applyLang(); });
    document.getElementById('lang-en').addEventListener('click', function () { lang = 'en'; save(); applyLang(); });
    function save() { try { localStorage.setItem('eg2_lang', lang); } catch (e) {} }

    document.getElementById('to-top').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
