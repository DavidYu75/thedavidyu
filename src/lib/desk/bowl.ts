/**
 * The matcha bowl, whisked in place: a square canvas squashed over the bowl's rim ellipse.
 * Zig-zags of the pointer build foam and lighten the tea; at "perfect" a foam heart says hi.
 */
import { cssFont } from './util';
export interface BowlOptions {
  canvas: HTMLCanvasElement;
  /** the SVG bowl group; gets .whisking / .whisked classes */
  stage: Element;
  meterFill: HTMLElement;
  meterLabel: HTMLElement;
  button: HTMLButtonElement;
  reduced: () => boolean;
}

export interface BowlEngine {
  resize(): void;
  reset(): void;
  auto(): void;
  destroy(): void;
}

export function createBowl(o: BowlOptions): BowlEngine {
  const { canvas: cv, stage } = o, ctx = cv.getContext('2d')!;
  const initialLabel = cv.getAttribute('aria-label') || '';
  let foam = document.createElement('canvas'), fctx = foam.getContext('2d')!;
  let W = 0, dpr = 1, cx = 0, cy = 0, R = 0, LR = 0, S = 1;
  let f = 0, revealed = false, artT0 = 0;
  const whisk = { x: 0, y: 0, vx: 0, vy: 0, on: false, spin: 0 };
  let bubbles: { x: number; y: number; r: number; age: number; life: number }[] = [];
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  const clumps = Array.from({ length: 34 }, () => ({ a: Math.random() * 6.283, d: Math.sqrt(Math.random()) * 0.85, r: rnd(0.012, 0.045) }));
  const TINES = Array.from({ length: 52 }, () => rnd(0.86, 1));
  const wob = (t: number) => 1 + 0.006 * Math.sin(3 * t + 1.3) + 0.004 * Math.sin(7 * t + 0.4);
  function blob(c: CanvasRenderingContext2D, r: number) {
    c.beginPath();
    for (let i = 0; i <= 120; i++) { const t = (i / 120) * Math.PI * 2, rr = r * wob(t); const x = cx + Math.cos(t) * rr, y = cy + Math.sin(t) * rr; if (i) c.lineTo(x, y); else c.moveTo(x, y); }
    c.closePath();
  }
  const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const C0 = [42, 64, 20], C1 = [104, 140, 52], C2 = [197, 218, 150];
  const liquidC = (p: number) => (p < 0.55 ? mix(C0, C1, p / 0.55) : mix(C1, C2, (p - 0.55) / 0.45));
  const easeIO = (t: number) => t * t * (3 - 2 * t);

  function resize() {
    const w = cv.clientWidth; if (!w || Math.abs(w - W) < 0.5) return;
    dpr = Math.min(2, window.devicePixelRatio || 1); const old = foam, oldW = W;
    W = w; cx = cy = W / 2; R = W / 2; LR = R * 0.985; S = W / 420;
    cv.width = Math.round(W * dpr); cv.height = cv.width; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const nf = document.createElement('canvas'); nf.width = cv.width; nf.height = cv.height; const nc = nf.getContext('2d')!;
    if (oldW && old.width) nc.drawImage(old, 0, 0, nf.width, nf.height); nc.setTransform(dpr, 0, 0, dpr, 0, 0);
    foam = nf; fctx = nc; bubbles = []; if (!whisk.x) { whisk.x = cx; whisk.y = cy; } draw(performance.now());
  }
  function heart(c: CanvasRenderingContext2D, h: number) {
    c.beginPath(); c.moveTo(0, h * 0.42); c.bezierCurveTo(-h * 1.05, -h * 0.15, -h * 0.55, -h * 0.95, 0, -h * 0.42); c.bezierCurveTo(h * 0.55, -h * 0.95, h * 1.05, -h * 0.15, 0, h * 0.42); c.closePath();
  }
  function drawArt(now: number) {
    const p = o.reduced() ? 1 : Math.min(1, (now - artT0) / 1000), a = Math.min(1, p * 1.7);
    const back = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2); const sc = 0.55 + 0.45 * back(p), h = LR * 0.62;
    ctx.save(); ctx.translate(cx, cy + h * 0.08); ctx.scale(sc, sc); ctx.shadowColor = `rgba(250,248,232,${0.7 * a})`; ctx.shadowBlur = 10 * S;
    heart(ctx, h); ctx.fillStyle = `rgba(249,247,235,${0.96 * a})`; ctx.fill(); ctx.shadowBlur = 0;
    ctx.save(); ctx.scale(0.8, 0.8); heart(ctx, h); ctx.restore(); ctx.lineWidth = 2.4 * S; ctx.strokeStyle = `rgba(170,198,118,${0.45 * a})`; ctx.stroke();
    const fs = h * 0.5; ctx.font = `700 ${fs}px ${cssFont('--font-caveat', 'Caveat, cursive')}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = `rgba(58,90,36,${a})`; ctx.fillText('hi', 0, -h * 0.06); ctx.restore();
  }
  function drawWhisk() {
    const rw = LR * 0.3, { x, y } = whisk; let lx = -whisk.vx * 0.9, ly = -whisk.vy * 0.9; const ll = Math.hypot(lx, ly), mx = rw * 0.35; if (ll > mx) { lx *= mx / ll; ly *= mx / ll; }
    ctx.fillStyle = 'rgba(18,26,8,.24)'; ctx.beginPath(); ctx.ellipse(x + rw * 0.3, y + rw * 0.36, rw * 1.05, rw, 0, 0, 7); ctx.fill(); ctx.lineCap = 'round';
    for (let i = 0; i < TINES.length; i++) { const t = (i / TINES.length) * 6.283 + whisk.spin, r1 = rw * TINES[i], r0 = rw * 0.32; ctx.strokeStyle = i % 2 ? '#ead9a8' : '#c8ae76'; ctx.lineWidth = 1.5 * S; ctx.beginPath(); ctx.moveTo(x + lx * 0.4 + Math.cos(t) * r0, y + ly * 0.4 + Math.sin(t) * r0); ctx.lineTo(x + Math.cos(t) * r1, y + Math.sin(t) * r1); ctx.stroke(); }
    const lc = liquidC(f); ctx.fillStyle = `rgba(${lc},.8)`;
    for (let i = 0; i < TINES.length; i += 2) { const t = (i / TINES.length) * 6.283 + whisk.spin; ctx.beginPath(); ctx.arc(x + Math.cos(t) * rw * TINES[i], y + Math.sin(t) * rw * TINES[i], 1.3 * S, 0, 7); ctx.fill(); }
    ctx.strokeStyle = '#d7c28b'; ctx.lineWidth = 1.2 * S;
    for (let i = 0; i < 22; i++) { const t = (i / 22) * 6.283 - whisk.spin; ctx.beginPath(); ctx.moveTo(x + lx * 0.6 + Math.cos(t) * rw * 0.1, y + ly * 0.6 + Math.sin(t) * rw * 0.1); ctx.lineTo(x + lx * 0.3 + Math.cos(t) * rw * 0.3, y + ly * 0.3 + Math.sin(t) * rw * 0.3); ctx.stroke(); }
    const hx = x + lx, hy = y + ly; const hg = ctx.createRadialGradient(hx - rw * 0.1, hy - rw * 0.1, 0, hx, hy, rw * 0.36); hg.addColorStop(0, '#f3e5bb'); hg.addColorStop(1, '#bc9c5e');
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hx, hy, rw * 0.33, 0, 7); ctx.fill(); ctx.strokeStyle = '#8e7442'; ctx.lineWidth = 1.3 * S; ctx.stroke();
    ctx.strokeStyle = 'rgba(128,98,52,.45)'; ctx.lineWidth = 1 * S; ctx.beginPath(); ctx.arc(hx, hy, rw * 0.2, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(hx, hy, rw * 0.09, 0, 7); ctx.stroke();
  }
  function draw(now: number) {
    if (!W) return; ctx.clearRect(0, 0, W, W); ctx.save(); blob(ctx, LR); ctx.clip();
    ctx.fillStyle = `rgb(${liquidC(easeIO(f))})`; ctx.fillRect(0, 0, W, W);
    const ca = Math.max(0, 1 - f * 2.3);
    if (ca > 0) for (const k of clumps) { const x = cx + Math.cos(k.a) * k.d * LR, y = cy + Math.sin(k.a) * k.d * LR, r = k.r * LR; ctx.fillStyle = `rgba(24,40,10,${0.6 * ca})`; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.fillStyle = `rgba(150,176,92,${0.4 * ca})`; ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.45, 0, 7); ctx.fill(); }
    ctx.globalAlpha = Math.min(1, 0.4 + f); ctx.drawImage(foam, 0, 0, W, W); ctx.globalAlpha = 1;
    for (const b of bubbles) { const life = 1 - b.age / b.life; ctx.globalAlpha = Math.min(1, life * 2); ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 7); ctx.fillStyle = 'rgba(255,255,245,.13)'; ctx.fill(); ctx.lineWidth = Math.max(0.6, b.r * 0.18); ctx.strokeStyle = 'rgba(255,255,245,.62)'; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.22, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
    const sh = ctx.createRadialGradient(cx - LR * 0.35, cy - LR * 0.4, 0, cx - LR * 0.35, cy - LR * 0.4, LR * 0.9); sh.addColorStop(0, 'rgba(255,255,236,.13)'); sh.addColorStop(1, 'rgba(255,255,236,0)'); ctx.fillStyle = sh; ctx.fillRect(0, 0, W, W);
    if (revealed) drawArt(now);
    const m = ctx.createRadialGradient(cx, cy, LR * 0.8, cx, cy, LR * 1.02); m.addColorStop(0, 'rgba(20,30,8,0)'); m.addColorStop(1, 'rgba(20,30,8,.42)'); ctx.fillStyle = m; ctx.fillRect(0, 0, W, W);
    ctx.restore(); if (whisk.on) drawWhisk();
  }
  function stampFoam(x0: number, y0: number, x1: number, y1: number) {
    const d = Math.hypot(x1 - x0, y1 - y0), steps = Math.max(1, Math.ceil(d / (W * 0.012))); const fc = mix([100, 134, 46], [230, 239, 204], easeIO(f));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
      for (let k = 0; k < 3; k++) { const a = Math.random() * 6.283, rr = Math.random() * LR * 0.27; fctx.fillStyle = `rgba(${fc},${0.05 + 0.13 * f})`; fctx.beginPath(); fctx.arc(x + Math.cos(a) * rr, y + Math.sin(a) * rr, rnd(2, 6.5) * S, 0, 7); fctx.fill(); }
      if (f > 0.25 && Math.random() < 0.6) { const a = Math.random() * 6.283, rr = Math.random() * LR * 0.3; fctx.strokeStyle = `rgba(255,255,245,${0.12 + 0.25 * f})`; fctx.lineWidth = 0.6 * S; fctx.beginPath(); fctx.arc(x + Math.cos(a) * rr, y + Math.sin(a) * rr, rnd(0.7, 2) * S, 0, 7); fctx.stroke(); }
    }
  }
  function microFoam() {
    for (let i = 0; i < 900; i++) {
      const a = Math.random() * 6.283, rr = Math.sqrt(Math.random()) * LR, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      if (i % 3) { fctx.fillStyle = `rgba(232,240,208,${rnd(0.08, 0.22)})`; fctx.beginPath(); fctx.arc(x, y, rnd(1.5, 5) * S, 0, 7); fctx.fill(); }
      else { fctx.strokeStyle = 'rgba(255,255,248,.4)'; fctx.lineWidth = 0.6 * S; fctx.beginPath(); fctx.arc(x, y, rnd(0.6, 1.8) * S, 0, 7); fctx.stroke(); }
    }
  }
  function spawnBubbles(x: number, y: number, d: number) {
    const n = Math.min(4, Math.floor(d / (W * 0.025)) + (Math.random() < 0.5 ? 1 : 0));
    for (let i = 0; i < n && bubbles.length < 150; i++) { const a = Math.random() * 6.283, rr = Math.random() * LR * 0.34; const bx = x + Math.cos(a) * rr, by = y + Math.sin(a) * rr; if (Math.hypot(bx - cx, by - cy) > LR * 0.97) continue; bubbles.push({ x: bx, y: by, r: rnd(1.4, 4.8) * S * (1 - f * 0.45), age: 0, life: rnd(0.5, 1.8) }); }
  }
  const STAGES: [number, string][] = [[0, 'flat'], [0.12, 'waking up'], [0.4, 'getting frothy'], [0.72, 'almost there'], [1, 'perfect']];
  let stageIdx = 0;
  function setProgress(v: number) {
    f = Math.max(0, Math.min(1, v)); o.meterFill.style.width = (f * 100).toFixed(1) + '%';
    let s = 0; STAGES.forEach(([t], i) => { if (f >= t) s = i; });
    if (s !== stageIdx) { stageIdx = s; o.meterLabel.textContent = STAGES[s][1]; }
    if (f >= 1 && !revealed) reveal();
  }
  function reveal() { revealed = true; artT0 = performance.now(); microFoam(); stage.classList.add('whisked'); o.button.textContent = 'Whisk it again'; cv.setAttribute('aria-label', 'The matcha bowl, whisked. A foam heart says hi.'); request(); }
  function reset() { revealed = false; bubbles = []; fctx.save(); fctx.setTransform(1, 0, 0, 1, 0, 0); fctx.clearRect(0, 0, foam.width, foam.height); fctx.restore(); stageIdx = -1; setProgress(0); o.button.textContent = 'Whisk it for me'; cv.setAttribute('aria-label', initialLabel); stage.classList.remove('whisked'); request(); }
  let raf = 0, lastFrame = 0, auto: { t0: number; dur: number; f0: number; lx: number; ly: number } | null = null, alive = true;
  function request() { if (!raf && !document.hidden && alive) raf = requestAnimationFrame(frame); }
  function frame(now: number) {
    raf = 0; const dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 0.016; lastFrame = now;
    if (auto) stepAuto(now); for (const b of bubbles) b.age += dt; bubbles = bubbles.filter((b) => b.age < b.life); draw(now);
    const artAnim = revealed && !o.reduced() && now - artT0 < 1100; if (bubbles.length || artAnim || auto) request(); else lastFrame = 0;
  }
  const onVis = () => { if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = 0; lastFrame = 0; } else request(); };
  document.addEventListener('visibilitychange', onVis);
  let lastX = 0, lastY = 0, lastT = 0, sgnX = 0, sgnY = 0, runX = 0, runY = 0, down = false;
  function pos(e: PointerEvent) { const r = cv.getBoundingClientRect(); return [((e.clientX - r.left) * W) / r.width, ((e.clientY - r.top) * W) / r.height]; }
  function startWhisk(x: number, y: number) { whisk.on = true; whisk.x = lastX = x; whisk.y = lastY = y; whisk.vx = whisk.vy = 0; lastT = performance.now(); stage.classList.add('whisking'); request(); }
  function endWhisk() { if (auto) return; whisk.on = false; stage.classList.remove('whisking'); request(); }
  function moveWhisk(x: number, y: number) {
    const now = performance.now(); const dx = x - lastX, dy = y - lastY, d = Math.hypot(dx, dy), dt = Math.max(8, now - lastT);
    whisk.vx = dx; whisk.vy = dy; whisk.x = x; whisk.y = y; whisk.spin += d * 0.004;
    const inside = Math.hypot(x - cx, y - cy) < LR * 1.02;
    if (inside && d > 0 && !revealed && !auto) {
      const speed = d / dt / W; let add = (d / W) * 0.09 * Math.min(1, 0.2 + speed / 0.0018); const sx = Math.sign(dx), sy = Math.sign(dy);
      if (Math.abs(dx) > 0.5) { if (sx !== sgnX) { if (sgnX && runX > W * 0.06) add += 0.022; runX = 0; sgnX = sx; } runX += Math.abs(dx); }
      if (Math.abs(dy) > 0.5) { if (sy !== sgnY) { if (sgnY && runY > W * 0.06) add += 0.022; runY = 0; sgnY = sy; } runY += Math.abs(dy); }
      stampFoam(lastX, lastY, x, y); spawnBubbles(x, y, d); setProgress(f + add);
    }
    lastX = x; lastY = y; lastT = now; request();
  }
  const onDown = (e: PointerEvent) => { down = true; try { cv.setPointerCapture(e.pointerId); } catch { /* ignore */ } const [x, y] = pos(e); if (e.pointerType === 'mouse' && whisk.on) moveWhisk(x, y); else startWhisk(x, y); };
  const onMove = (e: PointerEvent) => { if (e.pointerType !== 'mouse' && !down) return; const [x, y] = pos(e); if (!whisk.on) startWhisk(x, y); else moveWhisk(x, y); };
  const onUp = (e: PointerEvent) => { down = false; if (e.pointerType !== 'mouse') endWhisk(); };
  const onCancel = () => { down = false; endWhisk(); };
  const onLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse' || !down) endWhisk(); };
  const onTouch = (e: TouchEvent) => e.preventDefault();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!revealed) autoWhisk(); return; }
    const dir = ({ ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] } as Record<string, [number, number]>)[e.key]; if (!dir) return; e.preventDefault(); if (revealed) return;
    const x0 = whisk.on ? whisk.x : cx, y0 = whisk.on ? whisk.y : cy; const tx = cx + dir[0] * LR * 0.5 + rnd(-6, 6) * S, ty = cy + dir[1] * LR * 0.5 + rnd(-6, 6) * S;
    whisk.on = true; stage.classList.add('whisking'); whisk.vx = tx - x0; whisk.vy = ty - y0; whisk.x = tx; whisk.y = ty; whisk.spin += 0.3; stampFoam(x0, y0, tx, ty); spawnBubbles(tx, ty, LR * 0.5); setProgress(f + 0.07); request();
  };
  const onBlur = () => { if (!down && !auto) endWhisk(); };
  cv.addEventListener('pointerdown', onDown); cv.addEventListener('pointermove', onMove); cv.addEventListener('pointerup', onUp);
  cv.addEventListener('pointercancel', onCancel); cv.addEventListener('pointerleave', onLeave); cv.addEventListener('touchmove', onTouch, { passive: false });
  cv.addEventListener('keydown', onKey); cv.addEventListener('blur', onBlur);
  function autoWhisk() {
    if (auto) return; if (revealed) reset();
    if (o.reduced()) { stampFoam(cx - LR * 0.5, cy, cx + LR * 0.5, cy); setProgress(1); request(); return; }
    auto = { t0: performance.now(), dur: 1400, f0: f, lx: cx, ly: cy }; whisk.on = true; whisk.x = cx; whisk.y = cy; stage.classList.add('whisking'); request();
  }
  function stepAuto(now: number) {
    if (!auto) return;
    const p = Math.min(1, (now - auto.t0) / auto.dur); const x = cx + Math.sin(p * Math.PI * 2 * 6.5) * LR * 0.55, y = cy + Math.sin(p * Math.PI * 2 * 0.9) * LR * 0.32;
    whisk.vx = x - auto.lx; whisk.vy = y - auto.ly; whisk.x = x; whisk.y = y; whisk.spin += 0.06; stampFoam(auto.lx, auto.ly, x, y); spawnBubbles(x, y, Math.hypot(whisk.vx, whisk.vy)); auto.lx = x; auto.ly = y;
    const target = auto.f0 + (1 - auto.f0) * p;
    if (p >= 1) { auto = null; whisk.on = false; stage.classList.remove('whisking'); setProgress(1); } else setProgress(Math.min(0.999, target));
  }
  const onBtn = () => { if (revealed) { reset(); cv.focus({ preventScroll: true }); } else autoWhisk(); };
  o.button.addEventListener('click', onBtn);
  const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null; ro?.observe(cv);
  return {
    resize, reset, auto: autoWhisk,
    destroy() {
      alive = false; if (raf) cancelAnimationFrame(raf); ro?.disconnect(); document.removeEventListener('visibilitychange', onVis);
      cv.removeEventListener('pointerdown', onDown); cv.removeEventListener('pointermove', onMove); cv.removeEventListener('pointerup', onUp);
      cv.removeEventListener('pointercancel', onCancel); cv.removeEventListener('pointerleave', onLeave); cv.removeEventListener('touchmove', onTouch);
      cv.removeEventListener('keydown', onKey); cv.removeEventListener('blur', onBlur); o.button.removeEventListener('click', onBtn);
    },
  };
}
