import type { FindUserSessionsResponseItem } from '$lib/api/analytics';
import { Perk } from '$lib/api/matches';
import { Status } from '$lib/api/sessions';

export function inProgress(item: FindUserSessionsResponseItem) {
  return (
    item.session.status === Status.Lobby ||
    item.session.status === Status.InProgress
  );
}

export function notInProgress(item: FindUserSessionsResponseItem) {
  return (
    item.session.status !== Status.Lobby &&
    item.session.status !== Status.InProgress
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
