import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './skills.css';
import SKILLS from '../../data/skills';
import { SKILL_ICONS, ConceptIcon } from '../../assets/icons/skills/skillIcons';
import { getAllProjects } from '../../data/projects';
import TransitionLink from '../../components/ui/TransitionLink';

gsap.registerPlugin(ScrollTrigger);

// ─── SkillsSection ────────────────────────────────────────────────────────────
// Developer DNA homepage section. Appears immediately after Namaste AI.
//
// Reference parity (SC.05 — THE TOOLKIT, portfoliosanket.vercel.app):
//
//  HOVER BEHAVIOR:
//  — Hovering a row activates visual feedback ONLY (cream pill + text inversion).
//  — Hovering NEVER changes the selected skill or the right detail panel!
//
//  CLICK BEHAVIOR:
//  — Clicking/tapping a skill selects it persistently.
//  — Right panel updates to show real project usage derived from projects.js.
//  — If no documented project uses that skill, shows an honest empty state.
// ─────────────────────────────────────────────────────────────────────────────

// Normalized synonym mapping to match skill IDs against actual project.technologies
const SKILL_TECH_SYNONYMS = {
  react: ['React', 'React.js', 'React 19'],
  javascript: ['JavaScript', 'JS'],
  html5: ['HTML', 'HTML5'],
  css3: ['CSS', 'CSS3'],
  tailwind: ['Tailwind CSS', 'Tailwind'],
  gsap: ['GSAP', 'ScrollTrigger'],
  nodejs: ['Node.js', 'Node'],
  express: ['Express.js', 'Express'],
  mongodb: ['MongoDB'],
  'rest-apis': ['REST APIs', 'REST'],
  auth: ['Auth', 'Authentication'],
  redux: ['Redux', 'Redux Toolkit'],
  zustand: ['Zustand'],
  gemini: ['Gemini API', 'Google Gemini'],
  'prompt-eng': ['Prompt Engineering'],
  'llm-fund': ['LLM Fundamentals'],
  git: ['Git', 'GitHub'],
  vite: ['Vite'],
  nextjs: ['Next.js'],
  typescript: ['TypeScript'],
  dsa: ['DSA', 'Data Structures & Algorithms', 'LocalStorage API'],
};

