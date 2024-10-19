import {
  ServersApiService,
  type RecentUsersRequest,
  type RecentUsersResponseUser,
} from '$lib/api/servers';
import { debounce } from '$lib/util';
import { writable, type Readable, type Writable } from 'svelte/store';
export type AvailableFilters = Partial<Omit<RecentUsersRequest, 'pager'>>;

export function getStore(
  serverId: number
): [
  Writable<number>,
  Readable<RecentUsersResponseUser[]>,
  Readable<number>,
  Readable<boolean>,
  Readable<boolean>,
  Readable<unknown>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);

  const page = writable(0);

  const users = writable<RecentUsersResponseUser[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = debounce(async (page: number) => {
    try {
      loading.set(true);
      const { data } = await ServersApiService.getRecentUsers({
        server_id: serverId,
        pager: { page, results_per_page: 100 },
      });

      users.update((prev) => [...prev, ...data.items]);

      hasMore.set(data.items.length >= 100);
      total.set(data.metadata.total_results);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  page.subscribe(($page) => fetch($page));

  return [page, users, total, hasMore, loading, error];
}
