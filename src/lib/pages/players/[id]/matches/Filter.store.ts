import { MapsApiService, type MapData } from '$lib/api/maps';
import { ServersApiService, type ServerData } from '$lib/api/servers';
import {
  GameStatus,
  GameDifficulty,
  GameMode,
  GameLength,
} from '$lib/api/sessions';
import { perkToString } from '$lib/util/enum-to-text';
import { writable } from 'svelte/store';

export type SelectOption = {
  id: number;
  label: string;
  disabled?: boolean;
};

export function getStore() {
  const maps = writable<MapData[]>([]);
  const servers = writable<ServerData[]>([]);

  const perks: SelectOption[] = new Array(10)
    .fill(0)
    .map((_, i) => i + 1)
    .map((id) => ({
      id,
      label: perkToString(id),
    }));

  const statuses: SelectOption[] = [
    { id: GameStatus.Aborted, label: 'Aborted' },
    { id: GameStatus.InProgress, label: 'In Progress' },
    { id: GameStatus.Lobby, label: 'In Lobby' },
    { id: GameStatus.Lose, label: 'Loss' },
    { id: GameStatus.Win, label: 'Win' },
    { id: GameStatus.Solomode, label: 'Solomode', disabled: true },
  ];

  const difficulties: SelectOption[] = [
    { id: GameDifficulty.Normal, label: 'Normal' },
    { id: GameDifficulty.Hard, label: 'Hard' },
    { id: GameDifficulty.Suicidal, label: 'Suicidal' },
    { id: GameDifficulty.HellOnEarth, label: 'Hell On Earth' },
  ];

  const modes: SelectOption[] = [
    { id: GameMode.Survival, label: 'Survival' },
    { id: GameMode.Endless, label: 'Endless' },
    { id: GameMode.ControlledDifficulty, label: 'CD' },
    { id: GameMode.Weekly, label: 'Weekly' },
    { id: GameMode.Objective, label: 'Objective' },
    { id: GameMode.Versus, label: 'Versus' },
    { id: GameMode.Any, label: 'Other' },
  ];

  const lengths: SelectOption[] = [
    { id: GameLength.Short, label: 'Short' },
    { id: GameLength.Medium, label: 'Medium' },
    { id: GameLength.Long, label: 'Long' },
    { id: GameLength.Custom, label: 'Custom' },
  ];

  const zedsTypes: SelectOption[] = [
    { id: 1, label: 'Vanilla' },
    { id: 2, label: 'Harder' },
    { id: 3, label: 'Nightcore' },
  ];

  const fetch = async () => {
    try {
      await MapsApiService.getByPattern().then(({ data }) => {
        maps.set(data);
      });
    } catch (err) {}

    try {
      await ServersApiService.getByPattern().then(({ data }) => {
        servers.set(data.sort((a, b) => a.name.localeCompare(b.name)));
      });
    } catch (err) {}
  };

  fetch();

  return {
    maps,
    servers,
    statuses,
    difficulties,
    modes,
    lengths,
    perks,
    zedsTypes,
  };
}

export function convertZedType(option: SelectOption) {
  if (option.id === 1) return 'vanilla';
  if (option.id === 2) return 'harder';
  if (option.id === 3) return 'nightcore';

  return 'vanilla';
}
