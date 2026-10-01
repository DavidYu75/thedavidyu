export interface Media {
  type: 'image' | 'video' | 'gif';
  url: string;
  caption?: string;
  thumbnail?: string;
}

export interface ProjectDetail {
  overview: string;
  features: string[];
  technologies: string[];
  challenges: string[];
  media: Media[];
  githubUrl?: string;
  liveUrl?: string;
}

export type ProjectDetailMap = {
  [slug: string]: ProjectDetail;
};

/** Content for the night-sky project panels on the home page (desk design). */
export interface ProjectPanelImage {
  url: string;
  caption: string;
}

export interface ProjectPanel {
  /** Short type line shown in the panel kicker, e.g. "VS Code extension". */
  kind: string;
  overview: string;
  /** Heading for the "what it does" list; defaults to "What it does". */
  doesLabel?: string;
  does: string[];
  hardParts: string[];
  also: string[];
  tech: string[];
  images: ProjectPanelImage[];
  /** The multi-agent system has no screenshots; the panel draws a diagram instead. */
  diagram?: boolean;
  githubUrl?: string;
}

export const projectDetails: ProjectDetailMap = {
  'distyl': {
    overview: 'Every AI coding assistant has the same bottleneck: a fixed context window, and no good sense of which files in your workspace are worth spending it on. Distyl is a VS Code extension that answers that question automatically. It ranks the workspace by relevance to what you are working on, then packs the highest-value material into whatever token budget you have set.',
    features: [
      'Automatic workspace context curation, with no manual file picking',
      'Embedding-based relevance ranking using all-MiniLM-L6-v2, running locally through Transformers.js',
      'Recency and proximity heuristics layered on top of semantic similarity',
      'Token-budget optimizer using greedy packing with paragraph-level compression',
      'Configurable presets from 4k to 16k tokens',
      'Local SQLite index, so nothing about the workspace leaves the machine',
    ],
    technologies: [
      'TypeScript',
      'VS Code Extension API',
      'Transformers.js',
      'SQLite',
      'all-MiniLM-L6-v2',
    ],
    challenges: [
      'Measuring whether the ranking was any good: built a hand-curated evaluation set of context selections to score against, and tuned until automatic selection reached 87% overlap with the manual picks',
      'Fitting more into the same budget: paragraph-level compression cut payloads by 60-70% while keeping the highest-ranked material intact, so a smaller budget still carries the important parts',
      'Keeping it fast enough to run inline: embeddings are computed locally and cached in SQLite so ranking does not block the editor or depend on a network round-trip',
    ],
    media: [
      {
        type: 'video',
        url: '/videos/distyl-brag.mp4',
        thumbnail: '/images/projects/distyl/brag.jpg',
        caption: 'Distyl in 21 seconds: the keystroke, the ranking pipeline, the packed payload'
      },
    ],
    githubUrl: 'https://github.com/DavidYu75/distyl'
  },

  'multi-agent-automation': {
    overview: 'Four specialized agents running 24/7 on my own machine, each with its own job: one runs the day, one handles code, one runs a content pipeline from trend research all the way to publishing, and one handles career search and outreach. The constraint that shaped everything is that there is no database and no persistent server. An agent can be killed mid-task at any moment, so every agent rebuilds its entire working context from files on disk the moment it boots.',
    features: [
      'Autonomous content pipeline: researches trends from Reddit and TikTok, writes the script, generates AI voice and lip-synced video, and publishes to Instagram through browser automation',
      'File-based memory that survives a crash, so an agent reconstructs in-progress tasks, past decisions, and scheduled jobs from disk on every boot',
      'Four specialized agents on scheduled loops, handing tasks to each other asynchronously through the filesystem',
      'A daily brief that reconciles live Gmail and Calendar data, filtering 300+ weekly emails down to the 5-10 worth reading',
      'Discord as the control surface, with a separate bot per agent',
    ],
    technologies: [
      'Claude Code',
      'MCP',
      'Discord API',
      'Playwright',
      'ElevenLabs',
      'Gmail API',
      'Google Calendar API',
    ],
    challenges: [
      'Surviving death mid-task: agent sessions end without warning, so the fix was to treat memory as something written continuously during work rather than summarized at the end. State that only exists in a running session is state you are about to lose.',
      'Agents that cannot talk to each other: there is no message bus between processes, so handoffs happen through task files on disk, which has the useful side effect of leaving an auditable trail of what each agent was asked to do',
      'Making a signal-to-noise call automatically: the daily brief has to throw away 98% of the inbox without discarding the thing that mattered, which means the filter has to be conservative in the specific direction where a false negative is expensive',
    ],
    media: [],
  },

  'intreview': {
    overview: 'IntReview is an AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis. The application helps job seekers improve their interview skills through objective feedback on their performance.',
    features: [
      'Real-time video and audio analysis during mock interviews',
      'Detailed feedback on verbal communication (pace, clarity, filler words)',
      'Non-verbal cue detection (eye contact, posture, facial expressions)',
      'Post-interview detailed analysis with metrics, key moments, and personalized recommendations',
      'Secure user authentication and session management for tracking progress over time',
      'Comprehensive interview transcript generation with timestamps and speech metrics',
      'Interactive dashboard with visual performance metrics and historical session data',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'WebSocket',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'JWT Authentication',
      'OpenCV',
      'AssemblyAI',
      'NumPy'
    ],
    challenges: [
      'Real-time video processing: Implemented efficient WebSocket communication and optimized OpenCV processing with lightweight face tracking algorithms',
      'Speech analysis latency: Split the analysis to perform visual feedback in real-time while conducting deeper speech analysis post-interview',
      'Metric Visualization: Created intuitive visualizations with color-coding and context-appropriate scales (e.g., WPM gauge showing ideal speaking pace)',
    ],
    media: [
      {
        type: 'image',
        url: '/images/projects/intreview/dashboard.png',
        caption: 'User dashboard displaying interview analytics'
      },
      {
        type: 'image',
        url: '/images/projects/intreview/dashboard2.png',
        caption: 'Dashboard continued'
      },
      {
        type: 'gif',
        url: '/images/projects/intreview/demo.gif',
        caption: 'IntReview in action',
      }
    ],
    githubUrl: 'https://github.com/DavidYu75/intreview'
  },
  
  'classify': {
    overview: 'Classify is a machine learning application that intelligently categorizes Spotify playlists into themed collections, enhancing music discovery through advanced audio feature analysis. This project combines music data analysis with intuitive user interfaces to provide a unique music organization experience.',
    features: [
      'Advanced ML-powered clustering algorithms analyzing audio features to group 1,000+ songs with sub-second response time',
      'Automated playlist categorization based on comprehensive audio feature analysis',
      'Dynamic theme generation adapting to user listening patterns',
      'Cross-platform music recommendation engine using similarity metrics',
      'Interactive visualizations of audio characteristics and relationships between tracks',
    ],
    technologies: [
      'Python',
      'Flask',
      'Scikit-learn',
      'React',
      'Node.js',
      'OpenAI API',
      'Spotify Web API',
      'OAuth 2.0',
    ],
    challenges: [
      'Processing large volumes of audio feature data efficiently: Implemented optimized clustering algorithms capable of handling 1,000+ songs with sub-second response times',
      'Creating meaningful category definitions from raw audio data: Integrated OpenAI API to generate human-understandable theme descriptions from technical audio features',
      'Handling diverse music libraries with varying metadata quality: Developed fallback categorization methods using multiple audio feature vectors when primary identifiers were insufficient',
    ],
    media: [
      {
        type: 'gif',
        url: '/images/projects/classify/demo.gif',
        caption: 'Classify in action'
      },
    ],
    githubUrl: 'https://github.com/thaninbew/classify'
  },

  'platemate': {
    overview: 'PlateMate is a mobile application that revolutionizes restaurant reviews by focusing on what truly matters to diners - the quality of individual dishes. Unlike traditional platforms that rate entire dining experiences, PlateMate delivers dish-by-dish reviews and personalized recommendations to enhance the dining experience for both customers and restaurants.',
    features: [
      'Dish-focused review system with multi-category ratings for portion, taste, value, and overall',
      'Personalized dish recommendation engine based on user preferences and dietary restrictions',
      'Discovery feed showcasing highly-rated dishes filtered by cuisine preferences',
      'Restaurant menu management system allowing verified owners to update dish information',
      'User profiles with dietary restriction settings that filter incompatible dishes',
      '"Because you watched" recommendation system suggesting similar dishes across restaurants',
    ],
    technologies: [
      'React Native',
      'Go',
      'Fiber',
      'MongoDB',
      'Google Places API',
      'JWT authentication',
      'AWS S3',
    ],
    challenges: [
      'Obtaining accurate restaurant menu data: Combined API scraping with restaurant verification system allowing owners to claim and update their menus',
      'Creating engaging review experience without complexity: Designed intuitive rating interface with optional comments balancing ease-of-use with feedback quality',
      'Building value for both diners and restaurants: Created dual-sided platform where customers receive personalized recommendations while restaurants gain actionable dish insights'
    ],
    media: [
      {
        type: 'image',
        url: '/images/projects/platemate/screens.PNG',
        caption: 'The Many Screens of PlateMate'
      },
      {
        type: 'image',
        url: '/images/projects/platemate/onboarding.PNG',
        caption: 'Onboarding Flow',
      },
    ],
    githubUrl: 'https://github.com/GenerateNU/platemate'
  },

  'black-scholes-model': {
    overview: 'A Black-Scholes options pricing platform designed to make complex financial mathematics accessible to both beginners and advanced users. Features dual interfaces - a simplified calculator for learning and an advanced tool for professional analysis, with plain-language explanations that convert mathematical results into intuitive insights.',
    features: [
      'Dual-interface design: Simple calculator for beginners, advanced mode for professionals',
      'Real-time options pricing using the Black-Scholes formula with Greeks calculations (Delta, Gamma)',
      'Plain-language explanations that translate complex math into understandable insights',
      'Interactive P&L charts and volatility visualization',
      'Educational content system with contextual learning materials',
      'Calculation history and persistence with PostgreSQL backend',
      'Extensible architecture for future financial models'
    ],
    technologies: [
      'FastAPI',
      'Python',
      'PostgreSQL',
      'SQLAlchemy',
      'Pydantic',
      'React',
      'TailwindCSS',
      'Market Data APIs'
    ],
    challenges: [
      'Creating intuitive UX for complex financial mathematics',
      'Implementing accurate Black-Scholes calculations with proper Greeks',
      'Designing educational explanations that maintain mathematical accuracy',
      'Building scalable API architecture with proper data validation',
      'Balancing simplicity for beginners with power for advanced users'
    ],
    media: [
      {
        type: 'gif',
        url: '/images/projects/black-scholes/dashboard.gif',
        caption: 'Main Dashboard in action'
      },
      {
        type: 'image',
        url: '/images/projects/black-scholes/calculation.png',
        caption: 'Calculation using Black-Scholes Formula',
      },
      {
        type: 'image',
        url: '/images/projects/black-scholes/callheatmap.png',
        caption: 'Call Option Price Heatmap from Buyer\'s View',
      },
      {
        type: 'image',
        url: '/images/projects/black-scholes/sellcallheatmap.png',
        caption: 'Call Option Price Heatmap from Seller\'s View',
      },
      {
        type: 'image',
        url: '/images/projects/black-scholes/sellputheatmap.png',
        caption: 'Put Option Price Heatmap from Seller\'s View',
      },
      {
        type: 'image',
        url: '/images/projects/black-scholes/buyputheatmap.png',
        caption: 'Put Option Price Heatmap from Buyer\'s View',
      },
    ],
    githubUrl: 'https://github.com/DavidYu75/black-scholes'
  },

  'real-time-ai-business-intelligence': {
    overview: 'Ask your business data questions in plain English and get SQL and charts back. An MVP that is still being built.',
    features: [
      'Natural-language questions turned into SQL by an LLM (the Claude API)',
      'A FastAPI backend with PostgreSQL',
      'A Next.js frontend',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'Claude API',
      'Next.js',
      'TypeScript',
    ],
    challenges: [],
    media: [],
    githubUrl: 'https://github.com/DavidYu75/ai-business-intelligence'
  },

  'constellation': {
    overview: 'Constellation is an iOS app that renders your contacts as a navigable galaxy, placing each person as a star whose distance reflects how strong the relationship is. An on-device CoreML model watches for relationships drifting out of orbit and nudges you to reach out before they fade. Every bit of contact data stays on the phone.',
    features: [
      'Interactive galaxy visualization mapping contacts as stars with proximity based on relationship strength',
      'On-device CoreML prediction model identifying relationships at risk of decay with 90% accuracy',
      'Privacy-first architecture processing all contact metadata locally without external servers',
      'Custom SpriteKit particle system with physics-based animations for immersive navigation',
      'CoreMotion gesture controls (pinch, pan, rotate) for intuitive galaxy exploration',
      'Adaptive clustering algorithm handling 10 to 200+ contacts with sub-second performance',
      'Relationship scoring based on interaction frequency, recency, and communication patterns',
      'Smart notifications suggesting when to reach out based on predicted relationship decay'
    ],
    technologies: [
      'Swift',
      'SwiftUI',
      'SpriteKit',
      'CoreMotion',
      'CoreML',
      'Contacts Framework',
      'Xcode',
      'iOS SDK'
    ],
    challenges: [
      'On-Device ML Performance: Optimized CoreML model to run entirely on-device with sub-second inference times while maintaining 90% prediction accuracy for relationship decay across varying contact volumes',
      'Visual Performance: Implemented efficient SpriteKit rendering with particle systems handling 200+ nodes while maintaining 60fps performance through culling and lazy loading techniques',
      'Adaptive Algorithms: Designed clustering algorithm with dynamic thresholds that scales from 10 to 200+ contacts, handling edge cases like inactive contacts or sparse interaction data',
      'Privacy-First Design: Architected entire pipeline to process sensitive contact metadata locally using CoreML and iOS frameworks without any external API calls or data transmission',
    ],
    media: [
      
    ],
    
  }
};

