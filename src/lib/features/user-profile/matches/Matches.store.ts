import {
  UsersApiService,
  type RecentSessionsResponseSession,
  type RecentSessionsRequest,
} from '$lib/api/users';
import { debounce } from '$lib/util';
import { derived, writable } from 'svelte/store';

type AvailableFilters = Omit<RecentSessionsRequest, 'user_id' | 'pager'>;

export function getStore() {
  const userIdStore = writable<number | null>(null);

  const page = writable(0);
  const filter = writable<AvailableFilters>({});

  const matches = writable<RecentSessionsResponseSession[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = debounce(
    async (user_id: number, page: number, args: AvailableFilters) => {
      try {
        await UsersApiService.getRecentSessions({
          user_id,
          pager: { page, results_per_page: 100 },
          ...args,
        }).then(({ data }) => {
          if (!page) matches.set(data.items);
          else matches.update((prev) => [...prev, ...data.items]);

          total.set(data.metadata.total_results);
          hasMore.set(data.items.length >= 100);
        });
      } catch (err) {}
    },
    100
  );

  const args = derived(
    [userIdStore, page, filter],
    ([userId, page, filter]) => ({
      userId,
      page,
      filter,
    })
  );

  // Reset page if user_id had changed
  userIdStore.subscribe(() => {
    page.set(0);
  });

  filter.subscribe(() => {
    page.set(0);
  });

  args.subscribe((args) => {
    if (!args.userId) return;

    fetch(args.userId, args.page, args.filter);
  });

  return { userIdStore, page, filter, matches, total, hasMore };
}
