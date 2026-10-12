import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '../../components/ui/TransitionLink';
import { CONTACT_INFO } from '../../data/contact';
import './contact.css';

gsap.registerPlugin(ScrollTrigger);

// ─── ContactSection ─────────────────────────────────────────────────────────
// SC. 07 — GET IN TOUCH homepage section.
// Concludes the homepage with a bold editorial call-to-action.
//
// Performance & UX principles:
//  — Direct contact mechanisms: direct email, GitHub, LinkedIn.
//  — No bloat, no heavy form libraries, zero external dependencies.
//  — GSAP ScrollTrigger entrance with clean context teardown.
//  — Fully accessible with native mailto and secure external anchors.
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Hairline entrance divider draw
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

      // 2. Main heading reveal
      if (heading) {
        gsap.fromTo(
          heading.querySelectorAll('.contact-title-row'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Content columns fade & lift
      if (content) {
        gsap.fromTo(
          content,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="contact-section"
      id="contact"
      aria-label="Contact and collaboration"
    >
      {/* Top entrance hairline */}
      <div ref={lineRef} className="contact-top-line" aria-hidden="true" />

      {/* Metadata Row */}
      <div className="contact-meta-row">
        <span className="contact-meta-kicker">
          <b>SC. 07</b> — GET IN TOUCH
        </span>
        <span className="contact-meta-status">
          <span className="contact-meta-dot" aria-hidden="true" />
          <span>PUNE, IN · AVAILABLE FOR OPPORTUNITIES</span>
        </span>
      </div>

      {/* Bold Display Heading */}
      <div ref={headingRef} className="contact-heading-wrap">
        <h2 className="contact-display-title">
          <span className="contact-title-row">LET'S BUILD</span>
          <span className="contact-title-row">
            SOMETHING <em>INTERESTING.</em>
          </span>
        </h2>
      </div>

      {/* Actionable Content Grid */}
      <div ref={contentRef} className="contact-body-grid">
        {/* Left: Narrative Invitation + Primary Email */}
        <div className="contact-left-col">
          <p className="contact-pitch">
            Interested in collaborating or discussing a <b>Frontend</b>, <b>MERN stack</b>,
            or <b>AI engineering</b> opportunity? I'm open to ambitious projects, full-time engineering
            roles, and technical dialogue.
          </p>

          {CONTACT_INFO.email ? (
            <div className="contact-email-wrap">
              <span className="contact-email-label">DIRECT EMAIL</span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="contact-mail-link"
                data-cursor="mail"
                aria-label={`Send email to ${CONTACT_INFO.email}`}
              >
                {CONTACT_INFO.email}
              </a>
              <span className="contact-location-info">
                {CONTACT_INFO.location}
              </span>
            </div>
          ) : CONTACT_INFO.github ? (
            <div className="contact-email-wrap">
              <span className="contact-email-label">CODE REPOSITORY CHANNEL</span>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-mail-link"
                data-cursor="open"
                aria-label="Inspect GitHub Profile — vighnesh204 (opens in new tab)"
              >
                github.com/vighnesh204 ↗
              </a>
              <span className="contact-location-info">
                {CONTACT_INFO.location}
              </span>
            </div>
          ) : null}
        </div>

        {/* Right: Direct Connectors + Full Dossier */}
        <div className="contact-right-col">
          <span className="contact-links-label">CONNECT & VERIFY</span>
          <div className="contact-social-pills">
            {CONTACT_INFO.github && (
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-item"
                data-cursor="open"
                aria-label="GitHub Profile — vighnesh204 (opens in new tab)"
              >
                <span>GITHUB</span>
                <span className="contact-pill-arrow" aria-hidden="true">↗</span>
              </a>
            )}

            {CONTACT_INFO.linkedin && (
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-item"
                data-cursor="open"
                aria-label="LinkedIn Profile (opens in new tab)"
              >
                <span>LINKEDIN</span>
                <span className="contact-pill-arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <div className="contact-dossier-box">
            <span className="contact-dossier-tag">[ DIRECT CHANNELS ]</span>
            <p className="contact-dossier-text">
              Detailed availability parameters, preferred tech stacks, and direct channels.
            </p>
            <TransitionLink
              to="/contact"
              className="contact-dossier-btn"
              data-cursor="explore"
              aria-label="Navigate to dedicated Contact page"
            >
              <span>OPEN CONTACT PAGE →</span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
