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

    /* troca de idioma */
    if (a.id === 'lang-pt') track('lang_switch', { to: 'pt' });
    else if (a.id === 'lang-en') track('lang_switch', { to: 'en' });
  }, { passive: true });
})();
