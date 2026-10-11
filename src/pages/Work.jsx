import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../sections/projects/projects.css';
import { getAllProjects } from '../data/projects';
import TransitionLink from '../components/ui/TransitionLink';

gsap.registerPlugin(ScrollTrigger);

// ─── Work Page (/work) ────────────────────────────────────────────────────
// Full editorial catalog of all projects.
// ──────────────────────────────────────────────────────────────────────────

const all = getAllProjects();

function WorkItem({ project, index }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.set(el, { opacity: 0, y: 20 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          delay: index * 0.04,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [index]);

  return (
    <TransitionLink
      ref={itemRef}
      to={`/work/${project.slug}`}
      className="work-item"
      data-cursor="view"
      aria-label={`View ${project.title}`}
    >
      <span className="work-item__number">{project.number}</span>

      <div className="work-item__info">
        <div className="work-item__meta">
          {project.category}&nbsp;&nbsp;/&nbsp;&nbsp;{project.year}
        </div>
        <h2 className="work-item__title">{project.title}</h2>
        <p className="work-item__desc">{project.shortDescription}</p>
        <div className="work-item__tags">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="project-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <span className="work-item__arrow" aria-hidden="true">
        View →
      </span>
    </TransitionLink>
  );
}

function Work() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const children = [...el.children];
    gsap.set(children, { opacity: 0, y: 24 });
    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.15,
    });
  }, []);

  return (
    <main className="work-page">
      {/* Page hero */}
      <div className="work-hero">
        <div ref={heroRef}>
          <p className="work-hero__eyebrow">Work &amp; Explorations</p>
          <h1 className="work-hero__title">
            Selected<br />
            <em>Projects</em>
          </h1>
          <p className="work-hero__sub">
            {String(all.length).padStart(2, '0')} Projects — 2024 / 2026
          </p>
        </div>
      </div>

      {/* Project list */}
      <div className="work-list" role="list" aria-label="All projects">
        {all.map((project, index) => (
          <div key={project.id} role="listitem">
            <WorkItem project={project} index={index} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Work;

