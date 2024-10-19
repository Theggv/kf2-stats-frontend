import {
  ServersApiService,
  type RecentUsersResponseUser,
} from '$lib/api/servers';
import { debounce } from '$lib/util';
import { derived, writable } from 'svelte/store';

export function getStore() {
  const serverIdStore = writable<number | null>(null);

  const page = writable(0);

  const players = writable<RecentUsersResponseUser[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = debounce(async (server_id: number, page: number) => {
    try {
      await ServersApiService.getRecentUsers({
        server_id,
        pager: { page, results_per_page: 100 },
      }).then(({ data }) => {
        if (!page) players.set(data.items);
        else players.update((prev) => [...prev, ...data.items]);

        total.set(data.metadata.total_results);
        hasMore.set(data.items.length >= 100);
      });
    } catch (err) {}
  }, 100);

  const args = derived([serverIdStore, page], ([userId, page]) => ({
    userId,
    page,
  }));

  // Reset page if server_id had changed
  serverIdStore.subscribe(() => {
    page.set(0);
  });

  args.subscribe((args) => {
    if (!args.userId) return;

    fetch(args.userId, args.page);
  });

  return { serverIdStore, page, players, total, hasMore };
}
