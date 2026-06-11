/* ============================================================
   v2 «Documento» — scroll-motion
   Coreografia de página inteira: réguas que se imprimem com
   carro vermelho, números que carimbam, anotações de margem
   que se escrevem, barra de progresso de tinta e botões
   magnéticos com mola. Compartilhado entre portfólio e freela.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  /* ---------- 1 · barra de progresso de tinta ---------- */
  var bar = document.createElement('div');
  bar.className = 'mo-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var pCur = 0, pTgt = 0, pRunning = false;
  function pTarget() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    pTgt = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (!pRunning) { pRunning = true; requestAnimationFrame(pStep); }
  }
  function pStep() {
    pCur += (pTgt - pCur) * 0.16;
    if (Math.abs(pTgt - pCur) < 0.0005) { pCur = pTgt; pRunning = false; }
    bar.style.transform = 'scaleX(' + pCur.toFixed(4) + ')';
    if (pRunning) requestAnimationFrame(pStep);
  }
  window.addEventListener('scroll', pTarget, { passive: true });
  window.addEventListener('resize', pTarget);
  pTarget();

  /* ---------- 2 · revelações coreografadas (IO) ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('mo-in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

  function prep(el, delay) {
    if (el.dataset.mo) return;
    if (document.body.classList.contains('no-scrollfx')) { el.dataset.mo = '1'; return; }
    el.dataset.mo = '1';
    var r = el.getBoundingClientRect();
    /* já está bem visível? não anima — evita piscar conteúdo above-the-fold */
    if (r.top < window.innerHeight * 0.7 && r.bottom > 0) return;
    el.classList.add('mo-prep');
    if (delay) el.style.setProperty('--mo-d', delay + 's');
    io.observe(el);
  }

  function scan() {
    document.querySelectorAll('.sec-head').forEach(function (el) {
      if (!el.dataset.mo && !el.querySelector('.mo-carriage')) {
        var c = document.createElement('span');
        c.className = 'mo-carriage';
        el.appendChild(c);
      }
      prep(el);
    });
    document.querySelectorAll('.lrow').forEach(function (el) { prep(el); });
    document.querySelectorAll('.windex .wrow').forEach(function (el, i) { prep(el, (i % 6) * 0.07); });
    document.querySelectorAll('.citem').forEach(function (el, i) { prep(el, (i % 5) * 0.06); });
  }
  scan();

  /* páginas que re-renderizam (troca de idioma) — re-escaneia */
  var moDebounce;
  new MutationObserver(function () {
    clearTimeout(moDebounce);
    moDebounce = setTimeout(scan, 120);
  }).observe(document.body, { childList: true, subtree: true });

  /* ---------- 3 · botões magnéticos (mola amortecida) ---------- */
  /* spd: velocidade do cursor (px/s) — alimenta a tremida do ímã */
  var mouse = { x: -9999, y: -9999, spd: 0, lt: 0 };
  window.addEventListener('mousemove', function (e) {
    var now = performance.now();
    if (mouse.x > -9000) {
      var mdt = Math.max(8, now - mouse.lt);
      var ddx = e.clientX - mouse.x, ddy = e.clientY - mouse.y;
      mouse.spd = Math.min(1400, Math.sqrt(ddx * ddx + ddy * ddy) / mdt * 1000);
    }
    mouse.lt = now;
    mouse.x = e.clientX; mouse.y = e.clientY;
  }, { passive: true });

  function magnetize(el, strength, radius) {
    var x = 0, y = 0, vx = 0, vy = 0, rot = 0, vr = 0, running = false, last = 0;
    var hovering = false;
    el.addEventListener('mouseenter', function () { hovering = true; });
    el.addEventListener('mouseleave', function () { hovering = false; });

    function kick(impulse) { vr += impulse; wake(); }

    function step(now) {
      var dt = Math.min(0.034, (now - last) / 1000) || 0.016;
      last = now;
      var r = el.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = mouse.x - cx, dy = mouse.y - cy;
      var d = Math.sqrt(dx * dx + dy * dy);
      var R = radius + Math.max(r.width, r.height) / 2;
      var near = d < R && !document.body.classList.contains('no-scrollfx');
      var tx = near ? Math.max(-16, Math.min(16, dx * strength)) : 0;
      var ty = near ? Math.max(-10, Math.min(10, dy * strength)) : 0;
      /* tremida do ímã se reacomodando (mesma física das letras do título):
         mouse em movimento injeta ruído zero-média; morre quando ele para */
      var spdNow = mouse.spd * Math.exp(-(now - mouse.lt) / 110);
      var agit = near ? Math.min(1, spdNow / 900) * (1 - d / R) : 0;
      if (agit > 0.02) {
        vx += (Math.random() * 2 - 1) * 1300 * agit * dt;
        vy += (Math.random() * 2 - 1) * 1300 * agit * dt;
        vr += (Math.random() * 2 - 1) * 850 * agit * dt;
      }
      var k = 170, c = 16;
      vx += (k * (tx - x) - c * vx) * dt; x += vx * dt;
      vy += (k * (ty - y) - c * vy) * dt; y += vy * dt;
      var kr = 140, cr = 10;
      vr += (-kr * rot - cr * vr) * dt; rot += vr * dt;
      var busy = near || Math.abs(x) > 0.06 || Math.abs(y) > 0.06 || Math.abs(vx) > 1 || Math.abs(vy) > 1 || Math.abs(rot) > 0.05 || Math.abs(vr) > 1;
      if (busy) {
        el.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) rotate(' + rot.toFixed(2) + 'deg)' + (hovering ? ' scale(1.025)' : '');
        requestAnimationFrame(step);
      } else {
        el.style.transform = '';
        running = false;
      }
    }
    function wake() {
      if (running) return;
      running = true; last = performance.now();
      requestAnimationFrame(step);
    }
    window.addEventListener('mousemove', function () {
      var r = el.getBoundingClientRect();
      var R = radius + 80;
      if (mouse.x > r.left - R && mouse.x < r.right + R && mouse.y > r.top - R && mouse.y < r.bottom + R) wake();
    }, { passive: true });
    return { kick: kick, el: el };
  }

  var cta = document.querySelector('.wa-cta');
  var mail = document.querySelector('.bigmail');
  var mags = [];
  if (cta) mags.push(magnetize(cta, 0.18, 110));
  if (mail) mags.push(magnetize(mail, 0.08, 90));

  /* ---------- 4 · «psst» — cutucada periódica no CTA ---------- */
  if (cta && mags.length) {
    var ctaMag = mags[0];
    setInterval(function () {
      var r = cta.getBoundingClientRect();
      var visible = r.top < window.innerHeight && r.bottom > 0;
      var d = Math.hypot(mouse.x - (r.left + r.width / 2), mouse.y - (r.top + r.height / 2));
      if (visible && d > 220 && !document.hidden && !document.body.classList.contains('no-scrollfx')) ctaMag.kick(46);
    }, 7000);
  }
})();
