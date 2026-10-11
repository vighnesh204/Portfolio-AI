import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '../../components/ui/TransitionLink';

gsap.registerPlugin(ScrollTrigger);

// ─── ProjectPreview ────────────────────────────────────────────────────────
// Single editorial project presentation used in SelectedWork and /work.
//
// Props:
//   project   — project object from projects.js
//   index     — 0-based index (used for alt layout and animation stagger)
//   showDesc  — whether to show the short description (default: true)
// ──────────────────────────────────────────────────────────────────────────

export default function ProjectPreview({ project, index = 0, showDesc = true }) {
  const featureRef = useRef(null);
  const contentRef = useRef(null);
  const mediaRef   = useRef(null);

  const isAlt = index % 2 !== 0;

  useEffect(() => {
    const el = featureRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const contentEls = contentRef.current?.children;
    const mediaEl    = mediaRef.current;

    if (!contentEls || !mediaEl) return;

    // Set initial states
    gsap.set([...contentEls], { opacity: 0, y: 28 });
    gsap.set(mediaEl, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true,
      },
    });

    tl.to([...contentEls], {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.08,
    }).to(
      mediaEl,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.trigger === el) st.kill();
      });
    };
  }, []);

  return (
    <article
      ref={featureRef}
      className={`project-feature${isAlt ? ' project-feature--alt' : ''}`}
    >
      <div className="project-feature__inner">
        {/* ── Content ── */}
        <div ref={contentRef} className="project-feature__content">
          {/* Meta row */}
          <div className="project-feature__meta">
            <span className="project-feature__number">{project.number}</span>
            <span className="project-feature__category">{project.category}</span>
            <span className="project-feature__year">{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="project-feature__title">{project.title}</h3>

          {/* Description */}
          {showDesc && project.shortDescription && (
            <p className="project-feature__desc">{project.shortDescription}</p>
          )}

          {/* Tech tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-feature__tags">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="project-tag">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <TransitionLink
            to={`/work/${project.slug}`}
            className="project-feature__cta"
            aria-label={`View ${project.title} project`}
          >
            View Project
            <span className="project-feature__cta-arrow" aria-hidden="true">
              →
            </span>
          </TransitionLink>
        </div>

        {/* ── Media ── */}
        <TransitionLink
          to={`/work/${project.slug}`}
          ref={mediaRef}
          className="project-feature__media"
          data-cursor="view"
          aria-label={`View ${project.title} project`}
          tabIndex="-1"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} — project screenshot`}
              className="project-feature__img"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="project-feature__placeholder" aria-hidden="true">
              <span className="project-feature__placeholder-label">
                [Visual Placeholder]
              </span>
              <span className="project-feature__placeholder-title">
                {project.number}
              </span>
            </div>
          )}
          <div className="project-feature__media-overlay" aria-hidden="true" />
        </TransitionLink>
      </div>
    </article>
  );
}

