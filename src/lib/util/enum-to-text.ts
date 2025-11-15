import { Perk } from '$lib/api/matches';
import {
  GameDifficulty,
  GameLength,
  GameMode,
  GameStatus,
} from '$lib/api/sessions';

export function diffToString(diff: GameDifficulty) {
  switch (diff) {
    case GameDifficulty.Normal:
      return 'Normal';
    case GameDifficulty.Hard:
      return 'Hard';
    case GameDifficulty.Suicidal:
      return 'Suicidal';
    case GameDifficulty.HellOnEarth:
      return 'HoE';
  }
}

export function lengthToString(len: number) {
  switch (len) {
    case GameLength.Short:
      return 'Short';
    case GameLength.Medium:
      return 'Medium';
    case GameLength.Long:
      return 'Long';
    default:
      return 'Custom';
  }
}

export function modeToString(mode: GameMode, shorten: boolean = true) {
  const data: any = {
    [GameMode.Any]: {
      short: 'Any',
      long: 'Any',
    },
    [GameMode.Survival]: {
      short: 'Survival',
      long: 'Survival',
    },
    [GameMode.Endless]: {
      short: 'Endless',
      long: 'Endless',
    },
    [GameMode.ControlledDifficulty]: {
      short: 'CD',
      long: 'Controlled Difficulty',
    },
    [GameMode.Weekly]: {
      short: 'Weekly',
      long: 'Weekly',
    },
    [GameMode.Objective]: {
      short: 'Objective',
      long: 'Objective',
    },
    [GameMode.Versus]: {
      short: 'Versus',
      long: 'Versus',
    },
  };

  const format = shorten ? 'short' : 'long';

  return data[mode][format];
}

export function statusToString(status?: GameStatus) {
  switch (status) {
    case GameStatus.Lobby:
      return 'In Lobby';
    case GameStatus.InProgress:
      return 'In Progress';
    case GameStatus.Win:
      return 'Win';
    case GameStatus.Lose:
      return 'Loss';
    case GameStatus.Solomode:
      return 'Solomode';
    case GameStatus.Aborted:
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
