import { useRef } from 'react';
import TransitionLink from '../../components/ui/TransitionLink';
import {
  InterviewAiDemo,
  DevFlowDemo,
  PortfolioAiDemo,
  AlgoForgeDemo,
} from './ProjectDemos';

// ─── ProjectPreview ────────────────────────────────────────────────────────
// Editorial expandable project presentation replicating the reference website's
// accordion architecture, typography shifts, hover fill, and bespoke live demos.
// ──────────────────────────────────────────────────────────────────────────

export default function ProjectPreview({
  project,
  index = 0,
  isOpen = false,
  onToggle,
  onHover,
}) {
  const rowRef = useRef(null);

  const renderDemo = () => {
    switch (project.id) {
      case 'interview-ai':
        return <InterviewAiDemo />;
      case 'dev-flow':
        return <DevFlowDemo />;
      case 'portfolio-ai':
        return <PortfolioAiDemo />;
      case 'dsa-tracker':
        return <AlgoForgeDemo />;
      default:
        return (
          <div className="demo-box demo-box--default">
            <div className="demo-header">
              <span className="demo-badge">Live Architecture Overview</span>
            </div>
            <p className="demo-default-text">{project.description}</p>
          </div>
        );
    }
  };

  return (
    <article
      ref={rowRef}
      className={`pj ${isOpen ? 'pj--open' : ''}`}
      style={{ '--pj-index': index, '--pj-accent': project.accentColor || 'var(--ember)' }}
    >
      {/* ── Accordion Header Button ── */}
      <button
        type="button"
        className="pj-head"
        aria-expanded={isOpen}
        aria-controls={`pj-panel-${project.id}`}
        onClick={onToggle}
        onPointerEnter={() => onHover && onHover(project)}
        onPointerLeave={() => onHover && onHover(null)}
        data-cursor={isOpen ? 'close' : 'view'}
      >
        <span className="pj-num">{project.number}</span>

        <span className="pj-title-wrap">
          <span className="pj-title">{project.title}</span>
          <small className="pj-category">({project.category})</small>
        </span>

        <span className="pj-tech-summary">
          {project.technologies.slice(0, 4).join(' · ')}
        </span>

        <span className="pj-toggle-icon" aria-hidden="true" />
      </button>

      {/* ── Expandable Drawer Body ── */}
      <div
        className="pj-body"
        id={`pj-panel-${project.id}`}
        role="region"
        aria-labelledby={`pj-title-${project.id}`}
      >
        <div className="pj-body-inner">
          <div className="pj-content">
            {/* Left Column: Editorial Summary & Actions */}
            <div className="pj-info">
              <p className="pj-desc">{project.shortDescription}</p>

              {project.problem && (
                <div className="pj-note">
                  <span className="pj-note-label">The Core Problem:</span>
                  <p className="pj-note-text">{project.problem}</p>
                </div>
              )}

              {/* Technology badges */}
              <div className="pj-tags" aria-label="Key Technologies">
                {project.technologies.map((tech) => (
                  <span key={tech} className="pj-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="pj-actions">
                <TransitionLink
                  to={`/work/${project.slug}`}
                  className="pj-cta-link"
                  data-cursor="view"
                  aria-label={`View full ${project.title} case study`}
                >
                  View Case Study
                  <span className="pj-arrow" aria-hidden="true">
                    ↗
                  </span>
                </TransitionLink>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pj-secondary-link"
                    data-cursor="open"
                  >
                    GitHub Repository ↗
                  </a>
                )}

                {project.live && project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pj-secondary-link"
                    data-cursor="open"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Bespoke Interactive Preview */}
            <div className="pj-demo-col">
              {renderDemo()}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
