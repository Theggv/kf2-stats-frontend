import { Perk } from '$lib/api/matches';

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
