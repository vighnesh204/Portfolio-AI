// ─── Project Data Architecture ─────────────────────────────────────────────
// Source of truth for all projects across Selected Work, /work, and /work/:slug.
//
// Rules:
//   - No invented metrics, companies, or fake statistics.
//   - Missing or pending information is explicitly marked as [Placeholder].
//   - Only sections with real data are rendered on detail pages.
// ──────────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'interview-ai',
    slug: 'interview-ai',
    number: '01',
    title: 'Interview AI',
    subtitle: 'AI-Powered Technical Interview Preparation Platform',
    category: 'AI & Full Stack',
    year: '2024',
    featured: true,
    accentColor: '#c8a96e', // Warm amber
    shortDescription:
      'An intelligent mock interview platform that simulates frontend and full-stack technical rounds, evaluates candidate responses with Google Gemini, and delivers structured feedback.',
    description:
      'Interview AI was built to solve the lack of realistic, on-demand technical interview practice for frontend and junior developers. The platform guides users through live coding queries, algorithmic challenges, and conceptual questions with an adaptive AI evaluator powered by the Gemini API.',
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express.js',
      'Gemini API',
      'MongoDB',
      'Tailwind CSS',
    ],
    github: 'https://github.com/vighnesh204/interview-ai',
    live: '#', // [Placeholder: Add production deployment link]
    problem:
      'Technical interview preparation is often disconnected from real dialogue. Static question banks like LeetCode test raw algorithmic output but fail to train developers on explaining technical tradeoffs, architectural decisions, and conceptual reasoning in a conversational setting.',
    approach:
      'Engineered an interactive conversational session flow where the user receives dynamic questions tailored to their target stack. Server-side prompt chains via Google Gemini evaluate the clarity, accuracy, and depth of each response, returning scored feedback on time complexity, code clarity, and conceptual mastery.',
    features: [
      'Configurable interview tracks for Frontend (React, JS), Backend (Node, APIs), and Full Stack.',
      'Real-time response evaluation and scoring powered by structured Gemini prompts.',
      'Interactive code editor with syntax highlighting for live challenge submissions.',
      'Comprehensive post-interview report detailing strengths, misconceptions, and suggested study topics.',
    ],
    architecture:
      'Client built with React and Vite for rapid state updates. Backend built on Node.js and Express handling authentication, interview session state, and rate-limited API calls to Google Gemini. Session histories and evaluation rubrics persisted in MongoDB.',
    challenges:
      'Designing prompt constraints to ensure the Gemini API consistently returned deterministic JSON payloads rather than free-form conversational text, while handling API latency during streaming feedback.',
    learning:
      'Deepened practical understanding of LLM prompt engineering, robust schema validation for AI responses, full-stack state management, and building conversational interfaces.',
  },
  {
    id: 'dev-flow',
    slug: 'dev-flow',
    number: '02',
    title: 'DevFlow',
    subtitle: 'Developer Workflow & Sprint Task Tracker',
    category: 'Full Stack MERN',
    year: '2024',
    featured: true,
    accentColor: '#b85c38', // Burnt orange
    shortDescription:
      'A streamlined sprint management and developer task dashboard featuring drag-and-drop kanban boards, real-time status updates, and lightweight team collaboration tools.',
    description:
      'DevFlow simplifies project task tracking for individual developers and small engineering squads. It removes the heavy configuration overhead of enterprise tools like Jira in favor of a keyboard-first, ultra-fast kanban board with RESTful synchronization.',
    technologies: [
      'React',
      'Redux Toolkit',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Tailwind CSS',
    ],
    github: 'https://github.com/vighnesh204/dev-flow',
    live: '#', // [Placeholder: Add production deployment link]
    problem:
      'Existing task management platforms are frequently bloated with complex permission layers and slow interfaces that pull developers away from writing code.',
    approach:
      'Built a distraction-free board using Redux Toolkit for optimistic UI updates, backed by an Express and MongoDB REST API. Actions like moving cards between swimlanes resolve instantly on the client while syncing seamlessly with the server in the background.',
    features: [
      'Interactive Kanban board with drag-and-drop task progression.',
      'Tagging, priority filtering, and markdown-enabled task descriptions.',
      'Optimistic client-side state updates for zero-latency interactions.',
      'RESTful endpoints with token-based authentication and secure session handling.',
    ],
    architecture:
      'Separation of concerns with a normalized Redux store on the frontend, modular controllers and service layers in Express, and indexed MongoDB collections for fast query execution.',
    challenges:
      'Ensuring data consistency between optimistic frontend state and asynchronous MongoDB database updates during rapid card reordering.',
    learning:
      'Mastered Redux Toolkit slice architecture, RESTful API design conventions, and handling edge cases in optimistic asynchronous mutations.',
  },
  {
    id: 'portfolio-ai',
    slug: 'portfolio-ai',
    number: '03',
    title: 'Portfolio AI',
    subtitle: 'Interactive Editorial Developer Portfolio',
    category: 'Frontend Engineering',
    year: '2026',
    featured: true,
    accentColor: '#3fc9b9', // Editorial teal
    shortDescription:
      'A performance-focused, editorial developer portfolio built with React 19, custom GSAP choreography, responsive route panels, and an integrated AI portfolio assistant.',
    description:
      'Portfolio AI is this very portfolio website — designed as an interactive showcase of modern frontend engineering. Built from scratch with zero heavy UI libraries, it demonstrates typographic confidence, purposeful GSAP animations, native browser scrolling, and accessible design principles.',
    technologies: [
      'React 19',
      'Vite',
      'JavaScript',
      'Tailwind CSS',
      'GSAP',
      'ScrollTrigger',
      'React Router v7',
    ],
    github: 'https://github.com/vighnesh204/Portfolio-AI',
    live: 'https://github.com/vighnesh204/Portfolio-AI',
    problem:
      'Most developer portfolios fall into generic templates with excessive purple glow, cookie-cutter bento grids, or sluggish 3D libraries that degrade mobile performance.',
    approach:
      'Crafted a bespoke editorial identity inspired by high-end typography and automotive navigation. Leveraged lightweight GSAP transforms and hardware-accelerated CSS keyframes to create a memorable impression while maintaining sub-second load times.',
    features: [
      'Signature vertical color-panel route transitions orchestrated with React Router.',
      'Full-viewport automotive-inspired fullscreen navigation overlay.',
      'Continuous hardware-accelerated dual-track crossing marquee.',
      'Integrated Custom Cursor with hardware-accelerated quickTo pointer tracking.',
      'Complete accessibility with keyboard navigation, focus management, and reduced-motion modes.',
    ],
    architecture:
      'Component-driven React 19 architecture with single-source-of-truth routing, scoped styles with design tokens, and modular section components.',
    challenges:
      'Synchronizing full-viewport route transition panels with React Router route updates without causing layout thrashing or scroll jumps.',
    learning:
      'Deepened mastery of GSAP timeline choreography, native DOM scrolling optimization, and building handcrafted interaction design.',
  },
  {
    id: 'dsa-tracker',
    slug: 'dsa-tracker',
    number: '04',
    title: 'AlgoForge',
    subtitle: 'Data Structures & Algorithms Mastery Journal',
    category: 'Frontend & Utility',
    year: '2024',
    featured: false,
    accentColor: '#f0c264', // Warm gold
    shortDescription:
      'A personal problem-solving tracker and conceptual cheatsheet for recording algorithmic patterns, time complexity analyses, and code solutions across DSA topics.',
    description:
      'AlgoForge is a lightweight web tool built to log, categorize, and review Data Structures and Algorithms practice. It emphasizes pattern recognition (Two Pointers, Sliding Window, DP) over simple question counts.',
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'LocalStorage API',
    ],
    github: 'https://github.com/vighnesh204',
    live: '#', // [Placeholder: Deployment link]
    problem:
      'Retaining problem-solving techniques is difficult without structured revision notes and personal analysis of time and space tradeoffs.',
    approach:
      'Built a fast client-side tool allowing quick categorization of problems by pattern, tags, difficulty, and complexity metrics with instant client-side search.',
    features: [
      'Pattern-based problem tagging (Sliding Window, Binary Search, Trees, Graphs).',
      'Search and filter by difficulty, status, and algorithmic paradigm.',
      'Code snippet review area with notes on edge cases and optimal approaches.',
    ],
    challenges:
      'Building an intuitive filter system with instant feedback on large dataset collections.',
    learning:
      'Reinforced understanding of core algorithmic patterns and performance considerations in client-side search indexing.',
  },
];

// Helper functions for consuming components
export function getAllProjects() {
  return projects;
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export default projects;
