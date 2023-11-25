import {
  type UserAnalyticsResponse,
  UserAnalyticsApiService,
} from '$lib/api/analytics';
import { type FilterUsersResponseUser, UsersApiService } from '$lib/api/users';
import lodash from 'lodash';
import { writable } from 'svelte/store';

export const totalMatches = writable(0);

export function userStore() {
  const userIdStore = writable<number | null>(null);

  const user = writable<FilterUsersResponseUser>();
  const overview = writable<UserAnalyticsResponse>();

  const fetch = lodash.debounce(async (user_id: number) => {
    try {
      await UsersApiService.getUserDetailed(user_id).then(({ data }) =>
        user.set(data)
      );

      await UserAnalyticsApiService.getUserAnalytics({ user_id }).then(
        ({ data }) => overview.set(data)
      );
    } catch (err) {}
  }, 100);

  userIdStore.subscribe((id) => {
    if (!id) return;
    fetch(id);
  });

  return { userIdStore, user, overview };
}
