import {
  type UserAnalyticsResponse,
  UserAnalyticsApiService,
} from '$lib/api/analytics';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

export const totalMatches = writable(0);

export function userStore() {
  const userIdStore = writable<number | null>(null);

  const overview = writable<UserAnalyticsResponse>();

  const fetch = debounce(async (user_id: number) => {
    try {
      await UserAnalyticsApiService.getUserAnalytics({ user_id }).then(
        ({ data }) => overview.set(data)
      );
    } catch (err) {}
  }, 100);

  userIdStore.subscribe((id) => {
    if (!id) return;
    fetch(id);
  });

  return { userIdStore, overview };
}
