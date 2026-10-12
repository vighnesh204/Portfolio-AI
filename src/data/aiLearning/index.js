import season1 from './season1.js';
import season2 from './season2.js';
import season3 from './season3.js';
import season4 from './season4.js';
import season5 from './season5.js';

const seasons = [season1, season2, season3, season4, season5];

export function getAllSeasons() {
  return seasons;
}

export function getSeasonBySlug(slug) {
  return seasons.find((season) => season.slug === slug);
}

export function getNoteBySlug(seasonSlug, noteSlug) {
  const season = getSeasonBySlug(seasonSlug);
  if (!season || !season.notes) return null;
  return season.notes.find((note) => note.slug === noteSlug) || null;
}

export function getAllNotes() {
  return seasons.flatMap((season) =>
    (season.notes || []).map((note) => ({
      ...note,
      seasonSlug: season.slug,
      seasonNumber: season.seasonNumber,
      seasonTitle: season.title,
    }))
  );
}

export default seasons;
