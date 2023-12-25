import {
  type FilterUsersResponseUser,
  UsersApiService,
  type FilterUsersRequest,
} from '$lib/api/users';
import lodash from 'lodash';
import { writable, derived } from 'svelte/store';

export type AvailableFilters = Partial<Omit<FilterUsersRequest, 'pager'>>;

export function getStore() {
  const page = writable(0);
  const filter = writable<AvailableFilters>({});

  const users = writable<FilterUsersResponseUser[]>([]);
  const total = writable(0);
  const hasMore = writable(true);

  const fetch = lodash.debounce(
    async (page: number, body: AvailableFilters) => {
      try {
        const { data } = await UsersApiService.filter({
          pager: { page, results_per_page: 100 },
          ...body,
        });

        if (!page) users.set([...data.items]);
        else users.update((prev) => [...prev, ...data.items]);

        hasMore.set(data.items.length >= 100);
        total.set(data.metadata.total_results);
      } catch (err) {}
    },
    300
  );

  const args = derived([page, filter], ([$s1, $s2]) => ({
    page: $s1,
    filter: $s2,
  }));

  filter.subscribe(() => page.set(0));

  args.subscribe(({ page, filter }) => fetch(page, filter));

  return { page, filter, users, total, hasMore };
}
