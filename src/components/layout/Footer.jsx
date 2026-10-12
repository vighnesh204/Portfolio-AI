import { CONTACT_INFO } from '../../data/contact';

// ─── Footer ─────────────────────────────────────────────────────────────────
// SC. 09 / End-of-page — Minimal editorial footer.
// Handcrafted, understated, accessible.
// No cinema/movie credits terminology, no oversized complexity.
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const handleBackToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-inner">
        {/* Left: Name and year */}
        <div className="site-footer-left">
          <span className="site-footer-credit">
            <b>{CONTACT_INFO.name.toUpperCase()}</b> · PORTFOLIO 2026
          </span>
          <span className="site-footer-sub">
            REACT & GSAP · {CONTACT_INFO.location.toUpperCase()}
          </span>
        </div>

        {/* Center: Factual availability */}
        <div className="site-footer-center" aria-label="Availability">
          <span>{CONTACT_INFO.availability.toUpperCase()}</span>
        </div>

        {/* Right: Quick external links + Back to Top */}
        <div className="site-footer-right">
          <button
            type="button"
            onClick={handleBackToTop}
            className="back-to-top-btn"
            aria-label="Back to top of page"
            data-cursor="view"
          >
            <span>BACK TO TOP</span>
            <span className="arrow" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
