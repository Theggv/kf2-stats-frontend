import { type Match } from '$lib/api/matches';
import {
  MatchesFilterApiService,
  type FilterMatchesRequest,
} from '$lib/api/matches/filter';

import { debounce } from '$lib/util';
import { derived, writable } from 'svelte/store';

type AvailableFilters = Partial<
  Pick<
    FilterMatchesRequest,
    'diff' | 'length' | 'mode' | 'map_ids' | 'statuses' | 'server_ids'
  >
>;

export function getStore() {
  const page = writable(0);
  const filter = writable<AvailableFilters>({});

  const matches = writable<Match[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = debounce(async (page: number, args: AvailableFilters) => {
    try {
      await MatchesFilterApiService.filter({
        includes: {
          server_data: true,
          map_data: true,
          game_data: true,
          extra_game_data: true,
        },
        sort_by: { direction: 1 },
        pager: { page, results_per_page: 100 },
        ...args,
      }).then(({ data }) => {
        if (!page) matches.set(data.items as any);
        else matches.update((prev) => [...prev, ...(data.items as any)]);

        total.set(data.metadata.total_results);
        hasMore.set(data.items.length >= 100);
      });
    } catch (err) {}
  }, 100);

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
