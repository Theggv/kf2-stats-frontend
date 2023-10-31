import { type FilterUsersResponseUser, UsersApiService } from '$lib/api/users';
import { debounce, type DebouncedFunc } from 'lodash';
import { writable, type Readable } from 'svelte/store';

export function usersStore(): [
  Readable<FilterUsersResponseUser[]>,
  Readable<boolean>,
  Readable<unknown>,
  DebouncedFunc<(page: number, reset: boolean) => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const users = writable<FilterUsersResponseUser[]>([]);

  const fetch = debounce(async (page: number, reset: boolean) => {
    try {
      loading.set(true);
      const { data } = await UsersApiService.filter({
        pager: {
          page,
        },
      });

      if (reset) users.set(data.items);
      else users.update((prev) => [...prev, ...data.items]);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return [users, loading, error, fetch];
}
