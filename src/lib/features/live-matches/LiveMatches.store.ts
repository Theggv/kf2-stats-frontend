import { writable } from 'svelte/store';

import { MatchesApiService, type MatchData } from '$lib/api/matches';
import type { WithRequired } from '$lib/util/types';
import { GameMode, GameStatus } from '$lib/api/sessions';
import { debounce } from '$lib/util';

export type LiveMatchData = WithRequired<
  MatchData,
  'game_data' | 'server' | 'map'
>;

function getModePriority(mode: GameMode) {
  const priority = {
    [GameMode.ControlledDifficulty]: 1,
    [GameMode.Survival]: 2,
    [GameMode.Endless]: 3,
    [GameMode.Weekly]: 4,
    [GameMode.Objective]: 5,
    [GameMode.Versus]: 6,
    [GameMode.Any]: 7,
  };

  return priority[mode];
}

function compareMatches(a: LiveMatchData, b: LiveMatchData) {
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

export function getStore() {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const matches = writable<LiveMatchData[]>([]);

  const update = debounce(async () => {
    try {
      loading.set(true);

      let page = 0;
      const temp: LiveMatchData[] = [];

      do {
        const { data } = await MatchesApiService.filter({
          include_server: true,
          include_map: true,
          include_game_data: true,
          include_cd_data: true,
          include_players: true,
          statuses: [GameStatus.Lobby, GameStatus.InProgress],
          pager: { page, results_per_page: 10 },
        });

        temp.push(...(data.items as LiveMatchData[]));
        const meta = data.metadata;
        page += 1;

        if (meta.total_results <= page * meta.results_per_page) break;
      } while (true);

      matches.set(
        temp
          .filter((x) => x.players?.length || x.spectators?.length)
          .sort(compareMatches)
      );
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return { matches, loading, error, fetch: update };
}
