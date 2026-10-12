// ─── journey.js ─────────────────────────────────────────────────────────────
// Developer progression data for Vighnesh's portfolio.
// Reflects authentic learning progression: syntax → components → full stack → AI → DSA.
//
// Rules per AGENTS.md & PRD Section 41:
//  — No fake employment timelines, companies, or arbitrary year numbers.
//  — Focused on intellectual & engineering growth across 6 core phases.
// ──────────────────────────────────────────────────────────────────────────────

export const JOURNEY_PHASES = [
  {
    id: 'foundations',
    number: '01',
    title: 'Foundations',
    shortTitle: 'HTML5 · CSS3',
    tagline: 'From structure to semantic layout',
    description:
      'Mastering the foundational building blocks of the web. Developing an eye for typography, semantic document flow, responsive grid systems, and clean CSS architecture before touching frameworks.',
    topics: ['HTML5 Semantics', 'CSS3 Architecture', 'Flexbox & CSS Grid', 'Responsive Systems', 'Web Accessibility'],
    breakthrough:
      'Understanding that clean markup and layout constraints precede good user experience.',
  },
  {
    id: 'javascript',
    number: '02',
    title: 'JavaScript Depth',
    shortTitle: 'ES6+ · Core Engine',
    tagline: 'Deconstructing language fundamentals',
    description:
      'Moving past surface syntax to understand the JavaScript runtime: execution contexts, closures, prototypes, asynchronous event loops, promises, and direct DOM manipulation.',
    topics: ['Execution Contexts', 'Closures & Scope', 'Event Loop & Promises', 'ES6+ Modern JS', 'DOM Mechanics'],
    breakthrough:
      'Realizing that JavaScript performance starts with how the browser parses and executes code.',
  },
  {
    id: 'react',
    number: '03',
    title: 'React & UI Architecture',
    shortTitle: 'React 19 · GSAP',
    tagline: 'Declarative components and purposeful motion',
    description:
      'Adopting declarative UI paradigms: component modularity, state isolation, hook mechanics, reconciliation lifecycles, and pairing React with GSAP for high-frame-rate interaction design.',
    topics: ['Component Modularity', 'State & Hooks', 'Virtual DOM Reconciliation', 'GSAP & ScrollTrigger', 'Tailwind CSS'],
    breakthrough:
      'Building interfaces as predictable state machines rather than entangled imperative scripts.',
  },
  {
    id: 'fullstack',
    number: '04',
    title: 'Full Stack & APIs',
    shortTitle: 'Node · Express · Mongo',
    tagline: 'Expanding beyond the browser boundary',
    description:
      'Bridging client and server through the MERN ecosystem: building RESTful endpoints with Express, modeling document schemas in MongoDB, and implementing stateless authentication tokens.',
    topics: ['Node.js Runtime', 'Express.js Framework', 'MongoDB & Mongoose', 'RESTful API Contracts', 'JWT Authentication'],
    breakthrough:
      'Gaining empathy for latency, database query costs, and client-server synchronization.',
  },
  {
    id: 'ai-exploration',
    number: '05',
    title: 'AI Exploration',
    shortTitle: 'Namaste AI · LLMs',
    tagline: 'First-principles intelligence engineering',
    description:
      'Deconstructing modern AI through the Namaste AI curriculum: token economics, attention mechanisms, structured JSON outputs, Gemini API integrations, and deterministic agentic tool dispatching.',
    topics: ['Transformer Foundations', 'Tokenization & Latency', 'Gemini API', 'Tool Calling & Dispatch', 'Prompt Constraints'],
    breakthrough:
      'Treating AI models not as magical black boxes, but as probabilistic engines requiring rigorous schemas.',
  },
  {
    id: 'problem-solving',
    number: '06',
    title: 'Problem Solving & DSA',
    shortTitle: 'DSA · Algorithms',
    tagline: 'Discipline over framework trends',
    description:
      'Cultivating computational thinking through continuous practice of Data Structures and Algorithms. Honing analytical intuition for time/space complexity, recursion, pointers, and algorithmic trade-offs.',
    topics: ['Time & Space Complexity', 'Arrays & Pointers', 'Recursion & Backtracking', 'Trees & Graphs', 'Algorithmic Intuition'],
    breakthrough:
      'Understanding that frameworks come and go, but algorithmic problem solving is permanent.',
  },
];

export function getAllPhases() {
  return JOURNEY_PHASES;
}

export function getPhaseById(id) {
  return JOURNEY_PHASES.find((p) => p.id === id);
}

export default JOURNEY_PHASES;
