// ─── api/_context.js ──────────────────────────────────────────────────────────
// Server-Side Authoritative Portfolio Context Builder
//
// Architecture:
//   This module runs on the SERVER (Vercel Serverless Function / Node.js).
//   It loads authoritative portfolio data directly from the repository's
//   verified data sources and formats it into a structured plain-text context
//   for the Gemini system instruction.
//
// Security & Grounding:
//   — The browser NEVER provides this context.
//   — Client payloads containing { context: ... } are ignored completely.
//   — Contains only real portfolio facts; no invented experience or credentials.
// ─────────────────────────────────────────────────────────────────────────────

import { getAllProjects } from '../src/data/projects.js';
import { SKILLS } from '../src/data/skills.js';
import { JOURNEY_PHASES } from '../src/data/journey.js';
import { getAllSeasons } from '../src/data/aiLearning/index.js';
import { CONTACT_INFO } from '../src/data/contact.js';

export function buildServerContext() {
  const projects = getAllProjects();
  const seasons = getAllSeasons();

  // ── Identity & Profile ────────────────────────────────────────────────────
  const identity = `VIGHNESH BORHADE
Location: ${CONTACT_INFO.location}
Availability: ${CONTACT_INFO.availability}
GitHub: ${CONTACT_INFO.github}
${CONTACT_INFO.email ? `Email: ${CONTACT_INFO.email}\n` : ''}${CONTACT_INFO.linkedin ? `LinkedIn: ${CONTACT_INFO.linkedin}\n` : ''}Focus: Frontend Engineering, Full Stack MERN, AI Engineering

Vighnesh is a developer building production-quality React applications, 
full-stack MERN systems, and AI-integrated tools. He is currently studying AI through 
the Namaste AI curriculum while deepening his Data Structures and Algorithms practice.

IMPORTANT GROUNDING NOTE: Vighnesh does NOT have documented employment at Google, Microsoft, Meta, Amazon, or any external corporate employer in this portfolio. He does not have arbitrary years of commercial experience claimed.`;

  // ── Projects ──────────────────────────────────────────────────────────────
  const projectsText = projects
    .map((p) => {
      const techList = p.technologies.join(', ');
      return `PROJECT: ${p.title} (${p.year})
Category: ${p.category}
Technologies: ${techList}
Summary: ${p.shortDescription}
GitHub: ${p.github || 'Not public'}
Internal route: /work/${p.slug}`;
    })
    .join('\n\n');

  // ── Skills ────────────────────────────────────────────────────────────────
  const byStatus = { strong: [], comfortable: [], exploring: [] };
  SKILLS.forEach((s) => {
    if (byStatus[s.status]) {
      byStatus[s.status].push(s.name);
    }
  });

  const skillsText = `SKILLS
Strong: ${byStatus.strong.join(', ')}
Comfortable: ${byStatus.comfortable.join(', ')}
Currently Exploring: ${byStatus.exploring.join(', ')}`;

  // ── Developer Journey ─────────────────────────────────────────────────────
  const journeyText = JOURNEY_PHASES.map(
    (phase) =>
      `Phase ${phase.number}: ${phase.title} — ${phase.tagline}
Topics: ${phase.topics.join(', ')}`
  ).join('\n');

  // ── AI Learning (Namaste AI) ───────────────────────────────────────────────
  const aiText = seasons
    .map((season) => {
      if (season.status === 'coming-soon') {
        return `Season ${season.seasonNumber}: Coming Soon (No notes or curriculum documented yet)`;
      }
      const conceptList = season.keyConcepts
        ? season.keyConcepts
            .filter((c) => !c.includes('[Placeholder'))
            .join(', ')
        : '';
      return `Season ${season.seasonNumber}: ${season.title} — Status: ${season.status}
Key concepts: ${conceptList || 'None'}`;
    })
    .join('\n');

  // ── Compose final authoritative context ───────────────────────────────────
  return [
    '=== AUTHORITATIVE PORTFOLIO CONTEXT ===',
    identity,
    '',
    '=== PROJECTS ===',
    projectsText,
    '',
    '=== SKILLS & TECHNOLOGIES ===',
    skillsText,
    '',
    '=== DEVELOPER JOURNEY (6 phases) ===',
    journeyText,
    '',
    '=== AI LEARNING (Namaste AI Curriculum) ===',
    aiText,
    '',
    '=== CONTACT ===',
    `GitHub: ${CONTACT_INFO.github}`,
    `Email: ${CONTACT_INFO.email ? CONTACT_INFO.email : 'Not publicly listed — direct visitors to GitHub or the contact page'}`,
    `LinkedIn: ${CONTACT_INFO.linkedin ? CONTACT_INFO.linkedin : 'Not publicly listed'}`,
    '=== END AUTHORITATIVE PORTFOLIO CONTEXT ===',
  ].join('\n');
}

// Pre-build once at module load time for zero request-time latency
export const PORTFOLIO_CONTEXT = buildServerContext();

export default PORTFOLIO_CONTEXT;
