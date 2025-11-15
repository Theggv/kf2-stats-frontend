import type { MatchData } from '$lib/api/matches';
import { GameStatus } from '$lib/api/sessions';
import type { WithRequired } from '$lib/util/types';

export function inProgress(item: ServerMatch) {
  return (
    item.session.status === GameStatus.Lobby ||
    item.session.status === GameStatus.InProgress
  );
}

export function notInProgress(item: ServerMatch) {
  return (
    item.session.status !== GameStatus.Lobby &&
    item.session.status !== GameStatus.InProgress
  );
}

export type ServerMatch = WithRequired<MatchData, 'map' | 'game_data'>;
