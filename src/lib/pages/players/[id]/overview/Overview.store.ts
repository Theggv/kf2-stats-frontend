import {
  TimePeriod,
  UserAnalyticsApiService,
  type FindUserSessionsResponseItem,
  type PlayTimeHistItem,
  type AccuracyHistItem,
  type GetTeammatesResponseItem,
  type UserPerksAnalyticsResponseItem,
  type PeriodData,
} from '$lib/api/analytics';
import { debounce } from '$lib/util';
import { derived, writable } from 'svelte/store';

export function getStore() {
  const userIdStore = writable<number | null>(null);

  const recentMatches = writable<FindUserSessionsResponseItem[]>([]);
  const playtime = writable<PlayTimeHistItem[]>([]);
  const accuracy = writable<AccuracyHistItem[]>([]);
  const difficulty = writable<PeriodData[]>([]);
  const teammates = writable<GetTeammatesResponseItem[]>([]);
  const perks = writable<UserPerksAnalyticsResponseItem[]>([]);

  const fetch = debounce(async (user_id: number) => {
    try {
      await UserAnalyticsApiService.findSessions({
        user_id,
        sort_by: { direction: 1 },
        pager: { results_per_page: 20 },
      }).then(({ data }) => recentMatches.set(data.items));

      // Playtime for 45 days
      await UserAnalyticsApiService.getPlaytimeHist({
        user_id,
        period: TimePeriod.Day,
        date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
        date_to: new Date(),
      }).then(({ data }) => playtime.set(data.items));

      // Difficulty for 45 days
      await UserAnalyticsApiService.getDifficultyHist({
        user_id,
        period: TimePeriod.Date,
        date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
        date_to: new Date(),
      }).then(({ data }) => difficulty.set(data));

      await UserAnalyticsApiService.getAccuracyHist({
        user_id,
        period: TimePeriod.Day,
        date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
        date_to: new Date(),
      }).then(({ data }) => accuracy.set(data.items));

      await UserAnalyticsApiService.getTeammates({
        user_id,
        pager: { page: 0 },
      }).then(({ data }) => teammates.set(data.items.slice(0, 5)));

      await UserAnalyticsApiService.getUserPerksAnalytics({
        user_id,
      }).then(({ data }) => perks.set(data.items));
    } catch (err) {}
  }, 100);

  userIdStore.subscribe((id) => {
    if (!id) return;
    fetch(id);
  });

  return {
    userIdStore,
    recentMatches,
    hist: {
      playtime,
      accuracy,
      difficulty: derived([difficulty], ([difficulty]) =>
        difficulty.map((x) => ({
          period: x.period,
          value: x.value,
          prev: x.prev,
          diff: 0,
          max_value: x.max_value,
          trend: x.trend,
        }))
      ),
    },
    teammates,
    perks,
  };
}
