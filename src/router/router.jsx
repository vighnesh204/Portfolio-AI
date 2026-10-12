/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';

// ── Route-level code splitting ────────────────────────────────────────────────
// Home is eager (above-fold, LCP-critical).
// All secondary routes are lazy-loaded — split into separate JS chunks so the
// initial bundle only ships what's needed for the first visit (usually Home).
//
// PageTransition covers the viewport during navigation, so the Suspense fallback
// (null) is invisible — there is no blank-page flash between route switches.
// ─────────────────────────────────────────────────────────────────────────────
const About        = lazy(() => import('../pages/About'));
const Work         = lazy(() => import('../pages/Work'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const AiLearning   = lazy(() => import('../pages/AiLearning'));
const AiSeason     = lazy(() => import('../pages/AiSeason'));
const AiNote       = lazy(() => import('../pages/AiNote'));
const Journey      = lazy(() => import('../pages/Journey'));
const Contact      = lazy(() => import('../pages/Contact'));
const NotFound     = lazy(() => import('../pages/NotFound'));

// Minimal Suspense fallback — invisible during page transitions since panels cover viewport.
// Uses a black screen matching the site background to prevent any flash.
function PageShell() {
  return <div style={{ minHeight: '100vh', background: 'var(--color-bg, #0a0a0a)' }} />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about',                      element: <Suspense fallback={<PageShell />}><About /></Suspense> },
      { path: 'work',                        element: <Suspense fallback={<PageShell />}><Work /></Suspense> },
      { path: 'work/:slug',                  element: <Suspense fallback={<PageShell />}><ProjectDetail /></Suspense> },
      { path: 'ai-learning',                 element: <Suspense fallback={<PageShell />}><AiLearning /></Suspense> },
      { path: 'ai-learning/:season',         element: <Suspense fallback={<PageShell />}><AiSeason /></Suspense> },
      { path: 'ai-learning/:season/:note',   element: <Suspense fallback={<PageShell />}><AiNote /></Suspense> },
      { path: 'journey',                     element: <Suspense fallback={<PageShell />}><Journey /></Suspense> },
      { path: 'contact',                     element: <Suspense fallback={<PageShell />}><Contact /></Suspense> },
      { path: '*',                           element: <Suspense fallback={<PageShell />}><NotFound /></Suspense> },
    ],
  },
]);

export default router;
