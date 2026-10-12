// src/data/transitionColors.js
//
// Destination-specific panel colors for the page transition.
// Centralised here so they are easy to update without touching component code.
//
// Colors are deliberately restrained — one controlled accent per destination.
// They are NOT used anywhere else in the UI.

const transitionColors = {
  '/':            '#c8a96e', // HOME          — warm amber (primary accent)
  '/about':       '#d4cfc9', // ABOUT         — warm neutral / off-white
  '/work':        '#b85c38', // WORK          — burnt orange
  '/ai-learning': '#3a6ea5', // AI LEARNING   — restrained steel blue
  '/journey':     '#6a8c3a', // JOURNEY       — muted olive-lime
  '/contact':     '#8c3a3a', // CONTACT       — restrained crimson
};

// Fallback for any route not listed above.
export const DEFAULT_TRANSITION_COLOR = '#c8a96e';

// Look up a color by path prefix.
// Handles nested paths like /work/my-project → uses '/work' color.
export function getTransitionColor(path) {
  // Exact match first.
  if (transitionColors[path]) {
    return transitionColors[path];
  }

  // Prefix match — handles sub-routes like /work/:slug, /ai-learning/:season.
  const prefix = Object.keys(transitionColors).find(
    (key) => key !== '/' && path.startsWith(key)
  );

  return prefix ? transitionColors[prefix] : DEFAULT_TRANSITION_COLOR;
}

export default transitionColors;
