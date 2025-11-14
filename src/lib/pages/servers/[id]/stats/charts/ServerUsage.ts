import { ServerAnalyticsApiService, type PeriodData } from '$lib/api/analytics';
import type { Period } from '$lib/components/charts';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

export function getStore(server_id: number, periods: Period[]) {
  const selectedPeriod = writable(0);
  const data = writable<PeriodData[]>([]);

  const fetch = debounce(async (period: number) => {
    try {
      await ServerAnalyticsApiService.getUsageInMinutes({
        server_id,
        ...periods[period],
      }).then(({ data: res }) => {
        data.set(
          res.map((x) => ({
            ...x,
            value: x.value / 14,
            prev: x.prev / 14,
            trend: x.trend / 14,
            max_value: x.max_value / 14,
          }))
        );
      });
    } catch (err) {}
  }, 100);

  selectedPeriod.subscribe((period) => {
    fetch(period);
  });

  return { selectedPeriod, data };
}
