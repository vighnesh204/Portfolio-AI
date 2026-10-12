import { useEffect } from 'react';
import { getAllSeasons, getAllNotes } from '../data/aiLearning';
import SeasonCard from '../sections/aiLearning/SeasonCard';
import TransitionLink from '../components/ui/TransitionLink';
import { usePageTitle } from '../hooks/usePageTitle';
import '../sections/aiLearning/aiLearning.css';

// ─── AiLearning Page ────────────────────────────────────────────────────────
// Hub page at /ai-learning.
// Editorial curriculum index, tactile season cards, and comprehensive notes directory.
// ─────────────────────────────────────────────────────────────────────────────

export default function AiLearning() {
  usePageTitle('AI Learning');
  const seasons = getAllSeasons();
  const availableSeasons = seasons.filter((s) => s.status !== 'coming-soon');
  const upcomingSeasons = seasons.filter((s) => s.status === 'coming-soon');
  const allNotes = getAllNotes();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="ai-learning-page pt-32 pb-40">
      <div className="wrap">
        {/* Editorial Page Header */}
        <header className="mb-20">
          <div className="ai-section-eyebrow">
            <span className="ai-section-eyebrow__dot" />
            <span>[ AI LEARNING ARCHIVE ]</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-[var(--ink)] mb-6 font-display">
            NAMASTE AI
          </h1>

          <p className="ai-section-subtitle mb-8">
            Engineering mental models from first principles — deconstructing tokenization, attention
            mechanisms, prompt constraints, and agentic tool dispatch.
          </p>

          <div className="p-6 sm:p-8 border border-[var(--line)] bg-[#12100e] rounded-sm max-w-3xl mb-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
              The Learning Philosophy
            </h2>
            <p className="text-[var(--mut)] text-sm sm:text-base leading-relaxed mb-4">
              True AI engineering is not merely importing an SDK and waiting for a string response.
              It requires knowing the geometric constraints of vector embeddings, the latency costs
              of context windows, and how to coerce non-deterministic language models into
              deterministic, schema-compliant software components.
            </p>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              Curriculum: Namaste AI · Synthesized into personal engineering notes & architectures by Vighnesh.
            </div>
          </div>
        </header>

        {/* Available Seasons */}
        <section className="mb-20" aria-label="Available Curriculum Seasons">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              [ 01 / AVAILABLE SEASONS ]
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              {availableSeasons.length} Seasons Documented · {upcomingSeasons.length} Coming Soon
            </span>
          </div>

          <div className="ai-cards-grid">
            {availableSeasons.map((season, idx) => (
              <SeasonCard key={season.id} season={season} index={idx} totalSeasons={seasons.length} />
            ))}
          </div>
        </section>

        {/* Upcoming Seasons */}
        <section className="mb-24" aria-label="Upcoming Curriculum Seasons">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              [ 02 / COMING SOON ]
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              3 Chapters In Queue
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingSeasons.map((season) => (
              <div
                key={season.id}
                className="p-8 border border-[var(--line)] bg-[#11100e] rounded-[20px] flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
                      SEASON {season.seasonNumber}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full opacity-70"
                      style={{ backgroundColor: season.accentColor }}
                    />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--ink)] mb-1">
                    COMING SOON
                  </h3>
                  <p className="font-serif italic text-base text-[var(--mut)]">
                    Next learning chapter
                  </p>
                </div>
                <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[var(--faint)]">
                  <span>UNPUBLISHED</span>
                  <span>MORE NOTES SOON</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Notes Directory */}
        <section aria-label="All Learning Notes">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              [ 03 / ALL NOTES & ESSAYS ]
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              {allNotes.length} Total Notes (Season 01–02)
            </span>
          </div>

          <div className="editorial-notes-table">
            {allNotes.map((note) => (
              <TransitionLink
                key={note.id}
                to={`/ai-learning/${note.seasonSlug}/${note.slug}`}
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
      </div>
    </main>
  );
}
