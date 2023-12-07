import type { MatchData } from '$lib/api/matches';
import type { WithRequired } from '$lib/util/types';

export type Match = WithRequired<MatchData, 'server' | 'map' | 'game_data'>;

export const iconSettings = {
  color: 'var(--text-secondary)',
  size: 24,
};
