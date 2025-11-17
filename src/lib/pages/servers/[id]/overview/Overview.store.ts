import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

import type { Match } from '$lib/api/matches';
import { MatchesFilterApiService } from '$lib/api/matches/filter';

export function getStore() {
  const serverIdStore = writable<number | null>(null);

  const lastMatches = writable<Match[]>([]);

  const fetch = debounce(async (server_id: number) => {
    try {
      await MatchesFilterApiService.filter({
        server_ids: [server_id],
        includes: {
          map_data: true,
          game_data: true,
          extra_game_data: true,
        },
        sort_by: { direction: 1 },
        pager: { results_per_page: 20 },
      }).then(({ data }) => lastMatches.set(data.items as any));
    } catch (err) {}
  }, 100);

  serverIdStore.subscribe((id) => {
    if (!id) return;
    fetch(id);
  });

  return { serverIdStore, lastMatches };
}
