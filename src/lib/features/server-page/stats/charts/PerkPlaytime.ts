import { PerksAnalyticsApiService, type PerkStats } from '$lib/api/analytics';
import type { Period } from '$lib/components/charts';
import lodash from 'lodash';
import { writable } from 'svelte/store';

function sortByValue(a: PerkStats, b: PerkStats) {
  return b.count - a.count;
}

export function getStore(server_id: number, periods: Period[]) {
  const selectedPeriod = writable(2);
  const data = writable<PerkStats[]>([]);

  const fetch = lodash.debounce(async (period: number) => {
    try {
      await PerksAnalyticsApiService.getPlayTime({
        server_id,
        ...periods[period],
      }).then(({ data: res }) => data.set(res.sort(sortByValue)));
    } catch (err) {}
  }, 100);

  selectedPeriod.subscribe((period) => {
    fetch(period);
  });

  return { selectedPeriod, data };
}
