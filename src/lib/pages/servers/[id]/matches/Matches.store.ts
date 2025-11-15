import { debounce } from '$lib/util';
import { derived, get, writable } from 'svelte/store';
import { ServerAnalyticsApiService, type PeriodData } from '$lib/api/analytics';
import {
  MatchesFilterApiService,
  type FilterMatchesRequest,
  type Match,
} from '$lib/api/matches/filter';

export type ActivityType = PeriodData;

type AvailableFilters = Omit<
  FilterMatchesRequest,
  'user_ids' | 'server_ids' | 'pager' | 'sort_by' | 'includes'
>;

export function getStore() {
  const serverIdStore = writable<number | null>(null);

  const loading = writable<boolean>(false);
  const page = writable(0);
  const filter = writable<AvailableFilters>({});

  const year = writable<number>(new Date().getFullYear());
  const activity = writable<ActivityType[]>([]);
  const matches = writable<Match[]>([]);
  const total = writable(0);
  const hasMore = writable(true);
  const abortController = writable(new AbortController());

  const fetch = debounce(
    async (server_id: number, page: number, args: AvailableFilters) => {
      try {
        if (get(loading)) {
          get(abortController).abort();
          abortController.set(new AbortController());
        }

        loading.set(true);

        await MatchesFilterApiService.filter(
          {
            server_ids: [server_id],
            includes: {
              map_data: true,
              game_data: true,
              extra_game_data: true,
            },
            sort_by: { direction: 1 },
            pager: { page, results_per_page: 100 },
            ...args,
          },
          get(abortController).signal
        ).then(({ data }) => {
          if (!page) matches.set(data.items as any);
          else matches.update((prev) => [...prev, ...(data.items as any)]);

          total.set(data.metadata.total_results);
          hasMore.set(data.items.length >= 100);
        });
      } catch (err) {
      } finally {
        loading.set(false);
      }
    },
    100
  );

  const fetchPlaytimeHist = debounce(
    async (server_id: number, year: number, filter: AvailableFilters) => {
      try {
        const isCurrentYear = year === new Date().getFullYear();

        await ServerAnalyticsApiService.getSessionCountHist({
          ...filter,
          server_id,
          date_from: isCurrentYear
            ? new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)
            : new Date(year, 0, 1),
          date_to: isCurrentYear ? new Date() : new Date(year + 1, 0, 0),
        }).then(({ data }) => activity.set(data));
      } catch (err) {}
    },
    100
  );

  const playtimeArgs = derived(
    [serverIdStore, year, filter],
    ([serverId, year, filter]) => ({ serverId, year, filter })
  );

  const args = derived(
    [serverIdStore, page, filter],
    ([serverId, page, filter]) => ({
      serverId,
      page,
      filter,
    })
  );

  // Reset page if server_id had changed
  serverIdStore.subscribe(() => page.set(0));
  filter.subscribe(() => page.set(0));

  playtimeArgs.subscribe((args) => {
    if (!args.serverId) return;

    fetchPlaytimeHist(args.serverId, args.year, args.filter);
  });

  args.subscribe((args) => {
    if (!args.serverId) return;

    fetch(args.serverId, args.page, args.filter);
  });

  return {
    serverIdStore,
    page,
    filter,
    activity,
    year,
    matches,
    total,
    hasMore,
  };
}

export type ServerPageMatchesType = ReturnType<typeof getStore>;
export const ServerPageMatchesName = 'server-page/matches';
