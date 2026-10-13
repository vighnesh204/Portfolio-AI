import { CONTACT_INFO } from '../../data/contact';
import '../../sections/contact/contact.css';

// ─── Footer ─────────────────────────────────────────────────────────────────
// SC. 09 / End-of-page — Editorial closing footer.
// Handcrafted, Awwwards-inspired, authentic to Vighnesh Borhade.
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
      {/* 1. Large expressive editorial wordmark & content band */}
      <div className="footer-wordmark-band">
        <h2 className="footer-wordmark" aria-label="Vighnesh Borhade">
          <span className="footer-wordmark-line">VIGHNESH</span>
          <span className="footer-wordmark-line">
            <em>BORHADE</em>
            <span className="footer-dot" aria-hidden="true">.</span>
          </span>
        </h2>

        {/* Content row: narrative tagline & direct channels */}
        <div className="footer-content-row">
          <div className="footer-tagline">
            <span className="ft-accent">BUILD · LEARN · EXPERIMENT · REPEAT</span>
            <span>PORTFOLIO 2026 · {CONTACT_INFO.location.toUpperCase()}</span>
            {CONTACT_INFO.availability && (
              <span className="ft-status">
                <span className="ft-status-dot" aria-hidden="true" />
                {CONTACT_INFO.availability.toUpperCase()}
              </span>
            )}
          </div>

          <nav className="footer-links-col" aria-label="Direct contact channels">
            {CONTACT_INFO.email && (
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="footer-link"
                data-cursor="mail"
                aria-label={`Send direct email to ${CONTACT_INFO.email}`}
              >
                <span>EMAIL</span>
                <span className="fl-arrow" aria-hidden="true">↗</span>
              </a>
            )}

            {CONTACT_INFO.linkedin && (
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                data-cursor="open"
                aria-label="Inspect LinkedIn profile (opens in new tab)"
              >
                <span>LINKEDIN</span>
                <span className="fl-arrow" aria-hidden="true">↗</span>
              </a>
            )}

            {CONTACT_INFO.github && (
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                data-cursor="open"
                aria-label="Inspect GitHub repository profile (opens in new tab)"
              >
                <span>GITHUB</span>
                <span className="fl-arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </nav>
        </div>
      </div>

      {/* 2. Sub-bar: Legal, Location, Back to Top */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-left">
          <span>© 2026 {CONTACT_INFO.name.toUpperCase()} · ALL RIGHTS RESERVED</span>
        </div>

        <div className="footer-bottom-right">
          <span className="footer-location">{CONTACT_INFO.location.toUpperCase()}</span>

          <button
            type="button"
            onClick={handleBackToTop}
            className="back-to-top-btn"
            aria-label="Back to top of page"
            data-cursor="view"
          >
            <span>BACK TO TOP</span>
            <span className="btn-arrow" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
