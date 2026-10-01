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

/**
 * Canvas font strings can't use CSS variables, so resolve a next/font variable
 * (e.g. "--font-dm-mono") to its real family list on the desk root.
 */
export function cssFont(varName: string, fallback: string): string {
  const root = document.querySelector('.desk-main') || document.documentElement;
  const v = getComputedStyle(root).getPropertyValue(varName).trim();
  return v ? `${v}, ${fallback}` : fallback;
}
