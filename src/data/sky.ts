/** Where each project sits in the night sky and how the stars relate (home page). */
export interface ProjectStar {
  /** project slug from projects.ts */
  slug: string;
  /** short name on the star label */
  name: string;
  col: string;
  d: [number, number];
  m: [number, number];
}

export const projectStars: ProjectStar[] = [
  { slug: 'distyl', name: 'Distyl', col: '255,246,232', d: [0.64, 0.235], m: [0.66, 0.41] },
  { slug: 'multi-agent-automation', name: 'Agent system', col: '230,238,255', d: [0.745, 0.37], m: [0.52, 0.50] },
  { slug: 'intreview', name: 'IntReview', col: '255,240,220', d: [0.55, 0.43], m: [0.30, 0.44] },
  { slug: 'constellation', name: 'Constellation', col: '220,232,255', d: [0.54, 0.13], m: [0.47, 0.345] },
  { slug: 'classify', name: 'Classify', col: '255,236,214', d: [0.40, 0.60], m: [0.52, 0.62] },
  { slug: 'platemate', name: 'PlateMate', col: '255,244,226', d: [0.625, 0.585], m: [0.64, 0.555] },
  { slug: 'black-scholes-model', name: 'Black-Scholes', col: '226,236,255', d: [0.925, 0.27], m: [0.90, 0.45] },
  { slug: 'real-time-ai-business-intelligence', name: 'AI Business Intelligence', col: '240,244,255', d: [0.815, 0.15], m: [0.84, 0.345] },
];

/** Constellation lines: ids are project slugs or hobby ids. */
export const starGroups: { name: string; ids: string[] }[] = [
  { name: 'AI tools', ids: ['distyl', 'intreview', 'multi-agent-automation'] },
  { name: 'Music', ids: ['classify', 'music'] },
  { name: 'On iOS', ids: ['constellation', 'platemate'] },
  { name: 'Data, drawn', ids: ['black-scholes-model', 'real-time-ai-business-intelligence'] },
  { name: 'Off hours', ids: ['matcha', 'escape', 'volleyball', 'music', 'hackathons'] },
];
