import { useState, useRef } from 'react';
import TransitionLink from '../../components/ui/TransitionLink';

// ─── SeasonCard ─────────────────────────────────────────────────────────────
// Reusable tactile editorial card matching the reference certificate model.
//
// Transform Separation Architecture (prevents transform collisions):
//   1. SeasonCardMotionWrapper (.season-card-motion):
//      Controls scroll position (x, y), scroll rotation (rotateZ), and scale via GSAP.
//   2. SeasonCardTiltWrapper (.season-card__tilt-wrapper):
//      Controls subtle 3D pointer tilt (rotateX, rotateY) on mousemove.
//   3. SeasonCardFlipper (.season-card__flipper):
//      Controls 180° flip (rotateY) on click for active seasons (Season 01–02).
//      Coming soon seasons (Season 03–05) remain minimal without flip overhead.
// ─────────────────────────────────────────────────────────────────────────────

export default function SeasonCard({
  season,
  index = 0,
  totalSeasons = 5,
  motionRef,
}) {
  const isComingSoon = season.status === 'coming-soon';
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const tiltRef = useRef(null);
  const glintRef = useRef(null);

  // Performance-optimized direct DOM tilt on fine pointer devices (zero React state overhead)
  const handleMouseMove = (e) => {
    if (!tiltRef.current || !cardRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xRel = x / rect.width - 0.5;
    const yRel = y / rect.height - 0.5;

    // Restrained tactile rotation (±6 deg)
    const rotateY = xRel * 12;
    const rotateX = -yRel * 12;

    tiltRef.current.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

    if (glintRef.current) {
      glintRef.current.style.transform = `translate(${xRel * 50}px, ${yRel * 50}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleCardClick = (e) => {
    if (isComingSoon) return;
    if (e.target.closest('a')) return;
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (isComingSoon) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  const notesCount = season.notes?.length || 0;
  const projectsCount = season.projects?.length || 0;
  const previewNotes = season.notes?.slice(0, 3) || [];
  const highlightProject = season.projects?.[0];
  const isCompleted = season.status?.toLowerCase().includes('completed');

  // Accent color per season
  const accentColor = season.accentColor || (index === 0 ? '#ff5b1f' : '#3fc9b9');
  const displayNumber = season.seasonNumber || `0${index + 1}`;
  const totalDisplay = totalSeasons < 10 ? `0${totalSeasons}` : totalSeasons;

  return (
    <div
      ref={motionRef}
      className={`season-card-motion ${isComingSoon ? 'season-card-motion--coming-soon' : ''}`}
      data-season-index={index}
    >
      <div
        ref={cardRef}
        className={`season-card ${isComingSoon ? 'season-card--coming-soon' : ''} ${isFlipped ? 'is-flipped' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={isComingSoon ? undefined : handleCardClick}
        onKeyDown={isComingSoon ? undefined : handleKeyDown}
        tabIndex={isComingSoon ? -1 : 0}
        data-cursor={isComingSoon ? undefined : 'flip'}
        role={isComingSoon ? 'article' : 'button'}
        aria-expanded={isComingSoon ? undefined : isFlipped}
        aria-label={
          isComingSoon
            ? `Namaste AI Season ${displayNumber}: Coming Soon`
            : `Namaste AI Season ${displayNumber}: ${season.title}. Click to ${isFlipped ? 'return to front' : 'turn over'}.`
        }
      >
        {/* Layer 2: Tilt Wrapper */}
        <div ref={tiltRef} className="season-card__tilt-wrapper">
          {/* Layer 3: Flipper Wrapper */}
          <div className="season-card__flipper">
            {/* ═══════════════ FRONT FACE ═══════════════ */}
            <div className="season-card__face season-card__face--front">
              {/* Moving Surface Glint */}
              <div ref={glintRef} className="season-card__glint" aria-hidden="true" />

              {/* Giant Outlined Ghost Numeral Watermark */}
              <div
                className="season-card__ghost-num"
                aria-hidden="true"
                style={{
                  WebkitTextStrokeColor: `${accentColor}35`,
                }}
              >
                {displayNumber}
              </div>

              {/* Top Row: Circular Badge (Left) + Index/Total (Right) */}
              <div className="season-card__top-row">
                <div
                  className="season-card__circle-badge"
                  style={{ backgroundColor: accentColor }}
                >
                  <span>S{displayNumber}</span>
                </div>
                <div className="season-card__counter-label">
                  {displayNumber} / {totalDisplay}
                </div>
              </div>

              {/* Middle: Title & Subtitle or Coming Soon Layout */}
              {isComingSoon ? (
                <div className="season-card__coming-soon-body">
                  <div className="season-card__coming-soon-eyebrow">
                    SEASON {displayNumber}
                  </div>
                  <div className="season-card__coming-soon-headline">
                    <span className="season-card__coming-soon-main">COMING</span>
                    <span className="season-card__coming-soon-accent">SOON.</span>
                  </div>
                  <p className="season-card__coming-soon-note">
                    MORE NOTES COMING SOON
                  </p>
                </div>
              ) : (
                <div className="season-card__body-area">
                  <h3 className="season-card__title">
                    {season.title}
                  </h3>
                  <p className="season-card__subtitle">{season.subtitle}</p>

                  {/* Concept Pills Preview */}
                  {season.keyConcepts && (
                    <div className="season-card__concept-pills">
                      {season.keyConcepts.slice(0, 3).map((concept, idx) => (
                        <span key={idx} className="season-card__pill">
                          {concept}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Footer Row */}
              <div className="season-card__bottom-row">
                <div className="season-card__meta-tags">
                  <span className="season-card__tag-item">
                    {isComingSoon ? 'UPCOMING' : (season.notes?.[0]?.topic?.toUpperCase() || 'CURRICULUM')}
                  </span>
                  {!isComingSoon && (
                    <>
                      <span className="season-card__tag-divider">•</span>
                      <span className="season-card__tag-item">
                        {isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
                      </span>
                    </>
                  )}
                </div>
                {isComingSoon ? (
                  <div className="season-card__coming-soon-status">
                    <span className="season-card__coming-soon-dot" style={{ backgroundColor: accentColor }} />
                    <span>NEXT CHAPTER</span>
                  </div>
                ) : (
                  <div className="season-card__turn-trigger">
                    <span>TURN OVER</span>
                    <span className="season-card__turn-icon" aria-hidden="true">↻</span>
                  </div>
                )}
              </div>
            </div>

            {/* ═══════════════ BACK FACE (INVERTED ACCENT) ═══════════════ */}
            {!isComingSoon && (
              <div
                className="season-card__face season-card__face--back"
                style={{ backgroundColor: accentColor }}
              >
                {/* Top Row: Dark Circular Badge + CURRICULUM */}
                <div className="season-card__top-row season-card__top-row--back">
                  <div className="season-card__circle-badge season-card__circle-badge--dark">
                    <span>{displayNumber}</span>
                  </div>
                  <div className="season-card__counter-label season-card__counter-label--back">
                    CURRICULUM BREAKDOWN
                  </div>
                </div>

                {/* Middle: Title, Notes Breakdown & Action */}
                <div className="season-card__body-area season-card__body-area--back">
                  <h3 className="season-card__title season-card__title--back">
                    {season.title}
                  </h3>
                  <p className="season-card__subtitle season-card__subtitle--back">
                    {season.subtitle}
                  </p>

                  {/* Notes List Preview */}
                  <div className="season-card__back-notes">
                    {previewNotes.map((note) => (
                      <div key={note.id} className="season-card__back-note-line">
                        <span className="season-card__back-note-ep">{note.episode}</span>
                        <span className="season-card__back-note-txt">{note.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learning Project Highlight */}
                  {highlightProject && (
                    <div className="season-card__back-project-box">
                      <span className="season-card__back-project-sub">LEARNING PROJECT</span>
                      <span className="season-card__back-project-title">
                        {highlightProject.title}
                      </span>
                    </div>
                  )}

                  {/* Action Button: Explore Full Season */}
                  <TransitionLink
                    to={`/ai-learning/${season.slug}`}
                    className="season-card__explore-btn"
                    data-cursor="explore"
                    aria-label={`Explore details for Season ${displayNumber}`}
                  >
                    <span>EXPLORE FULL SEASON</span>
                    <span aria-hidden="true">→</span>
                  </TransitionLink>
                </div>

                {/* Footer Row: Counts + CLICK TO RETURN ↻ */}
                <div className="season-card__bottom-row season-card__bottom-row--back">
                  <div className="season-card__meta-tags season-card__meta-tags--back">
                    <span>{notesCount} NOTES</span>
                    <span>•</span>
                    <span>{projectsCount} PROJECT{projectsCount !== 1 ? 'S' : ''}</span>
                  </div>
                  <div className="season-card__turn-trigger season-card__turn-trigger--back">
                    <span>CLICK TO RETURN</span>
                    <span className="season-card__turn-icon" aria-hidden="true">↻</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

