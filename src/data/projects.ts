export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  link: string;
  /** Year shown on the desk's night-sky star and project panel. */
  year: string;
}
  
export const projects: Project[] = [
  {
    id: '01',
    title: 'IntReview',
    description:
      'An AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis.',
    image: '/images/projects/intreview/intreviewbrand.png',
    slug: 'intreview',
    link: '/projects/intreview',
    year: '2025',
  },
  {
    id: '02',
    title: 'Real-Time AI Business Intelligence',
    description: 'Ask your business data questions in plain English and get SQL and charts back. An MVP that is still being built.',
    slug: 'real-time-ai-business-intelligence',
    link: '/projects/real-time-ai-business-intelligence',
    image: "/images/inprogress.png",
    year: 'In progress',
  },
  {
    id: '03',
    title: 'Constellation',
    description: 'An iOS app that visualizes your social network as an interactive galaxy, using on-device machine learning to predict which relationships need attention and encouraging meaningful reconnection.',
    slug: 'constellation',
    link: '/projects/constellation',
    image: "/images/projects/constellation/brand.png",
    year: '2025',
  },
  {
    id: '04',
    title: 'Black-Scholes Options Pricing Model',
    description:
      'A sophisticated financial tool implementing the Black-Scholes mathematical model to accurately price options contracts and analyze market volatility.',
    image: '/images/projects/black-scholes/mainmenu.png',
    slug: 'black-scholes-model',
    link: '/projects/black-scholes-model',
    year: '2025',
  },
  {
    id: '05',
    title: 'Classify',
    description:
      'A machine learning application that intelligently categorizes Spotify playlists into themed collections to enhance music discovery through audio feature analysis.',
    image: '/images/projects/classify/classifybrand.png',
    slug: 'classify',
    link: '/projects/classify',
    year: '2024',
  },
  {
    id: '06',
    title: 'PlateMate',
    description:
      'A mobile application that revolutionizes restaurant reviews by focusing on what truly matters to diners - the quality of individual dishes.',
    image: '/images/projects/platemate/platematebrand.jpeg',
    slug: 'platemate',
    link: '/projects/platemate',
    year: '2025',
  },
  {
    id: '07',
    title: 'Distyl',
    description:
      'A VS Code extension that figures out which parts of your workspace an AI coding assistant actually needs, then packs them to fit inside the context window.',
    image: '/images/projects/distyl/brag.jpg',
    slug: 'distyl',
    link: '/projects/distyl',
    year: '2026',
  },
  {
    id: '08',
    title: 'Multi-Agent Personal Automation System',
    description:
      'Four agents running around the clock on my own machine: one runs the day, one handles code, one researches and publishes content end to end, one handles career search and outreach. No database, no server, and no memory of anything except what they write down.',
    image: '/images/inprogress.png',
    slug: 'multi-agent-automation',
    link: '/projects/multi-agent-automation',
    year: '2026',
  },
];
