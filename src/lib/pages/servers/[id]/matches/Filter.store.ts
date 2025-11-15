import { MapsApiService, type MapData } from '$lib/api/maps';
import { GameStatus } from '$lib/api/sessions';
import { writable } from 'svelte/store';

export type SelectOption = {
  id: number;
  label: string;
  disabled?: boolean;
};

export function getStore() {
  const maps = writable<MapData[]>([]);

  const statuses: SelectOption[] = [
    { id: GameStatus.Aborted, label: 'Aborted' },
    { id: GameStatus.InProgress, label: 'In Progress' },
    { id: GameStatus.Lobby, label: 'In Lobby' },
    { id: GameStatus.Lose, label: 'Loss' },
    { id: GameStatus.Win, label: 'Win' },
    { id: GameStatus.Solomode, label: 'Solomode', disabled: true },
  ];

  const zedsTypes: SelectOption[] = [
    { id: 1, label: 'Vanilla' },
    { id: 2, label: 'Harder' },
    { id: 3, label: 'Nightcore' },
  ];

  const fetch = async () => {
    try {
      await MapsApiService.getByPattern().then(({ data }) => {
        maps.set(data.sort(sortMapsByName));
      });
    } catch (err) {}
  };

  fetch();

  return { maps, statuses, zedsTypes };
}

function sortMapsByName(a: MapData, b: MapData) {
  return a.name.localeCompare(b.name);
}

export function convertZedType(option: SelectOption) {
  if (option.id === 1) return 'vanilla';
  if (option.id === 2) return 'harder';
  if (option.id === 3) return 'nightcore';

  return 'vanilla';
}
