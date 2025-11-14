import type { MatchData } from '$lib/api/matches';
import type { WithRequired } from '$lib/util/types';

export type Match = WithRequired<MatchData, 'server' | 'map' | 'game_data'>;
