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
    overview: 'A real-time business intelligence platform that democratizes data access by enabling non-technical users to query business data using natural language. The system converts conversational queries into optimized SQL, executes them against multiple data sources, and presents results through interactive visualizations with sub-second response times.',
    features: [
      'Natural language to SQL conversion using transformer models with 95% accuracy',
      'Multi-database connectivity supporting PostgreSQL, MySQL, SQLite, and CSV uploads',
      'Real-time data visualization with automatic chart type selection and customization',
      'Interactive dashboard builder with drag-and-drop interface and collaborative sharing',
      'WebSocket-based live updates for real-time data monitoring and notifications',
      'Intelligent query caching with Redis for sub-3-second response times',
      'Role-based access control with enterprise-grade security and audit logging',
      'Query history and favorites with smart suggestions for follow-up analyses'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'PostgreSQL',
      'Redis',
      'WebSocket',
      'Hugging Face Transformers',
      'PyTorch',
      'Prometheus',
      'Grafana'
    ],
    challenges: [
      'NLP Model Accuracy: Fine-tuned transformer models for text-to-SQL conversion with entity recognition and schema mapping to achieve 95% query accuracy across diverse business terminology',
      'Real-time Performance: Implemented multi-layer caching strategy with Redis, connection pooling, and query optimization to maintain sub-3-second response times under 1000+ concurrent users',
      'Multi-Database Abstraction: Created unified database adapter pattern supporting different SQL dialects while maintaining consistent query interface and error handling across PostgreSQL, MySQL, and SQLite',
      'Scalable Architecture: Designed microservices architecture with Kubernetes orchestration, implementing circuit breakers and health checks for 99.9% uptime requirements',
    ],
    media: [
      
    ],
    githubUrl: 'https://github.com/DavidYu75/ai-business-intelligence'
  },

  'constellation': {
    overview: 'Constellation is an AI-powered business intelligence platform that converts natural language queries into SQL, delivering instant data insights through interactive visualizations.',
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
