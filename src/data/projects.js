// ─── Project Data Architecture ─────────────────────────────────────────────
// Source of truth for all projects across Selected Work, /work, and /work/:slug.
//
// Rules:
//   - No invented metrics, user counts, or fabricated statistics.
//   - Data verified against each project's GitHub repository.
//   - live: null means no verified deployment exists — do NOT use '#'.
//   - UI renders GitHub link as primary action when live is null.
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
    accentColor: '#a78bfa',
    shortDescription:
      'An AI-assisted code review experience built in the browser. Paste or write code in a Monaco-powered editor and receive structured Gemini feedback covering bugs, security concerns, performance issues, and code quality — streamed as you wait.',
    description:
      'DevLens puts AI-assisted code review directly in the browser. A developer pastes or writes code in a Monaco Editor instance, selects a language, and Gemini analyzes it in real time — surfacing bugs, security vulnerabilities, performance considerations, and style improvements as a structured streaming response. The goal was to make AI feedback feel immediate and developer-native rather than just a chatbot exchange.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Gemini API',
      'Monaco Editor',
      'Tailwind CSS',
      'Framer Motion',
    ],
    github: 'https://github.com/vighnesh204/DevLens',
    live: 'https://dev-lens-navy.vercel.app/',
    problem:
      'Developers reviewing their own code often miss subtle bugs, security leaks, or performance anti-patterns without a second perspective. Getting that second perspective usually requires another developer or a paid tool — neither immediately available in the moment of writing.',
    approach:
      'Integrated the Gemini API with a Monaco Editor instance so review feedback streams into the UI as it is generated. A 0–100 code quality score with a visual ring gives developers an at-a-glance quality signal before reading the full analysis.',
    features: [
      'Monaco-based code editor with syntax highlighting and multiple language support.',
      'Gemini-powered analysis covering bugs, security concerns, performance, and style.',
      'Streaming AI feedback — the response appears incrementally rather than after a full wait.',
      'Code quality score visualized as a ring indicator.',
      'Structured feedback organized into clear categories for easy scanning.',
    ],
    architecture:
      'Single-page React application built with Vite. The Gemini API is consumed via the Google AI JavaScript SDK. Monaco Editor handles the code input and syntax environment.',
    challenges:
      'Rendering streaming AI text incrementally alongside Monaco Editor without causing visible layout shifts or re-paint interference during long analysis responses.',
    learning:
      'Gained practical experience integrating LLM streaming APIs, customizing Monaco Editor for a specific use case, and presenting AI-generated analysis in a structured, scannable UI.',
  },
  {
    id: 'interview-ai',
    slug: 'interview-ai',
    number: '02',
    title: 'Interview AI',
    subtitle: 'AI-Powered Technical Interview Preparation',
    category: 'AI & Full Stack',
    year: '2024',
    featured: true,
    accentColor: '#c8a96e',
    shortDescription:
      'A mock interview platform that guides developers through technical rounds, evaluates responses with Google Gemini, and provides structured feedback on clarity, correctness, and reasoning.',
    description:
      'Interview AI was built to practice technical interview preparation through structured AI dialogue rather than static question banks. The platform presents interview questions, evaluates the candidate\'s written response using Gemini, and returns scored feedback across dimensions like technical accuracy, clarity, and depth of reasoning.',
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
    live: null,
    problem:
      'Technical interview preparation often relies on isolated question-answer drills that do not simulate the conversational evaluation of an actual interview. Explaining tradeoffs and reasoning matters as much as the answer itself.',
    approach:
      'Built an interactive session flow where the user receives questions and submits written responses. Gemini evaluates each response using structured prompts designed to return consistent, schema-compliant JSON feedback rather than free-form text.',
    features: [
      'Configurable interview tracks for Frontend, Backend, and Full Stack focus areas.',
      'Gemini-powered response evaluation returning structured feedback on accuracy, clarity, and reasoning.',
      'Post-interview report summarizing strengths, areas for improvement, and suggested study topics.',
      'Session state managed server-side so interview progress persists across submissions.',
    ],
    architecture:
      'React and Vite frontend with a Node.js/Express backend. Interview session state and evaluation history stored in MongoDB. Gemini API called server-side with schema-enforced prompts to ensure consistent JSON payloads.',
    challenges:
      'Designing prompts that reliably produce deterministic JSON from Gemini across a range of user response styles and lengths, while handling API latency during evaluation.',
    learning:
      'Learned how to design prompt schemas that constrain LLM output format, how to manage conversational state across a session, and how to present AI evaluation in a readable, useful structure.',
  },
  {
    id: 'yt-clone',
    slug: 'yt-clone',
    number: '03',
    title: 'YouTube Clone',
    subtitle: 'Machine Coding Exercise — React Frontend Architecture',
    category: 'Frontend Engineering',
    year: '2024',
    featured: true,
    accentColor: '#e05252',
    shortDescription:
      'A React machine coding project replicating core YouTube frontend patterns: video feed, watch page, search with debounce and caching, N-level nested comments, and simulated live chat — all wired through Redux Toolkit.',
    description:
      'Built as a structured machine coding exercise to practise React architecture, state management, and API integration in a realistic context. The project covers a video discovery homepage, a dedicated watch page, search with debouncing and Redux-powered caching, recursively rendered nested comments, and a simulated live chat that uses polling-style periodic updates.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Tailwind CSS',
      'React Router',
      'Redux Toolkit',
      'YouTube Data API',
    ],
    github: 'https://github.com/vighnesh204/machine-coding-yt-clone',
    live: null,
    problem:
      'Practising React in isolation through small components does not prepare a developer for how multiple patterns — routing, shared state, API integration, debouncing, recursive rendering — work together inside one coherent application.',
    approach:
      'Followed a machine coding methodology: clarify requirements, justify tech choices, implement core flows first, then add performance patterns. Each feature was chosen to practise a specific frontend concept.',
    features: [
      'Dynamic video feed fetched from the YouTube Data API with category filtering.',
      'Dedicated watch page rendered via route/query parameters with the YouTube embed player.',
      'Search suggestions with a 200ms debounce to avoid triggering an API call on every keypress.',
      'Redux-powered search result caching so repeated searches reuse stored results rather than making new API calls.',
      'Recursively rendered N-level nested comments to practice tree-like UI structures.',
      'Simulated live chat using polling-style periodic updates — generated messages added at an interval, with a stored message limit so state does not grow unbounded.',
      'Redux Toolkit managing sidebar state, search cache, and live chat messages.',
      'Reusable VideoCard component with a wrapper composition pattern used for the advertisement-style card variant.',
    ],
    architecture:
      'Component-driven React app with React Router for navigation and Redux Toolkit for shared application state. YouTube Data API provides live video data.',
    challenges:
      'Coordinating multiple Redux slices — sidebar, search cache, and live chat — without cross-slice interference. Implementing the recursive comment tree cleanly at arbitrary depth. Keeping the simulated chat state bounded without visual jank.',
    learning:
      'Building this project helped me move beyond isolated React components and understand how multiple frontend concepts work together in one application. I practised shared state with Redux Toolkit, dynamic watch pages, reusable component design, and recursive rendering through N-level comments. Search debouncing and caching showed me how small frontend decisions can reduce unnecessary API requests, while the simulated live chat helped me understand polling-style updates and why fast-changing state needs to be controlled. Overall, the project gave me practical experience connecting React architecture, APIs, state management, and performance patterns.',
  },
  {
    id: 'hirelens-ai',
    slug: 'hirelens-ai',
    number: '04',
    title: 'HireLens AI',
    subtitle: 'AI-Assisted Resume Analyzer',
    category: 'AI & Frontend',
    year: '2025',
    featured: false,
    accentColor: '#52a8e0',
    shortDescription:
      'An AI-assisted resume analyzer that evaluates resume content, produces an ATS-style score, highlights keyword and skill gaps, and provides structured suggestions to make the resume clearer and more effective.',
    description:
      'HireLens AI is an AI-powered resume analysis interface. A user submits their resume text, and Gemini analyzes it against a structured schema — returning an ATS-style score, category-level breakdown, keyword and skill gap identification, bullet point feedback, and a prioritized improvement roadmap. The goal is to present AI feedback in a structured dashboard rather than as raw text output.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Tailwind CSS',
      'Gemini API',
      'Framer Motion',
      'Recharts',
    ],
    github: 'https://github.com/vighnesh204/HireLens-AI',
    live: 'https://hire-lens-ai-psi.vercel.app/',
    problem:
      'Most resume feedback is either generic (template checkers) or expensive (professional review services). Developers and students looking to make their resume stronger often lack specific, structured guidance on what to improve and why.',
    approach:
      'The resume text is sent to Gemini with a prompt that enforces a structured JSON schema. The returned analysis is mapped onto a feedback dashboard with visual score components, categorized insights, and concrete rewrite suggestions.',
    features: [
      'Gemini-powered resume analysis returning structured JSON feedback.',
      'ATS-style overall score with category-level breakdown.',
      'Keyword and skill gap identification — matched, missing, and weak keywords.',
      'Project, strengths, and weaknesses review.',
      'Concrete suggestions for rewriting weak resume bullets.',
      'Formatting and grammar improvement notes.',
      'Prioritized improvement roadmap based on analysis results.',
    ],
    architecture:
      'React and Vite single-page application. Resume text is submitted to a serverless API route that calls the Gemini API with a structured schema prompt. The structured JSON response is rendered across a feedback dashboard built with Recharts for score visualization.',
    challenges:
      'Designing a Gemini prompt schema detailed enough to return all required analysis categories consistently, while keeping the UI readable and non-overwhelming — analysis this dense can easily become noise rather than signal.',
    learning:
      'Working on HireLens taught me how to transform structured AI JSON output into a useful feedback dashboard rather than just displaying raw text. I thought carefully about how to present scores and analysis without overwhelming the user, how to design clear visual hierarchies for dense information, and how to make AI-generated feedback feel actionable rather than abstract.',
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
