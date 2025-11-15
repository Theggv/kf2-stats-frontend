import { type MapData, MapsApiService } from '$lib/api/maps';
import { type ServerData, ServersApiService } from '$lib/api/servers';
import {
  GameStatus,
  GameDifficulty,
  GameMode,
  GameLength,
} from '$lib/api/sessions';
import { writable } from 'svelte/store';

export const statusList: SelectOption[] = [
  { id: GameStatus.Aborted, label: 'Aborted' },
  { id: GameStatus.InProgress, label: 'In Progress' },
  { id: GameStatus.Lobby, label: 'In Lobby' },
  { id: GameStatus.Lose, label: 'Loss' },
  { id: GameStatus.Win, label: 'Win' },
  { id: GameStatus.Solomode, label: 'Solomode', disabled: true },
];

export const difficultyList: SelectOption[] = [
  { id: GameDifficulty.Normal, label: 'Normal' },
  { id: GameDifficulty.Hard, label: 'Hard' },
  { id: GameDifficulty.Suicidal, label: 'Suicidal' },
  { id: GameDifficulty.HellOnEarth, label: 'Hell On Earth' },
];

export const modeList: SelectOption[] = [
  { id: GameMode.Survival, label: 'Survival' },
  { id: GameMode.Endless, label: 'Endless' },
  { id: GameMode.ControlledDifficulty, label: 'Controlled Difficulty' },
  { id: GameMode.Any, label: 'Other' },
];

export const lengthList: SelectOption[] = [
  { id: GameLength.Short, label: 'Short' },
  { id: GameLength.Medium, label: 'Medium' },
  { id: GameLength.Long, label: 'Long' },
  { id: GameLength.Custom, label: 'Custom' },
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
