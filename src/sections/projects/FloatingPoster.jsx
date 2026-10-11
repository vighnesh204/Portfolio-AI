import { useEffect, useRef } from 'react';

// ─── FloatingPoster ──────────────────────────────────────────────────────────
// Editorial hover card that smoothly tracks the pointer with velocity-based tilt
// when the user hovers over unopened project rows, replicating the reference site.
// ──────────────────────────────────────────────────────────────────────────

export default function FloatingPoster({ hoveredProject }) {
  const posterRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, tilt: 0 });
  const rafIdRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) return;

    const onPointerMove = (e) => {
      posRef.current.targetX = e.clientX + 140;
      posRef.current.targetY = e.clientY - 60;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const step = () => {
      const p = posRef.current;
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;

      p.x += dx * 0.14;
      p.y += dy * 0.14;

      // Calculate tilt based on horizontal velocity
      const targetTilt = Math.max(-16, Math.min(16, dx * 0.45));
      p.tilt += (targetTilt - p.tilt) * 0.15;

      if (posterRef.current) {
        posterRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.tilt}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  if (!hoveredProject) return null;

  return (
    <div
      ref={posterRef}
      className="pj-poster pj-poster--active"
      style={{ '--poster-color': hoveredProject.accentColor || 'var(--ember)' }}
      aria-hidden="true"
    >
      <div className="pj-poster-inner">
        <span className="pj-poster-kicker">
          {hoveredProject.category || 'Engineering Build'}
        </span>
        <b className="pj-poster-title">{hoveredProject.title}</b>
        <span className="pj-poster-subtitle">{hoveredProject.subtitle}</span>
        <span className="pj-poster-foot">Click to open · Live preview</span>
      </div>
    </div>
  );
}
