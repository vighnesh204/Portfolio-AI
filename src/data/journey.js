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
    shortTitle: 'React · Redux · UI Design',
    tagline: 'Understanding React beyond just building components',
    description:
      'Strengthening React fundamentals and advanced concepts through practical projects — component design, props and state, hooks, reconciliation, routing, reusable UI patterns, and shared state management with Redux Toolkit. Alongside React, beginning to explore frontend low-level design through component architecture, config-driven interfaces, reusable abstractions, and loading experiences such as shimmer UI.',
    topics: ['React Fundamentals', 'Hooks & State', 'Redux Toolkit', 'Component Design', 'Config-Driven UI', 'Shimmer UI'],
    breakthrough:
      'Good React code is not only about making the UI work — it is about understanding state, designing reusable components, and keeping the application easy to reason about.',
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
    shortTitle: 'DSA · In Progress',
    tagline: 'Building consistency one pattern at a time',
    description:
      'Currently strengthening problem-solving fundamentals through Arrays, Strings, and Recursion. Focus is on understanding problem patterns, writing cleaner solutions, and improving time and space complexity thinking while gradually progressing into the next DSA topics.',
    topics: ['Arrays', 'Strings', 'Recursion', 'Time & Space Complexity', 'Problem-Solving Patterns'],
    breakthrough:
      'The goal is not to rush through every DSA topic, but to understand each pattern deeply and build strong problem-solving habits.',
  },
];

export function getAllPhases() {
  return JOURNEY_PHASES;
}

export function getPhaseById(id) {
  return JOURNEY_PHASES.find((p) => p.id === id);
}

export default JOURNEY_PHASES;
