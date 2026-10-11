import { useState, useRef, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '../components/layout/Header';
import MenuOverlay from '../components/layout/MenuOverlay';
import PageTransition from '../components/transitions/PageTransition';
import CustomCursor from '../components/ui/CustomCursor';
import { getTransitionColor } from '../data/transitionColors';

// RootLayout — the persistent shell for every route.
//
// Owns two pieces of state:
//   isMenuOpen      — controls the fullscreen menu
//   isTransitioning — controls the page transition overlay
//
// handleNavigate(path) is the single entry point for all navigation.
// Both the Header wordmark and MenuOverlay items call this function
// instead of using <Link> or useNavigate directly.
//
// Transition flow:
//   handleNavigate(path)
//   → close menu if open
//   → record pending path + destination color
//   → set isTransitioning = true  (panels cover viewport)
//   → PageTransition fires onCovered callback
//   → navigate to new route + scroll reset
//   → set isTransitioning = false (panels reveal new page)
//   → set isDone = true → PageTransition fires onDone → cleanup

function RootLayout() {
  const navigate = useNavigate();

  const [isMenuOpen,      setIsMenuOpen]      = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState('var(--color-accent)');

  // Guard: prevent a new navigation while panels are moving.
  const isTransitioningRef = useRef(false);
  // Track pending destination so onCovered knows where to go.
  const pendingPathRef = useRef(null);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // ── handleNavigate ─────────────────────────────────────────────────
  // Called by MenuOverlay items, Header wordmark, and any internal link
  // that wants the panel transition.
  //
  // If we are already mid-transition, the click is ignored.
  // ──────────────────────────────────────────────────────────────────
  const handleNavigate = useCallback((path) => {
    // Guard against double-firing.
    if (isTransitioningRef.current) return;

    // Close menu immediately (it will animate out via its own GSAP).
    setIsMenuOpen(false);

    // Record where we are going.
    pendingPathRef.current = path;

    // Pick the panel color for this destination.
    setTransitionColor(getTransitionColor(path));

    // Lock further navigation.
    isTransitioningRef.current = true;
    setIsTransitioning(true);
  }, []);

  // Called by PageTransition when panels fully cover the viewport.
  const handlePanelsCovered = useCallback(() => {
    const destination = pendingPathRef.current;
    if (!destination) return;

    // Change the route while the viewport is hidden behind panels.
    navigate(destination);

    // Reset scroll immediately — page is invisible so this is instant.
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Begin the reveal phase.
    setIsTransitioning(false);
  }, [navigate]);

  // Called by PageTransition when panels have fully exited.
  const handleTransitionDone = useCallback(() => {
    isTransitioningRef.current = false;
    pendingPathRef.current = null;
  }, []);

  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div className="film-vignette" aria-hidden="true" />
      <CustomCursor />
      
      <Header
        onMenuOpen={handleMenuOpen}
        onNavigate={handleNavigate}
      />

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onNavigate={handleNavigate}
      />

      <PageTransition
        isActive={isTransitioning}
        color={transitionColor}
        onCovered={handlePanelsCovered}
        onDone={handleTransitionDone}
      />

      <Outlet context={{ onNavigate: handleNavigate }} />
    </>
  );
}

export default RootLayout;
