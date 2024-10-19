import {
  type FilterUsersResponseUser,
  UsersApiService,
  type FilterUsersRequest,
} from '$lib/api/users';
import { debounce } from '$lib/util';
import { writable, type Readable, type Writable, derived } from 'svelte/store';

export type AvailableFilters = Partial<Omit<FilterUsersRequest, 'pager'>>;

export function usersStore(): [
  Writable<number>,
  Writable<AvailableFilters>,
  Readable<FilterUsersResponseUser[]>,
  Readable<number>,
  Readable<boolean>,
  Readable<boolean>,
  Readable<unknown>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);

  const page = writable(0);
  const filter = writable<AvailableFilters>({});

  const users = writable<FilterUsersResponseUser[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = debounce(async (page: number, body: AvailableFilters) => {
    try {
      loading.set(true);
      const { data } = await UsersApiService.filter({
        pager: { page, results_per_page: 100 },
        ...body,
      });

      if (!page) users.set([...data.items]);
      else users.update((prev) => [...prev, ...data.items]);

      hasMore.set(data.items.length >= 100);
      total.set(data.metadata.total_results);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 300);

  const args = derived([page, filter], ([$s1, $s2]) => ({
    page: $s1,
    filter: $s2,
  }));

  filter.subscribe(() => {
    page.set(0);
  });
  args.subscribe(({ page, filter }) => fetch(page, filter));

  return [page, filter, users, total, hasMore, loading, error];
}
