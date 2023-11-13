import {
  type RecentSessionsResponseSession,
  UsersApiService,
} from '$lib/api/users';
import lodash from 'lodash';
import { type Writable, type Readable, writable } from 'svelte/store';

export function recentSessionsStore(
  userId: number
): [
  Writable<number>,
  Readable<RecentSessionsResponseSession[]>,
  Readable<boolean>,
  Readable<boolean>,
  Readable<unknown>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);

  const page = writable(0);

  const users = writable<RecentSessionsResponseSession[]>([]);
  const hasMore = writable(true);

  const fetch = lodash.debounce(async (page: number) => {
    try {
      loading.set(true);
      const { data } = await UsersApiService.getRecentSessions({
        user_id: userId,
        pager: { page, results_per_page: 100 },
      });

      users.update((prev) => [...prev, ...data.items]);

      hasMore.set(data.items.length >= 100);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  page.subscribe(($page) => fetch($page));

  return [page, users, hasMore, loading, error];
}
