import { useEffect, useRef } from 'react';

// ─── Marquee (Crossing Tapes) ─────────────────────────────────────────────
// Visually and behaviorally faithful to reference "tapes" section.
//
// Features:
//   - Dual angled crossing tape tracks with hardware-accelerated CSS animations.
//   - Tape A: High-impact bold display type with tactile solid-block separators.
//   - Tape B: Contrasting editorial tape with complementary pacing.
//   - Zero JS per-frame updates — pure CSS transform linear loop.
//   - Reduced motion: static display without rotation/motion.
// ──────────────────────────────────────────────────────────────────────────

const WORDS_PRIMARY = [
  'REACT',
  'JAVASCRIPT',
  'FULL STACK',
  'AI',
  'BUILD',
  'LEARN',
  'EXPERIMENT',
  'REPEAT',
];

const WORDS_SECONDARY = [
  'creative development',
  'web performance',
  'interface craft',
  'clean architecture',
  'modern react',
  'continuous learning',
  'engineering fundamentals',
];

// Double buffer for mathematically seamless -50% CSS looping
const PRIMARY_ITEMS = [...WORDS_PRIMARY, ...WORDS_PRIMARY];
const SECONDARY_ITEMS = [...WORDS_SECONDARY, ...WORDS_SECONDARY];

function TapeTrack({ items, className, separatorClass = 'tape-separator' }) {
  return (
    <div className={`tape-track ${className}`}>
      <div className="tape-group" aria-hidden="true">
        {items.map((word, i) => (
          <span key={`a-${i}`} className="tape-item">
            <span className="tape-word">{word}</span>
            <span className={separatorClass} aria-hidden="true" />
          </span>
        ))}
      </div>
      <div className="tape-group" aria-hidden="true">
        {items.map((word, i) => (
          <span key={`b-${i}`} className="tape-item">
            <span className="tape-word">{word}</span>
            <span className={separatorClass} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      containerRef.current.classList.add('is-reduced-motion');
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="tapes"
      id="marquee"
      aria-label="Core competencies and engineering philosophy"
    >
      {/* Tape B (Bottom/Background Angle) */}
      <div className="tape tape--b" aria-hidden="true">
        <TapeTrack
          items={SECONDARY_ITEMS}
          className="tape-track--reverse"
          separatorClass="tape-separator tape-separator--dot"
        />
      </div>

      {/* Tape A (Top/Foreground Angle) */}
      <div className="tape tape--a" aria-hidden="true">
        <TapeTrack
          items={PRIMARY_ITEMS}
          className="tape-track--forward"
          separatorClass="tape-separator tape-separator--block"
        />
      </div>

      {/* Screen-reader accessible transcript */}
      <span className="sr-only">
        {WORDS_PRIMARY.join(', ')}
      </span>
    </section>
  );
}
