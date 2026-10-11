// src/components/transitions/PageTransition.jsx
//
// Renders the full-viewport vertical color panel overlay.
// Controlled entirely by the parent (RootLayout) via props.
//
// Props:
//   isActive  — boolean: trigger the cover animation
//   color     — CSS color string for the panels
//   onCovered — callback fired when panels fully cover the viewport
//   onDone    — callback fired when panels have fully exited

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Number of vertical panels.
// Odd number looks better — avoids a symmetric split at the center.
const PANEL_COUNT = 5;

function PageTransition({ isActive, color, onCovered, onDone }) {
  const containerRef = useRef(null);
  const panelsRef    = useRef([]);

  useEffect(() => {
    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return;

    // Respect prefers-reduced-motion.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isActive) {
      // --- COVER PHASE ---
      // Make the container visible first.
      gsap.set(containerRef.current, { display: 'flex' });

      if (prefersReduced) {
        // No animation — just snap covered and call onCovered immediately.
        gsap.set(panels, { yPercent: 0 });
        onCovered?.();
        return;
      }

      // Panels start above the viewport (yPercent: -100) and slide DOWN to cover it.
      gsap.fromTo(
        panels,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: 'power3.inOut',
          stagger: {
            each: 0.06,
            from: 'start',
          },
          onComplete: () => {
            // Viewport is now fully covered — safe to change the route.
            onCovered?.();
          },
        }
      );
    } else {
      // --- REVEAL PHASE ---
      // Panels slide DOWN off the bottom to reveal the new page.
      if (prefersReduced) {
        gsap.set(panels, { yPercent: 100 });
        gsap.set(containerRef.current, { display: 'none' });
        onDone?.();
        return;
      }

      gsap.to(panels, {
        yPercent: 100,
        duration: 0.55,
        ease: 'power3.inOut',
        stagger: {
          each: 0.06,
          from: 'end', // reverse stagger for the exit — last panel leaves first
        },
        onComplete: () => {
          // Hide the container completely when done so it can't intercept pointer events.
          gsap.set(containerRef.current, { display: 'none' });
          // Reset panels back to starting position for the next transition.
          gsap.set(panels, { yPercent: -100 });
          onDone?.();
        },
      });
    }
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="page-transition"
      aria-hidden="true"
      style={{ display: 'none' }}
    >
      {Array.from({ length: PANEL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { panelsRef.current[i] = el; }}
          className="page-transition__panel"
          style={{ backgroundColor: color || 'var(--color-accent)' }}
        />
      ))}
    </div>
  );
}

export default PageTransition;
