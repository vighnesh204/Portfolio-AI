import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSeasonBySlug, getAllSeasons } from '../data/aiLearning';
import TransitionLink from '../components/ui/TransitionLink';
import { usePageTitle } from '../hooks/usePageTitle';
import '../sections/aiLearning/aiLearning.css';

// ─── AiSeason Page ──────────────────────────────────────────────────────────
// Dedicated Season page at /ai-learning/:season.
// Editorial curriculum view displaying overview, concepts, notes list, and
// associated learning projects.
// ─────────────────────────────────────────────────────────────────────────────

export default function AiSeason() {
  const { season: seasonSlug } = useParams();
  const season = getSeasonBySlug(seasonSlug);
  const allSeasons = getAllSeasons();

  usePageTitle(season ? `Season ${season.seasonNumber} — AI Learning` : 'AI Learning');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seasonSlug]);

  // Editorial 404 Fallback if season does not exist
  if (!season) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center pt-32 pb-24">
        <div className="wrap text-center max-w-xl">
          <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-4">
            [ 404 — Curriculum Undefined ]
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[var(--ink)] mb-4">
            Season Not Found
          </h1>
          <p className="text-[var(--mut)] mb-8 text-sm sm:text-base leading-relaxed">
            The requested Namaste AI season does not exist or has not yet been documented in this curriculum archive.
          </p>
          <TransitionLink
            to="/ai-learning"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-6 py-3 border border-[var(--line2)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
          >
            ← Return to AI Learning Index
          </TransitionLink>
        </div>
      </main>
    );
  }

  // Editorial Coming Soon view for unpublished seasons (03–05)
  if (season.status === 'coming-soon') {
    return (
      <main className="ai-season-page min-h-[75vh] flex items-center justify-center pt-32 pb-40">
        <div className="wrap text-center max-w-xl">
          <nav aria-label="Breadcrumbs" className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              <TransitionLink
                to="/ai-learning"
                className="hover:text-[var(--ink)] transition-colors"
              >
                AI Learning
              </TransitionLink>
              <span className="text-[var(--faint)]">/</span>
              <span className="text-[var(--ink)]">Season {season.seasonNumber}</span>
            </div>
          </nav>

          <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
            [ NAMASTE AI / SEASON {season.seasonNumber} ]
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[var(--ink)] mb-4 font-display">
            COMING SOON
          </h1>

          <p className="text-sm sm:text-base text-[var(--mut)] leading-relaxed max-w-md mx-auto mb-10">
            This learning chapter hasn&apos;t been documented yet. More notes and implementations will be added as study commences.
          </p>

          <TransitionLink
            to="/ai-learning"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-8 py-3.5 border border-[var(--line2)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
            data-cursor="explore"
          >
            ← Back to AI Learning
          </TransitionLink>
        </div>
      </main>
    );
  }

  // Find next season if available
  const currentIndex = allSeasons.findIndex((s) => s.slug === season.slug);
  const nextSeason =
    currentIndex >= 0 && currentIndex < allSeasons.length - 1
      ? allSeasons[currentIndex + 1]
      : null;

  const isCompleted = season.status?.toLowerCase().includes('completed');

  return (
    <main className="ai-season-page pt-32 pb-40">
      <div className="wrap">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="mb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
            <TransitionLink
              to="/ai-learning"
              className="hover:text-[var(--ink)] transition-colors"
            >
              AI Learning
            </TransitionLink>
            <span className="text-[var(--faint)]">/</span>
            <span className="text-[var(--ink)]">Season {season.seasonNumber}</span>
          </div>
        </nav>

        {/* Season Hero */}
        <header className="mb-16 pb-12 border-b border-[var(--line)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              [ NAMASTE AI / SEASON {season.seasonNumber} ]
            </div>
            <div
              className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-3 py-1 border border-[var(--line2)] rounded-full ${
                isCompleted ? 'text-[#3fc9b9]' : 'text-[#f0c264]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCompleted ? 'bg-[#3fc9b9]' : 'bg-[#f0c264]'
                }`}
              />
              {season.status}
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[var(--ink)] mb-4 font-display">
            {season.title}
          </h1>

          <p className="text-xl sm:text-2xl font-serif italic text-[var(--ink)] opacity-80 max-w-2xl mb-8">
            {season.subtitle}
          </p>

          <p className="text-sm sm:text-base text-[var(--mut)] leading-relaxed max-w-3xl mb-8">
            {season.description}
          </p>

          <div className="font-mono text-xs uppercase tracking-widest text-[var(--faint)]">
            {season.attribution}
          </div>
        </header>

        {/* Key Concepts Practiced */}
        {season.keyConcepts && season.keyConcepts.length > 0 && (
          <section className="mb-20" aria-label="Key Concepts Practiced">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)] mb-4">
              [ 01 / CORE CONCEPTS & ARCHITECTURES ]
            </h2>
            <div className="flex flex-wrap gap-2">
              {season.keyConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 border border-[var(--line)] bg-[#12100e] text-[var(--ink)] font-mono text-xs uppercase tracking-wider rounded-sm"
                >
                  {concept}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Notes List */}
        {season.notes && season.notes.length > 0 && (
          <section className="mb-24" aria-label="Season Notes">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
                [ 02 / CURRICULUM NOTES & ESSAYS ]
              </h2>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
                {season.notes.length} Notes
              </span>
            </div>

            <div className="editorial-notes-table">
              {season.notes.map((note) => (
                <TransitionLink
                  key={note.id}
                  to={`/ai-learning/${season.slug}/${note.slug}`}
                  className="editorial-note-row"
                  data-cursor="read"
                  aria-label={`Read note: ${note.title}`}
                >
                  <div className="editorial-note-row__num">{note.episode}</div>
                  <div className="editorial-note-row__title">{note.title}</div>
                  <div className="editorial-note-row__topic">{note.topic}</div>
                  <div className="editorial-note-row__action">
                    <span>Read</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </section>
        )}

        {/* Learning Projects */}
        {season.projects && season.projects.length > 0 && (
          <section className="mb-24" aria-label="Season Learning Projects">
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-[var(--line)]">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
                [ 03 / EXPERIMENTS & LEARNING PROJECTS ]
              </h2>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
                Code Prototypes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {season.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 sm:p-8 border border-[var(--line)] bg-[#12100e] rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                      {proj.concept}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[var(--ink)] mb-3">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-[var(--mut)] leading-relaxed mb-6">
                      {proj.description}
                    </p>
                    <div className="p-4 bg-black/40 border border-[var(--line)] rounded-sm mb-6">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--mut)] mb-1">
                        Key Engineering Lesson
                      </div>
                      <p className="text-xs text-[var(--ink)] leading-relaxed">
                        {proj.learning}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[var(--line)] text-[var(--faint)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                          data-cursor="open"
                        >
                          <span>Repository</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Season Navigation Footer */}
        {nextSeason && (
          <footer className="pt-12 border-t border-[var(--line)] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              Next In Curriculum
            </span>
            <TransitionLink
              to={`/ai-learning/${nextSeason.slug}`}
              className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              data-cursor="explore"
            >
              <span>
                Season {nextSeason.seasonNumber}: {nextSeason.status === 'coming-soon' ? 'Coming Soon' : nextSeason.title}
              </span>
              <span aria-hidden="true">→</span>
            </TransitionLink>
          </footer>
        )}
      </div>
    </main>
  );
}
