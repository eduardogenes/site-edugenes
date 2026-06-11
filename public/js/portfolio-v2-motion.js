/* ============================================================
   v2 «Documento» — abertura motion-design
   Física real por rAF: tipos móveis caem com gravidade e
   squash&stretch; carro de impressão varre as réguas; carimbo
   esmaga com onda de tinta, respingos e tremor de página.
   Depois: letras magnéticas ao cursor (molas amortecidas).
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    document.body.classList.remove('intro');
    document.querySelectorAll('.name .ch').forEach(function (n) { n.style.opacity = ''; n.style.transform = ''; });
  }

  function run() {
    if (reduce) { revealAll(); return; }
    try {
      if (document.body.hasAttribute('data-boot')) boot(function () { try { start(); } catch (e) { revealAll(); } });
      else start();
    } catch (e) { revealAll(); }
  }

  /* ============ boot de terminal (firula de coder) ============ */
  function boot(cb) {
    /* comandos de terminal são sempre em inglês — convenção de CLI */
    var CMD = document.body.getAttribute('data-boot') || './print portfolio --rev 02 --ink red';
    var OK = '\u2713 done in 0.24s \u2014 ink loaded';

    var ov = document.createElement('div');
    ov.className = 'boot-ov';
    ov.setAttribute('aria-hidden', 'true');
    ov.innerHTML = '<div class="boot-line"><span class="bp">$ </span><span class="bt"></span><span class="bcaret"></span><br><span class="bok" style="opacity:0;"></span></div>';
    document.body.appendChild(ov);
    var bt = ov.querySelector('.bt'), bok = ov.querySelector('.bok');
    var i = 0, doneFlag = false, timers = [];

    function finish() {
      if (doneFlag) return;
      doneFlag = true;
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', finish);
      ov.removeEventListener('click', finish);
      ov.classList.add('out');
      cb();
      timers.push(setTimeout(function () { ov.remove(); }, 420));
    }

    function typeChar() {
      if (doneFlag) return;
      bt.textContent = CMD.slice(0, ++i);
      if (i < CMD.length) timers.push(setTimeout(typeChar, 14 + Math.random() * 26));
      else {
        timers.push(setTimeout(function () {
          if (doneFlag) return;
          bok.textContent = OK;
          bok.style.opacity = '1';
          timers.push(setTimeout(finish, 460));
        }, 220));
      }
    }
    timers.push(setTimeout(typeChar, 260));
    window.addEventListener('keydown', finish);
    ov.addEventListener('click', finish);
  }

  /* ============ helpers ============ */
  function easeInOutCubic(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeInQuad(t) { return t * t; }

  function start() {
    var body = document.body;
    var masthead = document.querySelector('.masthead');
    var metaRow = document.querySelector('.meta-row');
    var mastFoot = document.querySelector('.mast-foot');
    var tail = document.querySelector('.tail');
    var stamp = document.querySelector('.stamp');
    var tocLis = Array.prototype.slice.call(document.querySelectorAll('.toc li'));

    /* 0 — papel timbrado: o lockup da marca surge antes da impressão começar.
       Fade do bloco inteiro (o símbolo em si nunca anima — brand/README.md §7.2) */
    var brand = document.querySelector('.brand');
    if (brand) {
      brand.style.transition = 'opacity .45s ease';
      requestAnimationFrame(function () { brand.style.opacity = '1'; });
    }

    /* split name into letters if the page hasn't done it (standalone pages) */
    if (!document.querySelector('.name .ch')) {
      var nameEl = document.querySelector('.name');
      if (nameEl) {
        ['l1', 'l2'].forEach(function (cls) {
          var line = nameEl.querySelector('.' + cls);
          if (!line || !line.firstChild || line.firstChild.nodeType !== 3) return;
          var text = line.firstChild.textContent;
          var frag = document.createDocumentFragment();
          text.split(' ').forEach(function (wordText, wi) {
            if (wi > 0) frag.appendChild(document.createTextNode(' '));
            if (!wordText) return;
            var word = document.createElement('span');
            word.className = 'word';
            word.style.whiteSpace = 'nowrap';
            for (var i = 0; i < wordText.length; i++) {
              var w = document.createElement('span'); w.className = 'chw';
              var s = document.createElement('span'); s.className = 'ch';
              s.textContent = wordText[i];
              w.appendChild(s); word.appendChild(w);
            }
            frag.appendChild(word);
          });
          line.replaceChild(frag, line.firstChild);
        });
        nameEl.classList.add('ready');
      }
    }

    var chs = Array.prototype.slice.call(document.querySelectorAll('.name .ch'));
    if (!chs.length) { revealAll(); return; }

    /* ---- timeline constants (ms) ---- */
    var T_SWEEP = 80, SWEEP_DUR = 620;
    var T_LETTERS = 430, STAGGER = 55;
    var T_TAIL = 1280;
    var T_FOOT = 1380, FOOT_DUR = 420;
    var T_STAMP = 1760, STAMP_DROP = 200;
    var T_TOC = 2080, TOC_STAGGER = 85;
    var T_MAGNET = 2400;

    /* ---- carriage (print head) ---- */
    var carriage = document.createElement('div');
    carriage.className = 'mcarriage';
    metaRow.appendChild(carriage);

    /* ---- letter physics state ---- */
    var G = 7000, REST = 0.42;
    var letters = chs.map(function (ch, i) {
      var h = ch.parentNode.offsetHeight || 120;
      return { el: ch, t0: T_LETTERS + i * STAGGER, y: -(h * 1.45), v: 0, sq: 0, started: false, settled: false };
    });

    /* ---- stamp state ---- */
    var stampDone = false, stampStarted = false;
    var shake = { y: 0, v: 0, active: false };          // masthead spring
    var stampSq = { s: 0, v: 0 };                        // stamp squash spring
    var specks = [];

    /* ---- magnetic idle state ---- */
    var magnetOn = false;
    var mag = chs.map(function (ch) {
      return { w: ch.parentNode, tx: 0, vx: 0, ty: 0, vy: 0, tr: 0, vr: 0, gy: 0, gr: 0 };
    });
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

    function spawnInk() {
      var r = stamp.getBoundingClientRect();
      /* ring */
      var ring = document.createElement('div');
      ring.className = 'ink-ring';
      var d0 = Math.max(r.width, r.height) * 0.7;
      ring.style.cssText += 'left:50%;top:50%;width:' + d0 + 'px;height:' + (d0 * 0.55) + 'px;margin-left:' + (-d0 / 2) + 'px;margin-top:' + (-d0 * 0.275) + 'px;';
      stamp.appendChild(ring);
      var rt0 = performance.now();
      (function ringStep(now) {
        var p = (now - rt0) / 480;
        if (p >= 1) { ring.remove(); return; }
        var s = 1 + p * 0.85;
        ring.style.transform = 'scale(' + s + ')';
        ring.style.opacity = String(0.85 * (1 - p));
        requestAnimationFrame(ringStep);
      })(rt0);
      /* specks */
      for (var i = 0; i < 7; i++) {
        var sp = document.createElement('div');
        sp.className = 'speck';
        var ang = (Math.PI * (0.95 + Math.random() * 1.1)) + (i / 7) * 1.2; /* mostly up/sideways */
        var spd = 240 + Math.random() * 420;
        stamp.appendChild(sp);
        specks.push({ el: sp, x: r.width / 2, y: r.height / 2, vx: Math.cos(ang) * spd, vy: -Math.abs(Math.sin(ang)) * spd - 120, born: performance.now(), life: 620 + Math.random() * 300, sc: 0.5 + Math.random() * 0.8 });
      }
    }

    /* digitação da linha mono do masthead (firula de coder) */
    function typeMonoLine() {
      var mono = mastFoot.querySelector('.mono');
      if (!mono || mono.dataset.typed) return;
      mono.dataset.typed = '1';
      var full = mono.textContent;
      mono.textContent = '';
      var caret = document.createElement('span');
      caret.className = 'mono-caret';
      caret.setAttribute('aria-hidden', 'true');
      mono.parentNode.insertBefore(caret, mono.nextSibling);
      var ci = 0;
      (function tc() {
        mono.textContent = full.slice(0, ++ci);
        if (ci < full.length) setTimeout(tc, 16 + Math.random() * 24);
      })();
    }

    /* ---- main loop ---- */
    var start0 = performance.now(), last = start0;
    var tocShown = 0, tailShown = false, sweepDone = false, footDone = false;

    function frame(now) {
      var t = now - start0;
      var dt = Math.min(0.034, (now - last) / 1000);
      last = now;
      var busy = false;

      /* 1 — carriage sweep prints the meta-row */
      if (!sweepDone) {
        var p = (t - T_SWEEP) / SWEEP_DUR;
        if (p >= 1) { p = 1; sweepDone = true; carriage.style.opacity = '0'; metaRow.style.clipPath = 'none'; }
        if (p >= 0) {
          var e = easeInOutCubic(Math.max(0, p));
          var w = metaRow.offsetWidth;
          carriage.style.transform = 'translateX(' + (e * w) + 'px)';
          metaRow.style.clipPath = 'inset(0 ' + ((1 - e) * 100) + '% 0 0)';
        }
        busy = true;
      }

      /* 2 — letters fall like metal type */
      letters.forEach(function (L) {
        if (L.settled) return;
        busy = true;
        if (t < L.t0) return;
        if (!L.started) { L.started = true; L.el.style.opacity = '1'; }
        L.v += G * dt;
        L.y += L.v * dt;
        if (L.y >= 0) {
          L.y = 0;
          if (L.v > 90) {
            L.sq = Math.min(0.32, L.v / 2400);
            L.v = -L.v * REST;
          } else { L.v = 0; L.settled = true; }
        }
        L.sq *= Math.exp(-dt * 10);
        var sy = 1 - L.sq, sx = 1 + L.sq * 0.7;
        L.el.style.transform = 'translateY(' + L.y.toFixed(1) + 'px) scale(' + sx.toFixed(3) + ',' + sy.toFixed(3) + ')';
        if (L.settled) { L.el.style.transform = 'translateY(0)'; }
      });

      /* 3 — tail + mast-foot */
      if (!tailShown && t >= T_TAIL) {
        tailShown = true;
        tail.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.2,.7,.2,1)';
        tail.style.transform = 'translateY(12px)';
        tail.style.opacity = '0';
        requestAnimationFrame(function () { tail.style.opacity = '1'; tail.style.transform = 'none'; });
      }
      if (!footDone) {
        var fp = (t - T_FOOT) / FOOT_DUR;
        if (fp >= 1) {
          fp = 1; footDone = true; mastFoot.style.clipPath = 'none';
          if (body.hasAttribute('data-boot')) typeMonoLine();
        }
        if (fp >= 0) mastFoot.style.clipPath = 'inset(0 ' + ((1 - easeInOutCubic(Math.max(0, fp))) * 100) + '% 0 0)';
        busy = true;
      }

      /* 4 — stamp slam */
      if (!stampDone) {
        busy = true;
        if (t >= T_STAMP) {
          var sp2 = (t - T_STAMP) / STAMP_DROP;
          if (!stampStarted) { stampStarted = true; stamp.style.opacity = '1'; }
          if (sp2 < 1) {
            var ss = 2.8 - easeInQuad(sp2) * 1.8; /* 2.8 -> 1 */
            stamp.style.transform = 'scale(' + ss + ') rotate(' + (8 - sp2 * 10) + 'deg)';
            stamp.style.opacity = String(Math.min(1, sp2 * 2.2));
          } else {
            stampDone = true;
            stamp.style.transform = 'rotate(-2deg)';
            stampSq.s = 0.22; stampSq.v = 0;
            shake.active = true; shake.v = 260;
            spawnInk();
          }
        }
      }

      /* stamp squash spring (after impact) */
      if (stampDone) {
        if (Math.abs(stampSq.s) > 0.002 || Math.abs(stampSq.v) > 0.02) {
          busy = true;
          var ks = 180, cs2 = 14;
          stampSq.v += (-ks * stampSq.s - cs2 * stampSq.v) * dt;
          stampSq.s += stampSq.v * dt;
          stamp.style.transform = 'rotate(-2deg) scale(' + (1 + stampSq.s * 0.7) + ',' + (1 - stampSq.s) + ')';
        } else if (stampSq.s !== 0) {
          stampSq.s = 0; stampSq.v = 0;
          stamp.style.transform = 'rotate(-2deg)';
        }
      }

      /* masthead shake spring */
      if (shake.active) {
        busy = true;
        var kh = 320, ch2 = 16;
        shake.v += (-kh * shake.y - ch2 * shake.v) * dt;
        shake.y += shake.v * dt;
        if (Math.abs(shake.y) < 0.15 && Math.abs(shake.v) < 4) { shake.active = false; shake.y = 0; masthead.style.transform = ''; }
        else masthead.style.transform = 'translateY(' + shake.y.toFixed(2) + 'px)';
      }

      /* ink specks ballistic */
      for (var si = specks.length - 1; si >= 0; si--) {
        var S2 = specks[si], age = now - S2.born;
        if (age > S2.life) { S2.el.remove(); specks.splice(si, 1); continue; }
        busy = true;
        S2.vy += 2400 * dt;
        S2.x += S2.vx * dt; S2.y += S2.vy * dt;
        S2.el.style.transform = 'translate(' + S2.x.toFixed(1) + 'px,' + S2.y.toFixed(1) + 'px) scale(' + S2.sc + ')';
        S2.el.style.opacity = String(1 - age / S2.life);
        S2.el.style.left = '0'; S2.el.style.top = '0';
      }

      /* 5 — toc cascade */
      while (tocShown < tocLis.length && t >= T_TOC + tocShown * TOC_STAGGER) {
        (function (li) {
          li.style.transition = 'opacity .45s ease, transform .45s cubic-bezier(.2,.7,.2,1)';
          li.style.transform = 'translateY(14px)';
          requestAnimationFrame(function () { li.style.opacity = '1'; li.style.transform = 'none'; });
        })(tocLis[tocShown]);
        tocShown++;
      }
      if (tocShown < tocLis.length) busy = true;

      /* 6 — magnetic letters (idle, runs forever, cheap) */
      if (t >= T_MAGNET) {
        if (!magnetOn) { magnetOn = true; body.classList.remove('intro'); }
        var anyMag = false;
        /* a velocidade do cursor decai sozinha — tremida morre quando o mouse para */
        mouse.spd *= Math.exp(-9 * dt);
        mag.forEach(function (M) {
          var r = M.w.getBoundingClientRect();
          var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          var dx = mouse.x - cx, dy = mouse.y - cy;
          var d = Math.sqrt(dx * dx + dy * dy);
          var R = 170, on = !window.__v2NoMagnet;
          M.gy = (on && d < R) ? -9 * (1 - d / R) : 0;
          M.gr = (on && d < R) ? (dx / R) * 5 * (1 - d / R) : 0;
          /* tremida do ímã se reacomodando: mouse em movimento injeta ruído
             (X, Y e rotação) nas letras dentro do raio; quanto mais perto e
             mais rápido, mais agitação. Zero-média: não desloca a pose. */
          var agit = (on && d < R) ? Math.min(1, mouse.spd / 900) * (1 - d / R) : 0;
          if (agit > 0.02) {
            M.vx += (Math.random() * 2 - 1) * 1300 * agit * dt;
            M.vy += (Math.random() * 2 - 1) * 1300 * agit * dt;
            M.vr += (Math.random() * 2 - 1) * 850 * agit * dt;
          }
          /* m: massa da letra — tipo móvel de chumbo. >1 = acelera com atraso,
             escorrega atrás do cursor e assenta balançando (subamortecido). */
          var k = 160, c = 18, m = 1.2;
          M.vx += ((k * (0 - M.tx) - c * M.vx) / m) * dt; M.tx += M.vx * dt;
          M.vy += ((k * (M.gy - M.ty) - c * M.vy) / m) * dt; M.ty += M.vy * dt;
          M.vr += ((k * (M.gr - M.tr) - c * M.vr) / m) * dt; M.tr += M.vr * dt;
          if (Math.abs(M.tx) > 0.05 || Math.abs(M.ty) > 0.05 || Math.abs(M.tr) > 0.05 || M.gy !== 0) {
            anyMag = true;
            M.w.style.transform = 'translate(' + M.tx.toFixed(2) + 'px,' + M.ty.toFixed(2) + 'px) rotate(' + M.tr.toFixed(2) + 'deg)';
          } else if (M.w.style.transform) { M.w.style.transform = ''; }
        });
        if (anyMag) busy = true;
      }

      if (busy || !magnetOn) requestAnimationFrame(frame);
      else requestAnimationFrame(idle);
    }

    /* ultra-light idle loop: only watches the mouse near the name */
    var nameBox = document.querySelector('.name');
    function idle() {
      var r = nameBox.getBoundingClientRect();
      if (mouse.x > r.left - 180 && mouse.x < r.right + 180 && mouse.y > r.top - 180 && mouse.y < r.bottom + 180) {
        last = performance.now();
        requestAnimationFrame(frame);
      } else {
        requestAnimationFrame(idle);
      }
    }

    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
