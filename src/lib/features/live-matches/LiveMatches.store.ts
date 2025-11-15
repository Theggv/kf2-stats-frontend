import { writable } from 'svelte/store';

import { MatchesFilterApiService, type Match } from '$lib/api/matches/filter';
import { GameMode, GameStatus } from '$lib/api/sessions';
import { debounce } from '$lib/util';

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

function compareMatches(a: Match, b: Match) {
  if (a.session.diff !== b.session.diff) {
    return b.session.diff - a.session.diff;
  }

  if (a.session.mode !== b.session.mode) {
    return getModePriority(a.session.mode) - getModePriority(b.session.mode);
  }

  if (a.session.length !== b.session.length) {
    return b.session.length - a.session.length;
  }

  if (a.details.game_data!.wave !== b.details.game_data!.wave) {
    return b.details.game_data!.wave - a.details.game_data!.wave;
  }

  if (
    a.details.game_data!.players_online !== b.details.game_data!.players_online
  ) {
    return (
      b.details.game_data!.players_online - a.details.game_data!.players_online
    );
  }

  return a.details.map!.name.localeCompare(b.details.map!.name);
}

export function getStore() {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const matches = writable<Match[]>([]);

  const update = debounce(async () => {
    try {
      loading.set(true);

      let page = 0;
      const temp: Match[] = [];

      do {
        const { data } = await MatchesFilterApiService.filter({
          statuses: [GameStatus.Lobby, GameStatus.InProgress],
          includes: {
            server_data: true,
            map_data: true,
            game_data: true,
            extra_game_data: true,
            live_data: true,
          },
          pager: { page, results_per_page: 10 },
        });

        temp.push(...(data.items as Match[]));
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

  return { matches, loading, error, fetch: update };
}
