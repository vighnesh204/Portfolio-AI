// Placeholder — Phase 1 Foundation
// Route: /ai-learning/:season/:note
// Real design will be implemented in Phase 2.

import { useParams } from 'react-router-dom';

function AiNote() {
  const { season, note } = useParams();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-widest">NOTE: {note}</h1>
        <p className="text-white/50 mt-4 tracking-widest text-sm">SEASON {season}</p>
      </div>
    </main>
  );
}

export default AiNote;
