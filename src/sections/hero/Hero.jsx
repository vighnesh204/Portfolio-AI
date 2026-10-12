import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TransitionLink from '../../components/ui/TransitionLink';
import { CONTACT_INFO } from '../../data/contact';

// ─── Hero Section ──────────────────────────────────────────────────────────
// Handcrafted editorial developer hero matching reference composition.
//
// Features:
//   - Metadata topbar (portfolio edition, status with ping, Pune coordinates).
//   - Oversized headline: I BUILD / FOR THE / WEB. with interactive letters.
//   - Lower editorial grid: rotating badge + italic role + lead statement + CTAs.
//   - Bottom row: animated scroll cue + external social links.
//   - Restrained pointer interactions: subtle letter lift, rotate, and accent.
// ──────────────────────────────────────────────────────────────────────────

const splitLetters = (word, accentIndex = -1) => {
  return word.split('').map((char, i) => {
    // When accentIndex is specified, that character receives the vibrant orange accent color
    const isAccent = i === accentIndex;
    const charClass = isAccent ? 'hc-accent' : 'hc-solid';
    return (
      <span
        key={i}
        className={`hero-char ${charClass}`}
        data-cursor="hover"
      >
        {char}
      </span>
    );
  });
};

export default function Hero() {
  const heroRef = useRef(null);
  const metaRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const footRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const chars = headlineRef.current?.querySelectorAll('.hero-char');
    const meta = metaRef.current;
    const sub = subRef.current;
    const foot = footRef.current;

    if (!chars || chars.length === 0) return;

    // Initial hidden states
    gsap.set(chars, { yPercent: 110, rotate: 6, opacity: 0 });
    gsap.set([meta, sub, foot], { opacity: 0, y: 24 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Top metadata appears
    tl.to(meta, { opacity: 1, y: 0, duration: 0.6 }, 0.2);

    // 2. Headline characters cascade up with slight rotation
    tl.to(chars, {
      yPercent: 0,
      rotate: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.025,
      ease: 'power4.out',
    }, 0.35);

    // 3. Sub-grid and footer settle in
    tl.to(sub, { opacity: 1, y: 0, duration: 0.7 }, 0.75);
    tl.to(foot, { opacity: 1, y: 0, duration: 0.6 }, 0.95);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero" aria-label="Introduction">
      {/* Background Architectural Flare */}
      <div className="hero-flare" aria-hidden="true" />

      <div className="wrap hero-inner">
        {/* ── Top Meta Bar ── */}
        <div ref={metaRef} className="hero-meta">
          <span className="hero-meta__tag">VIGHNESH — PORTFOLIO ’26</span>
          <span className="hero-meta__avail">
            <i className="status-ping" aria-hidden="true" />
            OPEN TO OPPORTUNITIES
          </span>
          <span className="hero-meta__loc">PUNE, INDIA · 18.52°N 73.85°E</span>
        </div>

        {/* ── Massive Editorial Headline: Two Centered Lines VIGHNESH / BORHADE ── */}
        <h1
          ref={headlineRef}
          className="hero-headline"
          aria-label="Vighnesh Borhade"
        >
          <span className="hero-row hero-row--first" aria-hidden="true">
            <span className="hero-clip">
              {splitLetters('VIGHNESH')}
            </span>
          </span>
          <span className="hero-row hero-row--second" aria-hidden="true">
            <span className="hero-clip">
              {splitLetters('BORHADE', 3)}
            </span>
          </span>
          <span className="sr-only">Vighnesh Borhade — Frontend &amp; Full Stack Developer</span>
        </h1>

        {/* ── Lower Editorial Grid ── */}
        <div ref={subRef} className="hero-sub">
          <div className="hero-sub__left">
            {/* Interactive Rotating Badge */}
            <TransitionLink
              to="/work"
              className="hero-badge"
              aria-label="Explore selected work"
              data-cursor="view"
            >
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path
                    id="badge-circle"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>
                <text>
                  <textPath href="#badge-circle" textLength="470">
                    AVAILABLE FOR WORK · FRONTEND · FULL STACK · 2026 ·
                  </textPath>
                </text>
              </svg>
              <span className="hero-badge__center" aria-hidden="true">↘</span>
            </TransitionLink>

            <p className="hero-role">
              <span className="role-serif">Frontend &amp; Full Stack</span>
              <span className="role-sans">Developer</span>
            </p>
          </div>

          <div className="hero-sub__right">
            <p className="hero-lead">
              I build web applications and digital experiences with <b>React, JavaScript, and modern full-stack fundamentals</b>. Passionate about interface craftsmanship, web performance, and AI-assisted engineering.
            </p>

            <div className="hero-actions">
              <TransitionLink
                to="/work"
                className="btn btn--primary"
                data-cursor="go"
              >
                <span className="btn__text">See the work</span>
                <span className="btn__arrow" aria-hidden="true">↓</span>
              </TransitionLink>

              <TransitionLink
                to="/contact"
                className="btn btn--ghost"
                data-cursor="go"
              >
                <span className="btn__text">Get in touch</span>
                <span className="btn__arrow" aria-hidden="true">→</span>
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* ── Footer Bar ── */}
        <div ref={footRef} className="hero-foot">
          <a href="#marquee" className="hero-cue" aria-label="Scroll down">
            <i className="hero-cue__line" aria-hidden="true" />
            <span>SCROLL</span>
          </a>

          <div className="hero-socials">
            {CONTACT_INFO.github && (
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                data-cursor="open"
                aria-label="GitHub Profile — vighnesh204 (opens in new tab)"
              >
                GitHub ↗
              </a>
            )}
            {CONTACT_INFO.linkedin && (
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                data-cursor="open"
                aria-label="LinkedIn Profile (opens in new tab)"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
