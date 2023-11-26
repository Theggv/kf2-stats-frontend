import { Perk } from '$lib/api/matches';
import { Difficulty, Length, Mode, Status } from '$lib/api/sessions';

export function diffToString(diff: Difficulty) {
  switch (diff) {
    case Difficulty.Normal:
      return 'Normal';
    case Difficulty.Hard:
      return 'Hard';
    case Difficulty.Suicidal:
      return 'Suicidal';
    case Difficulty.HellOnEarth:
      return 'HoE';
  }
}

export function lengthToString(len: number) {
  switch (len) {
    case Length.Short:
      return 'Short';
    case Length.Medium:
      return 'Medium';
    case Length.Long:
      return 'Long';
    default:
      return 'Custom';
  }
}

export function modeToString(mode: Mode, shorten: boolean = true) {
  const data: any = {
    [Mode.Any]: {
      short: 'Any',
      long: 'Any',
    },
    [Mode.Survival]: {
      short: 'Survival',
      long: 'Survival',
    },
    [Mode.Endless]: {
      short: 'Endless',
      long: 'Endless',
    },
    [Mode.ControlledDifficulty]: {
      short: 'CD',
      long: 'Controlled Difficulty',
    },
    [Mode.Weekly]: {
      short: 'Weekly',
      long: 'Weekly',
    },
    [Mode.Objective]: {
      short: 'Objective',
      long: 'Objective',
    },
    [Mode.Versus]: {
      short: 'Versus',
      long: 'Versus',
    },
  };

  const format = shorten ? 'short' : 'long';

  return data[mode][format];
}

export function statusToString(status?: Status) {
  switch (status) {
    case Status.Lobby:
      return 'In Lobby';
    case Status.InProgress:
      return 'In Progress';
    case Status.Win:
      return 'Win';
    case Status.Lose:
      return 'Loss';
    case Status.Solomode:
      return 'Solomode';
    case Status.Aborted:
      return 'Aborted';
    default:
      return 'Unknown';
  }
}

export function perkToString(perk: Perk) {
  switch (perk) {
    case Perk.Berserker:
      return 'Berserker';
    case Perk.Commando:
      return 'Commando';
    case Perk.Medic:
      return 'Field Medic';
    case Perk.Sharpshooter:
      return 'Sharpshooter';
    case Perk.Gunslinger:
      return 'Gunslinger';
    case Perk.Support:
      return 'Support';
    case Perk.Swat:
      return 'Swat';
    case Perk.Demolitionist:
      return 'Demolitionist';
    case Perk.Firebug:
      return 'Firebug';
    case Perk.Survivalist:
      return 'Survivalist';
    default:
      return 'Unknown';
  }
}
