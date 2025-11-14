import { MapsApiService, type MapData } from '$lib/api/maps';
import { Status } from '$lib/api/sessions';
import { writable } from 'svelte/store';

export type SelectOption = {
  id: number;
  label: string;
  disabled?: boolean;
};

export function getStore() {
  const maps = writable<MapData[]>([]);

  const statuses: SelectOption[] = [
    { id: Status.Aborted, label: 'Aborted' },
    { id: Status.InProgress, label: 'In Progress' },
    { id: Status.Lobby, label: 'In Lobby' },
    { id: Status.Lose, label: 'Loss' },
    { id: Status.Win, label: 'Win' },
    { id: Status.Solomode, label: 'Solomode', disabled: true },
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
