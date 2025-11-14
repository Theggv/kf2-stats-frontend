import { type MapData, MapsApiService } from '$lib/api/maps';
import { type ServerData, ServersApiService } from '$lib/api/servers';
import { Status, Difficulty, Mode, Length } from '$lib/api/sessions';
import { writable } from 'svelte/store';

export const statusList: SelectOption[] = [
  { id: Status.Aborted, label: 'Aborted' },
  { id: Status.InProgress, label: 'In Progress' },
  { id: Status.Lobby, label: 'In Lobby' },
  { id: Status.Lose, label: 'Loss' },
  { id: Status.Win, label: 'Win' },
  { id: Status.Solomode, label: 'Solomode', disabled: true },
];

export const difficultyList: SelectOption[] = [
  { id: Difficulty.Normal, label: 'Normal' },
  { id: Difficulty.Hard, label: 'Hard' },
  { id: Difficulty.Suicidal, label: 'Suicidal' },
  { id: Difficulty.HellOnEarth, label: 'Hell On Earth' },
];

export const modeList: SelectOption[] = [
  { id: Mode.Survival, label: 'Survival' },
  { id: Mode.Endless, label: 'Endless' },
  { id: Mode.ControlledDifficulty, label: 'Controlled Difficulty' },
  { id: Mode.Any, label: 'Other' },
];

export const lengthList: SelectOption[] = [
  { id: Length.Short, label: 'Short' },
  { id: Length.Medium, label: 'Medium' },
  { id: Length.Long, label: 'Long' },
  { id: Length.Custom, label: 'Custom' },
];

export type SelectOption = { id: number; label: string; disabled?: boolean };

export function getStore() {
  const servers = writable<ServerData[]>([]);
  const maps = writable<MapData[]>([]);

  const fetch = async () => {
    try {
      await MapsApiService.getByPattern().then(({ data }) => {
        maps.set(data.sort((a, b) => a.name.localeCompare(b.name)));
      });

      await ServersApiService.getByPattern().then(({ data }) => {
        servers.set(data.sort((a, b) => a.name.localeCompare(b.name)));
      });
    } catch (err) {}
  };

  fetch();

  return { maps, servers };
}
