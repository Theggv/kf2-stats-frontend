import {
  TimePeriod,
  UserAnalyticsApiService,
  type AccuracyHistItem,
  type UserPerksAnalyticsResponseItem,
} from '$lib/api/analytics';
import type { Perk } from '$lib/api/matches';
import { derived, writable } from 'svelte/store';

export const perks: Perk[] = new Array(10).fill(0).map((_, i) => i + 1);

export type PerkOverview = {
  perk: Perk;
  games: number;
  wins: number;
};

export type PerkAnalytics = UserPerksAnalyticsResponseItem & {
  averageZedtime: number;
};

export function getStore() {
  const userIdStore = writable<number | null>(null);
  const selectedPerk = writable<number>(0);

  const averageZedtime = writable<number>(0);
  const analytics = writable<UserPerksAnalyticsResponseItem[]>([]);

  const accuracy = writable<AccuracyHistItem[]>([]);

  const fetchOverview = async (user_id: number) => {
    try {
      await UserAnalyticsApiService.getUserPerksAnalytics({
        user_id,
      }).then(({ data }) => {
        averageZedtime.set(data.avg_zt);
        analytics.set(data.items);
      });
    } catch (error) {}
  };

  const fetchPerkAnalytics = async (user_id: number, perk: number) => {
    try {
      await UserAnalyticsApiService.getAccuracyHist({
        user_id,
        perk,
        period: TimePeriod.Day,
        date_from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
        date_to: new Date(),
      }).then(({ data }) => {
        accuracy.set(data.items);
      });
    } catch (error) {}
  };

  userIdStore.subscribe((id) => {
    if (!id) return;
    fetchOverview(id);
  });

  const args = derived(
    [userIdStore, selectedPerk],
    ([userId, selectedPerk]) => ({ userId, selectedPerk })
  );

  args.subscribe((args) => {
    if (!args.userId || !args.selectedPerk) return;

    fetchPerkAnalytics(args.userId, args.selectedPerk);
  });

  return { userIdStore, selectedPerk, averageZedtime, analytics, accuracy };
}
