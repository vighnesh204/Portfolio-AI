import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TransitionLink from '../ui/TransitionLink';

// ─── MenuOverlay ──────────────────────────────────────────────────────────
// Fullscreen editorial navigation panel matching reference interaction design.
//
// Features:
//   - Oversized editorial typography (01 HOME ... 07 CONTACT).
//   - Hairline separators and subtle hover micro-interactions.
//   - Full keyboard accessibility (Escape close, focus management).
//   - Scroll lock while active.
//   - Smooth GSAP stagger animations with reduced-motion support.
// ──────────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { index: '01', label: 'HOME',        path: '/'            },
  { index: '02', label: 'ABOUT',       path: '/about'       },
  { index: '03', label: 'WORK',        path: '/work'        },
  { index: '04', label: 'AI LEARNING', path: '/ai-learning' },
  { index: '05', label: 'LAB',         path: '/lab'         },
  { index: '06', label: 'JOURNEY',     path: '/journey'     },
  { index: '07', label: 'CONTACT',     path: '/contact'     },
];

const SECONDARY_LINKS = [
  { label: 'GITHUB',   href: 'https://github.com' },
  { label: 'LINKEDIN', href: 'https://linkedin.com' },
  { label: 'RESUME',   href: '#' },
];

function MenuOverlay({ isOpen, onClose, onNavigate }) {
  const overlayRef  = useRef(null);
  const panelRef    = useRef(null);
  const navItemsRef = useRef([]);
  const metaRef     = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // GSAP Entrance & Exit
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    const items   = navItemsRef.current.filter(Boolean);
    const meta    = metaRef.current;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen) {
      gsap.set(overlay, { display: 'flex' });

      if (prefersReduced) {
        gsap.set([panel, items, meta], { opacity: 1, y: 0, x: 0 });
        return;
      }

      // Panel slides in smoothly from right
      gsap.fromTo(
        panel,
        { x: '100%' },
        { x: '0%', duration: 0.65, ease: 'power3.inOut' }
      );

      // Nav items stagger up from clip
      gsap.fromTo(
        items,
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.055,
          delay: 0.25,
        }
      );

      // Footer elements fade in
      gsap.fromTo(
        meta,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.65 }
      );
    } else {
      if (prefersReduced) {
        gsap.set(overlay, { display: 'none' });
        return;
      }

      gsap.to(items, {
        y: '-30%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.025,
      });

      gsap.to(meta, {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.in',
      });

      gsap.to(panel, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          gsap.set(items, { y: '115%', opacity: 0 });
          gsap.set(meta,  { opacity: 0, y: 16 });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      style={{ display: 'none' }}
    >
      <div ref={panelRef} className="menu-panel">
        {/* Top Bar — Wordmark & Close Button */}
        <div className="menu-topbar">
          <div className="menu-brand">
            <span className="menu-wordmark">VIGHNESH</span>
            <span className="menu-brand-dot" aria-hidden="true">.</span>
          </div>
          <button
            className="menu-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
            data-cursor="open"
          >
            <span>CLOSE</span>
            <span className="menu-close-icon" aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Primary Navigation List */}
        <nav className="menu-nav-container" aria-label="Main navigation">
          <ul className="menu-nav-list list-reset">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.path} className="menu-nav-item-wrapper">
                <div className="menu-nav-item-clip">
                  <TransitionLink
                    to={item.path}
                    ref={(el) => { navItemsRef.current[i] = el; }}
                    className="menu-nav-item"
                    aria-label={`Navigate to ${item.label}`}
                    onNavigate={onNavigate}
                    data-cursor="go"
                  >
                    <span className="menu-nav-number">{item.index}</span>
                    <span className="menu-nav-label">{item.label}</span>
                    <span className="menu-nav-arrow" aria-hidden="true">→</span>
                  </TransitionLink>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Info Area */}
        <div ref={metaRef} className="menu-footer">
          <div className="menu-footer__top">
            <div className="menu-footer__contact">
              <span className="menu-footer__kicker">DIRECT INQUIRY</span>
              <a href="mailto:vighnesh@example.com" className="menu-footer__email">
                vighnesh@portfolio.dev
              </a>
            </div>
            <div className="menu-footer__location">
              <span className="menu-footer__kicker">LOCATION</span>
              <span className="menu-footer__text">PUNE, INDIA</span>
            </div>
          </div>

          <div className="menu-divider" />

          <div className="menu-footer__bottom">
            <div className="menu-secondary-links">
              {SECONDARY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="menu-secondary-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
            <span className="menu-copyright">© 2026 VIGHNESH</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuOverlay;
