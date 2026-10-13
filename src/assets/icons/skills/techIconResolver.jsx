// ─── techIconResolver.jsx ─────────────────────────────────────────────────────
// Editorial technology icon resolver component for portfolio projects.
// Maps technology name strings (from projects.js) to their branded SVG icon.
// Reuses the official brand icons from skillIcons.jsx where available,
// falling back cleanly to ConceptIcon for unmapped technologies.
// ─────────────────────────────────────────────────────────────────────────────

import {
  ReactIcon,
  JavaScriptIcon,
  TypeScriptIcon,
  TailwindIcon,
  HTML5Icon,
  CSS3Icon,
  ViteIcon,
  GSAPIcon,
  NodeIcon,
  ExpressIcon,
  MongoDBIcon,
  GitIcon,
  ReduxIcon,
  ZustandIcon,
  GeminiIcon,
  NextJsIcon,
  ConceptIcon,
  ReactRouterIcon,
  YoutubeIcon,
  MonacoIcon,
  FramerMotionIcon,
} from './skillIcons';

export function TechIcon({ name }) {
  const key = name ? name.toLowerCase().trim() : '';

  switch (key) {
    case 'react':
    case 'react.js':
    case 'react 19':
      return <ReactIcon />;

    case 'javascript':
    case 'js':
      return <JavaScriptIcon />;

    case 'typescript':
    case 'ts':
      return <TypeScriptIcon />;

    case 'tailwind':
    case 'tailwind css':
    case 'tailwindcss':
      return <TailwindIcon />;

    case 'html':
    case 'html5':
      return <HTML5Icon />;

    case 'css':
    case 'css3':
      return <CSS3Icon />;

    case 'vite':
      return <ViteIcon />;

    case 'gsap':
    case 'scrolltrigger':
      return <GSAPIcon />;

    case 'node':
    case 'node.js':
    case 'nodejs':
      return <NodeIcon />;

    case 'express':
    case 'express.js':
      return <ExpressIcon />;

    case 'mongodb':
      return <MongoDBIcon />;

    case 'git':
    case 'github':
      return <GitIcon />;

    case 'redux':
    case 'redux toolkit':
      return <ReduxIcon />;

    case 'zustand':
      return <ZustandIcon />;

    case 'gemini':
    case 'gemini api':
    case 'gemini 2.0 flash':
    case 'google gemini':
      return <GeminiIcon />;

    case 'next':
    case 'next.js':
    case 'nextjs':
      return <NextJsIcon />;

    case 'react router':
    case 'react router dom':
    case 'react router v7':
      return <ReactRouterIcon />;

    case 'youtube':
    case 'youtube api':
    case 'youtube data api':
    case 'youtube data api v3':
      return <YoutubeIcon />;

    case 'monaco':
    case 'monaco editor':
      return <MonacoIcon />;

    case 'framer motion':
    case 'motion':
      return <FramerMotionIcon />;

    default:
      return <ConceptIcon />;
  }
}
