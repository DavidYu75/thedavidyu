/**
 * The night sky out the window: canvas background, named stars with constellation lines,
 * drag parallax, stardust, shooting stars and the summer-triangle easter egg.
 * React owns the cards and panels; this engine owns the canvas, the hover label and the star positions.
 */
import { clamp, rng } from './util';
import { makeSkyline, Skyline } from './skyline';

export interface SkyStarInput {
  id: string;
  name: string;
  full?: string;
  kind: 'project' | 'hobby';
  when?: string;
  col: string;
  d: [number, number];
  m: [number, number];
}

export interface SkyStar extends SkyStarInput {
  i: number;
  x: number;
  y: number;
  hl: number;
  sp: number;
  ph: number;
  groups: string[];
  rel: { to: string; g: string }[];
}

export interface SkyOptions {
  canvas: HTMLCanvasElement;
  /** the absolutely positioned layer that holds the star buttons (data-star="id") */
  layer: HTMLElement;
  label: HTMLElement;
  comet: HTMLElement;
  stars: SkyStarInput[];
  groups: { name: string; ids: string[] }[];
  triangle: string[];
  panelWidth: number;
  reduced: () => boolean;
  /** 0..1 how dark the night is (pinned to deep night in the design) */
  nightF: () => number;
  onOpen(star: SkyStar, keyboard: boolean): void;
  /** the three hobby stars were clicked in order; cards should close */
  onEggStart(): void;
  onEggShown(): void;
  /** a tap on empty sky */
  onTap(): void;
}

export interface SkyEngine {
  stars: SkyStar[];
  byId: Record<string, SkyStar>;
  layout(): void;
  start(): void;
  stop(): void;
  destroy(): void;
  hover(id: string | null): void;
  click(id: string, keyboard: boolean): void;
  select(id: string | null): void;
  setEggOpen(open: boolean): void;
  setInset(px: number): void;
  pan(key: string): void;
  redraw(): void;
  readonly phone: boolean;
}

