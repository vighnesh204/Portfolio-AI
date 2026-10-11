// ─── skills.js ────────────────────────────────────────────────────────────────
// Developer DNA / Skills data for Vighnesh's portfolio.
// Organized per PRD section 20 (Developer DNA / Skills).
//
// Rules:
//  — No fake percentages, years, or proficiency scores.
//  — "status" is one of: 'strong' | 'comfortable' | 'exploring'
//  — "icon" maps to SKILL_ICONS[id] in skillIcons.jsx; undefined → ConceptIcon
//  — Concept skills (REST APIs, Auth, Prompt Eng, LLM, DSA) have no brand icon.
//  — HTML5 and CSS3 are listed separately for clean icon display.
// ──────────────────────────────────────────────────────────────────────────────

export const SKILLS = [
  // ── Strong Foundations ──────────────────────────────────────────────────
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    status: 'strong',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    status: 'strong',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    status: 'strong',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    status: 'strong',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    status: 'strong',
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'Animation',
    status: 'comfortable',
  },

  // ── Full Stack ───────────────────────────────────────────────────────────
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Full Stack',
    status: 'comfortable',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Full Stack',
    status: 'comfortable',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Full Stack',
    status: 'comfortable',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'Full Stack',
    status: 'comfortable',
    concept: true,    // No brand SVG — use neutral mark
  },
  {
    id: 'auth',
    name: 'Auth Fundamentals',
    category: 'Full Stack',
    status: 'comfortable',
    concept: true,
  },

  // ── State Management ─────────────────────────────────────────────────────
  {
    id: 'redux',
    name: 'Redux Toolkit',
    category: 'State',
    status: 'comfortable',
  },
  {
    id: 'zustand',
    name: 'Zustand',
    category: 'State',
    status: 'comfortable',
  },

  // ── AI Development ───────────────────────────────────────────────────────
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'AI',
    status: 'comfortable',
  },
  {
    id: 'prompt-eng',
    name: 'Prompt Engineering',
    category: 'AI',
    status: 'comfortable',
    concept: true,
  },
  {
    id: 'llm-fund',
    name: 'LLM Fundamentals',
    category: 'AI',
    status: 'comfortable',
    concept: true,
  },

  // ── Tooling ──────────────────────────────────────────────────────────────
  {
    id: 'git',
    name: 'Git / GitHub',
    category: 'Tooling',
    status: 'strong',
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'Tooling',
    status: 'comfortable',
  },

  // ── Currently Exploring ──────────────────────────────────────────────────
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Exploring',
    status: 'exploring',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Exploring',
    status: 'exploring',
  },
  {
    id: 'dsa',
    name: 'DSA',
    category: 'Exploring',
    status: 'exploring',
    concept: true,
  },
];

export default SKILLS;
