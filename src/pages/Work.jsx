import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../sections/projects/projects.css';
import { getAllProjects } from '../data/projects';
import ProjectPreview from '../sections/projects/ProjectPreview';
import FloatingPoster from '../sections/projects/FloatingPoster';

gsap.registerPlugin(ScrollTrigger);

// ─── Work Page (/work) ────────────────────────────────────────────────────
// Full editorial catalog of all projects, sharing the interactive drawer
// and scroll-scale typography system established on the homepage.
// ──────────────────────────────────────────────────────────────────────────

const allProjects = getAllProjects();

export default function Work() {
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const heroRef  = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const el    = heroRef.current;
    const title = titleRef.current;
    if (!el || !title) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Split characters entrance for hero title
      const chars = title.querySelectorAll('.ch');
      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          { yPercent: 110, rotate: 6, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.025,
            delay: 0.1,
          }
        );
      }

      // Scroll scale scrub
      gsap.fromTo(
        title,
        { scale: 1.06, transformOrigin: 'left bottom' },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setHoveredProject(null);
  };

  const handleHover = (project) => {
    if (project && project.id === expandedId) {
      setHoveredProject(null);
    } else {
      setHoveredProject(project);
    }
  };

  const catalogTitle = 'WORK ARCHIVE';

  return (
    <main className="work-page">
      {/* Floating poster for cursor hover on unopened rows */}
      <FloatingPoster hoveredProject={hoveredProject} />

      {/* Page Hero */}
      <section ref={heroRef} className="work-hero">
        <div className="work-hero__meta">
          <span>CATALOG — 2024 / 2026</span>
          <span>{String(allProjects.length).padStart(2, '0')} PRODUCTIONS</span>
        </div>

        <div className="work-hero__title-box">
          <h1
            ref={titleRef}
            className="work-hero__display-title"
            aria-label={catalogTitle}
          >
            <span className="work-hero__title-line" aria-hidden="true">
              {[...catalogTitle].map((char, i) => (
                <span
                  key={i}
                  className="ch"
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <p className="work-hero__hint">
            Comprehensive index of <em>production builds</em>, full-stack systems &amp; client-side engineering.
          </p>
        </div>
      </section>

      {/* Full Projects Catalog Accordion List */}
      <section className="work-list-section" aria-label="Projects catalog list">
        <div className="work-list" role="list">
          {allProjects.map((project, index) => (
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
      </section>
    </main>
  );
}
