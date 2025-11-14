import { PerksAnalyticsApiService, type PerkStats } from '$lib/api/analytics';
import type { Period } from '$lib/components/charts';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

function sortByValue(a: PerkStats, b: PerkStats) {
  return b.count - a.count;
}

export function getStore(server_id: number, periods: Period[]) {
  const selectedPeriod = writable(1);
  const data = writable<PerkStats[]>([]);

  const fetch = debounce(async (period: number) => {
    try {
      await PerksAnalyticsApiService.getKills({
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
