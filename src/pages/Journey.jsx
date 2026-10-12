import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getAllPhases } from '../data/journey';
import TransitionLink from '../components/ui/TransitionLink';
import { usePageTitle } from '../hooks/usePageTitle';
import '../sections/journey/journey.css';

// ─── Journey Page (/journey) ────────────────────────────────────────────────
// Dedicated editorial dossier expanding on developer progression.
// Factual, intellectual growth narrative matching PRD Section 41.
// ─────────────────────────────────────────────────────────────────────────────

const phases = getAllPhases();

const CURRENT_FOCUS = [
  {
    num: '01',
    title: 'Frontend Depth & React 19',
    desc: 'Deepening client-side architecture: declarative state patterns, DOM repaint minimization, and handcrafted interaction design with GSAP.',
  },
  {
    num: '02',
    title: 'Full-Stack Systems',
    desc: 'Strengthening MERN workflows: clean REST data contracts, schema design in MongoDB, server-side validation, and stateless JWT authentication.',
  },
  {
    num: '03',
    title: 'First-Principles AI',
    desc: 'Continuing the Namaste AI curriculum: transformer attention mechanisms, token latency tradeoffs, structured schema parsing, and agentic tool dispatch.',
  },
  {
    num: '04',
    title: 'Algorithmic Rigor',
    desc: 'Consistent practice of Data Structures and Algorithms to train intuition for time/space complexity and systematic problem decomposition.',
  },
];

export default function Journey() {
  usePageTitle('Journey');
  const containerRef = useRef(null);

  useEffect(() => {
    // Reset scroll to top on entry
    window.scrollTo(0, 0);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-page-animate',
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
    <main ref={containerRef} className="journey-page">
      <div className="journey-page-wrap">
        {/* Editorial Eyebrow */}
        <div className="journey-page-eyebrow journey-page-animate">
          <span className="journey-page-eyebrow__dot" />
          <span>[ PROGRESSION DOSSIER / EVOLUTION ]</span>
        </div>

        {/* Page Title */}
        <h1 className="journey-page-title journey-page-animate">
          DEVELOPER <em>Journey.</em>
        </h1>

        {/* Intro */}
        <p className="journey-page-intro journey-page-animate">
          An evolving progression from syntax to systems architecture. Documenting the mental shifts,
          engineering breakthroughs, and disciplined practice that shape how I approach software design.
        </p>

        {/* Detailed Phases Feed */}
        <section className="journey-feed" aria-label="Progression Phases">
          {phases.map((phase) => (
            <article key={phase.id} className="journey-feed-card">
              <div className="journey-feed-meta">
                <span className="journey-feed-num">{phase.number}</span>
                <span className="journey-feed-phase-name">[ PHASE ]</span>
                <span className="font-mono text-xs text-[var(--faint)]">{phase.shortTitle}</span>
              </div>

              <div className="journey-feed-content">
                <h2>{phase.title}</h2>
                <p className="journey-feed-tagline">{phase.tagline}</p>
                <p className="journey-feed-desc">{phase.description}</p>

                <div className="journey-feed-topics" aria-label="Key concepts">
                  {phase.topics.map((t, i) => (
                    <span key={i} className="journey-topic-chip">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="journey-feed-breakthrough">
                  <span className="journey-feed-breakthrough-label">
                    WHAT THIS CHANGED IN MY THINKING
                  </span>
                  <p>“{phase.breakthrough}”</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Current Focus Block */}
        <section className="journey-focus-section" aria-label="Current Engineering Direction">
          <div className="journey-focus-kicker">[ CURRENT VECTOR / 2026 ]</div>
          <h2 className="journey-focus-title">Where My Attention Lies Today</h2>
          <p className="journey-focus-desc">
            Continuous development is not about chasing every fleeting framework; it is about
            deepening core competencies across user interfaces, distributed server backends, modern
            AI architectures, and fundamental problem solving.
          </p>

          <div className="journey-focus-grid">
            {CURRENT_FOCUS.map((focus) => (
              <div key={focus.num} className="journey-focus-card">
                <div className="journey-focus-card-num">[ {focus.num} ]</div>
                <h3 className="journey-focus-card-title">{focus.title}</h3>
                <p className="journey-focus-card-desc">{focus.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Page Navigation Footer */}
        <footer className="journey-nav-footer">
          <span className="journey-nav-label">EXPLORE FURTHER</span>
          <div className="journey-nav-links">
            <TransitionLink
              to="/about"
              className="journey-nav-btn"
              data-cursor="explore"
            >
              <span>ABOUT VIGHNESH →</span>
            </TransitionLink>
            <TransitionLink
              to="/work"
              className="journey-nav-btn"
              data-cursor="explore"
            >
              <span>SELECTED WORK →</span>
            </TransitionLink>
            <TransitionLink
              to="/ai-learning"
              className="journey-nav-btn"
              data-cursor="explore"
            >
              <span>NAMASTE AI ARCHIVE →</span>
            </TransitionLink>
          </div>
        </footer>
      </div>
    </main>
  );
}
