import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TransitionLink from '../components/ui/TransitionLink';
import '../sections/about/about.css';

// ─── Narrative Chapters ─────────────────────────────────────────────────────
// Honest editorial storytelling matching PRD Sections 18 & 19.
// Avoids generic biography cards; focuses on engineering convictions & learning.
// ─────────────────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    num: '01',
    tag: 'ORIGIN & CRAFTSMANSHIP',
    title: 'The Intersection of Technical Rigor and Human Experience',
    paragraphs: [
      'I was drawn to frontend engineering because it is one of the rare disciplines where low-level engineering constraints directly meet human psychology. An interface is not a passive poster; it is a live distributed system running across unpredictable client hardware, network conditions, and screen sizes.',
      'To build something truly memorable requires understanding layout lifecycles, DOM reconciliation, composite paint layers, typography scales, and purposeful animation. Every millisecond of latency and every unhandled edge case directly impacts the person sitting on the other side of the screen.',
    ],
  },
  {
    num: '02',
    tag: 'EXPANDING THE HORIZON',
    title: 'Deconstructing the Complete Request Lifecycle',
    paragraphs: [
      'A great frontend engineer cannot stop at the boundary of `fetch()`. To design resilient client experiences, I have been actively building across the MERN ecosystem — Node.js, Express, MongoDB, and RESTful architectures.',
      'Understanding what happens when an HTTP packet leaves the browser — authentication tokens, server-side validation, database query overheads, and error boundaries — transforms how I structure frontend state management, optimistic updates, and component isolation.',
    ],
  },
  {
    num: '03',
    tag: 'AI AS INFRASTRUCTURE',
    title: 'Moving Beyond Black-Box SDK Wrappers',
    paragraphs: [
      'In a landscape saturated with superficial wrappers, I approach modern Artificial Intelligence from first principles through the Namaste AI curriculum. Real AI engineering is not merely sending a prompt string and awaiting markdown.',
      'It requires understanding the geometric properties of vector embeddings, transformer attention mechanisms, token economics, context window boundaries, and structured function calling schemas. The goal is coercing non-deterministic models into reliable, deterministic software workflows.',
    ],
  },
  {
    num: '04',
    tag: 'FIRST PRINCIPLES',
    title: 'Discipline, Fundamentals, and Problem Solving',
    paragraphs: [
      'Frameworks change rapidly, but fundamental engineering thinking endures. Alongside frontend and AI exploration, I dedicate structured time to Data Structures and Algorithms — training the muscle for time and space complexity, recursion, pointers, and algorithmic trade-offs.',
      'I build by deconstructing: reading documentation, building standalone sandbox experiments, debugging source code, and synthesizing findings into long-term mental models.',
    ],
  },
];

const STACK_MATRIX = [
  {
    role: 'Frontend & UI',
    items: 'React 19, JavaScript (ES6+), Tailwind CSS, GSAP, HTML5 / Semantic Web, Responsive Systems',
  },
  {
    role: 'Full Stack & APIs',
    items: 'Node.js, Express.js, MongoDB, RESTful Architecture, Stateless JWT Auth, Client-Server Data Contracts',
  },
  {
    role: 'AI & Machine Learning',
    items: 'Gemini API, Structured Outputs, Function Calling / Tool Dispatch, Namaste AI Foundations',
  },
  {
    role: 'Tooling & Methodology',
    items: 'Vite, Git / GitHub, Chrome DevTools Profiling, DSA Problem Solving, Native Performance',
  },
];

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Reset scroll to top on entry
    window.scrollTo(0, 0);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-page-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="about-page">
      <div className="about-page-wrap">
        {/* Editorial Eyebrow */}
        <div className="about-page-eyebrow about-page-animate">
          <span className="about-page-eyebrow__dot" />
          <span>[ DOSSIER / PERSPECTIVE ]</span>
        </div>

        {/* Page Title */}
        <h1 className="about-page-title about-page-animate">
          ABOUT <em>Vighnesh.</em>
        </h1>

        {/* Intro Lead */}
        <p className="about-page-intro about-page-animate">
          A frontend-focused software developer based in Pune, India. Building modern web interfaces
          with architectural intent, performance rigor, and deep curiosity for full-stack and
          first-principles AI systems.
        </p>

        {/* Manifesto Callout — PRD Section 18 */}
        <section
          className="about-page-manifesto about-page-animate"
          aria-label="Developer Manifesto"
        >
          <div className="about-page-manifesto-kicker">[ 00 / CORE CONVICTION ]</div>
          <h2 className="about-page-manifesto-quote">
            “I DON'T KNOW EVERYTHING. I'M CURIOUS ENOUGH TO FIGURE THINGS OUT.”
          </h2>
          <p className="about-page-manifesto-sub">
            Engineering competence is not pretending to possess omniscience; it is having the discipline,
            humility, and investigative drive to deconstruct any complex problem down to its atomic
            mechanisms and build an intentional solution.
          </p>
        </section>

        {/* Editorial Chapters */}
        <section className="about-chapters-grid" aria-label="Narrative Chapters">
          {CHAPTERS.map((ch) => (
            <article key={ch.num} className="about-chapter">
              <div className="about-chapter-meta">
                <span className="about-chapter-num">[ {ch.num} ]</span>
                <span className="about-chapter-tag">{ch.tag}</span>
              </div>
              <div className="about-chapter-content">
                <h3>{ch.title}</h3>
                {ch.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* Technical Stack & Focus Matrix */}
        <section className="about-stack-section" aria-label="Technical Foundations">
          <div className="about-stack-header">
            <span className="about-stack-title">[ TECHNICAL FOUNDATIONS &amp; PRACTICE ]</span>
            <span className="font-mono text-xs text-[var(--faint)]">PUNE, IN · 2026</span>
          </div>

          <div className="about-stack-grid">
            {STACK_MATRIX.map((col, idx) => (
              <div key={idx} className="about-stack-card">
                <div className="about-stack-card-role">{col.role}</div>
                <p className="about-stack-card-items">{col.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps / Route Navigation */}
        <footer className="about-nav-footer">
          <span className="about-nav-label">EXPLORE FURTHER</span>
          <div className="about-nav-links">
            <TransitionLink
              to="/work"
              className="about-nav-btn"
              data-cursor="explore"
            >
              <span>SELECTED WORK →</span>
            </TransitionLink>
            <TransitionLink
              to="/ai-learning"
              className="about-nav-btn"
              data-cursor="explore"
            >
              <span>NAMASTE AI ARCHIVE →</span>
            </TransitionLink>
            <TransitionLink
              to="/contact"
              className="about-nav-btn"
              data-cursor="explore"
            >
              <span>GET IN TOUCH →</span>
            </TransitionLink>
          </div>
        </footer>
      </div>
    </main>
  );
}
