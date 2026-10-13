// ─── Project Data Architecture ─────────────────────────────────────────────
// Source of truth for all projects across Selected Work, /work, and /work/:slug.
//
// Rules:
//   - No invented metrics, companies, or fake statistics.
//   - Data verified against each project's GitHub repository README.
//   - Missing or pending information is explicitly marked as [Placeholder].
//   - Only sections with real data are rendered on detail pages.
//
// Verified sources:
//   DevLens      → github.com/vighnesh204/DevLens
//   Interview AI → github.com/vighnesh204/interview-ai
//   YouTube Clone→ github.com/vighnesh204/machine-coding-yt-clone
//   HireLens AI  → github.com/vighnesh204/HireLens-AI
// ──────────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 'devlens',
    slug: 'devlens',
    number: '01',
    title: 'DevLens',
    subtitle: 'AI-Powered Code Review Tool',
    category: 'AI & Frontend',
    year: '2025',
    featured: true,
    accentColor: '#a78bfa', // Soft violet — matches the project's AI aesthetic
    shortDescription:
      'A production-ready AI code reviewer powered by Gemini 2.0 Flash. Paste any code snippet and receive a deep analysis covering bugs, security vulnerabilities, performance issues, and style improvements — streamed in real time.',
    description:
      'DevLens was built to bring world-class AI-assisted code review directly into the browser. Using Gemini 2.0 Flash streaming, it delivers live, incremental analysis of code snippets across 15 programming languages, surfacing bugs, security vulnerabilities, performance hotspots, and style concerns in a Monaco-powered IDE environment.',
    technologies: [
      'React 19',
      'Vite',
      'JavaScript',
      'Gemini 2.0 Flash',
      'Monaco Editor',
      'Framer Motion',
    ],
    github: 'https://github.com/vighnesh204/DevLens',
    live: '#', // [Placeholder: Add deployment link when available]
    problem:
      'Code review is one of the highest-leverage engineering activities, yet developers reviewing their own code often miss subtle bugs, security leaks, or performance anti-patterns without a second pair of eyes.',
    approach:
      'Integrated Gemini 2.0 Flash streaming API with a Monaco Editor instance so that review responses stream into the UI character-by-character, creating a real-time analysis feel. A 0–100 score with animated ring visualisation gives developers an at-a-glance quality signal before reading the full report.',
    features: [
      'Deep code analysis: bug detection, security audit, performance profiling, and style review.',
      'Real-time streaming responses via Gemini 2.0 Flash for a live analysis feel.',
      'Monaco Editor with a custom DevLens dark theme.',
      'Support for 15 languages including JavaScript, TypeScript, Python, Go, Rust, Java, and C++.',
      '0–100 quality score with an animated ring visualisation.',
      'Glassmorphic UI with a Linear-meets-Apple dark zinc aesthetic.',
    ],
    architecture:
      'Single-page React 19 application built with Vite. The Gemini 2.0 Flash streaming API is consumed via the Google AI SDK. Monaco Editor is lazy-loaded to keep initial bundle size minimal.',
    challenges:
      'Implementing smooth incremental rendering of streaming AI text alongside the Monaco Editor re-paint cycle without causing visible flicker or layout shifts during long responses.',
    learning:
      'Deepened practical understanding of LLM streaming APIs, Monaco Editor customisation, and animated data-visualisation patterns in React.',
  },
  {
    id: 'interview-ai',
    slug: 'interview-ai',
    number: '02',
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
      'Technical interview preparation is often disconnected from real dialogue. Static question banks test raw algorithmic output but fail to train developers on explaining technical tradeoffs, architectural decisions, and conceptual reasoning in a conversational setting.',
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
    id: 'yt-clone',
    slug: 'yt-clone',
    number: '03',
    title: 'YouTube Clone',
    subtitle: 'Machine Coding Round — Production-Quality Frontend Build',
    category: 'Frontend Engineering',
    year: '2024',
    featured: true,
    accentColor: '#e05252', // YouTube red
    shortDescription:
      'A machine coding challenge build of a YouTube-like video platform. Demonstrates component architecture, client-side routing, state management, and rapid UI delivery under interview-round constraints.',
    description:
      'Built as a structured machine coding exercise, practising the full interview workflow: requirement clarification, tech stack justification, implementation, and edge case handling. The result is a functional video discovery and playback UI built with React, Tailwind CSS, and React Router.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Tailwind CSS',
      'React Router',
      'Redux',
      'YouTube Data API',
    ],
    github: 'https://github.com/vighnesh204/machine-coding-yt-clone',
    live: '#', // [Placeholder: Add deployment link if available]
    problem:
      'Machine coding rounds require rapid translation of loosely-defined requirements into working, readable, and demonstrable software under a strict time limit — a fundamentally different skill from open-ended project development.',
    approach:
      'Followed a structured machine coding methodology: clarify requirements, justify tech stack decisions, implement core features first, then layer in edge cases. Used Vite for fast dev server startup and Tailwind CSS for rapid utility-first UI construction.',
    features: [
      'Video discovery homepage with category-based filtering.',
      'Video playback page with related video recommendations.',
      'Client-side routing with React Router DOM.',
      'Search functionality with debounced API calls.',
      'Responsive layout across screen sizes.',
    ],
    architecture:
      'Component-driven React app with React Router for navigation. Redux for shared application state. YouTube Data API integration for live video data fetching.',
    challenges:
      'Delivering a polished, functional prototype within a fixed machine coding time window while maintaining clean component boundaries and proper separation of concerns.',
    learning:
      'Building this project strengthened my understanding of how a larger React application is structured beyond individual components. I worked with Redux Toolkit for shared state, dynamic routing for watch pages, reusable component patterns, and recursive rendering for N-level nested comments. It also gave me practical experience with frontend performance patterns such as search debouncing, API-result caching, polling-based live updates, and controlling high-frequency live-chat state. Implementing a Higher-Order Component also helped me understand how behavior can be extended through component composition.',
  },
  {
    id: 'hirelens-ai',
    slug: 'hirelens-ai',
    number: '04',
    title: 'HireLens AI',
    subtitle: 'AI-Assisted Hiring Tool',
    category: 'AI & Full Stack',
    year: '2025',
    featured: false,
    accentColor: '#52a8e0', // Cool blue
    shortDescription:
      '[Placeholder: Full project description pending — repository is in active development.]',
    description:
      'HireLens AI is a React and Vite application currently in active development. Detailed project documentation and feature descriptions will be added when the repository README and core feature set are finalised.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      // [Placeholder: Full tech list pending repository documentation]
    ],
    github: 'https://github.com/vighnesh204/HireLens-AI',
    live: '#', // [Placeholder: Add deployment link when available]
    problem:
      '[Placeholder: Problem statement to be documented when project description is finalised.]',
    approach:
      '[Placeholder: Approach to be documented when project description is finalised.]',
    features: [
      // [Placeholder: Feature list to be added when repository README is complete.]
    ],
    architecture:
      '[Placeholder: Architecture notes to be added when project is further developed.]',
    challenges:
      '[Placeholder: Engineering challenges to be documented after development progresses.]',
    learning:
      '[Placeholder: Learnings to be documented after project completion.]',
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
