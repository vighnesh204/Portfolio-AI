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

        {/* Season Collection */}
        <section className="mb-24" aria-label="Curriculum Seasons">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              [ 01 / SEASONS ]
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              {seasons.length} Seasons Documented
            </span>
          </div>

          <div className="ai-cards-grid">
            {seasons.map((season) => (
              <SeasonCard key={season.id} season={season} />
            ))}
          </div>
        </section>

        {/* All Notes Directory */}
        <section aria-label="All Learning Notes">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
              [ 02 / ALL NOTES & ESSAYS ]
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              {allNotes.length} Total Notes
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