export const projectPanels: { [slug: string]: ProjectPanel } = {
  'distyl': {
    kind: 'VS Code extension',
    overview: "Every AI coding assistant has the same bottleneck: a fixed context window, and no good sense of which files in your workspace are worth spending it on. Distyl answers that automatically. It ranks the workspace by relevance to what you're working on, then packs the highest-value material into whatever token budget you set.",
    does: [
      'Automatic workspace context curation, no manual file picking',
      'Embedding-based relevance ranking with all-MiniLM-L6-v2, running locally through Transformers.js',
      'Recency and proximity heuristics layered on top of semantic similarity',
      'Token-budget optimizer with greedy packing and paragraph-level compression',
      'Local SQLite index, so nothing about the workspace leaves the machine',
    ],
    hardParts: [
      'Measuring whether the ranking was any good: a hand-curated evaluation set, tuned until automatic selection reached 87% overlap with manual picks',
      'Fitting more into the same budget: paragraph-level compression cut payloads 60-70% while keeping the highest-ranked material',
      'Staying fast enough to run inline: embeddings computed locally and cached in SQLite',
    ],
    also: ['On the VS Code Marketplace', 'VSIX slimmed from 318MB to 45MB'],
    tech: ['TypeScript', 'VS Code Extension API', 'Transformers.js', 'SQLite', 'all-MiniLM-L6-v2'],
    images: [{ url: '/images/projects/distyl/brag.jpg', caption: 'Distyl in VS Code: the ranked token list' }],
    githubUrl: 'https://github.com/DavidYu75/distyl',
  },
  'multi-agent-automation': {
    kind: 'Runs on my own machine',
    overview: 'Four specialized AI agents running around the clock on my own machine, each with its own job: one runs the day, one handles code, one runs a content pipeline from trend research to publishing, and one handles career search and outreach. There is no database and no persistent server. An agent can be killed mid-task at any moment, so each one rebuilds its working context from files on disk the moment it boots.',
    does: [
      'Content pipeline: researches trends, writes the script, generates AI voice and lip-synced video, and publishes through browser automation',
      'File-based memory that survives a crash: in-progress tasks, past decisions and scheduled jobs are rebuilt from disk on every boot',
      'Agents hand tasks to each other asynchronously through files on disk',
      'A daily brief that reconciles live Gmail and Calendar data, filtering 300+ weekly emails down to the 5-10 worth reading',
      'Discord as the control surface, with a separate bot per agent',
    ],
    hardParts: [
      'Surviving death mid-task: memory is written continuously during work, not summarized at the end',
      "Agents that can't talk to each other: handoffs happen through task files, which leaves an auditable trail",
      'Throwing away 98% of an inbox without discarding the one thing that mattered',
    ],
    also: [],
    tech: ['Claude Code', 'MCP', 'Discord API', 'Playwright', 'ElevenLabs', 'Gmail API', 'Google Calendar API'],
    images: [],
    diagram: true,
  },
  'intreview': {
    kind: 'Web app',
    overview: 'AI-powered interview prep that gives real-time feedback on verbal and non-verbal communication using computer vision and speech analysis.',
    does: [
      'Real-time video and audio analysis during mock interviews',
      'Feedback on pace, clarity and filler words',
      'Eye contact, posture and facial expression detection',
      'Post-interview analysis with metrics, key moments and recommendations',
      'Dashboard with performance metrics and session history',
    ],
    hardParts: [
      'Real-time video: WebSockets plus lightweight OpenCV face tracking',
      'Speech latency: visual feedback runs live, deeper speech analysis runs after the interview',
      'Making metrics readable: color-coded scales, like a WPM gauge showing the ideal speaking pace',
    ],
    also: [],
    tech: ['Python', 'FastAPI', 'WebSocket', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'JWT', 'OpenCV', 'AssemblyAI', 'NumPy'],
    images: [
      { url: '/images/projects/intreview/dashboard.png', caption: 'Interview analytics dashboard' },
      { url: '/images/projects/intreview/dashboard2.png', caption: 'Dashboard, continued' },
    ],
    githubUrl: 'https://github.com/DavidYu75/intreview',
  },
  'constellation': {
    kind: 'iOS app',
    overview: 'An iOS app that renders your contacts as a navigable galaxy. Each person is a star whose distance reflects how strong the relationship is. An on-device CoreML model watches for relationships drifting out of orbit and nudges you to reach out before they fade. All contact data stays on the phone.',
    does: [
      'Galaxy visualization with distance based on relationship strength',
      'On-device CoreML model predicting relationships at risk of fading',
      'Privacy-first: contact metadata is processed locally, no external servers',
      'SpriteKit particle system with physics-based animation',
      'Pinch, pan and rotate gestures to explore',
    ],
    hardParts: [
      'Running the ML model entirely on-device with sub-second inference',
      'Keeping 200+ animated nodes at 60fps with culling and lazy loading',
      'A clustering algorithm that scales from 10 to 200+ contacts',
    ],
    also: ['This whole sky is a nod to it'],
    tech: ['Swift', 'SwiftUI', 'SpriteKit', 'CoreMotion', 'CoreML', 'Contacts framework'],
    images: [{ url: '/images/projects/constellation/brand.png', caption: 'Constellation' }],
  },
  'classify': {
    kind: 'Web app, team project',
    overview: "Sorts your Spotify playlists into themed collections using the songs' audio features.",
    does: [
      'Clusters 1,000+ songs by audio features with sub-second response',
      'Automatic playlist categorization',
      'Human-readable theme names generated with the OpenAI API',
      'Visualizations of audio characteristics across tracks',
    ],
    hardParts: [
      'Clustering large libraries fast',
      'Turning raw audio features into categories people understand',
      'Handling libraries with messy metadata',
    ],
    also: [],
    tech: ['Python', 'Flask', 'scikit-learn', 'React', 'Node.js', 'OpenAI API', 'Spotify Web API', 'OAuth 2.0'],
    images: [{ url: '/images/projects/classify/demo-frame.jpg', caption: "Classify's start screen" }],
    githubUrl: 'https://github.com/thaninbew/classify',
  },
  'platemate': {
    kind: 'iOS app, built at Generate',
    overview: 'Restaurant reviews for the dish, not the room. Dish-by-dish ratings and personalized dish recommendations.',
    does: [
      'Dish-level ratings for portion, taste, value and overall',
      'Personalized dish recommendations that respect dietary restrictions',
      'A discovery feed of highly rated dishes by cuisine',
      'Menu management for verified restaurant owners',
    ],
    hardParts: [
      'Getting accurate menu data: API data plus an owner verification flow to claim and update menus',
      'Keeping reviews quick without losing useful detail',
    ],
    also: ['100+ Boston restaurants', 'TestFlight in 3 months (the full story is on the laptop, in the Generate app)'],
    tech: ['React Native', 'Go', 'Fiber', 'MongoDB', 'Google Places API', 'JWT', 'AWS S3'],
    images: [
      { url: '/images/projects/platemate/screens.PNG', caption: 'The many screens of PlateMate' },
      { url: '/images/projects/platemate/onboarding.PNG', caption: 'Onboarding' },
    ],
    githubUrl: 'https://github.com/GenerateNU/platemate',
  },
  'black-scholes-model': {
    kind: 'Web app',
    overview: 'An options pricing platform that makes the Black-Scholes model approachable, with a simple calculator for learning and an advanced mode for deeper analysis, plus plain-language explanations of the results.',
    does: [
      'Real-time options pricing with Greeks (Delta, Gamma)',
      'Plain-language explanations of the math',
      'Interactive P&L charts and volatility heatmaps',
      'Calculation history saved in PostgreSQL',
    ],
    hardParts: [
      'A UX for complex financial math that beginners can use',
      'Explanations that stay mathematically accurate',
    ],
    also: [],
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'SQLAlchemy', 'Pydantic', 'React', 'Tailwind CSS'],
    images: [
      { url: '/images/projects/black-scholes/mainmenu.png', caption: 'Main dashboard' },
      { url: '/images/projects/black-scholes/callheatmap.png', caption: 'Call option price heatmap' },
    ],
    githubUrl: 'https://github.com/DavidYu75/black-scholes',
  },
  'real-time-ai-business-intelligence': {
    kind: 'Web app, MVP',
    overview: "Ask your business data questions in plain English and get SQL and charts back. An MVP that's still being built.",
    doesLabel: 'What it does, as it exists in the repo today',
    does: [
      'Natural-language questions turned into SQL by an LLM (the Claude API)',
      'A FastAPI backend with PostgreSQL',
      'A Next.js frontend',
    ],
    hardParts: [],
    also: [],
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Claude API', 'Next.js', 'TypeScript'],
    images: [],
    githubUrl: 'https://github.com/DavidYu75/ai-business-intelligence',
  },
};
