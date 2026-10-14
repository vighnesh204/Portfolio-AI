import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSeasonBySlug, getAllSeasons } from '../data/aiLearning';
import TransitionLink from '../components/ui/TransitionLink';
import { usePageTitle } from '../hooks/usePageTitle';
import '../sections/aiLearning/aiLearning.css';
import './AiSeason.css';

// ─── AiSeason Page (/ai-learning/:season) ────────────────────────────────────
// Premium editorial learning journal — Season overview.
// Renders: hero → what I'm learning → note list → projects → next season.
// All content data-driven from season1.js / season2.js.
// ─────────────────────────────────────────────────────────────────────────────

export default function AiSeason() {
  const { season: seasonSlug } = useParams();
  const season = getSeasonBySlug(seasonSlug);
  const allSeasons = getAllSeasons();

  usePageTitle(season ? `Season ${season.seasonNumber} — AI Learning` : 'AI Learning');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seasonSlug]);

  // ── 404 fallback ──
  if (!season) {
    return (
      <main className="ais-page ais-page--404">
        <div className="wrap ais-404-inner">
          <p className="ais-mono-label">[ 404 — Curriculum Undefined ]</p>
          <h1 className="ais-404-title">Season Not Found</h1>
          <p className="ais-404-sub">
            The requested Namaste AI season does not exist or has not been documented yet.
          </p>
          <TransitionLink to="/ai-learning" className="ais-back-link">
            ← Return to AI Learning
          </TransitionLink>
        </div>
      </main>
    );
  }

  // ── Coming soon seasons (03–05) ──
  if (season.status === 'coming-soon') {
    return (
      <main className="ais-page ais-page--coming-soon">
        <div className="wrap ais-cs-inner">
          <nav className="ais-breadcrumb" aria-label="Breadcrumb">
            <TransitionLink to="/ai-learning" className="ais-breadcrumb__link">AI Learning</TransitionLink>
            <span className="ais-breadcrumb__sep">/</span>
            <span className="ais-breadcrumb__current">Season {season.seasonNumber}</span>
          </nav>

          <p className="ais-mono-label ais-accent-label">Namaste AI · Season {season.seasonNumber}</p>
          <h1 className="ais-cs-title">Coming Soon</h1>
          <p className="ais-cs-sub">
            This chapter hasn&apos;t been documented yet. Notes will be added as study begins.
          </p>
          <TransitionLink to="/ai-learning" className="ais-back-link" data-cursor="explore">
            ← Back to AI Learning
          </TransitionLink>
        </div>
      </main>
    );
  }

  const currentIndex = allSeasons.findIndex((s) => s.slug === season.slug);
  const nextSeason =
    currentIndex >= 0 && currentIndex < allSeasons.length - 1
      ? allSeasons[currentIndex + 1]
      : null;

  const isCompleted = season.status?.toLowerCase().includes('completed');
  const statusColor = isCompleted
    ? 'var(--accent-teal)'
    : season.status === 'In Progress'
    ? '#f0c264'
    : 'var(--mut)';

  return (
    <main className="ais-page" style={{ '--season-accent': season.accentColor }}>
      <div className="wrap">

        {/* ── Breadcrumb ── */}
        <nav className="ais-breadcrumb" aria-label="Breadcrumb">
          <TransitionLink to="/ai-learning" className="ais-breadcrumb__link">
            AI Learning
          </TransitionLink>
          <span className="ais-breadcrumb__sep">/</span>
          <span className="ais-breadcrumb__current">Season {season.seasonNumber}</span>
        </nav>

        {/* ── Season Hero ── */}
        <header className="ais-hero" style={{ '--season-accent': season.accentColor }}>
          <div className="ais-hero__eyebrow">
            <span className="ais-hero__source">Namaste AI</span>
            <span className="ais-hero__sep">·</span>
            <span className="ais-hero__season-id">Season {season.seasonNumber}</span>
          </div>

          <h1 className="ais-hero__title">{season.title}</h1>

          <p className="ais-hero__subtitle">{season.subtitle}</p>

          <p className="ais-hero__description">{season.description}</p>

          <div className="ais-hero__meta">
            <div className="ais-hero__meta-item">
              <span className="ais-hero__meta-label">Status</span>
              <span className="ais-hero__meta-value" style={{ color: statusColor }}>
                <span
                  className="ais-hero__meta-dot"
                  style={{ background: statusColor }}
                  aria-hidden="true"
                />
                {season.status}
              </span>
            </div>
            <div className="ais-hero__meta-divider" aria-hidden="true" />
            <div className="ais-hero__meta-item">
              <span className="ais-hero__meta-label">Source</span>
              <span className="ais-hero__meta-value">{season.attribution}</span>
            </div>
            {season.notes && season.notes.length > 0 && (
              <>
                <div className="ais-hero__meta-divider" aria-hidden="true" />
                <div className="ais-hero__meta-item">
                  <span className="ais-hero__meta-label">Notes</span>
                  <span className="ais-hero__meta-value">{season.notes.length} published</span>
                </div>
              </>
            )}
          </div>
        </header>

        {/* ── What I'm Learning ── */}
        {season.keyConcepts && season.keyConcepts.length > 0 && (
          <section className="ais-section ais-concepts" aria-label="Key Concepts">
            <div className="ais-section__header">
              <span className="ais-section__index" style={{ color: season.accentColor }}>01</span>
              <div className="ais-section__heading-block">
                <h2 className="ais-section__heading">What I&apos;m Learning</h2>
                <p className="ais-section__sub">
                  The ideas I&apos;m working to understand beneath the abstraction.
                </p>
              </div>
            </div>
            <div className="ais-concepts__labels">
              {season.keyConcepts.map((concept, idx) => (
                <span key={idx} className="ais-concept-label">
                  {concept}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ── Learning Notes ── */}
        {season.notes && season.notes.length > 0 && (
          <section className="ais-section ais-notes-section" aria-label="Learning Notes">
            <div className="ais-section__header">
              <span className="ais-section__index" style={{ color: season.accentColor }}>02</span>
              <div className="ais-section__heading-block">
                <h2 className="ais-section__heading">Learning Notes</h2>
                <p className="ais-section__sub">
                  Concepts written in my own words so I actually understand what&apos;s happening.
                </p>
              </div>
            </div>

            <div className="ais-note-list" role="list">
              {season.notes.map((note) => (
                <TransitionLink
                  key={note.id}
                  to={`/ai-learning/${season.slug}/${note.slug}`}
                  className="ais-note-row"
                  role="listitem"
                  data-cursor="read"
                  aria-label={`Read: ${note.title}`}
                >
                  <span className="ais-note-row__num">{note.number}</span>

                  <div className="ais-note-row__body">
                    <span className="ais-note-row__topic">{note.topic}</span>
                    <span className="ais-note-row__title">{note.title}</span>
                    <span className="ais-note-row__desc">{note.shortDescription}</span>
                  </div>

                  <span className="ais-note-row__action" aria-hidden="true">
                    <span className="ais-note-row__action-text">Read Note</span>
                    <span className="ais-note-row__action-arrow">↗</span>
                  </span>
                </TransitionLink>
              ))}

              {/* Coming Soon block after real notes (Season 02) */}
              {season.comingSoon && (
                <div className="ais-notes-coming-soon" aria-label="More notes coming soon">
                  <div className="ais-notes-coming-soon__inner">
                    <span className="ais-notes-coming-soon__label">More Learnings</span>
                    <span className="ais-notes-coming-soon__headline">Coming Soon</span>
                    {season.comingSoonNote && (
                      <p className="ais-notes-coming-soon__note">{season.comingSoonNote}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Learning Projects ── */}
        {season.projects && season.projects.length > 0 && (
          <section className="ais-section ais-projects-section" aria-label="Learning Projects">
            <div className="ais-section__header">
              <span className="ais-section__index" style={{ color: season.accentColor }}>03</span>
              <div className="ais-section__heading-block">
                <h2 className="ais-section__heading">Experiments & Projects</h2>
                <p className="ais-section__sub">
                  Code built while learning — applying concepts to real problems.
                </p>
              </div>
            </div>

            <div className="ais-projects-grid">
              {season.projects.map((proj) => (
                <div key={proj.id} className="ais-project-card">
                  <span className="ais-project-card__concept">{proj.concept}</span>
                  <h3 className="ais-project-card__title">{proj.title}</h3>
                  <p className="ais-project-card__desc">{proj.description}</p>

                  <div className="ais-project-card__learning">
                    <span className="ais-project-card__learning-label">Key lesson</span>
                    <p className="ais-project-card__learning-text">{proj.learning}</p>
                  </div>

                  <div className="ais-project-card__footer">
                    <div className="ais-project-card__tags">
                      {proj.technologies?.map((tech, idx) => (
                        <span key={idx} className="ais-project-card__tag">{tech}</span>
                      ))}
                    </div>
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ais-project-card__link"
                        data-cursor="open"
                      >
                        Repository ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Next Season Footer ── */}
        {nextSeason && (
          <footer className="ais-season-footer">
            <span className="ais-season-footer__label">Next in curriculum</span>
            <TransitionLink
              to={`/ai-learning/${nextSeason.slug}`}
              className="ais-season-footer__link"
              data-cursor="explore"
            >
              <span className="ais-season-footer__next-label">
                Season {nextSeason.seasonNumber}
              </span>
              <span className="ais-season-footer__next-title">
                {nextSeason.status === 'coming-soon' ? 'Coming Soon' : nextSeason.title}
              </span>
              <span className="ais-season-footer__arrow" aria-hidden="true">→</span>
            </TransitionLink>
          </footer>
        )}

      </div>
    </main>
  );
}
