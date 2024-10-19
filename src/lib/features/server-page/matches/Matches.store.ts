import { MatchesApiService, type FilterMatchesRequest } from '$lib/api/matches';

import { debounce } from '$lib/util';
import { derived, writable } from 'svelte/store';
import type { ServerMatch } from '../common';

type AvailableFilters = Partial<
  Pick<FilterMatchesRequest, 'diff' | 'length' | 'mode' | 'map_id' | 'status'>
>;

export function getStore() {
  const serverIdStore = writable<number | null>(null);

  const page = writable(0);
  const filter = writable<AvailableFilters>({});

  const matches = writable<ServerMatch[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = debounce(
    async (server_id: number, page: number, args: AvailableFilters) => {
      try {
        await MatchesApiService.filter({
          include_map: true,
          include_game_data: true,
          include_cd_data: true,
          server_id: [server_id],
          reverse_order: true,
          pager: { page, results_per_page: 100 },
          ...args,
        }).then(({ data }) => {
          if (!page) matches.set(data.items as any);
          else matches.update((prev) => [...prev, ...(data.items as any)]);

          total.set(data.metadata.total_results);
          hasMore.set(data.items.length >= 100);
        });
      } catch (err) {}
    },
    100
  );

  const args = derived(
    [serverIdStore, page, filter],
    ([userId, page, filter]) => ({
      userId,
      page,
      filter,
    })
  );

  // Reset page if server_id had changed
  serverIdStore.subscribe(() => {
    page.set(0);
  });

  filter.subscribe(() => {
    page.set(0);
  });

  args.subscribe((args) => {
    if (!args.userId) return;

    fetch(args.userId, args.page, args.filter);
  });

  return { serverIdStore, page, filter, matches, total, hasMore };
}
