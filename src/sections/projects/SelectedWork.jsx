import './projects.css';
import { getFeaturedProjects } from '../../data/projects';
import ProjectPreview from './ProjectPreview';
import TransitionLink from '../../components/ui/TransitionLink';

// ─── SelectedWork ──────────────────────────────────────────────────────────
// Homepage section immediately following the Marquee.
// Renders featured projects in an editorial large-format layout.
// ──────────────────────────────────────────────────────────────────────────

const featured = getFeaturedProjects();

export default function SelectedWork() {
  return (
    <section className="selected-work" id="selected-work" aria-label="Selected Work">
      {/* Section header */}
      <header className="sw-header">
        <div className="sw-header__left">
          <span className="sw-header__eyebrow">Portfolio — 2024 / 2026</span>
          <h2 className="sw-header__title">Selected Work</h2>
        </div>
        <span className="sw-header__count">
          {String(featured.length).padStart(2, '0')} Projects
        </span>
      </header>

      {/* Project list */}
      <div role="list" aria-label="Featured projects">
        {featured.map((project, index) => (
          <div key={project.id} role="listitem">
            <ProjectPreview project={project} index={index} />
          </div>
        ))}
      </div>

      {/* Footer CTA → /work */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '48px',
          borderTop: '1px solid var(--line)',
          marginTop: '8px',
        }}
      >
        <TransitionLink
          to="/work"
          className="project-feature__cta"
          aria-label="View all projects"
        >
          View All Work
          <span className="project-feature__cta-arrow" aria-hidden="true">
            →
          </span>
        </TransitionLink>
      </div>
    </section>
  );
}

