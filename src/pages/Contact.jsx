import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TransitionLink from '../components/ui/TransitionLink';
import { CONTACT_INFO } from '../data/contact';
import { usePageTitle } from '../hooks/usePageTitle';
import '../sections/contact/contact.css';

// ─── Contact Page (/contact) ────────────────────────────────────────────────
// Dedicated editorial contact dossier.
// Simple, direct, minimal, and premium.
// Focuses on verified channels, technical parameters, and clear availability.
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  usePageTitle('Contact');
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="contact-page">
      <div className="contact-page-wrap">
        {/* Eyebrow */}
        <div className="contact-page-eyebrow contact-animate">
          <span className="contact-page-eyebrow__dot" />
          <span>[ INITIATE DIALOGUE ]</span>
        </div>

        {/* Title */}
        <h1 className="contact-page-title contact-animate">
          GET IN <em>Touch.</em>
        </h1>

        {/* Invitation */}
        <p className="contact-page-intro contact-animate">
          Whether you're looking to discuss a frontend role, a full-stack MERN application,
          generative AI integrations, or exploring an ambitious collaborative build — direct
          communication is always the preferred starting point.
        </p>

        {/* Primary Channel Cards */}
        <section className="contact-page-cards contact-animate" aria-label="Direct Contact Channels">
          {/* Email Card (conditional) */}
          {CONTACT_INFO.email && (
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="contact-card"
              data-cursor="mail"
              aria-label={`Send email to ${CONTACT_INFO.email}`}
            >
              <div className="contact-card-top">
                <span className="contact-card-label">DIRECT EMAIL</span>
                <span className="contact-card-arrow" aria-hidden="true">↗</span>
              </div>
              <p className="contact-card-value">{CONTACT_INFO.email}</p>
              <p className="contact-card-desc">
                Fastest response for engineering inquiries, role discussions, and project proposals.
              </p>
            </a>
          )}

          {/* GitHub Card (conditional) */}
          {CONTACT_INFO.github && (
            <a
              href={CONTACT_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              data-cursor="open"
              aria-label="Inspect GitHub profile (opens in new tab)"
            >
              <div className="contact-card-top">
                <span className="contact-card-label">CODE REPOSITORIES</span>
                <span className="contact-card-arrow" aria-hidden="true">↗</span>
              </div>
              <p className="contact-card-value">github.com/vighnesh204</p>
              <p className="contact-card-desc">
                Inspect working source code, repository commits, and architecture across builds.
              </p>
            </a>
          )}

          {/* LinkedIn Card (conditional) */}
          {CONTACT_INFO.linkedin && (
            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              data-cursor="open"
              aria-label="Connect on LinkedIn (opens in new tab)"
            >
              <div className="contact-card-top">
                <span className="contact-card-label">PROFESSIONAL NETWORK</span>
                <span className="contact-card-arrow" aria-hidden="true">↗</span>
              </div>
              <p className="contact-card-value">LinkedIn Profile</p>
              <p className="contact-card-desc">
                Connect for career conversations, recommendations, and industry updates.
              </p>
            </a>
          )}
        </section>

        {/* Availability & Technical Parameters */}
        <section className="contact-animate" aria-label="Availability Parameters">
          <dl className="contact-dossier-grid">
            <div className="contact-dossier-item">
              <dt>LOCATION</dt>
              <dd>{CONTACT_INFO.location}</dd>
            </div>
            <div className="contact-dossier-item">
              <dt>STATUS</dt>
              <dd>{CONTACT_INFO.availability}</dd>
            </div>
            <div className="contact-dossier-item">
              <dt>FOCUS AREAS</dt>
              <dd>Frontend, MERN & AI APIs</dd>
            </div>
          </dl>
        </section>

        {/* Page Navigation Footer */}
        <footer className="contact-nav-footer contact-animate">
          <span className="contact-nav-label">CONTINUE EXPLORING</span>
          <div className="contact-nav-links">
            <TransitionLink
              to="/work"
              className="contact-nav-btn"
              data-cursor="explore"
            >
              <span>SELECTED WORK →</span>
            </TransitionLink>
            <TransitionLink
              to="/journey"
              className="contact-nav-btn"
              data-cursor="explore"
            >
              <span>DEV JOURNEY →</span>
            </TransitionLink>
            <TransitionLink
              to="/about"
              className="contact-nav-btn"
              data-cursor="explore"
            >
              <span>ABOUT DOSSIER →</span>
            </TransitionLink>
          </div>
        </footer>
      </div>
    </main>
  );
}
