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

export function modeToString(mode: Mode) {
  switch (mode) {
    case Mode.Any:
      return 'Any';
    case Mode.Survival:
      return 'Survival';
    case Mode.Endless:
      return 'Endless';
    case Mode.ControlledDifficulty:
      return 'CD';
  }
}

export function statusToString(status: Status) {
  switch (status) {
    case Status.Lobby:
      return 'In Lobby';
    case Status.InProgress:
      return 'In Progress';
    case Status.Win:
      return 'Won';
    case Status.Lose:
      return 'Lost';
    case Status.Solomode:
      return 'Solomode';
    case Status.Aborted:
      return 'Aborted';
  }
}
