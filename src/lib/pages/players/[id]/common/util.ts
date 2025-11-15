import type { FindUserSessionsResponseItem } from '$lib/api/analytics';
import { Perk } from '$lib/api/matches';
import { GameStatus } from '$lib/api/sessions';

export function inProgress(item: FindUserSessionsResponseItem) {
  return (
    item.session.status === GameStatus.Lobby ||
    item.session.status === GameStatus.InProgress
  );
}

export function notInProgress(item: FindUserSessionsResponseItem) {
  return (
    item.session.status !== GameStatus.Lobby &&
    item.session.status !== GameStatus.InProgress
  );
}

export function isPrecisionPerk(perk: Perk) {
  if (
    perk === Perk.Gunslinger ||
    perk === Perk.Sharpshooter ||
    perk === Perk.Commando
  ) {
    return true;
  }

  return false;
}