export function createSky(o: SkyOptions): SkyEngine {
  const ACC = '242,200,121';
  const { canvas: cvs, layer, label } = o, ctx = cvs.getContext('2d')!;
  const STYLE = { project: { core: 2.5, glow: 32, ga: 0.5, spikes: 17, ca: 1 }, hobby: { core: 2.8, glow: 30, ga: 0.3, spikes: 0, ca: 0.62 } };
  const stars: SkyStar[] = o.stars.map((s, i) => ({ ...s, i, x: 0, y: 0, hl: 0, sp: 0.6 + Math.random() * 1.6, ph: Math.random() * 6.283, groups: [], rel: [] }));
  const byId: Record<string, SkyStar> = {}; stars.forEach((s) => (byId[s.id] = s));
  o.groups.forEach((g) => g.ids.forEach((id) => { const s = byId[id]; if (!s) return; s.groups.push(g.name); g.ids.forEach((other) => { if (other !== id && byId[other] && !s.rel.some((r) => r.to === other)) s.rel.push({ to: other, g: g.name }); }); }));

  let W = 0, H = 0, dpr = 1, ph = false, MX = 0, MY = 0, panX = 0, panY = 0, tpx = 0, tpy = 0, inset = 0, insetT = 0;
  let bg: { c: HTMLCanvasElement } | null = null, sky: Skyline | null = null;
  let bgStars: { x: number; y: number; l: number; r: number; a: number; c: string; sp: number; ph: number; tw: boolean }[] = [];
  const LF = [0.15, 0.35, 0.6];
  let hover: SkyStar | null = null, selected: SkyStar | null = null, lineFor: SkyStar | null = null, lineP = 0;
  let seq: string[] = [], eggDone = false, egg = false;
  let parts: { x: number; y: number; vx: number; vy: number; life: number; dec: number; r: number; c: string }[] = [];
  let shoots: { x0: number; y0: number; x1: number; y1: number; t: number; dur: number; len: number; special?: boolean }[] = [];
  let nextShoot = 0, introStart = 0, dirty = true, raf = 0, last = 0;
  const reduced = () => o.reduced();

  const mk = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = Math.ceil(w * dpr); c.height = Math.ceil(h * dpr); const g = c.getContext('2d')!; g.setTransform(dpr, 0, 0, dpr, 0, 0); return { c, g, w, h }; };
  const landmarks = () => ph ? { esb: [0.30, 0.72] as [number, number], chr: [0.46, 0.73] as [number, number], wtc: [0.76, 0.69] as [number, number] } : { esb: [0.50, 0.53] as [number, number], chr: [0.575, 0.565] as [number, number], wtc: [0.72, 0.47] as [number, number] };
  const btnOf = (s: SkyStar) => layer.querySelector<HTMLElement>(`[data-star="${s.id}"]`);

  function placeStars() {
    const SW = W - inset;
    stars.forEach((s) => { const p = ph ? s.m : s.d; s.x = p[0] * SW; s.y = p[1] * H; const b = btnOf(s); if (b) { b.style.left = s.x + 'px'; b.style.top = s.y + 'px'; } });
  }
  function layout() {
    W = innerWidth; H = innerHeight; dpr = Math.min(2, window.devicePixelRatio || 1); ph = W < 720;
    MX = Math.round(Math.min(90, W * 0.07)); MY = Math.round(Math.min(40, H * 0.05));
    cvs.width = Math.round(W * dpr); cvs.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    inset = insetT = ph ? 0 : insetT; placeStars();
    tpx = clamp(tpx, -MX, MX); tpy = clamp(tpy, -MY, MY);
    buildBg(); buildStars(); const L = landmarks();
    sky = makeSkyline(W, H, { u: clamp(W / 1440, 0.55, 1.1), MX, hFrac: 0.6, esb: L.esb, chr: L.chr, wtc: L.wtc, backTop: ph ? [0.785, 0.07] : [0.755, 0.085], frontTop: ph ? [0.845, 0.06] : [0.82, 0.075], nearK: ph ? 0.6 : 0.9, leftFlat: !ph }, dpr);
    if (hover || selected) placeLabel((hover || selected)!); dirty = true;
  }
  function buildBg() {
    const b = mk(W, H); const c = b.g; let g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#010209'); g.addColorStop(0.35, '#040a1b'); g.addColorStop(0.62, '#08132b'); g.addColorStop(0.8, '#0D1B2A'); g.addColorStop(1, '#1b1c2c');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.save(); c.translate(W * 0.64, H * 0.3); c.rotate(-0.52); c.scale(1, 0.16); const r = Math.max(W, H) * 0.75; g = c.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, 'rgba(160,170,235,.11)'); g.addColorStop(0.45, 'rgba(130,115,200,.045)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(-r, -r, 2 * r, 2 * r); c.restore();
    g = c.createLinearGradient(0, H * 0.5, 0, H); g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(0.55, 'rgba(190,110,140,.08)'); g.addColorStop(1, 'rgba(255,150,95,.24)'); c.fillStyle = g; c.fillRect(0, H * 0.5, W, H * 0.5);
    const L = landmarks(); [L.esb[0], L.chr[0], L.wtc[0]].forEach((x) => { const rg = c.createRadialGradient(x * W, H, 0, x * W, H, W * (ph ? 0.6 : 0.3)); rg.addColorStop(0, 'rgba(255,165,110,.12)'); rg.addColorStop(1, 'rgba(255,165,110,0)'); c.fillStyle = rg; c.fillRect(0, 0, W, H); });
    bg = b;
  }
  function buildStars() {
    const R = rng(41); bgStars = []; const n = Math.min(1100, Math.round(W * H / 1500)); const cols = ['255,244,228', '232,240,255', '255,236,212', '218,230,255', '255,255,255', '255,228,200'];
    const bx = W * 0.64, by = H * 0.3, dx = Math.cos(-0.52), dy = Math.sin(-0.52), span = Math.max(W, H) * 0.9;
    for (let i = 0; i < n; i++) {
      const q = R(), l = q < 0.62 ? 0 : q < 0.9 ? 1 : 2; let x: number, y: number;
      if (l === 0 && R() < 0.42) { const t = (R() * 2 - 1) * span, oo = (R() + R() + R() - 1.5) * H * 0.09; x = bx + dx * t - dy * oo; y = by + dy * t + dx * oo; } else { x = -MX + R() * (W + 2 * MX); y = -MY + R() * (H * 0.92 + MY); }
      const r = l === 0 ? 0.35 + R() * 0.45 : l === 1 ? 0.6 + R() * 0.6 : 0.95 + R() * 0.8, a = l === 0 ? 0.25 + R() * 0.4 : l === 1 ? 0.4 + R() * 0.4 : 0.6 + R() * 0.4;
      bgStars.push({ x, y, l, r, a, c: 'rgb(' + cols[(R() * cols.length) | 0] + ')', sp: 0.4 + R() * 2.2, ph: R() * 6.283, tw: R() < 0.6 });
    }
  }
  const introK = (delay: number, dur: number, now: number) => { if (reduced()) return 1; const k = clamp((now - introStart - delay) / dur, 0, 1); return 1 - Math.pow(1 - k, 3); };
  function drawBgStars(t: number, now: number) {
    const k = introK(0, 900, now);
    for (const s of bgStars) { const f = LF[s.l], x = s.x + panX * f, y = s.y + panY * f; if (x < -3 || x > W + 3 || y < -3 || y > H) continue; ctx.globalAlpha = s.a * k * (reduced() || !s.tw ? 1 : 0.6 + 0.4 * Math.sin(t * s.sp + s.ph)); ctx.fillStyle = s.c; if (s.r < 1) ctx.fillRect(x, y, s.r * 1.7, s.r * 1.7); else { ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill(); } }
    ctx.globalAlpha = 1;
  }
  function drawNamed(t: number, now: number) {
    ctx.globalCompositeOperation = 'lighter';
    for (const s of stars) {
      const ig = introK(120 + s.i * 50, 380, now); if (ig <= 0) continue;
      const want = (s === hover || s === selected || (egg && o.triangle.includes(s.id))) ? 1 : 0; s.hl += (want - s.hl) * (reduced() ? 1 : 0.14);
      const x = s.x + panX, y = s.y + panY, P = STYLE[s.kind]; const tw = reduced() ? 1 : 0.8 + 0.2 * Math.sin(t * s.sp + s.ph); const G = P.glow * (1 + 0.4 * s.hl) * (0.9 + 0.1 * tw) * (0.6 + 0.4 * ig);
      const g = ctx.createRadialGradient(x, y, 0, x, y, G); g.addColorStop(0, `rgba(${s.col},${Math.min(1, (P.ga * tw + 0.25 * s.hl) * ig)})`); g.addColorStop(0.22, `rgba(${s.col},${P.ga * 0.32 * ig})`); g.addColorStop(1, `rgba(${s.col},0)`); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, G, 0, 6.283); ctx.fill();
      if (P.spikes) {
        const Ln = (P.spikes + 12 * s.hl) * tw * ig; let lg = ctx.createLinearGradient(x - Ln, y, x + Ln, y); lg.addColorStop(0, `rgba(${s.col},0)`); lg.addColorStop(0.5, `rgba(${s.col},${0.7 * ig})`); lg.addColorStop(1, `rgba(${s.col},0)`); ctx.fillStyle = lg; ctx.fillRect(x - Ln, y - 0.5, 2 * Ln, 1);
        lg = ctx.createLinearGradient(x, y - Ln, x, y + Ln); lg.addColorStop(0, `rgba(${s.col},0)`); lg.addColorStop(0.5, `rgba(${s.col},${0.7 * ig})`); lg.addColorStop(1, `rgba(${s.col},0)`); ctx.fillStyle = lg; ctx.fillRect(x - 0.5, y - Ln, 1, 2 * Ln);
      }
      ctx.fillStyle = `rgba(255,255,255,${P.ca * ig})`; ctx.beginPath(); ctx.arc(x, y, P.core * (1 + 0.3 * s.hl) * (0.92 + 0.08 * tw), 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    for (const s of stars) { if (s.hl < 0.03) continue; const x = s.x + panX, y = s.y + panY; ctx.strokeStyle = `rgba(${ACC},${0.55 * s.hl})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 13 + 3 * (1 - s.hl), 0, 6.283); ctx.stroke(); if (s === selected) { ctx.save(); ctx.setLineDash([2, 5]); ctx.lineDashOffset = reduced() ? 0 : -t * 8; ctx.beginPath(); ctx.arc(x, y, 20, 0, 6.283); ctx.stroke(); ctx.restore(); } }
  }
  function drawLines() {
    const s = hover || selected; if (!s) { lineFor = null; lineP = 0; return; } if (s !== lineFor) { lineFor = s; lineP = 0; } lineP = Math.min(1, lineP + (reduced() ? 1 : 0.07));
    const e = 1 - Math.pow(1 - lineP, 3), seen = new Set<string>(); ctx.lineWidth = 1; ctx.font = '500 9.5px var(--font-dm-mono), "DM Mono", ui-monospace, monospace'; ctx.textBaseline = 'middle';
    for (const r of s.rel) {
      const other = byId[r.to], x1 = s.x + panX, y1 = s.y + panY, x2 = other.x + panX, y2 = other.y + panY; const d = Math.hypot(x2 - x1, y2 - y1); if (d < 30) continue; const ux = (x2 - x1) / d, uy = (y2 - y1) / d, gap = 15, len = (d - 2 * gap) * e;
      ctx.strokeStyle = `rgba(${ACC},.38)`; ctx.beginPath(); ctx.moveTo(x1 + ux * gap, y1 + uy * gap); ctx.lineTo(x1 + ux * (gap + len), y1 + uy * (gap + len)); ctx.stroke();
      if (lineP >= 1) { ctx.strokeStyle = `rgba(${ACC},.3)`; ctx.beginPath(); ctx.arc(x2, y2, 9, 0, 6.283); ctx.stroke(); if (!seen.has(r.g) && d > 140) { seen.add(r.g); const mx = (x1 + x2) / 2 - uy * 11, my = (y1 + y2) / 2 + ux * 11; ctx.fillStyle = `rgba(${ACC},.72)`; ctx.textAlign = 'center'; ctx.fillText(r.g.toUpperCase(), mx, my); } }
    }
    if (!reduced() && lineP < 1) dirty = true;
  }
  function drawEgg() {
    const pts = (eggDone ? o.triangle : seq).map((id) => byId[id]).filter(Boolean); if (pts.length < 2) return;
    ctx.save(); ctx.strokeStyle = `rgba(${ACC},${eggDone ? (egg ? 0.85 : 0.35) : 0.7})`; ctx.lineWidth = eggDone && egg ? 1.6 : 1.2; ctx.shadowColor = `rgba(${ACC},.8)`; ctx.shadowBlur = egg ? 12 : 4;
    ctx.beginPath(); pts.forEach((p, i) => { const x = p.x + panX, y = p.y + panY; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
    if (eggDone) { ctx.closePath(); ctx.fillStyle = `rgba(${ACC},${egg ? 0.07 : 0.03})`; ctx.fill(); } ctx.stroke(); ctx.restore();
  }
  let lastDust: { x: number; y: number } | null = null;
  function dust(x: number, y: number) {
    if (reduced()) return; if (lastDust && Math.hypot(x - lastDust.x, y - lastDust.y) < 7) return; lastDust = { x, y };
    const n = 1 + (Math.random() < 0.5 ? 1 : 0);
    for (let i = 0; i < n; i++) parts.push({ x: x + (Math.random() - 0.5) * 6, y: y + (Math.random() - 0.5) * 6, vx: (Math.random() - 0.5) * 0.018, vy: 0.006 + Math.random() * 0.014, life: 1, dec: 1 / (700 + Math.random() * 900), r: 0.4 + Math.random() * 1.3, c: Math.random() < 0.25 ? ACC : Math.random() < 0.5 ? '255,244,228' : '220,232,255' });
    if (parts.length > 180) parts.splice(0, parts.length - 180);
  }
  function drawDust(dt: number) {
    if (!parts.length) return; ctx.globalCompositeOperation = 'lighter';
    for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= p.dec * dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; ctx.fillStyle = `rgba(${p.c},${p.life * 0.85})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.6 + 0.4 * p.life), 0, 6.283); ctx.fill(); }
    ctx.globalCompositeOperation = 'source-over';
  }
  function shoot(special: boolean) {
    if (special) shoots.push({ x0: W + 60, y0: H * (ph ? 0.2 : 0.1), x1: -260, y1: H * (ph ? 0.45 : 0.58), t: 0, dur: 1900, len: 220, special: true });
    else { const x0 = W * (0.35 + Math.random() * 0.6), y0 = H * Math.random() * 0.3, ang = Math.PI * (0.78 + Math.random() * 0.12), dist = 260 + Math.random() * 220; shoots.push({ x0, y0, x1: x0 + Math.cos(ang) * dist, y1: y0 + Math.sin(ang) * dist, t: 0, dur: 800 + Math.random() * 400, len: 110 }); }
  }
  function drawShoots(dt: number) {
    for (let i = shoots.length - 1; i >= 0; i--) {
      const s = shoots[i]; s.t += dt; const k = s.t / s.dur;
      if (k >= 1) { shoots.splice(i, 1); if (s.special) { o.comet.style.opacity = '0'; o.onEggShown(); } continue; }
      const e = s.special ? k : k * (2 - k); const x = s.x0 + (s.x1 - s.x0) * e, y = s.y0 + (s.y1 - s.y0) * e; const d = Math.hypot(s.x1 - s.x0, s.y1 - s.y0), ux = (s.x1 - s.x0) / d, uy = (s.y1 - s.y0) / d; const fade = s.special ? 1 : Math.sin(Math.PI * k);
      const g = ctx.createLinearGradient(x, y, x - ux * s.len, y - uy * s.len); g.addColorStop(0, `rgba(255,248,230,${0.95 * fade})`); g.addColorStop(0.3, `rgba(${ACC},${0.4 * fade})`); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.strokeStyle = g; ctx.lineWidth = s.special ? 2.4 : 1.3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - ux * s.len, y - uy * s.len); ctx.stroke();
      if (s.special) { const hg = ctx.createRadialGradient(x, y, 0, x, y, 16); hg.addColorStop(0, 'rgba(255,250,235,.95)'); hg.addColorStop(1, 'rgba(255,250,235,0)'); ctx.fillStyle = hg; ctx.fillRect(x - 16, y - 16, 32, 32); o.comet.style.opacity = '1'; o.comet.style.transform = `translate3d(${x + 14}px,${y + 8}px,0)`; }
    }
  }
  function frame(now: number) {
    raf = requestAnimationFrame(frame); const dt = Math.min(50, now - last); last = now; const t = now / 1000; const ox = panX, oy = panY;
    panX += (tpx - panX) * (reduced() ? 1 : 0.12); panY += (tpy - panY) * (reduced() ? 1 : 0.12); if (Math.abs(tpx - panX) < 0.05) panX = tpx; if (Math.abs(tpy - panY) < 0.05) panY = tpy;
    const moved = ox !== panX || oy !== panY; if (moved) layer.style.transform = `translate3d(${panX}px,${panY}px,0)`;
    if (inset !== insetT) { inset += (insetT - inset) * (reduced() ? 1 : 0.16); if (Math.abs(insetT - inset) < 0.5) inset = insetT; placeStars(); if (hover || selected) placeLabel((hover || selected)!); dirty = true; }
    const intro = !reduced() && now - introStart < 1500;
    if (reduced() && !moved && !dirty && !parts.length && !shoots.length && inset === insetT) return; dirty = false;
    if (!reduced() && now > nextShoot) { if (nextShoot) shoot(false); nextShoot = now + 14000 + Math.random() * 16000; }
    if (!sky || !bg) return;
    sky.tick(dt, reduced()); ctx.drawImage(bg.c, 0, 0, W, H); drawBgStars(t, now); drawShoots(dt); drawEgg(); drawLines(); drawNamed(t, now); sky.draw(ctx, t, panX, panY, reduced(), 1); drawDust(dt); if (intro) dirty = true;
  }
  function start() { if (!raf) { last = performance.now(); introStart = performance.now(); nextShoot = 0; raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  function placeLabel(s: SkyStar) { const w = label.offsetWidth, right = s.x + panX + 22 + w < W - 12; label.style.left = (right ? s.x + 20 : s.x - 20 - w) + 'px'; label.style.top = (s.y - 44) + 'px'; }
  function setHover(s: SkyStar | null) {
    hover = s; dirty = true; const show = s || selected;
    if (show && !(show === selected && !ph)) {
      label.querySelector('b')!.textContent = show.name;
      label.querySelector('small')!.textContent = show.groups.filter((g) => !(show.kind === 'hobby' && g === 'Off hours') || show.groups.length === 1).join(' · ');
      label.classList.add('on'); placeLabel(show);
    } else label.classList.remove('on');
  }

  let drag: { id: number; sx: number; sy: number; px: number; py: number; moved: boolean } | null = null;
  const onDown = (e: PointerEvent) => { drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, px: tpx, py: tpy, moved: false }; try { cvs.setPointerCapture(e.pointerId); } catch { /* ignore */ } };
  const onMove = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return; const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (!drag.moved && Math.hypot(dx, dy) > 6) { drag.moved = true; cvs.classList.add('drag'); }
    if (drag.moved) { tpx = clamp(drag.px + dx * 0.4, -MX, MX); tpy = clamp(drag.py + dy * 0.4, -MY, MY); dirty = true; }
    if (e.pointerType !== 'mouse') dust(e.clientX, e.clientY);
  };
  const endDrag = (e: PointerEvent) => { if (!drag) return; if (!drag.moved && e.type === 'pointerup') o.onTap(); drag = null; cvs.classList.remove('drag'); };
  const onViewMove = (e: PointerEvent) => { if (e.pointerType === 'mouse' || e.pointerType === 'pen') dust(e.clientX, e.clientY); };
  cvs.addEventListener('pointerdown', onDown); cvs.addEventListener('pointermove', onMove); cvs.addEventListener('pointerup', endDrag); cvs.addEventListener('pointercancel', endDrag);
  const view = cvs.parentElement!; view.addEventListener('pointermove', onViewMove, { passive: true });
  const onVis = () => { if (!raf && document.hidden) return; };
  document.addEventListener('visibilitychange', onVis);

  return {
    stars, byId, layout, start, stop,
    get phone() { return ph; },
    destroy() { stop(); cvs.removeEventListener('pointerdown', onDown); cvs.removeEventListener('pointermove', onMove); cvs.removeEventListener('pointerup', endDrag); cvs.removeEventListener('pointercancel', endDrag); view.removeEventListener('pointermove', onViewMove); document.removeEventListener('visibilitychange', onVis); },
    hover(id) { setHover(id ? byId[id] || null : null); },
    click(id, keyboard) {
      const s = byId[id]; if (!s) return;
      if (o.triangle.includes(s.id) && !eggDone) {
        const at = seq.indexOf(s.id); if (at === -1) seq.push(s.id); else if (at !== seq.length - 1) seq = [s.id];
        if (seq.length === 3) { eggDone = true; egg = true; dirty = true; o.onEggStart(); if (reduced()) o.onEggShown(); else shoot(true); return; }
      } else seq = [];
      o.onOpen(s, keyboard);
    },
    select(id) { selected = id ? byId[id] || null : null; setHover(hover); dirty = true; },
    setEggOpen(open) { egg = open; dirty = true; },
    setInset(px) { insetT = ph ? 0 : px; dirty = true; },
    pan(key) { tpx = clamp(tpx + (key === 'ArrowLeft' ? 20 : key === 'ArrowRight' ? -20 : 0), -MX, MX); tpy = clamp(tpy + (key === 'ArrowUp' ? 12 : key === 'ArrowDown' ? -12 : 0), -MY, MY); dirty = true; },
    redraw() { dirty = true; },
  };
}
