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

export const projectDetails: ProjectDetailMap = {
  'black-scholes-model': {
    overview: 'The Black-Scholes Model is a sophisticated financial tool that implements the Black-Scholes mathematical model to accurately price options contracts and analyze market volatility. This project combines advanced financial algorithms with intuitive data visualization to help traders and analysts make informed decisions.',
    features: [
      'Real-time options pricing calculator using the Black-Scholes equation',
      'Interactive data visualization dashboard for market analysis',
      'Custom parameter inputs for detailed sensitivity analysis',
      'Historical volatility tracking and prediction',
      'API integration for real-time market data'
    ],
    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Django',
      'PostgreSQL',
      'React',
      'TailwindCSS'
    ],
    challenges: [
      'Implementing complex mathematical models with high accuracy',
      'Designing an intuitive interface for complex financial concepts',
      'Optimizing data processing for large financial datasets',
      'Ensuring real-time responsiveness with heavy calculations'
    ],
    media: [],
    githubUrl: 'https://github.com/DavidYu75/black-scholes'
  },
  
  'intreview': {
    overview: 'IntReview is an AI-powered interview preparation platform that provides real-time feedback on verbal and non-verbal communication using computer vision and speech analysis. The application helps job seekers improve their interview skills through objective feedback on their performance.',
    features: [
      'Real-time video and audio analysis during mock interviews',
      'Detailed feedback on verbal communication (pace, clarity, filler words)',
      'Non-verbal cue detection (eye contact, posture, facial expressions)',
      'Post-inerview detailed analysis with metrics, key moments, and personalized recommendations',
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
  }
};
