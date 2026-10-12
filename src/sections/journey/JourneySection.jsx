import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllPhases } from '../../data/journey';
import TransitionLink from '../../components/ui/TransitionLink';
import './journey.css';

gsap.registerPlugin(ScrollTrigger);

// ─── JourneySection ─────────────────────────────────────────────────────────
// SC. 06 — JOURNEY homepage section.
// Communicates authentic developer progression (growth & intellectual depth),
// rather than a fake employment timeline or company dates.
//
// Scroll Architecture:
//  — Natural scrolling with a sticky left indicator panel.
//  — No forced viewport pinning, eliminating any potential pin/spacer bugs.
//  — Direct DOM class toggles and progress updates without React re-renders.
// ─────────────────────────────────────────────────────────────────────────────

const phases = getAllPhases();
const TOTAL_PHASES = phases.length;

export default function JourneySection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const headingRef = useRef(null);
  const streamRef = useRef(null);
  const activeNumRef = useRef(null);
  const activeLabelRef = useRef(null);
  const progressFillRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const heading = headingRef.current;
    const stream = streamRef.current;
    const activeNum = activeNumRef.current;
    const activeLabel = activeLabelRef.current;
    const progressFill = progressFillRef.current;

    if (!section || !stream) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = stream.querySelectorAll('.journey-phase-item');

    if (prefersReduced) {
      items.forEach((item) => item.classList.add('is-active'));
      if (progressFill) progressFill.style.width = '100%';
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Top hairline divider draw
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Heading block reveal
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Coordinated Phase Scroll Progression
      items.forEach((item, index) => {
        const phase = phases[index];
        const progressPercent = ((index + 1) / TOTAL_PHASES) * 100;

        ScrollTrigger.create({
          trigger: item,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => activatePhase(index, phase, progressPercent),
          onEnterBack: () => activatePhase(index, phase, progressPercent),
        });
      });

      function activatePhase(idx, phase, pct) {
        items.forEach((el, i) => {
          if (i === idx) {
            el.classList.add('is-active');
          } else {
            el.classList.remove('is-active');
          }
        });

        if (activeNum) {
          activeNum.textContent = phase.number;
        }
        if (activeLabel) {
          activeLabel.textContent = `${phase.title} — ${phase.shortTitle}`;
        }
        if (progressFill) {
          progressFill.style.width = `${pct}%`;
        }
      }

      // Set initial phase 01 as active
      if (items[0]) {
        items[0].classList.add('is-active');
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="journey-section"
      id="journey"
      aria-label="Developer Journey & Progression"
    >
      {/* Top Hairline Divider */}
      <div ref={lineRef} className="journey-top-line" aria-hidden="true" />

      {/* Metadata Row */}
      <div className="journey-meta-row">
        <span className="journey-meta-kicker">
          <b>SC. 06</b> — JOURNEY
        </span>
        <span className="journey-meta-count">
          {String(TOTAL_PHASES).padStart(2, '0')} PHASES
        </span>
      </div>

      {/* Heading Block */}
      <div ref={headingRef} className="journey-heading-block">
        <h2 className="journey-display-title">JOURNEY</h2>
        <p className="journey-subtitle">
          An evolving progression from <em>syntax to systems architecture</em>.
        </p>
      </div>

      {/* Body: Sticky Progression Panel + Phase Stream */}
      <div className="journey-body">
        {/* Sticky Left Progression Panel */}
        <aside className="journey-sticky-panel" aria-label="Progression Status">
          <div className="journey-active-counter">
            <div className="journey-active-num-wrap">
              <span ref={activeNumRef} className="journey-active-num">
                01
              </span>
              <span className="journey-total-num">
                / {String(TOTAL_PHASES).padStart(2, '0')}
              </span>
            </div>
            <span ref={activeLabelRef} className="journey-active-label">
              Foundations — HTML5 · CSS3
            </span>
          </div>

          <div className="journey-progress-container" aria-hidden="true">
            <div className="journey-progress-track">
              <div ref={progressFillRef} className="journey-progress-fill" />
            </div>
          </div>

          <TransitionLink
            to="/journey"
            className="journey-side-cta"
            data-cursor="explore"
            aria-label="Explore full journey progression"
          >
            <span>EXPLORE FULL JOURNEY</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </TransitionLink>
        </aside>

        {/* Right Phase Stream */}
        <div ref={streamRef} className="journey-phase-stream" role="feed" aria-label="Journey Phases">
          {phases.map((phase) => (
            <article
              key={phase.id}
              className="journey-phase-item"
              aria-label={`Phase ${phase.number}: ${phase.title}`}
            >
              <div className="journey-phase-kicker">
                <span>[ <b>{phase.number}</b> / PHASE ]</span>
                <span>{phase.shortTitle}</span>
              </div>

              <div className="journey-phase-title-row">
                <h3 className="journey-phase-title">{phase.title}</h3>
                <span className="journey-phase-tagline">{phase.tagline}</span>
              </div>

              <p className="journey-phase-desc">{phase.description}</p>

              <div className="journey-phase-topics" aria-label="Topics mastered">
                {phase.topics.map((topic, i) => (
                  <span key={i} className="journey-topic-chip">
                    {topic}
                  </span>
                ))}
              </div>

              <div className="journey-breakthrough-box">
                <span className="journey-breakthrough-label">CORE REALIZATION</span>
                <p className="journey-breakthrough-text">“{phase.breakthrough}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
