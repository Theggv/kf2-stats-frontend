import { Perk } from '$lib/api/matches';
import { Status } from '$lib/api/sessions';
import type { RecentSessionsResponseSession } from '$lib/api/users';

export function inProgress(item: RecentSessionsResponseSession) {
  return item.status === Status.Lobby || item.status === Status.InProgress;
}

export function notInProgress(item: RecentSessionsResponseSession) {
  return item.status !== Status.Lobby && item.status !== Status.InProgress;
}

export function isPrecisionPerk(perk: Perk) {
  if (
    perk === Perk.Gunslinger ||
    perk === Perk.Sharpshooter ||
    perk === Perk.Commando
  )
    return true;
  return false;
}

export const iconSettings = {
  color: 'var(--text-secondary)',
  size: 24,
};
