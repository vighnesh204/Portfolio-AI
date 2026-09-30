// Placeholder — Phase 1 Foundation
// Route: /work/:slug
// Real design will be implemented in Phase 2.

import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { slug } = useParams();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold tracking-widest">PROJECT: {slug}</h1>
    </main>
  );
}

export default ProjectDetail;
