/**
 * One Manhattan skyline generator used twice: baked into the window behind the desk,
 * and drawn live (with twinkling windows and parallax) in the night-sky view.
 */
import { rng } from './util';

export interface SkylineConfig {
  u: number;
  MX?: number;
  hFrac: number;
  esb: [number, number];
  chr: [number, number];
  wtc: [number, number];
  backTop: [number, number];
  frontTop: [number, number];
  nearK?: number;
  leftFlat?: boolean;
  backColor?: string;
  frontColor?: string;
}

interface Win { x: number; y: number; w: number; h: number; row: number; on: number; tg: number; warm: boolean; tv: boolean; ph: number }
interface Layer { c: HTMLCanvasElement; g: CanvasRenderingContext2D; w: number; h: number }

export interface Skyline {
  draw(ctx: CanvasRenderingContext2D, t: number, panX: number, panY: number, reduced: boolean, winAlpha?: number): void;
  tick(dt: number, reduced: boolean): void;
}

export function makeSkyline(W: number, H: number, cfg: SkylineConfig, dpr: number): Skyline {
  const R = rng(1987), u = cfg.u, MX = cfg.MX || 0, EXTRA = 60;
  const mk = (w: number, h: number): Layer => {
    const c = document.createElement('canvas');
    c.width = Math.ceil(w * dpr); c.height = Math.ceil(h * dpr);
    const g = c.getContext('2d')!; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { c, g, w, h };
  };
  const SM = Math.ceil(MX * 1.4) + 14, SW = W + SM * 2, SH = Math.ceil(H * cfg.hFrac) + EXTRA, top0 = H + EXTRA - SH;
  const back = mk(SW, SH), front = mk(SW, SH);
  const wins: Win[] = [], tips: { x: number; y: number }[] = [];
  const G = SH, cy = (sy: number) => sy - top0, L = cfg;

  function addWins(x: number, top: number, w: number, Gb: number, row: number, warmP?: number) {
    const sx = Math.max(4, Math.round(5.5 * u)), sy = Math.max(5, Math.round(7.5 * u));
    const ww = Math.max(1.5, 2.2 * u), wh = Math.max(2, 3 * u), lim = Math.min(Gb - 4, SH - EXTRA + 2);
    for (let y = top + sy; y < lim; y += sy)
      for (let xx = x + Math.max(2, 3 * u); xx + ww < x + w - 2 * u; xx += sx) {
        const lit = R() < (row ? 0.07 : 0.06);
        wins.push({ x: xx, y, w: ww, h: wh, row, on: lit ? 1 : 0, tg: lit ? 1 : 0, warm: R() < (warmP || 0.82), tv: false, ph: R() * 6.283 });
      }
  }
  function bldg(c: CanvasRenderingContext2D, x: number, w: number, top: number, row: number) {
    x = Math.round(x); w = Math.round(w); top = Math.round(top);
    c.fillRect(x, top, w, G - top);
    const r = R();
    if (r < 0.2 && w > 18 * u) {
      const sw = Math.round(w * (0.45 + R() * 0.3)), sh = Math.round((6 + R() * 16) * u), sx = Math.round(x + (w - sw) * (0.2 + R() * 0.6));
      c.fillRect(sx, top - sh, sw, sh);
      if (R() < 0.5) { const ah = Math.round((6 + R() * 14) * u); c.fillRect(Math.round(sx + sw / 2), top - sh - ah, Math.max(1, Math.round(u)), ah); }
    } else if (r < 0.3) {
      const ah = Math.round((8 + R() * 22) * u); c.fillRect(x + Math.round(w * (0.3 + R() * 0.4)), top - ah, Math.max(1, Math.round(u * 1.2)), ah);
    } else if (r < 0.37 && w > 16 * u) {
      c.beginPath(); c.moveTo(x, top); c.lineTo(x + w / 2, top - w * 0.32); c.lineTo(x + w, top); c.fill();
    } else if (r < 0.62 && row === 1 && w > 14 * u) {
      const tw = Math.round(7 * u + 2), th = Math.round(7 * u + 2), tx = Math.round(x + 1 + R() * (w - tw - 2)), lg = Math.round(4 * u + 1);
      c.fillRect(tx + 1, top - lg, 1, lg); c.fillRect(tx + tw - 2, top - lg, 1, lg); c.fillRect(tx, top - lg - th, tw, th);
      c.beginPath(); c.moveTo(tx - 1, top - lg - th); c.lineTo(tx + tw / 2, top - lg - th - Math.round(4 * u + 1)); c.lineTo(tx + tw + 1, top - lg - th); c.fill();
    }
    const f = c.fillStyle; c.fillStyle = row ? 'rgba(255,170,120,.06)' : 'rgba(255,185,140,.11)'; c.fillRect(x, top, w, 1); c.fillStyle = f;
    addWins(x, top, w, G, row);
  }
  function esb(c: CanvasRenderingContext2D, cx: number, tip: number) {
    const S = G - tip, seg: [number, number][] = [[50, 0.30], [40, 0.62], [32, 0.69], [24, 0.74], [15, 0.79], [9, 0.835], [4, 0.9]];
    let y0 = G;
    for (const [w, h] of seg) { const y = Math.round(G - S * h); c.fillRect(Math.round(cx - w * u / 2), y, Math.round(w * u), y0 - y + 1); y0 = y; }
    c.fillRect(Math.round(cx - 0.6 * u), Math.round(tip), Math.max(1, Math.round(1.2 * u)), y0 - Math.round(tip));
    tips.push({ x: cx, y: tip });
    addWins(Math.round(cx - 20 * u), Math.round(G - S * 0.62), Math.round(40 * u), G, 0);
    addWins(Math.round(cx - 16 * u), Math.round(G - S * 0.69), Math.round(32 * u), Math.round(G - S * 0.62), 0);
  }
  function chrysler(c: CanvasRenderingContext2D, cx: number, tip: number) {
    const S = G - tip;
    c.fillRect(Math.round(cx - 17 * u), Math.round(G - S * 0.6), Math.round(34 * u), Math.round(S * 0.6));
    c.fillRect(Math.round(cx - 14 * u), Math.round(G - S * 0.66), Math.round(28 * u), Math.round(S * 0.06) + 1);
    let base = G - S * 0.66; const ah = S * 0.038, arches: [number, number][] = [];
    for (let k = 0; k < 5; k++) {
      const w = (26 - k * 4.6) * u;
      c.fillRect(cx - w / 2, base - ah * 0.5, w, ah * 0.5 + 1);
      c.beginPath(); c.ellipse(cx, base - ah * 0.5, w / 2, ah * 0.9, 0, Math.PI, 2 * Math.PI); c.fill();
      arches.push([base - ah * 0.5, w]); base -= ah;
    }
    c.beginPath(); c.moveTo(cx - 2 * u, base); c.lineTo(cx, tip); c.lineTo(cx + 2 * u, base); c.fill();
    const f = c.fillStyle; c.fillStyle = 'rgba(255,226,170,.8)';
    arches.forEach(([by, w], k) => {
      const n = 5 - Math.floor(k / 2), rx = w / 2 * 0.72, ry = ah * 0.62, s = Math.max(1.4, 2 * u);
      for (let j = 0; j < n; j++) {
        const a = Math.PI + (j + 0.5) / n * Math.PI, px = cx + Math.cos(a) * rx, py = by + Math.sin(a) * ry;
        c.beginPath(); c.moveTo(px - s * 0.6, py + s * 0.5); c.lineTo(px, py - s * 0.8); c.lineTo(px + s * 0.6, py + s * 0.5); c.fill();
      }
    });
    c.fillStyle = f;
    addWins(Math.round(cx - 15 * u), Math.round(G - S * 0.58), Math.round(30 * u), G, 0);
  }
  function wtc(c: CanvasRenderingContext2D, cx: number, tip: number) {
    const S = G - tip, bw = 46 * u, tw = 28 * u, top = G - S * 0.74;
    c.beginPath(); c.moveTo(cx - bw / 2, G); c.lineTo(cx - tw / 2, top); c.lineTo(cx + tw / 2, top); c.lineTo(cx + bw / 2, G); c.closePath(); c.fill();
    const f = c.fillStyle; c.fillStyle = 'rgba(140,160,215,.07)';
    c.beginPath(); c.moveTo(cx - tw / 2, top); c.lineTo(cx + tw / 2, top); c.lineTo(cx, G); c.closePath(); c.fill(); c.fillStyle = f;
    c.fillRect(cx - tw / 2 - u, top - S * 0.014, tw + 2 * u, S * 0.014 + 1);
    c.fillRect(Math.round(cx - u), tip, Math.max(1, Math.round(2 * u)), top - tip);
    c.fillRect(cx - 3 * u, top - (top - tip) * 0.38, 6 * u, Math.max(1, 2 * u));
    tips.push({ x: cx, y: tip });
    const sy = Math.max(5, Math.round(7.5 * u)), sx = Math.max(4, Math.round(5.5 * u)), lim = SH - EXTRA + 2;
    for (let y = top + sy; y < lim; y += sy) {
      const wd = tw + (bw - tw) * (y - top) / (G - top);
      for (let xx = cx - wd / 2 + 3 * u; xx < cx + wd / 2 - 4 * u; xx += sx) {
        const lit = R() < 0.07;
        wins.push({ x: xx, y, w: Math.max(1.5, 2.2 * u), h: Math.max(2, 3 * u), row: 0, on: lit ? 1 : 0, tg: lit ? 1 : 0, warm: R() < 0.45, tv: false, ph: 0 });
      }
    }
  }
  const bc = back.g, fc = front.g; bc.fillStyle = cfg.backColor || '#0a1122';
  esb(bc, L.esb[0] * W + SM, cy(L.esb[1] * H)); chrysler(bc, L.chr[0] * W + SM, cy(L.chr[1] * H)); wtc(bc, L.wtc[0] * W + SM, cy(L.wtc[1] * H));
  let x = -2;
  while (x < SW) {
    const bw = (14 + R() * 30) * u, xf = (x + bw / 2 - SM) / W;
    let top = cfg.backTop[0] + R() * cfg.backTop[1];
    const near = Math.min(Math.abs(xf - L.esb[0]), Math.abs(xf - L.chr[0]), Math.abs(xf - L.wtc[0]));
    if (near < 0.09 && R() < 0.6) top -= (0.09 - near) * (cfg.nearK || 0.9) * R() + 0.015;
    if (cfg.leftFlat && xf < 0.34) top = Math.max(top, cfg.backTop[0] + 0.02);
    bldg(bc, x, bw, cy(top * H), 0); x += bw + (R() < 0.25 ? R() * 4 * u : 0);
  }
  fc.fillStyle = cfg.frontColor || '#04070e'; x = -2;
  while (x < SW) { const bw = (12 + R() * 34) * u; const top = cfg.frontTop[0] + R() * cfg.frontTop[1]; bldg(fc, x, bw, cy(top * H), 1); x += bw + (R() < 0.2 ? R() * 3 * u : 0); }
  for (let k = 0; k < 10 && wins.length; k++) { const w = wins[(R() * wins.length) | 0]; w.tv = true; w.warm = false; w.on = w.tg = 1; }

  function drawWins(ctx: CanvasRenderingContext2D, row: number, ox: number, oy: number, t: number, rd: boolean, wa: number) {
    for (let pass = 0; pass < 2; pass++) {
      ctx.fillStyle = pass ? '#cfe0ff' : '#ffd79c';
      for (let i = 0; i < wins.length; i++) {
        const w = wins[i];
        if (w.row !== row || w.warm === !!pass || w.on < 0.02) continue;
        let a = w.on * (row ? 0.85 : 0.6) * wa;
        if (w.tv && !rd) a *= 0.55 + 0.45 * Math.sin(t * 5.3 + w.ph) * Math.sin(t * 1.7 + w.ph * 2);
        ctx.globalAlpha = a; ctx.fillRect(w.x + ox, w.y + oy, w.w, w.h);
      }
    }
    ctx.globalAlpha = 1;
  }
  return {
    draw(ctx, t, panX, panY, rd, wa) {
      wa = wa == null ? 1 : wa;
      const bx = -SM + panX * 1.15, by = top0 + panY * 0.45;
      ctx.drawImage(back.c, bx, by, back.w, back.h); drawWins(ctx, 0, bx, by, t, rd, wa);
      tips.forEach((p) => {
        const a = rd ? 0.8 : 0.25 + 0.75 * Math.max(0, Math.sin(t * 2.1 + p.x));
        const px = p.x + bx, py = p.y + by;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, `rgba(255,70,60,${0.9 * a})`); g.addColorStop(1, 'rgba(255,70,60,0)');
        ctx.fillStyle = g; ctx.fillRect(px - 7, py - 7, 14, 14);
      });
      const fx = -SM + panX * 1.35, fy = top0 + panY * 0.6;
      ctx.drawImage(front.c, fx, fy, front.w, front.h); drawWins(ctx, 1, fx, fy, t, rd, wa);
    },
    tick(dt, rd) {
      if (rd || !wins.length) return;
      const picks = Math.random() < dt * 0.009 ? 1 : 0;
      for (let k = 0; k < picks; k++) { const w = wins[(Math.random() * wins.length) | 0]; if (w.tg) w.tg = 0; else if (Math.random() < 0.075) w.tg = 1; }
      const f = Math.min(1, dt * 0.0012);
      for (let i = 0; i < wins.length; i++) { const w = wins[i]; if (w.on !== w.tg) { w.on += (w.tg - w.on) * f; if (Math.abs(w.tg - w.on) < 0.01) w.on = w.tg; } }
    },
  };
}

/** The city as seen through the desk window (520x300 units), baked to a PNG data URL. */
export function renderWindowSky(n: number): string {
  const sk = makeSkyline(520, 300, {
    u: 0.6, MX: 0, hFrac: 0.62, esb: [0.5, 0.30], chr: [0.585, 0.38], wtc: [0.79, 0.22],
    backTop: [0.62, 0.09], frontTop: [0.74, 0.06], nearK: 0.7, backColor: '#0a1122', frontColor: '#04070e',
  }, 2);
  const c = document.createElement('canvas'); c.width = 1040; c.height = 600;
  const g = c.getContext('2d')!; g.scale(2, 2);
  sk.draw(g, 0, 0, 0, true, n);
  return c.toDataURL('image/png');
}
