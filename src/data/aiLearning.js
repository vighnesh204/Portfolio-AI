// src/data/aiLearning.js
// Re-export from modular data architecture in src/data/aiLearning/

import seasons, {
  getAllSeasons,
  getSeasonBySlug,
  getNoteBySlug,
  getAllNotes,
} from './aiLearning/index';

export { getAllSeasons, getSeasonBySlug, getNoteBySlug, getAllNotes };
export default seasons;
