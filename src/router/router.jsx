import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';

import Home from '../pages/Home';
import About from '../pages/About';
import Work from '../pages/Work';
import ProjectDetail from '../pages/ProjectDetail';
import AiLearning from '../pages/AiLearning';
import AiSeason from '../pages/AiSeason';
import AiNote from '../pages/AiNote';
import Lab from '../pages/Lab';
import Journey from '../pages/Journey';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,                               element: <Home /> },
      { path: 'about',                             element: <About /> },
      { path: 'work',                              element: <Work /> },
      { path: 'work/:slug',                        element: <ProjectDetail /> },
      { path: 'ai-learning',                       element: <AiLearning /> },
      { path: 'ai-learning/:season',               element: <AiSeason /> },
      { path: 'ai-learning/:season/:note',         element: <AiNote /> },
      { path: 'lab',                               element: <Lab /> },
      { path: 'journey',                           element: <Journey /> },
      { path: 'contact',                           element: <Contact /> },
      { path: '*',                                 element: <NotFound /> },
    ],
  },
]);

export default router;