export function getProjectsForSkill(skill) {
  if (!skill) return [];
  const projects = getAllProjects();
  const synonyms = SKILL_TECH_SYNONYMS[skill.id] || [skill.name];

  return projects.filter((project) => {
    if (!project.technologies || !Array.isArray(project.technologies)) return false;
    return project.technologies.some((tech) =>
      synonyms.some((syn) => syn.toLowerCase() === tech.toLowerCase())
    );
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function splitIntoColumns(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

const [colA, colB] = splitIntoColumns(SKILLS);
const TOTAL = SKILLS.length;

function getStatusLabel(status) {
  if (status === 'strong') return 'Strong Foundation';
  if (status === 'exploring') return 'Exploring';
  return 'Comfortable';
}

// ── SkillRow ─────────────────────────────────────────────────────────────────
const SkillRow = forwardRef(function SkillRow(
  { skill, index, isHovered, isSelected, onHover, onLeave, onSelect },
  ref
) {
  const isExploring = skill.status === 'exploring';
  const IconComponent = skill.concept ? ConceptIcon : (SKILL_ICONS[skill.id] || ConceptIcon);

  return (
    <div
      ref={ref}
      className={`skill-row${isHovered ? ' is-hovered' : ''}${isSelected ? ' is-selected' : ''}`}
      data-status={skill.status}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={onLeave}
      onClick={() => onSelect(skill)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(skill);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${skill.name} — ${skill.category}, ${getStatusLabel(skill.status)}. Click to view project usage.`}
      data-cursor="open"
    >
      {/* Cream pill background (CSS transition handles show/hide) */}
      <span className="skill-row-bg" aria-hidden="true" />

      {/* Row content */}
      <span className="skill-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="skill-icon" aria-hidden="true">
        <IconComponent />
      </span>

      <span className="skill-name">{skill.name}</span>

      {isExploring ? (
        <span className="skill-exploring-badge">EXPLORING</span>
      ) : (
        <span className="skill-dots" aria-hidden="true" />
      )}

      <span className="skill-tag">{skill.category}</span>
    </div>
  );
});

// ── SkillsPanel ───────────────────────────────────────────────────────────────
// Updates ONLY on click/selection. Derives real project usage from projects.js.
function SkillsPanel({ selectedSkill }) {
  const projects = selectedSkill ? getProjectsForSkill(selectedSkill) : [];

  return (
    <div
      className="skills-panel"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Skill details and real project usage"
    >
      <div className="skills-panel-inner">
        {!selectedSkill ? (
          <div className="skills-panel-idle">
            <p className="skills-panel-idle-title">Pick a skill</p>
            <p className="skills-panel-idle-sub">
              Click a skill <em>to see where I used it.</em>
            </p>
          </div>
        ) : (
          <div className="skills-panel-detail" key={selectedSkill.id}>
            <p className="skills-panel-detail-cat">{selectedSkill.category}</p>
            <p className="skills-panel-detail-name">{selectedSkill.name}</p>
            <p className={`skills-panel-detail-status status-${selectedSkill.status}`}>
              {getStatusLabel(selectedSkill.status)}
            </p>

            {/* Real Project Usage Section */}
            <div className="skills-panel-usage-section">
              <span className="skills-panel-usage-label">USED IN</span>

              {projects.length > 0 ? (
                <div className="skills-panel-projects-list">
                  {projects.map((proj, idx) => (
                    <TransitionLink
                      key={proj.id}
                      to={`/work/${proj.slug}`}
                      className="skills-panel-project-pill"
                      data-cursor="open"
                      aria-label={`View project ${proj.title}`}
                    >
                      <span className="skills-panel-project-num">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="skills-panel-project-title">{proj.title}</span>
                      <span className="skills-panel-project-arrow" aria-hidden="true">
                        →
                      </span>
                    </TransitionLink>
                  ))}
                </div>
              ) : (
                <div className="skills-panel-empty-state">
                  <span className="skills-panel-empty-kicker">NO DOCUMENTED PROJECT YET</span>
                  <p className="skills-panel-empty-text">
                    {selectedSkill.status === 'exploring'
                      ? 'Currently exploring through hands-on experiments and targeted study.'
                      : 'Used in algorithmic problem solving, experimental prototypes, or configuration.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SkillsSection ─────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkillId, setHoveredSkillId] = useState(null);

  const sectionRef  = useRef(null);
  const lineRef     = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const rowsRef     = useRef([]);

  // ── Interaction handlers ───────────────────────────────────────────────────
  // Hover only updates visual row state
  const handleHover = useCallback((skillId) => {
    setHoveredSkillId(skillId);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredSkillId(null);
  }, []);

  // Click selects the skill and updates the right panel
  const handleSelect = useCallback((skill) => {
    setSelectedSkill(skill);
  }, []);

  // ── GSAP scroll entrance ──────────────────────────────────────────────────
  useEffect(() => {
    const section  = sectionRef.current;
    const line     = lineRef.current;
    const title    = titleRef.current;
    const subtitle = subtitleRef.current;
    const rows     = rowsRef.current.filter(Boolean);

    if (!section || !title) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Top hairline draw from left (triggers when section naturally enters after Namaste AI unpins)
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      if (prefersReduced) return;

      // 2. Hollow title glide up with calm presence and dwell
      gsap.fromTo(
        title,
        { yPercent: 25, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        }
      );

      // 3. Subtitle fade in
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // 4. Progressive row reveal:
      // Initial in-viewport rows enter calmly after title establishes
      // Subsequent rows reveal progressively as user scrolls through the list
      const initialBatch = rows.slice(0, 10);
      const remainingBatch = rows.slice(10);

      if (initialBatch.length > 0) {
        gsap.fromTo(
          initialBatch,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: section.querySelector('.skills-columns'),
              start: 'top 78%',
              once: true,
            },
          }
        );
      }

      if (remainingBatch.length > 0) {
        gsap.fromTo(
          remainingBatch,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: section.querySelector('.skills-columns'),
              start: 'top 55%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Render columns ────────────────────────────────────────────────────────
  const renderColumn = (skills, startIndex) =>
    skills.map((skill, i) => {
      const gi = startIndex + i;
      return (
        <SkillRow
          key={skill.id}
          skill={skill}
          index={gi}
          isHovered={hoveredSkillId === skill.id}
          isSelected={selectedSkill?.id === skill.id}
          onHover={handleHover}
          onLeave={handleLeave}
          onSelect={handleSelect}
          ref={(el) => { rowsRef.current[gi] = el; }}
        />
      );
    });

  return (
    <section
      ref={sectionRef}
      className="skills-section"
      id="developer-dna"
      aria-label="Developer DNA — Skills"
    >
      {/* Hairline top border */}
      <div ref={lineRef} className="skills-top-line" aria-hidden="true" />

      {/* SC. label row */}
      <div className="skills-meta-row">
        <span className="skills-meta-kicker">
          <b>SC. 05</b> — DEVELOPER DNA
        </span>
        <span className="skills-meta-count">{String(TOTAL).padStart(2, '0')} TOOLS</span>
      </div>

      {/* Hollow stroke heading */}
      <div className="skills-heading-block">
        <h2
          ref={titleRef}
          className="skills-display-title"
          aria-label="Skills"
        >
          SKILLS
        </h2>
        <p ref={subtitleRef} className="skills-subtitle">
          Click a skill <em>to see where I used it.</em>
        </p>
      </div>

      {/* Body: two-column list + sticky panel */}
      <div className="skills-body">
        <div className="skills-columns">
          {/* Column A */}
          <div className="skills-col" role="list" aria-label="Skills list, first column">
            {renderColumn(colA, 0)}
          </div>

          {/* Column B */}
          <div className="skills-col" role="list" aria-label="Skills list, second column">
            {renderColumn(colB, colA.length)}
          </div>
        </div>

        {/* Sticky right panel */}
        <SkillsPanel selectedSkill={selectedSkill} />
      </div>
    </section>
  );
}
