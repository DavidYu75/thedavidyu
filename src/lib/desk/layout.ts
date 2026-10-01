/**
 * The desk is drawn in a 1200x750 (desktop) or 390x780 (phone) coordinate space and the SVG viewBox is
 * widened or heightened to match the viewport, so the room always fills the screen. Objects are
 * anchored: L sticks near the left edge, C follows the centered composition, R sticks near the right edge.
 */
export type Anchor = 'L' | 'C' | 'R';
interface Pos { x: number; y: number; a: Anchor }

export interface DeskLayout {
  vb: [number, number];
  desk: number;
  win: Pos & { s: number };
  neon: Pos & { s: number };
  lamp: Pos & { s: number };
  bowl: Pos & { s: number };
  ball: Pos & { r: number };
  phones: Pos & { s: number };
  laptop: Pos & { w: number };
  notes: [number, number, number][];
  noteW: number;
  np: Pos & { w: number };
  wkui: Pos;
  fonts: { wf: string; nf: string };
}

export const LAYOUTS: { desktop: DeskLayout; phone: DeskLayout } = {
  desktop: {
    vb: [1200, 750], desk: 560,
    win: { x: 360, y: 80, s: 1, a: 'C' }, neon: { x: 180, y: 190, s: 1.05, a: 'L' }, lamp: { x: 1085, y: 560, s: 1, a: 'R' },
    bowl: { x: 205, y: 560, s: 1, a: 'L' }, ball: { x: 990, y: 520, r: 40, a: 'R' }, phones: { x: 875, y: 560, s: 1, a: 'C' },
    laptop: { x: 452, y: 560, w: 340, a: 'C' },
    notes: [[100, 300, -5], [212, 312, 4], [152, 404, 3]], noteW: 96,
    np: { x: 700, y: 330, w: 290, a: 'C' }, wkui: { x: 205, y: 604, a: 'L' },
    fonts: { wf: 'min(1cqw,15px)', nf: 'min(1cqw,15px)' },
  },
  phone: {
    vb: [390, 780], desk: 540,
    win: { x: 40, y: 82, s: 0.596, a: 'C' }, neon: { x: 195, y: 52, s: 0.7, a: 'C' }, lamp: { x: 352, y: 540, s: 0.8, a: 'R' },
    bowl: { x: 78, y: 694, s: 0.85, a: 'L' }, ball: { x: 205, y: 660, r: 34, a: 'C' }, phones: { x: 330, y: 691, s: 0.9, a: 'R' },
    laptop: { x: 20, y: 540, w: 280, a: 'C' },
    notes: [[40, 374, -4], [108, 386, 3], [176, 372, -3]], noteW: 58,
    np: { x: 14, y: 350, w: 240, a: 'L' }, wkui: { x: 12, y: 746, a: 'L' },
    fonts: { wf: '2.7cqw', nf: '3.1cqw' },
  },
};

export interface Scene {
  phone: boolean;
  L: DeskLayout;
  vbW: number;
  vbH: number;
  ox: number;
  oy: number;
  /** anchored x in viewBox units */
  AX(o: Pos): number;
  AY(y: number): number;
  pctX(x: number): string;
  pctY(y: number): string;
  /** the laptop box in viewBox units: left, top (lid top edge), width */
  lapVB: { x: number; y: number; w: number };
  deskY: number;
}

export const PHONE_QUERY = '(max-width: 700px)';

export function computeScene(sceneW: number, sceneH: number, phone: boolean): Scene {
  const L = phone ? LAYOUTS.phone : LAYOUTS.desktop;
  const [bw, bh] = L.vb, A = sceneW / sceneH;
  let vbW = bw, vbH = bh;
  if (A > bw / bh) vbW = Math.round(bh * A); else vbH = Math.round(bw / A);
  const ox = (vbW - bw) / 2, oy = Math.round((vbH - bh) * 0.5);
  const AX = (o: Pos) => o.x + (o.a === 'L' ? ox * 0.35 : o.a === 'R' ? ox * 2 : ox);
  const AY = (y: number) => y + oy;
  const c = L.laptop, lidH = c.w * 0.62;
  return {
    phone, L, vbW, vbH, ox, oy, AX, AY,
    pctX: (x) => (x / vbW * 100) + '%',
    pctY: (y) => (y / vbH * 100) + '%',
    lapVB: { x: AX(c), y: AY(c.y) - lidH, w: c.w },
    deskY: AY(L.desk),
  };
}
