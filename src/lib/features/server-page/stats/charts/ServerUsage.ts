import { ServerAnalyticsApiService, type PeriodData } from '$lib/api/analytics';
import type { Period } from '$lib/components/charts';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

export function getStore(server_id: number, periods: Period[]) {
  const selectedPeriod = writable(1);
  const data = writable<PeriodData[]>([]);

  const fetch = debounce(async (period: number) => {
    try {
      await ServerAnalyticsApiService.getUsageInMinutes({
        server_id,
        ...periods[period],
      }).then(({ data: res }) => {
        data.set(res.map((x) => ({ ...x, count: Math.round(x.count / 24) })));
      });
    } catch (err) {}
  }, 100);

  selectedPeriod.subscribe((period) => {
    fetch(period);
  });

  return { selectedPeriod, data };
}
