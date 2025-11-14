import {
  TimePeriod,
  UserAnalyticsApiService,
  type FindUserSessionsRequest,
  type FindUserSessionsResponseItem,
  type PlayTimeHistItem,
} from '$lib/api/analytics';
import type { TokenPayload } from '$lib/api/auth';
import { debounce } from '$lib/util';
import { writable, derived, get, type Readable } from 'svelte/store';

export type ActivityType = Pick<PlayTimeHistItem, 'period' | 'count'>;

type AvailableFilters = Omit<
  FindUserSessionsRequest,
  'user_id' | 'pager' | 'sort_by'
>;

export function getStore(user: Readable<TokenPayload | null>) {
  const userIdStore = writable<number | null>(null);

  const loading = writable<boolean>(false);
  const page = writable(0);
  const sortBy = writable<string>('updated_at');
  const sortDirection = writable<'asc' | 'desc'>('desc');
  const filter = writable<AvailableFilters>({});

  const year = writable<number>(new Date().getFullYear());
  const activity = writable<ActivityType[]>([]);
  const matches = writable<FindUserSessionsResponseItem[]>([]);
  const total = writable(0);
  const hasMore = writable(true);
  const abortController = writable(new AbortController());

  const isOwner = derived(
    [user, userIdStore],
    ([user, userId]) => !!user && user.user_id === userId
  );

  const fetch = debounce(
    async (
      user_id: number,
      page: number,
      field: string,
      direction: 'asc' | 'desc',
      args: AvailableFilters
    ) => {
      try {
        if (get(loading)) {
          get(abortController).abort();
          abortController.set(new AbortController());
        }

        loading.set(true);

        await UserAnalyticsApiService.findSessions(
          {
            user_id,
            sort_by: { field, direction: direction === 'desc' ? 1 : 0 },
            pager: { page, results_per_page: 100 },
            ...args,
          },
          get(abortController).signal
        ).then(({ data }) => {
          if (!page) matches.set(data.items);
          else matches.update((prev) => [...prev, ...data.items]);

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
    async (user_id: number, year: number, filter: AvailableFilters) => {
      try {
        const isCurrentYear = year === new Date().getFullYear();

        await UserAnalyticsApiService.getPlaytimeHist({
          ...filter,
          user_id,
          period: TimePeriod.Day,
          date_from: isCurrentYear
            ? new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)
            : new Date(year, 0, 1),
          date_to: isCurrentYear ? new Date() : new Date(year + 1, 0, 0),
        }).then(({ data }) =>
          activity.set(
            data.items.map((x) => ({ period: x.period, count: x.count }))
          )
        );
      } catch (err) {}
    },
    100
  );

  const playtimeArgs = derived(
    [isOwner, userIdStore, year, filter],
    ([isOwner, userId, year, filter]) => ({ isOwner, userId, year, filter })
  );

  const args = derived(
    [userIdStore, filter, page, sortBy, sortDirection],
    ([userId, filter, page, sortBy, sortDirection]) => ({
      userId,
      filter,
      page,
      sortBy,
      sortDirection,
    })
  );

  // Reset page if user_id had changed
  userIdStore.subscribe(() => page.set(0));
  filter.subscribe(() => page.set(0));
  sortBy.subscribe(() => page.set(0));
  sortDirection.subscribe(() => page.set(0));

  playtimeArgs.subscribe((args) => {
    if (!args.userId || !args.isOwner) return;

    fetchPlaytimeHist(args.userId, args.year, args.filter);
  });

  args.subscribe((args) => {
    if (!args.userId) return;

    fetch(args.userId, args.page, args.sortBy, args.sortDirection, args.filter);
  });

  return {
    userIdStore,
    isOwner,
    page,
    filter,
    sortBy: {
      field: sortBy,
      direction: sortDirection,
    },
    year,
    matches,
    activity,
    total,
    hasMore,
    loading,
  };
}

export type UserProfileMatchesType = ReturnType<typeof getStore>;
export const UserProfileMatchesName = 'user-profile/matches';
