import { MapsApiService, type MapData } from '$lib/api/maps';
import { Status, Difficulty, Mode, Length } from '$lib/api/sessions';
import { perkToString } from '$lib/util/enum-to-text';
import { writable } from 'svelte/store';

export type SelectOption = {
  id: number;
  label: string;
  disabled?: boolean;
};

export function getStore() {
  const maps = writable<MapData[]>([]);

  const perks: SelectOption[] = new Array(10)
    .fill(0)
    .map((_, i) => i + 1)
    .map((id) => ({
      id,
      label: perkToString(id),
    }));

  const statuses: SelectOption[] = [
    { id: Status.Aborted, label: 'Aborted' },
    { id: Status.InProgress, label: 'In Progress' },
    { id: Status.Lobby, label: 'In Lobby' },
    { id: Status.Lose, label: 'Loss' },
    { id: Status.Win, label: 'Win' },
    { id: Status.Solomode, label: 'Solomode', disabled: true },
  ];

  const difficulties: SelectOption[] = [
    { id: Difficulty.Normal, label: 'Normal' },
    { id: Difficulty.Hard, label: 'Hard' },
    { id: Difficulty.Suicidal, label: 'Suicidal' },
    { id: Difficulty.HellOnEarth, label: 'Hell On Earth' },
  ];

  const modes: SelectOption[] = [
    { id: Mode.Survival, label: 'Survival' },
    { id: Mode.Endless, label: 'Endless' },
    { id: Mode.ControlledDifficulty, label: 'CD' },
    { id: Mode.Weekly, label: 'Weekly' },
    { id: Mode.Objective, label: 'Objective' },
    { id: Mode.Versus, label: 'Versus' },
    { id: Mode.Any, label: 'Other' },
  ];

  const lengths: SelectOption[] = [
    { id: Length.Short, label: 'Short' },
    { id: Length.Medium, label: 'Medium' },
    { id: Length.Long, label: 'Long' },
    { id: Length.Custom, label: 'Custom' },
  ];

  const fetch = async () => {
    try {
      await MapsApiService.getByPattern().then(({ data }) => {
        maps.set(data);
      });
    } catch (err) {}
  };

  fetch();

  return { maps, statuses, difficulties, modes, lengths, perks };
}
