/** The volleyball: drag, flick, bounce around the room, roll back home. Works on the desk SVG's viewBox units. */
import { clamp } from './util';

export interface BallEngine {
  home(x: number, y: number, r: number, W: number): void;
  destroy(): void;
}

export function createBall(svg: SVGSVGElement, g: SVGGElement, rot: SVGGElement, sh: SVGEllipseElement, tag: SVGGElement): BallEngine {
  let x = 0, y = 0, vx = 0, vy = 0, r = 40, hx = 0, hy = 0, W = 1200, floor = 0, ang = 0, active = false, last = 0, tagT = 0;
  let drag: { ox: number; oy: number; px: number; py: number; t: number; moved: number; vx: number; vy: number } | null = null;
  const draw = () => {
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    rot.setAttribute('transform', `rotate(${ang.toFixed(1)})`);
    const h = Math.max(0, floor - y - r);
    sh.setAttribute('cy', (floor - y).toFixed(1)); sh.setAttribute('rx', (34 * Math.max(0.3, 1 - h / 400)).toFixed(1)); sh.setAttribute('opacity', (0.35 * Math.max(0.3, 1 - h / 400)).toFixed(2));
    if (tagT > 0) tag.setAttribute('transform', `translate(${x.toFixed(1)} ${(y - r - 10).toFixed(1)})`);
  };
  const step = (ts: number) => {
    if (!active) return;
    const dt = Math.min(2, (ts - last) / 16.7 || 1); last = ts;
    if (!drag) {
      vy += 0.55 * dt; x += vx * dt; y += vy * dt;
      if (y + r > floor) { y = floor - r; vy = -vy * 0.6; if (Math.abs(vy) < 1.2) vy = 0; vx *= 0.96; }
      if (y - r < 0) { y = r; vy = Math.abs(vy) * 0.5; }
      if (x - r < 0) { x = r; vx = Math.abs(vx) * 0.7; } if (x + r > W) { x = W - r; vx = -Math.abs(vx) * 0.7; }
      ang += vx / r * 57.3 * dt;
      const onFloor = y + r >= floor - 0.5 && vy === 0;
      if (onFloor) {
        vx *= Math.pow(0.985, dt);
        if (Math.abs(vx) < 2.2) { vx += (hx - x) * 0.012 * dt; vx *= Math.pow(0.92, dt); }
        if (Math.abs(hx - x) < 1 && Math.abs(vx) < 0.15) { x = hx; vx = 0; active = false; }
      }
    }
    if (tagT > 0) { tagT -= dt * 16.7; if (tagT <= 0) tag.setAttribute('visibility', 'hidden'); }
    draw(); if (active) requestAnimationFrame(step);
  };
  const go = () => { if (!active) { active = true; last = performance.now(); requestAnimationFrame(step); } };
  const pt = (e: PointerEvent) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM()!.inverse()); };
  const showTag = () => { tag.setAttribute('visibility', 'visible'); tagT = 2400; go(); };
  const onDown = (e: PointerEvent) => { if (e.button) return; e.preventDefault(); g.setPointerCapture(e.pointerId); const p = pt(e); drag = { ox: x - p.x, oy: y - p.y, px: p.x, py: p.y, t: performance.now(), moved: 0, vx: 0, vy: 0 }; vx = vy = 0; go(); };
  const onMove = (e: PointerEvent) => {
    if (!drag) return;
    const p = pt(e), now = performance.now(), dt = Math.max(1, now - drag.t);
    drag.vx = (p.x - drag.px) / dt * 16.7; drag.vy = (p.y - drag.py) / dt * 16.7; drag.px = p.x; drag.py = p.y; drag.t = now;
    drag.moved += Math.hypot(e.movementX || 0, e.movementY || 0);
    x = Math.min(W - r, Math.max(r, p.x + drag.ox)); y = Math.min(floor - r, Math.max(r, p.y + drag.oy)); draw();
  };
  const onUp = () => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.moved < 4) { vy = -15; vx = (Math.random() - 0.5) * 10; }
    else { const stale = performance.now() - d.t > 80; vx = stale ? 0 : clamp(d.vx, -30, 30); vy = stale ? 0 : clamp(d.vy, -30, 30); }
    showTag(); go();
  };
  const onClick = (e: MouseEvent) => { if (e.detail === 0) { vy = -15; vx = (Math.random() - 0.5) * 10; showTag(); go(); } };
  const onVis = () => { if (!document.hidden && active) { last = performance.now(); requestAnimationFrame(step); } };
  g.addEventListener('pointerdown', onDown); g.addEventListener('pointermove', onMove);
  g.addEventListener('pointerup', onUp); g.addEventListener('pointercancel', onUp); g.addEventListener('click', onClick);
  document.addEventListener('visibilitychange', onVis);
  return {
    home(nx, ny, nr, w) { hx = nx; hy = ny; r = nr; W = w; floor = ny + nr; if (!active) { x = hx; y = hy; draw(); } else { x = Math.min(W - r, x); y = Math.min(floor - r, y); } },
    destroy() {
      active = false;
      g.removeEventListener('pointerdown', onDown); g.removeEventListener('pointermove', onMove);
      g.removeEventListener('pointerup', onUp); g.removeEventListener('pointercancel', onUp); g.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVis);
    },
  };
}
