import { MatchesApiService } from '$lib/api/matches';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

import type { ServerMatch } from '../common';

export function getStore() {
  const serverIdStore = writable<number | null>(null);

  const lastMatches = writable<ServerMatch[]>([]);

  const fetch = debounce(async (server_id: number) => {
    try {
      await MatchesApiService.filter({
        include_map: true,
        include_game_data: true,
        include_cd_data: true,
        server_id: [server_id],
        reverse_order: true,
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
