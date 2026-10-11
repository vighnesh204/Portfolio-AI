import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ─── OpeningSequence ─────────────────────────────────────────────────────
// Editorial title sequence matching reference opening aesthetic (~1.5s).
//
// Features:
//   - Architectural leader crosshairs and concentric circular rings.
//   - Mask-clipped typography reveal: VIGHNESH → PORTFOLIO / 2026 → BUILD · LEARN · EXPERIMENT.
//   - Dual shutter panels that part smoothly to reveal the Hero underneath.
//   - In-memory session flag: runs on hard refresh / first load; skips on SPA navigation.
//   - Respects prefers-reduced-motion: zero delay, skips immediately.
// ──────────────────────────────────────────────────────────────────────────

let hasPlayedInSession = false;

export default function OpeningSequence({ onComplete }) {
  const [shouldPlay, setShouldPlay] = useState(false);
  const containerRef = useRef(null);
  const leaderRef = useRef(null);
  const nameRef = useRef(null);
  const metaRef = useRef(null);
  const wordsRef = useRef(null);
  const topPanelRef = useRef(null);
  const botPanelRef = useRef(null);

  useEffect(() => {
    if (hasPlayedInSession) {
      onComplete?.();
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      hasPlayedInSession = true;
      onComplete?.();
      return;
    }

    setShouldPlay(true);
  }, [onComplete]);

  useEffect(() => {
    if (!shouldPlay) return;

    const container = containerRef.current;
    const leader = leaderRef.current;
    const name = nameRef.current;
    const meta = metaRef.current;
    const words = wordsRef.current;
    const topPanel = topPanelRef.current;
    const botPanel = botPanelRef.current;

    if (!container || !name) return;

    // Prevent body scrolling during intro
    document.body.style.overflow = 'hidden';

    // Initial hidden state
    gsap.set(name, { yPercent: 105, opacity: 0 });
    gsap.set(meta, { opacity: 0, y: -6 });
    gsap.set(words, { opacity: 0, y: 8 });
    gsap.set(leader, { scale: 0.94, opacity: 0 });
    gsap.set([topPanel, botPanel], { yPercent: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        hasPlayedInSession = true;
        onComplete?.();
      },
    });

    // 1. Leader crosshairs & frame appear
    tl.to(leader, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
    }, 0.05);

    // 2. Name reveals from bottom clip
    tl.to(name, {
      yPercent: 0,
      opacity: 1,
      duration: 0.55,
      ease: 'power4.out',
    }, 0.15);

    // 3. Meta and philosophy tags reveal
    tl.to(meta, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power3.out',
    }, 0.35);

    tl.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
    }, 0.5);

    // 4. Center graphic smoothly fades/scales
    tl.to(leader, {
      opacity: 0,
      scale: 1.04,
      duration: 0.35,
      ease: 'power2.in',
    }, 1.05);

    // 5. Letterbox panels part vertically to unveil Hero
    tl.to(topPanel, {
      yPercent: -100,
      duration: 0.55,
      ease: 'power3.inOut',
    }, 1.15);

    tl.to(botPanel, {
      yPercent: 100,
      duration: 0.55,
      ease: 'power3.inOut',
    }, 1.15);

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [shouldPlay, onComplete]);

  if (!shouldPlay) return null;

  return (
    <div ref={containerRef} className="opening-screen" aria-hidden="true">
      {/* Top and Bottom Letterbox Shutter Panels */}
      <div ref={topPanelRef} className="opening-shutter opening-shutter--top" />
      <div ref={botPanelRef} className="opening-shutter opening-shutter--bottom" />

      {/* Center Leader Graphic */}
      <div ref={leaderRef} className="opening-leader">
        <div className="opening-crosshair opening-crosshair--h" />
        <div className="opening-crosshair opening-crosshair--v" />
        <div className="opening-ring opening-ring--outer" />
        <div className="opening-ring opening-ring--inner" />

        <div className="opening-center">
          <div ref={metaRef} className="opening-meta">
            PORTFOLIO / 2026
          </div>

          <div className="opening-name-clip">
            <h1 ref={nameRef} className="opening-name">
              VIGHNESH
            </h1>
          </div>

          <div ref={wordsRef} className="opening-words">
            BUILD · LEARN · EXPERIMENT
          </div>
        </div>
      </div>
    </div>
  );
}
