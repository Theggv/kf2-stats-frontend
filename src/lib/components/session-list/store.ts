import { type MapData, MapsApiService } from '$lib/api/maps';
import {
  type FilterMatchesRequest,
  type MatchData,
  MatchesApiService,
} from '$lib/api/matches';
import { type ServerData, ServersApiService } from '$lib/api/servers';
import { Status, Difficulty, Mode, Length } from '$lib/api/sessions';
import type { WithRequired } from '$lib/util/types';
import lodash from 'lodash';
import { writable, type Readable, type Writable, derived } from 'svelte/store';

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

export type AvailableFilters = Partial<
  Pick<
    FilterMatchesRequest,
    | 'diff'
    | 'length'
    | 'mode'
    | 'server_id'
    | 'map_id'
    | 'status'
    | 'include_server'
  >
>;

export function serverListStore(): [
  Readable<ServerData[]>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<() => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const servers = writable<ServerData[]>([]);

  const fetch = lodash.debounce(async () => {
    try {
      loading.set(true);
      const { data } = await ServersApiService.getByPattern();
      servers.set(data);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  fetch();

  return [servers, loading, error, fetch];
}

export function mapListStore(): [
  Readable<MapData[]>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<() => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const maps = writable<MapData[]>([]);

  const fetch = lodash.debounce(async () => {
    try {
      loading.set(true);
      const { data } = await MapsApiService.getByPattern();
      maps.set(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  fetch();

  return [maps, loading, error, fetch];
}
