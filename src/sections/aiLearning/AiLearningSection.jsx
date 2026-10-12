import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './aiLearning.css';
import { getAllSeasons } from '../../data/aiLearning';
import SeasonCard from './SeasonCard';
import TransitionLink from '../../components/ui/TransitionLink';

gsap.registerPlugin(ScrollTrigger);

// ─── AiLearningSection ───────────────────────────────────────────────────────
// Homepage section mounted immediately after SelectedWork.
// Recreates the reference portfolio's Certificates section SCROLL CHOREOGRAPHY:
// - Pinned desktop viewport: left editorial anchor stays stationary
// - Right card stage: Season 01 enters focal position, then glides left as
//   Season 02 arrives from the right, rotating and settling into prime focus.
// - Real-time scroll scrubbed counter progress (01 ─────── 02).
// - Independent transform layers ensure scroll motion and click-to-flip never conflict.
// - Respects prefers-reduced-motion and provides clean vertical flow on mobile.
// ─────────────────────────────────────────────────────────────────────────────

export default function AiLearningSection() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const lineRef = useRef(null);
  const titleRef = useRef(null);
  const counterFillRef = useRef(null);
  const activeNumRef = useRef(null);
  const totalNumRef = useRef(null);

  const seasons = getAllSeasons();

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const line = lineRef.current;
    const title = titleRef.current;

    if (!section || !pinContainer) return;

    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        isDesktop: '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        isMobileOrReduced: '(max-width: 1024px), (prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop } = context.conditions;

        // 1. Top hairline divider reveal (all viewports)
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // 2. Character entrance reveal for NAMASTE AI title (all viewports)
        if (title) {
          const chars = title.querySelectorAll('.char');
          if (chars.length > 0) {
            gsap.fromTo(
              chars,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power3.out',
                stagger: 0.035,
                scrollTrigger: {
                  trigger: section,
                  start: 'top 80%',
                  once: true,
                },
              }
            );
          }
        }

        // Mobile or Reduced Motion: Natural vertical layout without scroll pinning
        if (!isDesktop) {
          const motionCards = section.querySelectorAll('.season-card-motion');
          gsap.fromTo(
            motionCards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                once: true,
              },
            }
          );
          return;
        }

        // Desktop: Choreographed Scroll Sequence with Pinning for N Cards
        const cards = gsap.utils.toArray(section.querySelectorAll('.season-card-motion'));
        if (cards.length < 2) return;

        const numCards = cards.length;

        // Initial card stage setup:
        cards.forEach((card, idx) => {
          if (idx === 0) {
            // Card 0 starts in prime focus (cleanly within right card stage)
            gsap.set(card, {
              x: 30,
              y: 0,
              rotateZ: 0,
              scale: 1,
              opacity: 1,
              zIndex: 10,
              transformOrigin: 'center center',
            });
          } else {
            // Successive cards start offset to the right with graceful perspective stagger
            const slot = idx; // 1 = immediate next peek, 2 = 2nd peek...
            gsap.set(card, {
              x: 480 + (slot - 1) * 280,
              y: 0,
              rotateZ: 4 + (slot - 1) * 2.5,
              scale: Math.max(0.94 - (slot - 1) * 0.06, 0.78),
              opacity: Math.max(0.85 - (slot - 1) * 0.35, 0),
              zIndex: 8 - slot,
              transformOrigin: 'center center',
            });
          }
        });

        const entryDwell = 0.35;
        const stepDuration = 1.0;
        const exitDwell = 0.75;
        const totalDuration = entryDwell + (numCards - 1) * stepDuration + exitDwell;

        // Main Choreographed Scroll Timeline
        // Uses functional pixel distance rather than trigger % to eliminate spacer feedback loops
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'namaste-ai-pin',
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * (numCards - 1) * 0.95)}`,
            pin: pinContainer,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress;

              // Update counter hairline fill
              if (counterFillRef.current) {
                counterFillRef.current.style.transform = `scaleX(${Math.min(Math.max(p, 0), 1)})`;
              }

              // Update active number indicator (01 to 05), synchronized with transition midpoints
              if (activeNumRef.current) {
                const currentTime = p * totalDuration;
                let activeIndex = 0;
                for (let i = 0; i < numCards - 1; i++) {
                  const threshold = entryDwell + i * stepDuration + 0.5 * stepDuration;
                  if (currentTime >= threshold) {
                    activeIndex = i + 1;
                  }
                }
                activeNumRef.current.textContent = String(activeIndex + 1).padStart(2, '0');
              }
            },
          },
        });

        // Hold initial focal card briefly upon pinning
        tl.to({}, { duration: entryDwell }, 0);

        // Multi-step choreographed transitions:
        for (let step = 0; step < numCards - 1; step++) {
          const stepTime = entryDwell + step * stepDuration;

          // Currently focal card transitions left slightly and dissolves inside stage
          tl.to(
            cards[step],
            {
              x: -60,
              rotateZ: -3,
              scale: 0.92,
              opacity: 0,
              zIndex: 1,
              ease: 'power1.inOut',
              duration: stepDuration,
            },
            stepTime
          );

          // Keep earlier cards faded out
          for (let prev = 0; prev < step; prev++) {
            tl.to(
              cards[prev],
              {
                x: -90,
                opacity: 0,
                zIndex: 0,
                duration: stepDuration,
              },
              stepTime
            );
          }

          // Next card arrives into prime focus
          tl.to(
            cards[step + 1],
            {
              x: 30,
              rotateZ: 0,
              scale: 1,
              opacity: 1,
              zIndex: 10 + step + 1,
              ease: 'power1.inOut',
              duration: stepDuration,
            },
            stepTime
          );

          // Subsequent cards advance one slot closer
          for (let next = step + 2; next < numCards; next++) {
            const slot = next - (step + 1);
            const targetX = 480 + (slot - 1) * 280;
            const targetRot = 4 + (slot - 1) * 2.5;
            const targetScale = Math.max(0.94 - (slot - 1) * 0.06, 0.78);
            const targetOpacity = Math.max(0.85 - (slot - 1) * 0.35, 0);

            tl.to(
              cards[next],
              {
                x: targetX,
                rotateZ: targetRot,
                scale: targetScale,
                opacity: targetOpacity,
                zIndex: 8 - slot,
                ease: 'power1.inOut',
                duration: stepDuration,
              },
              stepTime
            );
          }
        }

        // Hold final focal card (Season 05) before smooth release
        tl.to({}, { duration: exitDwell }, entryDwell + (numCards - 1) * stepDuration);
      }
    );

    // Ensure layout and fonts are settled so ScrollTrigger positions are accurate
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ai-learning-scroll-section"
      id="ai-learning"
      aria-label="Namaste AI Learning Section"
    >
      <div ref={lineRef} className="ai-learning-section__top-line" />

      {/* Pinned Viewport Container */}
      <div ref={pinContainerRef} className="ai-learning-pin-container">
        <div className="wrap w-full">
          <div className="ai-section-split">
            {/* ─── LEFT COLUMN: STATIONARY EDITORIAL ANCHOR ─── */}
            <div className="ai-section-sidebar">
              <div className="ai-section-eyebrow">
                <span className="ai-section-eyebrow__dot" />
                <span>[ 04 / AI LEARNING ]</span>
              </div>

              <h2 ref={titleRef} className="ai-section-title" aria-label="NAMASTE AI">
                <span className="ai-title-line">
                  {'NAMASTE'.split('').map((char, idx) => (
                    <span key={idx} className="char">
                      {char}
                    </span>
                  ))}
                </span>
                <span className="ai-title-line">
                  {'AI'.split('').map((char, idx) => (
                    <span key={idx} className="char">
                      {char}
                    </span>
                  ))}
                </span>
              </h2>

              <div className="ai-section-subtitle-block">
                <p className="ai-section-subtitle">
                  A few milestones along the way.
                </p>
                <p className="ai-section-instruction">
                  Click a card to turn it over.
                </p>
              </div>

              {/* Counter Hairline Progress: 01 ────────── 05 */}
              <div className="ai-section-counter-row" aria-hidden="true">
                <span ref={activeNumRef} className="ai-counter-num is-active">
                  01
                </span>
                <div className="ai-counter-track">
                  <div ref={counterFillRef} className="ai-counter-fill" />
                </div>
                <span ref={totalNumRef} className="ai-counter-num">
                  {String(seasons.length).padStart(2, '0')}
                </span>
              </div>

              {/* Explore All CTA Button */}
              <div className="ai-section-sidebar-cta">
                <TransitionLink
                  to="/ai-learning"
                  className="ai-learning-explore-link"
                  data-cursor="explore"
                  aria-label="Explore all AI Learning seasons and notes"
                >
                  <span>Explore All AI Learning</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </TransitionLink>
              </div>
            </div>

            {/* ─── RIGHT COLUMN: CHOREOGRAPHED CARD STAGE ─── */}
            <div className="ai-cards-stage">
              {seasons.map((season, index) => (
                <SeasonCard
                  key={season.id}
                  season={season}
                  index={index}
                  totalSeasons={seasons.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
