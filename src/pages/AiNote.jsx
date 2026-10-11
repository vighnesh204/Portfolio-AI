import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSeasonBySlug, getNoteBySlug } from '../data/aiLearning';
import TransitionLink from '../components/ui/TransitionLink';
import '../sections/aiLearning/aiLearning.css';

// ─── AiNote Page ────────────────────────────────────────────────────────────
// Dedicated Note reading page at /ai-learning/:season/:note.
// Optimized for reading clarity, mental models, and first-principles understanding.
// ─────────────────────────────────────────────────────────────────────────────

export default function AiNote() {
  const { season: seasonSlug, note: noteSlug } = useParams();
  const season = getSeasonBySlug(seasonSlug);
  const note = getNoteBySlug(seasonSlug, noteSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seasonSlug, noteSlug]);

  // Editorial 404 Fallback
  if (!season || !note) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center pt-32 pb-24">
        <div className="wrap text-center max-w-xl">
          <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-4">
            [ 404 — Note Undefined ]
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[var(--ink)] mb-4">
            Note Not Found
          </h1>
          <p className="text-[var(--mut)] mb-8 text-sm sm:text-base leading-relaxed">
            The requested curriculum note does not exist in this archive.
          </p>
          <TransitionLink
            to={season ? `/ai-learning/${season.slug}` : '/ai-learning'}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-6 py-3 border border-[var(--line2)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
          >
            ← {season ? `Return to Season ${season.seasonNumber}` : 'Return to AI Learning Index'}
          </TransitionLink>
        </div>
      </main>
    );
  }

  // Find adjacent notes for clean sequence navigation
  const notesList = season.notes || [];
  const currentIndex = notesList.findIndex((n) => n.slug === note.slug);
  const prevNote = currentIndex > 0 ? notesList[currentIndex - 1] : null;
  const nextNote =
    currentIndex >= 0 && currentIndex < notesList.length - 1
      ? notesList[currentIndex + 1]
      : null;

  return (
    <main className="ai-note-page pt-32 pb-40">
      <div className="wrap">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="mb-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--mut)]">
            <TransitionLink
              to="/ai-learning"
              className="hover:text-[var(--ink)] transition-colors"
            >
              AI Learning
            </TransitionLink>
            <span className="text-[var(--faint)]">/</span>
            <TransitionLink
              to={`/ai-learning/${season.slug}`}
              className="hover:text-[var(--ink)] transition-colors"
            >
              Season {season.seasonNumber}
            </TransitionLink>
            <span className="text-[var(--faint)]">/</span>
            <span className="text-[var(--ink)]">{note.episode}</span>
          </div>
        </nav>

        {/* Note Article Header */}
        <header className="max-w-3xl mb-16 pb-12 border-b border-[var(--line)]">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
              {note.episode}
            </span>
            <span className="text-[var(--faint)]">•</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mut)]">
              {note.topic}
            </span>
            <span className="text-[var(--faint)]">•</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              {note.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[var(--ink)] mb-6 font-display">
            {note.title}
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-[var(--ink)] opacity-85 leading-relaxed">
            {note.shortDescription}
          </p>
        </header>

        {/* Note Article Body */}
        <article className="max-w-3xl mx-auto space-y-16">
          {/* Section: What I Learned */}
          {note.whatILearned && (
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)] mb-4">
                [ 01 / WHAT I LEARNED ]
              </h2>
              <div className="p-6 sm:p-8 bg-[#12100e] border border-[var(--line)] rounded-sm">
                <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed">
                  {note.whatILearned}
                </p>
              </div>
            </section>
          )}

          {/* Section: Concepts Practiced */}
          {note.concepts && note.concepts.length > 0 && (
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)] mb-4">
                [ 02 / ASSOCIATED CONCEPTS ]
              </h2>
              <div className="flex flex-wrap gap-2">
                {note.concepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 border border-[var(--line)] bg-[#141210] text-[var(--ink)] font-mono text-xs uppercase tracking-wider rounded-sm"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Section: My Understanding */}
          {note.myUnderstanding && (
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)] mb-4">
                [ 03 / MY UNDERSTANDING & MENTAL MODEL ]
              </h2>
              <div className="text-sm sm:text-base text-[var(--ink)] leading-relaxed space-y-4">
                <p>{note.myUnderstanding}</p>
              </div>
            </section>
          )}

          {/* Section: Examples / Demonstration */}
          {note.examples && (
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)] mb-4">
                [ 04 / CONCRETE APPLICATION & EXAMPLES ]
              </h2>
              <div className="p-6 bg-[#0e0c0b] border border-[var(--line)] rounded-sm font-mono text-xs sm:text-sm text-[var(--mut)] leading-relaxed">
                <p className="text-[var(--ink)]">{note.examples}</p>
              </div>
            </section>
          )}

          {/* Section: Key Takeaways */}
          {note.keyTakeaways && note.keyTakeaways.length > 0 && (
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--mut)] mb-4">
                [ 05 / KEY TAKEAWAYS ]
              </h2>
              <div className="p-6 sm:p-8 bg-[#151310] border border-[var(--line2)] rounded-sm">
                <ul className="space-y-3">
                  {note.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[var(--accent)] mt-1">
                        0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-base text-[var(--ink)] leading-relaxed">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Attribution Box */}
          <div className="pt-8 border-t border-[var(--line)]">
            <p className="font-mono text-xs text-[var(--faint)] uppercase tracking-wider">
              {season.attribution} · Notes represent Vighnesh's personal notes & mental models.
            </p>
          </div>
        </article>

        {/* Note Pagination Footer */}
        <footer className="max-w-3xl mx-auto pt-16 mt-16 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-6">
          {prevNote ? (
            <TransitionLink
              to={`/ai-learning/${season.slug}/${prevNote.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--mut)] hover:text-[var(--ink)] transition-colors"
              data-cursor="read"
            >
              <span aria-hidden="true">←</span>
              <span>Previous: {prevNote.title}</span>
            </TransitionLink>
          ) : (
            <TransitionLink
              to={`/ai-learning/${season.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--mut)] hover:text-[var(--ink)] transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>Back to Season {season.seasonNumber}</span>
            </TransitionLink>
          )}

          {nextNote && (
            <TransitionLink
              to={`/ai-learning/${season.slug}/${nextNote.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)] hover:text-[var(--accent)] transition-colors ml-auto"
              data-cursor="read"
            >
              <span>Next: {nextNote.title}</span>
              <span aria-hidden="true">→</span>
            </TransitionLink>
          )}
        </footer>
      </div>
    </main>
  );
}
