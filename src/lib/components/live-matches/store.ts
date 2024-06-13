import lodash from 'lodash';
import { writable } from 'svelte/store';

import type { Readable } from 'svelte/motion';
import { MatchesApiService, type MatchData } from '$lib/api/matches';
import type { WithRequired } from '$lib/util/types';
import { Mode, Status } from '$lib/api/sessions';

function getModePriority(mode: Mode) {
  const priority = {
    [Mode.ControlledDifficulty]: 1,
    [Mode.Survival]: 2,
    [Mode.Endless]: 3,
    [Mode.Weekly]: 4,
    [Mode.Objective]: 5,
    [Mode.Versus]: 6,
    [Mode.Any]: 7,
  };

  return priority[mode];
}

function compareMatches(
  a: WithRequired<MatchData, 'game_data' | 'server' | 'map'>,
  b: WithRequired<MatchData, 'game_data' | 'server' | 'map'>
) {
  if (a.session.diff !== b.session.diff) return b.session.diff - a.session.diff;
  if (a.session.mode !== b.session.mode)
    return getModePriority(a.session.mode) - getModePriority(b.session.mode);
  if (a.session.length !== b.session.length)
    return b.session.length - a.session.length;
  if (a.game_data.wave != b.game_data.wave)
    return b.game_data.wave - a.game_data.wave;
  if (a.game_data.players_online != b.game_data.players_online)
    return b.game_data.players_online - a.game_data.players_online;

  return a.map.name.localeCompare(b.map.name);
}

export function matchesStore(): [
  Readable<WithRequired<MatchData, 'game_data' | 'server' | 'map'>[]>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<() => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const matches = writable<
    WithRequired<MatchData, 'game_data' | 'server' | 'map'>[]
  >([]);

  const fetch = lodash.debounce(async () => {
    try {
      loading.set(true);

      let page = 0;
      const temp: any[] = [];

      do {
        const { data } = await MatchesApiService.filter({
          include_server: true,
          include_map: true,
          include_game_data: true,
          include_cd_data: true,
          status: [Status.InProgress, Status.Lobby],
          pager: { page, results_per_page: 100 },
        });

        temp.push(...data.items);
        const meta = data.metadata;
        page += 1;

        if (meta.total_results <= page * meta.results_per_page) break;
      } while (true);

      matches.set(temp.sort(compareMatches));
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return [matches, loading, error, fetch];
}
