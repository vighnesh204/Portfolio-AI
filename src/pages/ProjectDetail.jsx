import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import '../sections/projects/projects.css';
import { getProjectBySlug, getAllProjects } from '../data/projects';
import TransitionLink from '../components/ui/TransitionLink';
import { usePageTitle } from '../hooks/usePageTitle';

// ─── ProjectDetail (/work/:slug) ──────────────────────────────────────────
// Conditional case-study layout.
// Sections only render when the project data contains real content.
// Invalid slugs render an editorial 404 block.
// ──────────────────────────────────────────────────────────────────────────

const allProjects = getAllProjects();

function getNextProject(currentSlug) {
  const idx = allProjects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return null;
  return allProjects[(idx + 1) % allProjects.length];
}

function ProjectDetail() {
  const { slug } = useParams();
  const project   = getProjectBySlug(slug);
  const next      = project ? getNextProject(slug) : null;

  usePageTitle(project ? project.title : 'Project Not Found');

  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !project) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const children = [...el.querySelectorAll('.pd-hero__eyebrow, .pd-hero__title, .pd-hero__subtitle')];
    gsap.set(children, { opacity: 0, y: 24 });
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.2,
    });
  }, [project]);

  // ── 404 — Project Not Found ──
  if (!project) {
    return (
      <main className="project-detail">
        <div className="project-not-found">
          <span className="project-not-found__code">404 — Project Not Found</span>
          <h1 className="project-not-found__title">Project<br />Not Found</h1>
          <p className="project-not-found__sub">
            This project doesn't exist or may have moved.
          </p>
          <TransitionLink
            to="/work"
            className="pd-link"
            style={{ marginTop: '8px' }}
          >
            ← Back to Work
          </TransitionLink>
        </div>
      </main>
    );
  }

  // ── Full Detail ──
  return (
    <main className="project-detail">
      {/* Back link */}
      <div className="pd-back">
        <TransitionLink to="/work" className="pd-back-inner">
          ← All Work
        </TransitionLink>
      </div>

      {/* Hero */}
      <div ref={heroRef} className="pd-hero">
        <div className="pd-hero__eyebrow">
          <span className="pd-hero__number">{project.number}</span>
          <span className="pd-hero__category">{project.category}</span>
          <span className="pd-hero__year">{project.year}</span>
        </div>
        <h1 className="pd-hero__title">{project.title}</h1>
        {project.subtitle && (
          <p className="pd-hero__subtitle">{project.subtitle}</p>
        )}
      </div>

      {/* Media frame — [Placeholder: replace with real screenshot when available] */}
      <div className="pd-body">
        <div className="pd-media">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} — screenshot`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="pd-media-placeholder" aria-hidden="true">
              <span className="pd-media-placeholder__label">[Visual Placeholder]</span>
              <span className="pd-media-placeholder__title">{project.number}</span>
            </div>
          )}
        </div>

        {/* Overview */}
        {project.description && (
          <section className="pd-section" aria-labelledby="pd-overview-heading">
            <p className="pd-section__label">Overview</p>
            <h2 className="pd-section__heading" id="pd-overview-heading">
              About the Project
            </h2>
            <p className="pd-section__text">{project.description}</p>
          </section>
        )}

        {/* Problem */}
        {project.problem && (
          <section className="pd-section" aria-labelledby="pd-problem-heading">
            <p className="pd-section__label">The Problem</p>
            <h2 className="pd-section__heading" id="pd-problem-heading">
              What Was Missing
            </h2>
            <p className="pd-section__text">{project.problem}</p>
          </section>
        )}

        {/* Approach */}
        {project.approach && (
          <section className="pd-section" aria-labelledby="pd-approach-heading">
            <p className="pd-section__label">Approach</p>
            <h2 className="pd-section__heading" id="pd-approach-heading">
              How It Was Built
            </h2>
            <p className="pd-section__text">{project.approach}</p>
          </section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section className="pd-section" aria-labelledby="pd-features-heading">
            <p className="pd-section__label">Key Features</p>
            <h2 className="pd-section__heading" id="pd-features-heading">
              What It Does
            </h2>
            <ul className="pd-features">
              {project.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Architecture */}
        {project.architecture && (
          <section className="pd-section" aria-labelledby="pd-arch-heading">
            <p className="pd-section__label">Architecture</p>
            <h2 className="pd-section__heading" id="pd-arch-heading">
              Technical Structure
            </h2>
            <p className="pd-section__text">{project.architecture}</p>
          </section>
        )}

        {/* Challenges */}
        {project.challenges && (
          <section className="pd-section" aria-labelledby="pd-challenges-heading">
            <p className="pd-section__label">Challenges</p>
            <h2 className="pd-section__heading" id="pd-challenges-heading">
              Hardest Problems
            </h2>
            <p className="pd-section__text">{project.challenges}</p>
          </section>
        )}

        {/* Learning */}
        {project.learning && (
          <section className="pd-section" aria-labelledby="pd-learning-heading">
            <p className="pd-section__label">Learnings</p>
            <h2 className="pd-section__heading" id="pd-learning-heading">
              What I Learned
            </h2>
            <p className="pd-section__text">{project.learning}</p>
          </section>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="pd-section" aria-labelledby="pd-tech-heading">
            <p className="pd-section__label">Technology Stack</p>
            <h2 className="pd-section__heading" id="pd-tech-heading">
              Built With
            </h2>
            <div className="pd-tech-grid">
              {project.technologies.map((tech) => (
                <span key={tech} className="project-tag">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer: links + next project */}
      <footer className="pd-footer">
        <div className="pd-footer__links">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              className="pd-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
            >
              GitHub ↗
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              className="pd-link pd-link--secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live`}
            >
              Live Site ↗
            </a>
          )}
        </div>

        {next && (
          <div className="pd-footer__next">
            <p className="pd-footer__next-label">Next Project</p>
            <TransitionLink
              to={`/work/${next.slug}`}
              className="pd-footer__next-link"
              aria-label={`Next project: ${next.title}`}
            >
              <p className="pd-footer__next-title">{next.title} →</p>
            </TransitionLink>
          </div>
        )}
      </footer>
    </main>
  );
}

export default ProjectDetail;

