/** Off-hours stars in the night sky (home page). Positions are fractions of the sky's width/height, desktop and phone. */
export interface Hobby {
  id: string;
  name: string;
  full: string;
  text: string;
  /** star color, "r,g,b" */
  col: string;
  d: [number, number];
  m: [number, number];
}

export const hobbies: Hobby[] = [
  { id: 'matcha', name: 'Matcha', full: 'Matcha Lover', col: '196,236,184', d: [0.065, 0.685], m: [0.10, 0.65],
    text: 'Matcha lover. The greenest star up here, obviously. The bowl is back on the desk.' },
  { id: 'escape', name: 'Escape rooms', full: 'Escape Room Solver', col: '255,212,168', d: [0.47, 0.30], m: [0.13, 0.36],
    text: "Escape room solver. So here's a clue: three soft stars make a triangle. Click them one after another." },
  { id: 'volleyball', name: 'Volleyball', full: 'Volleyball Player', col: '255,238,200', d: [0.165, 0.585], m: [0.26, 0.56],
    text: 'Volleyball player.' },
  { id: 'music', name: 'Music', full: 'Music Discoverer', col: '214,198,255', d: [0.28, 0.67], m: [0.36, 0.66],
    text: 'Music discoverer. See also: Classify, one star over.' },
  { id: 'hackathons', name: 'Hackathons', full: 'Hackathon Enthusiast', col: '188,224,255', d: [0.70, 0.075], m: [0.10, 0.50],
    text: 'Hackathon enthusiast.' },
];

/** The three hobby stars that, clicked in order, draw the summer triangle. */
export const SUMMER_TRIANGLE = ['matcha', 'volleyball', 'music'];
