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

  const fetch = async () => {
    try {
      await MapsApiService.getByPattern().then(({ data }) => {
        maps.set(data.sort(sortMapsByName));
      });
    } catch (err) {}
  };

  fetch();

  return { maps, statuses };
}

function sortMapsByName(a: MapData, b: MapData) {
  return a.name.localeCompare(b.name);
}
