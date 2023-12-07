import { MatchesApiService, type FilterMatchesRequest } from '$lib/api/matches';

import lodash from 'lodash';
import { derived, writable } from 'svelte/store';
import type { Match } from './common';

type AvailableFilters = Partial<
  Pick<
    FilterMatchesRequest,
    'diff' | 'length' | 'mode' | 'map_id' | 'status' | 'server_id'
  >
>;

export function getStore() {
  const page = writable(0);
  const filter = writable<AvailableFilters>({});

  const matches = writable<Match[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = lodash.debounce(
    async (page: number, args: AvailableFilters) => {
      try {
        await MatchesApiService.filter({
          include_server: true,
          include_map: true,
          include_game_data: true,
          include_cd_data: true,
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

  const args = derived([page, filter], ([page, filter]) => ({
    page,
    filter,
  }));

  filter.subscribe(() => {
    page.set(0);
  });

  args.subscribe((args) => {
    fetch(args.page, args.filter);
  });

  return { page, filter, matches, total, hasMore };
}
