/** Small helpers shared by the desk engines. */

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Deterministic PRNG (mulberry32) so the skyline and stars look the same on every visit. */
export function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));

/** Mix two hex colors, returns hex. */
export function mixc(a: string, b: string, t: number) {
  const A = hex(a), B = hex(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Hours since midnight in New York, fractional. */
export function nyHour(): number {
  try {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    let h = +(p.find((x) => x.type === 'hour')?.value ?? 0);
    const m = +(p.find((x) => x.type === 'minute')?.value ?? 0);
    if (h === 24) h = 0;
    return (h + m / 60) % 24;
  } catch {
    const d = new Date();
    return (d.getHours() + d.getMinutes() / 60) % 24;
  }
}

export const fmtHour = (h: number) =>
  `${((Math.floor(h) + 11) % 12) + 1}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
