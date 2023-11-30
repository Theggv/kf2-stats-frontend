import {
  type PlayTimeHistItem,
  type AccuracyHistItem,
  type GetTeammatesResponseItem,
  type UserPerksAnalyticsResponseItem,
  UserAnalyticsApiService,
  TimePeriod,
} from '$lib/api/analytics';
import {
  type RecentSessionsResponseSession,
  UsersApiService,
} from '$lib/api/users';
import lodash from 'lodash';
import { writable } from 'svelte/store';

export function getStore() {
  const userIdStore = writable<number | null>(null);

  const recentMatches = writable<RecentSessionsResponseSession[]>([]);
  const playtime = writable<PlayTimeHistItem[]>([]);
  const accuracy = writable<AccuracyHistItem[]>([]);
  const teammates = writable<GetTeammatesResponseItem[]>([]);
  const perks = writable<UserPerksAnalyticsResponseItem[]>([]);

  const fetch = lodash.debounce(async (user_id: number) => {
    try {
      await UsersApiService.getRecentSessions({
        user_id,
        pager: { results_per_page: 20 },
      }).then(({ data }) => recentMatches.set(data.items));

      // Playtime for 45 days
      await UserAnalyticsApiService.getPlaytimeHist({
        user_id,
        period: TimePeriod.Day,
        date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
        date_to: new Date(),
      }).then(({ data }) => playtime.set(data.items));

      await UserAnalyticsApiService.getAccuracyHist({
        user_id,
        period: TimePeriod.Day,
        date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
        date_to: new Date(),
      }).then(({ data }) => accuracy.set(data.items));

      await UserAnalyticsApiService.getTeammates({
        user_id,
      }).then(({ data }) => teammates.set(data.items));

      await UserAnalyticsApiService.getUserPerksAnalytics({
        user_id,
      }).then(({ data }) => perks.set(data.items));
    } catch (err) {}
  }, 100);

  userIdStore.subscribe((id) => {
    if (!id) return;
    fetch(id);
  });

  return { userIdStore, recentMatches, playtime, accuracy, teammates, perks };
}
