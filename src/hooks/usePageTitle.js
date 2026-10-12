// ─── usePageTitle ─────────────────────────────────────────────────────────────
// Simple, dependency-free page title hook.
// Sets document.title on mount; restores site default on unmount.
//
// Usage:  usePageTitle('Work');
// Result: "Work — Vighnesh Borhade"
// ─────────────────────────────────────────────────────────────────────────────

import { useLayoutEffect } from 'react';

const BASE_TITLE = 'Vighnesh Borhade — Frontend Developer';

export function usePageTitle(pageTitle) {
  useLayoutEffect(() => {
    const prev = document.title;
    document.title = pageTitle ? `${pageTitle} — Vighnesh Borhade` : BASE_TITLE;
    return () => {
      document.title = prev;
    };
  }, [pageTitle]);
}

export default usePageTitle;
