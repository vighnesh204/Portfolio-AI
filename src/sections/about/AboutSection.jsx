import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '../../components/ui/TransitionLink';
import './about.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Statement Data ─────────────────────────────────────────────────────────
// Fact-checked, honest developer manifesto reflecting PRD Sections 18 & 19.
// Centered vertical layout — typography carries the section with no profile photo.
// ─────────────────────────────────────────────────────────────────────────────

const STATEMENT_ONE = [
  { text: "I'M" },
  { text: 'VIGHNESH' },
  { text: 'BORHADE.' },
  { text: 'A' },
  { text: 'FRONTEND-FOCUSED' },
  { text: 'DEVELOPER' },
  { text: 'DRIVEN' },
  { text: 'BY' },
  { text: 'CURIOSITY,' },
  { text: 'CONTINUOUS' },
  { text: 'LEARNING,' },
  { text: 'AND' },
  { text: 'BUILDING.' },
];

const STATEMENT_TWO = [
  { text: 'I' },
  { text: "DON'T" },
  { text: 'KNOW' },
  { text: 'EVERYTHING.' },
  { text: 'I' },
  { text: 'LIKE' },
  { text: 'UNDERSTANDING' },
  { text: 'HOW' },
  { text: 'SYSTEMS' },
  { text: 'WORK' },
  { text: 'UNDER' },
  { text: 'THE' },
  { text: 'HOOD,' },
  { text: 'THEN' },
  { text: 'TURNING' },
  { text: 'THAT' },
  { text: 'UNDERSTANDING' },
  { text: 'INTO' },
  { text: 'CLEAN,' },
  { text: 'INTENTIONAL' },
  { text: 'PRODUCTS.' },
];

const PILLARS = [
  { num: '01', label: 'FRONTEND & REACT' },
  { num: '02', label: 'MERN FULL STACK' },
  { num: '03', label: 'NAMASTE AI ARCHITECTURES' },
  { num: '04', label: 'DSA & PROBLEM SOLVING' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const titleRef = useRef(null);
  const statementsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const title = titleRef.current;
    const statements = statementsRef.current;
    if (!section || !statements) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = statements.querySelectorAll('.about-word');

    if (prefersReduced) {
      gsap.set(words, { opacity: 1 });
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

      // 2. Serif title subtle entrance
      if (title) {
        gsap.fromTo(
          title,
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

      // 3. Scroll-scrub progressive word reveal (Reference parity with portfoliosanket.vercel.app #aboutText)
      // Words start at opacity: 0.16 and progressively fill to 1.0 as the user scrolls
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: statements,
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const fullSentenceOne = STATEMENT_ONE.map((w) => w.text).join(' ');
  const fullSentenceTwo = STATEMENT_TWO.map((w) => w.text).join(' ');

  return (
    <section
      ref={sectionRef}
      className="about-section"
      id="about"
      aria-label="About Vighnesh"
    >
      {/* Hairline top divider */}
      <div ref={lineRef} className="about-top-line" aria-hidden="true" />

      {/* Metadata Row */}
      <div className="about-meta-row">
        <span className="about-meta-kicker">
          <b>SC. 06</b> — ABOUT
        </span>
        <span className="about-meta-location">PUNE, IN</span>
      </div>

      {/* Section Title — Italic Serif */}
      <div className="about-title-block">
        <h2 ref={titleRef} className="about-title">
          About
        </h2>
      </div>

      {/* Centered Vertical Display Copy */}
      <div ref={statementsRef} className="about-statements-wrap">
        <p className="about-statement" aria-label={fullSentenceOne}>
          {STATEMENT_ONE.map((item, idx) => (
            <span key={idx} className="about-word" aria-hidden="true">
              {item.text}&nbsp;
            </span>
          ))}
        </p>

        <p className="about-statement about-statement--manifesto" aria-label={fullSentenceTwo}>
          {STATEMENT_TWO.map((item, idx) => (
            <span key={idx} className="about-word" aria-hidden="true">
              {item.text}&nbsp;
            </span>
          ))}
        </p>

        {/* Secondary Supporting Narrative */}
        <div className="about-secondary">
          <p className="about-secondary-text">
            Based in Pune, India. Deepening expertise across the React and MERN ecosystem,
            deconstructing modern AI architectures through Namaste AI, and practicing data structures
            &amp; algorithms from first principles.
          </p>

          {/* Core Pillars */}
          <div className="about-pillars" role="list" aria-label="Core Engineering Pillars">
            {PILLARS.map((p) => (
              <span key={p.num} className="about-pillar-tag" role="listitem">
                <b>[{p.num}]</b>
                <span>{p.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action to Dedicated /about Page */}
        <div className="about-cta-block">
          <TransitionLink
            to="/about"
            className="about-cta-link"
            data-cursor="explore"
            aria-label="Read more about Vighnesh"
          >
            <span>MORE ABOUT ME</span>
            <span className="about-cta-arrow" aria-hidden="true">
              →
            </span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
