import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ─── CustomCursor ──────────────────────────────────────────────────────────
// Lightweight circular cursor matching reference interaction language.
//
// Key performance features:
//   - Zero React state updates on mouse movement or hover.
//   - Direct GSAP quickTo tracking for fluid 60/120fps movement.
//   - DOM class toggles on event delegation for hover states.
//   - Automatically disabled on touch / coarse pointer devices.
//   - Respects prefers-reduced-motion.
// ──────────────────────────────────────────────────────────────────────────

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Disable on coarse pointer devices (touchscreens/mobile)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor) return;

    // Fast, smooth pointer tracking with GSAP quickTo
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        cursor.style.opacity = '1';
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const mode = target.getAttribute('data-cursor') || 'view';
        cursor.className = `custom-cursor is-hovered is-${mode}`;
        if (label) {
          label.textContent = mode.toUpperCase();
        }
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        cursor.className = 'custom-cursor';
        if (label) {
          label.textContent = '';
        }
      }
    };

    const onMouseLeaveWindow = () => {
      cursor.style.opacity = '0';
      isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <span ref={labelRef} className="custom-cursor__label" />
    </div>
  );
}
