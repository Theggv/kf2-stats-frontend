import {
  UserAnalyticsApiService,
  type GetLastSeenUsersResponseItem,
  type GetLastSeenUsersRequest,
} from '$lib/api/analytics';
import type { PaginationResponse } from '$lib/api/common';
import { debounce } from '$lib/util';
import { derived, get, writable } from 'svelte/store';

type AvailableFilters = Omit<GetLastSeenUsersRequest, 'user_id' | 'pager'>;

export function getStore() {
  const userIdStore = writable<number | null>(null);

  const filter = writable<AvailableFilters>({});
  const page = writable<number>(0);

  const loading = writable<boolean>(false);
  const items = writable<GetLastSeenUsersResponseItem[]>([]);
  const metadata = writable<PaginationResponse>();
  const abortController = writable(new AbortController());

  const fetch = debounce(
    async (user_id: number, page: number, args: AvailableFilters) => {
      if (get(loading)) {
        get(abortController).abort();
        abortController.set(new AbortController());
      }

      try {
        loading.set(true);

        const { data } = await UserAnalyticsApiService.getLastSeenUsers(
          {
            user_id,
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
  filter.subscribe(() => page.set(0));

  const args = derived(
    [userIdStore, page, filter],
    ([userId, page, filter]) => ({
      userId,
      page,
      filter,
    })
  );

  args.subscribe((args) => {
    if (!args.userId) return;

    fetch(args.userId, args.page, args.filter);
  });

  return {
    userIdStore,
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
