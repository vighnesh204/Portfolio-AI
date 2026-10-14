import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSeasonBySlug, getNoteBySlug } from '../data/aiLearning';
import TransitionLink from '../components/ui/TransitionLink';
import { usePageTitle } from '../hooks/usePageTitle';
import './AiNote.css';

// ─── AiNote Page (/ai-learning/:season/:note) ────────────────────────────────
// Premium editorial reading experience for Namaste AI learning journal.
// Structure:
//   Header clearance → Breadcrumb → Note Hero (Premise + subtle concepts)
//   → 01: The Question
//   → 02: Simple Explanation
//   → 03: How I Understand It (Mental Model)
//   → 04: Visual Flow & Concrete Example
//   → 05: What I Want to Remember (Key Takeaways)
//   → Editorial Attribution
//   → Chapter Navigation (Previous / Next)
// ─────────────────────────────────────────────────────────────────────────────

export default function AiNote() {
  const { season: seasonSlug, note: noteSlug } = useParams();
  const season = getSeasonBySlug(seasonSlug);
  const note = getNoteBySlug(seasonSlug, noteSlug);

  usePageTitle(note ? `${note.title} — Season ${season?.seasonNumber || ''}` : 'AI Learning');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seasonSlug, noteSlug]);

  // ── 404 / Undocumented Fallback ──
  if (!season || season.status === 'coming-soon' || !note) {
    const isComingSoonSeason = season && season.status === 'coming-soon';
    return (
      <main className="ain-page ain-page--404">
        <div className="wrap ain-404-inner">
          <p className="ais-mono-label ais-accent-label">[ 404 — Note Undefined ]</p>
          <h1 className="ain-404-title">Note Not Found</h1>
          <p className="ain-404-sub">
            {isComingSoonSeason
              ? `Season ${season.seasonNumber} has not been documented yet. Notes will be added as study begins.`
              : 'The requested learning note does not exist in this archive.'}
          </p>
          <TransitionLink
            to={season ? `/ai-learning/${season.slug}` : '/ai-learning'}
            className="ais-back-link"
            data-cursor="explore"
          >
            ← {season ? `Return to Season ${season.seasonNumber}` : 'Return to AI Learning Index'}
          </TransitionLink>
        </div>
      </main>
    );
  }

  // Adjacent notes for chapter navigation
  const notesList = season.notes || [];
  const currentIndex = notesList.findIndex((n) => n.slug === note.slug);
  const prevNote = currentIndex > 0 ? notesList[currentIndex - 1] : null;
  const nextNote =
    currentIndex >= 0 && currentIndex < notesList.length - 1
      ? notesList[currentIndex + 1]
      : null;

  return (
    <main className="ain-page" style={{ '--season-accent': season.accentColor }}>
      <div className="wrap">

        {/* ── Breadcrumb Navigation ── */}
        <nav className="ain-breadcrumb" aria-label="Breadcrumb">
          <TransitionLink to="/ai-learning" className="ain-breadcrumb__link">
            AI Learning
          </TransitionLink>
          <span className="ain-breadcrumb__sep">/</span>
          <TransitionLink to={`/ai-learning/${season.slug}`} className="ain-breadcrumb__link">
            Season {season.seasonNumber}
          </TransitionLink>
          <span className="ain-breadcrumb__sep">/</span>
          <span className="ain-breadcrumb__current">
            {note.episode || `Note ${note.number}`}
          </span>
        </nav>

        {/* ── Note Article Header ── */}
        <header className="ain-hero">
          <div className="ain-hero__eyebrow">
            <span className="ain-hero__season">Season {season.seasonNumber}</span>
            <span className="ain-hero__sep">·</span>
            <span className="ain-hero__num">{note.episode || `Note ${note.number}`}</span>
            {note.topic && (
              <>
                <span className="ain-hero__sep">·</span>
                <span className="ain-hero__topic">{note.topic}</span>
              </>
            )}
            {note.readingTime && (
              <>
                <span className="ain-hero__sep">·</span>
                <span className="ain-hero__reading-time">{note.readingTime}</span>
              </>
            )}
          </div>

          <h1 className="ain-hero__title">{note.title}</h1>

          {note.shortDescription && (
            <p className="ain-hero__premise">{note.shortDescription}</p>
          )}

          {/* Associated concepts moved to subtle metadata area */}
          {note.concepts && note.concepts.length > 0 && (
            <div className="ain-hero__concepts" aria-label="Associated concepts">
              <span className="ain-hero__concepts-label">Concepts:</span>
              <div className="ain-hero__concepts-list">
                {note.concepts.map((concept, idx) => (
                  <span key={idx} className="ain-concept-tag">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ── Note Article Body (Editorial Learning Flow) ── */}
        <article className="ain-article">

          {/* Section 01: The Question */}
          {note.question && (
            <section className="ain-section ain-question-section" aria-label="The Question">
              <div className="ain-section__label">
                <span className="ain-section__index">01</span>
                <span className="ain-section__title">The Question</span>
              </div>
              <blockquote className="ain-question__text">
                &ldquo;{note.question}&rdquo;
              </blockquote>
            </section>
          )}

          {/* Section 02: Simple Explanation */}
          {note.simpleExplanation && (
            <section className="ain-section ain-explanation-section" aria-label="Simple Explanation">
              <div className="ain-section__label">
                <span className="ain-section__index">02</span>
                <span className="ain-section__title">Simple Explanation</span>
              </div>
              <div className="ain-prose">
                {Array.isArray(note.simpleExplanation) ? (
                  note.simpleExplanation.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{note.simpleExplanation}</p>
                )}
              </div>
            </section>
          )}

          {/* Section 03: How I Understand It (My Mental Model) */}
          {note.myUnderstanding && (
            <section className="ain-section ain-understanding-section" aria-label="How I Understand It">
              <div className="ain-section__label">
                <span className="ain-section__index">03</span>
                <span className="ain-section__title">How I Understand It</span>
                <span className="ain-section__subtitle">— Mental Model</span>
              </div>
              <div className="ain-mental-model">
                <div className="ain-mental-model__content">
                  <p>{note.myUnderstanding}</p>
                </div>
              </div>
            </section>
          )}

          {/* Section 04: Visual Flow & Concrete Example */}
          {(note.flow || note.example) && (
            <section className="ain-section ain-flow-example-section" aria-label="Flow and Application">
              <div className="ain-section__label">
                <span className="ain-section__index">04</span>
                <span className="ain-section__title">
                  {note.flow && note.example
                    ? 'Progression & In Practice'
                    : note.flow
                    ? 'Progression Flow'
                    : 'In Practice'}
                </span>
              </div>

              {/* Lightweight visual progression flow */}
              {note.flow && note.flow.length > 0 && (
                <div className="ain-flow-container">
                  <span className="ain-flow__label">Progression Flow</span>
                  <div className="ain-flow" role="list">
                    {note.flow.map((step, idx) => (
                      <div key={idx} className="ain-flow__step-wrap">
                        <div className="ain-flow__step" role="listitem">
                          <span className="ain-flow__step-num">0{idx + 1}</span>
                          <span className="ain-flow__step-text">{step}</span>
                        </div>
                        {idx < note.flow.length - 1 && (
                          <div className="ain-flow__arrow" aria-hidden="true">
                            <span>↓</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concrete Application / Example */}
              {note.example && (
                <div className="ain-example-container">
                  <span className="ain-example__label">Concrete Application</span>
                  <div className="ain-example__body">
                    <p>{note.example}</p>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Section 05: What I Want to Remember (Key Takeaways) */}
          {note.keyTakeaways && note.keyTakeaways.length > 0 && (
            <section className="ain-section ain-takeaways-section" aria-label="What I Want to Remember">
              <div className="ain-section__label">
                <span className="ain-section__index">05</span>
                <span className="ain-section__title">What I Want to Remember</span>
              </div>
              <div className="ain-takeaways-list" role="list">
                {note.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="ain-takeaway-item" role="listitem">
                    <span className="ain-takeaway-num">0{idx + 1}</span>
                    <p className="ain-takeaway-text">{takeaway}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Editorial Attribution */}
          <div className="ain-attribution">
            <p className="ain-attribution__text">
              {season.attribution} · Personal notes & mental models written by Vighnesh.
            </p>
          </div>
        </article>

        {/* ── Chapter Navigation Footer ── */}
        <footer className="ain-footer-nav" aria-label="Chapter Navigation">
          <div className="ain-footer-nav__col ain-footer-nav__col--prev">
            {prevNote ? (
              <TransitionLink
                to={`/ai-learning/${season.slug}/${prevNote.slug}`}
                className="ain-nav-card"
                data-cursor="read"
                aria-label={`Previous note: ${prevNote.title}`}
              >
                <span className="ain-nav-card__dir">← Previous Note</span>
                <span className="ain-nav-card__num">Note {prevNote.number} · {prevNote.topic}</span>
                <span className="ain-nav-card__title">{prevNote.title}</span>
              </TransitionLink>
            ) : (
              <TransitionLink
                to={`/ai-learning/${season.slug}`}
                className="ain-nav-card"
                data-cursor="explore"
                aria-label={`Back to Season ${season.seasonNumber}`}
              >
                <span className="ain-nav-card__dir">← Season Index</span>
                <span className="ain-nav-card__num">Season {season.seasonNumber}</span>
                <span className="ain-nav-card__title">Back to {season.title}</span>
              </TransitionLink>
            )}
          </div>

          <div className="ain-footer-nav__col ain-footer-nav__col--next">
            {nextNote ? (
              <TransitionLink
                to={`/ai-learning/${season.slug}/${nextNote.slug}`}
                className="ain-nav-card ain-nav-card--next"
                data-cursor="read"
                aria-label={`Next note: ${nextNote.title}`}
              >
                <span className="ain-nav-card__dir">Next Note →</span>
                <span className="ain-nav-card__num">Note {nextNote.number} · {nextNote.topic}</span>
                <span className="ain-nav-card__title">{nextNote.title}</span>
              </TransitionLink>
            ) : (
              <TransitionLink
                to={`/ai-learning/${season.slug}`}
                className="ain-nav-card ain-nav-card--next"
                data-cursor="explore"
                aria-label={`Return to Season ${season.seasonNumber} overview`}
              >
                <span className="ain-nav-card__dir">Season Overview →</span>
                <span className="ain-nav-card__num">Season {season.seasonNumber} Completed</span>
                <span className="ain-nav-card__title">Return to {season.title}</span>
              </TransitionLink>
            )}
          </div>
        </footer>

      </div>
    </main>
  );
}
