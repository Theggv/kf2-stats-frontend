import {
  UserAnalyticsApiService,
  type GetLastSessionsWithUserRequest,
} from '$lib/api/analytics';
import type { PaginationResponse } from '$lib/api/common';
import type { Match } from '$lib/api/matches';
import { debounce } from '$lib/util';
import { derived, get, writable } from 'svelte/store';

type AvailableFilters = Omit<
  GetLastSessionsWithUserRequest,
  'user_id' | 'other_user_id' | 'pager'
>;

export function getStore() {
  const userIdStore = writable<number | null>(null);
  const otherUserIdStore = writable<number | null>(null);

  const filter = writable<AvailableFilters>({});
  const page = writable<number>(0);

  const loading = writable<boolean>(false);
  const items = writable<Match[]>([]);
  const metadata = writable<PaginationResponse>();
  const abortController = writable(new AbortController());

  const fetch = debounce(
    async (
      user_id: number,
      other_user_id: number,
      page: number,
      args: AvailableFilters
    ) => {
      if (get(loading)) {
        get(abortController).abort();
        abortController.set(new AbortController());
      }

      try {
        loading.set(true);

        const { data } = await UserAnalyticsApiService.getLastGamesWithUser(
          {
            user_id,
            other_user_id,
            ...args,
            pager: { page, results_per_page: 50 },
          },
          get(abortController).signal
        );

        if (page > 0) items.update((prev) => [...prev, ...data.items]);
        else items.set(data.items);

        metadata.set(data.metadata);
      } catch (err) {
      } finally {
        loading.set(false);
      }
    },
    300
  );

  userIdStore.subscribe(() => page.set(0));
  otherUserIdStore.subscribe(() => page.set(0));
  filter.subscribe(() => page.set(0));

  const args = derived(
    [userIdStore, otherUserIdStore, page, filter],
    ([userId, otherUserIdStore, page, filter]) => ({
      userId,
      otherUserIdStore,
      page,
      filter,
    })
  );

  args.subscribe((args) => {
    if (!args.userId || !args.otherUserIdStore) return;

    fetch(args.userId, args.otherUserIdStore, args.page, args.filter);
  });

  return {
    userIdStore,
    otherUserIdStore,
    filter,
    page,
    items,
    metadata,
    loading,
    hasMore: derived(
      [metadata],
      ([m]) => !!m && m.total_results > (m.page + 1) * m.results_per_page
    ),
  };
}

export type LastSeenFilterType = ReturnType<typeof getStore>['filter'];
export const LastSeenFilterName = 'maps-filter';
