/* ============================================================
   v2 «Documento» — analytics (Umami, cookieless)
   Eventos custom por delegação no document: sobrevive ao
   re-render da troca de idioma (innerHTML mata listener direto)
   e não toca nos motores — consome o mesmo contrato de classes
   que eles (ver README). CTAs estáticos usam data-umami-event
   no template Astro; aqui fica só o DOM dinâmico.
   ============================================================ */
(function () {
  'use strict';

  function track(name, props) {
    try { if (window.umami) window.umami.track(name, props); } catch (e) {}
  }

  /* 404 — o path quebrado já vai na URL do pageview; o evento só
     facilita filtrar no dashboard */
  if (document.body.getAttribute('data-screen-label') === '404') {
    track('404_view', { path: location.pathname });
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    /* fichas (projetos na home, serviços na freela) — o listener do motor
       já rodou no bubble e togglou .open; só conta abertura */
    var btn = t.closest('.wrow-btn');
    if (btn) {
      var row = btn.closest('.wrow');
      if (!row || !row.classList.contains('open')) return;
      var ti = row.querySelector('.ti');
      var label = ti ? ti.textContent : '';
      if (btn.closest('#svc-index')) track('service_open', { service: label });
      else track('project_open', { project: label });
      return;
    }

    /* troca de idioma (botões reais desde a revisão de a11y) */
    var lb = t.closest('#lang-pt, #lang-en');
    if (lb) {
      track('lang_switch', { to: lb.id === 'lang-pt' ? 'pt' : 'en' });
      return;
    }

    var a = t.closest('a');
    if (!a) return;

    /* links live/código das fichas de projeto */
    if (a.closest('.wlinks')) {
      var prow = a.closest('.wrow');
      var pti = prow && prow.querySelector('.ti');
      track('project_link_click', {
        project: pti ? pti.textContent : '',
        kind: /github\.com/.test(a.href) ? 'code' : 'live',
      });
      return;
    }

    /* índice (home e freela) */
    if (a.closest('.toc')) {
      track('toc_click', { target: a.getAttribute('href') || '' });
      return;
    }

  }, { passive: true });

  /* ---------- scroll depth — marcos 50/90, uma vez por pageview ----------
     listener próprio (não pega carona no scrollmotion: ele desliga sob
     prefers-reduced-motion e esses usuários também contam) */
  var depths = [50, 90];
  window.addEventListener('scroll', function () {
    if (!depths.length) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    while (depths.length && pct >= depths[0]) {
      track('scroll_depth', { pct: depths.shift() });
    }
  }, { passive: true });

  /* ---------- section_view — uma vez por seção por pageview ---------- */
  if (window.IntersectionObserver) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        track('section_view', { id: en.target.id });
        sio.unobserve(en.target);
      });
    }, { rootMargin: '-30% 0px -30% 0px', threshold: 0 });
    document.querySelectorAll('section.sec[id]').forEach(function (el) { sio.observe(el); });
  }

  /* ---------- easter egg do devmode — só observa a classe do body,
     o motor continua dono da interação ---------- */
  if (window.MutationObserver) {
    var inspectOn = document.body.classList.contains('dev-inspect');
    new MutationObserver(function () {
      var on = document.body.classList.contains('dev-inspect');
      if (on && !inspectOn) track('inspect_toggle');
      inspectOn = on;
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  /* ---------- RUM — Web Vitals reais (lib vendorada; valores finais
     chegam quando a página é ocultada) ---------- */
  if (window.webVitals) {
    var sendVital = function (m) {
      var v = m.name === 'CLS' ? Math.round(m.value * 1000) / 1000 : Math.round(m.value);
      track('web_vital', { metric: m.name, value: v });
    };
    webVitals.onLCP(sendVital);
    webVitals.onCLS(sendVital);
    webVitals.onINP(sendVital);
  }

  /* ---------- impressão do CV — cobre o botão e o Ctrl+P ---------- */
  if (/^\/cv(\.html)?$/.test(location.pathname)) {
    var printed = false;
    window.addEventListener('beforeprint', function () {
      if (printed) return;
      printed = true;
      track('cv_print');
    });
  }
})();
