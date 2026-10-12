import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '../../components/ui/TransitionLink';
import './askVighnesh.css';

gsap.registerPlugin(ScrollTrigger);

// ─── AskVighnesh ─────────────────────────────────────────────────────────────
// SC. 08 — AI Portfolio Guide homepage section.
//
// Architecture:
//   Browser (this component) sends ONLY { prompt } → POST /api/ask-vighnesh
//   → Vercel serverless builds authoritative portfolio context internally
//   → Gemini REST API → grounded structured response → render
//
// Key constraints:
//  — Never calls Gemini directly (no VITE_GEMINI_API_KEY)
//  — Browser sends ONLY { prompt: string }; never supplies portfolio context
//  — Structured response: { answer: string, links: Array<{label, path}> }
//  — No new dependencies: native fetch, existing GSAP/React
//  — Factual grounding enforced server-side from authoritative data sources
//  — Graceful fallback when key is missing or Gemini is unavailable
// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  'Which project best demonstrates React skills?',
  'What is Vighnesh currently learning?',
  'Show me his full-stack MERN work',
  'Tell me about the AI learning journey',
  'What should a recruiter inspect first?',
];

// Fallback navigation links shown when API is unavailable
const FALLBACK_LINKS = [
  { label: 'View Work', path: '/work' },
  { label: 'AI Learning', path: '/ai-learning' },
  { label: 'Journey', path: '/journey' },
  { label: 'About', path: '/about' },
];

export default function AskVighnesh() {
  const sectionRef  = useRef(null);
  const lineRef     = useRef(null);
  const headingRef  = useRef(null);
  const formRef     = useRef(null);
  const inputRef    = useRef(null);

  const [prompt, setPrompt]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer]       = useState(null);
  const [links, setLinks]         = useState([]);
  const [errorState, setError]    = useState(null); // null | 'unavailable' | 'network'

  // Guard against double-submit
  const isSubmittingRef = useRef(false);

  // ── GSAP entrance animation ───────────────────────────────────────────────
  useEffect(() => {
    const section  = sectionRef.current;
    const line     = lineRef.current;
    const heading  = headingRef.current;
    const formEl   = formRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (heading) {
        gsap.fromTo(
          heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (formEl) {
        gsap.fromTo(
          formEl,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            delay: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Submit handler ────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async (questionText) => {
    const text = (questionText || prompt).trim();
    if (!text || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsLoading(true);
    setAnswer(null);
    setLinks([]);
    setError(null);

    try {
      const res = await fetch('/api/ask-vighnesh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError('unavailable');
      } else {
        setAnswer(data.answer || 'No response received.');
        setLinks(Array.isArray(data.links) ? data.links : []);
      }
    } catch {
      setError('network');
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  }, [prompt]);

  // Keyboard submission (Enter without Shift)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (question) => {
    setPrompt(question);
    handleSubmit(question);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const isInputEmpty = prompt.trim().length === 0;

  return (
    <section
      ref={sectionRef}
      className="ask-vighnesh"
      id="ask-vighnesh"
      aria-label="Ask Vighnesh AI Portfolio Guide"
    >
      {/* Entrance hairline */}
      <div ref={lineRef} className="ask-vighnesh__top-line" aria-hidden="true" />

      {/* Metadata row */}
      <div className="ask-vighnesh__meta">
        <span>
          <b>SC. 08</b> — AI PORTFOLIO GUIDE
        </span>
        <span className="ask-vighnesh__status">
          <span className="ask-vighnesh__status-dot" aria-hidden="true" />
          <span>GEMINI 2.0 POWERED · FREE TIER</span>
        </span>
      </div>

      {/* Display heading */}
      <div ref={headingRef} className="ask-vighnesh__heading-wrap">
        <h2 className="ask-vighnesh__title">
          ASK<br />
          <em>VIGHNESH</em>
        </h2>
        <p className="ask-vighnesh__subtitle">
          Ask anything about Vighnesh's projects, skills, learning journey, or
          tech stack. Powered by Gemini — grounded in authoritative portfolio data only.
        </p>
      </div>

      {/* Input form */}
      <div ref={formRef}>
        <form
          className="ask-vighnesh__form"
          onSubmit={handleFormSubmit}
          aria-label="Ask a question about Vighnesh's portfolio"
        >
          <label htmlFor="av-input" className="sr-only">
            Ask a question about Vighnesh
          </label>
          <input
            ref={inputRef}
            id="av-input"
            type="text"
            className="ask-vighnesh__input"
            placeholder="Ask about Vighnesh's projects, skills, or stack…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={500}
            autoComplete="off"
            spellCheck="false"
            aria-describedby="av-result"
          />
          <button
            type="submit"
            className="ask-vighnesh__submit"
            disabled={isLoading || isInputEmpty}
            data-cursor="ask"
            aria-label="Submit question"
          >
            <span>{isLoading ? 'ASKING' : 'ASK'}</span>
            <span className="ask-vighnesh__submit-arrow" aria-hidden="true">→</span>
          </button>
        </form>

        {/* Suggested questions */}
        <span className="ask-vighnesh__suggestions-label" aria-hidden="true">
          SUGGESTED
        </span>
        <div
          className="ask-vighnesh__suggestions"
          role="group"
          aria-label="Suggested questions"
        >
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              className="ask-vighnesh__suggestion"
              onClick={() => handleSuggestionClick(q)}
              disabled={isLoading}
              aria-label={`Ask: ${q}`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Result area — aria-live for screen readers */}
      <div id="av-result" aria-live="polite" aria-atomic="true">
        {/* Loading state */}
        {isLoading && (
          <div className="ask-vighnesh__thinking" role="status">
            <span className="ask-vighnesh__thinking-label">THINKING</span>
            <span className="ask-vighnesh__thinking-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}

        {/* Error / unavailable state */}
        {!isLoading && errorState && (
          <div className="ask-vighnesh__fallback" role="alert">
            <p className="ask-vighnesh__fallback-msg">
              AI guide is temporarily unavailable. Explore the portfolio directly:
            </p>
            <nav
              className="ask-vighnesh__fallback-nav"
              aria-label="Portfolio navigation"
            >
              {FALLBACK_LINKS.map((link) => (
                <TransitionLink
                  key={link.path}
                  to={link.path}
                  className="ask-vighnesh__fallback-link"
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label} →
                </TransitionLink>
              ))}
            </nav>
          </div>
        )}

        {/* Successful answer */}
        {!isLoading && !errorState && answer && (
          <div className="ask-vighnesh__answer-wrap">
            <span className="ask-vighnesh__answer-kicker" aria-hidden="true">
              RESPONSE
            </span>
            <p className="ask-vighnesh__answer-text">{answer}</p>

            {/* Recommended internal links */}
            {links.length > 0 && (
              <nav
                className="ask-vighnesh__links"
                aria-label="Recommended portfolio pages"
              >
                {links.map((link) => (
                  <TransitionLink
                    key={link.path}
                    to={link.path}
                    className="ask-vighnesh__link-pill"
                    data-cursor="open"
                    aria-label={`Navigate to ${link.label}`}
                  >
                    {link.label}
                    <span className="ask-vighnesh__link-arrow" aria-hidden="true">
                      →
                    </span>
                  </TransitionLink>
                ))}
              </nav>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
