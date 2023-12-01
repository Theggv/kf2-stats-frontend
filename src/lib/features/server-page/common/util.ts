import type { MatchData } from '$lib/api/matches';
import { Status } from '$lib/api/sessions';
import type { WithRequired } from '$lib/util/types';

export const iconSettings = {
  color: 'var(--text-secondary)',
  size: 24,
};

export function inProgress(item: ServerMatch) {
  return (
    item.session.status === Status.Lobby ||
    item.session.status === Status.InProgress
  );
}

export function notInProgress(item: ServerMatch) {
  return (
    item.session.status !== Status.Lobby &&
    item.session.status !== Status.InProgress
  );
}

export type ServerMatch = WithRequired<MatchData, 'map' | 'game_data'>;
