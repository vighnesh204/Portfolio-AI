// Placeholder — Phase 1 Foundation
// Route: /ai-learning/:season
// Real design will be implemented in Phase 2.

import { useParams } from 'react-router-dom';

function AiSeason() {
  const { season } = useParams();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold tracking-widest">SEASON: {season}</h1>
    </main>
  );
}

export default AiSeason;
