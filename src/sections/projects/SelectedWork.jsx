import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './projects.css';
import { getFeaturedProjects } from '../../data/projects';
import ProjectPreview from './ProjectPreview';
import FloatingPoster from './FloatingPoster';
import TransitionLink from '../../components/ui/TransitionLink';

gsap.registerPlugin(ScrollTrigger);

// ─── SelectedWork ──────────────────────────────────────────────────────────
// Homepage featured projects section immediately following Marquee.
// Implements scroll-scale display typography, drawer expansion, and hover posters.
// ──────────────────────────────────────────────────────────────────────────

const featured = getFeaturedProjects();

export default function SelectedWork() {
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const lineRef    = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title   = titleRef.current;
    const line    = lineRef.current;
    if (!section || !title) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Top border hairline divider reveal
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Character entrance reveal for SELECTED WORK heading
      const chars = title.querySelectorAll('.ch');
      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          { yPercent: 105, rotate: 8, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.03,
            scrollTrigger: {
              trigger: title,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 3. Scrubbed scale and letter-tracking transformation during scroll
      gsap.fromTo(
        title,
        { scale: 1.03, transformOrigin: 'left bottom' },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);
    return () => clearTimeout(timer);
  }, [expandedId]);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
    // Clear hover poster if opened
    setHoveredProject(null);
  };

  const handleHover = (project) => {
    // Only show hover poster for unopened projects
    if (project && project.id === expandedId) {
      setHoveredProject(null);
    } else {
      setHoveredProject(project);
    }
  };

  const headingText = 'SELECTED WORK';

  return (
    <section
      ref={sectionRef}
      className="selected-work"
      id="selected-work"
      aria-label="Selected Work"
    >
      {/* Hairline top divider */}
      <div ref={lineRef} className="sw-top-divider" aria-hidden="true" />

      {/* Floating cursor poster on hover */}
      <FloatingPoster hoveredProject={hoveredProject} />

      {/* Section Header */}
      <header className="sw-header">
        <div className="sw-meta-row">
          <span className="sw-meta-kicker">
            <b>SC. 02</b> — SELECTED WORK
          </span>
          <span className="sw-meta-count">
            {String(featured.length).padStart(2, '0')} PROJECTS
          </span>
        </div>

        <div className="sw-title-block">
          <h2
            ref={titleRef}
            className="sw-display-title"
            aria-label={headingText}
          >
            <span className="sw-title-line" aria-hidden="true">
              {[...headingText].map((char, i) => (
                <span
                  key={i}
                  className="ch"
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h2>

          <p className="sw-hint">
            Click any project to inspect <em>live preview</em>, system architecture &amp; case study.
          </p>
        </div>
      </header>

      {/* Project Accordion List */}
      <div className="sw-list" role="list" aria-label="Featured projects list">
        {featured.map((project, index) => (
          <div key={project.id} role="listitem">
            <ProjectPreview
              project={project}
              index={index}
              isOpen={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
              onHover={handleHover}
            />
          </div>
        ))}
      </div>

      {/* Bottom Footer CTA → /work */}
      <div className="sw-footer">
        <span className="sw-footer-note">All projects crafted with React, Vite &amp; GSAP.</span>
        <TransitionLink
          to="/work"
          className="sw-view-all-cta"
          aria-label="View all projects"
          data-cursor="view"
        >
          View All Projects
          <span className="sw-cta-arrow" aria-hidden="true">
            →
          </span>
        </TransitionLink>
      </div>
    </section>
  );
}
