import { type PeriodData, MapAnalyticsApiService } from '$lib/api/analytics';
import type { Period } from '$lib/components/charts';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

export function getStore(server_id: number, periods: Period[]) {
  const selectedPeriod = writable(1);
  const data = writable<PeriodData[]>([]);

  const fetch = debounce(async (period: number) => {
    try {
      await MapAnalyticsApiService.get({
        server_id,
        limit: 4,
        ...periods[period],
      }).then(({ data: res }) =>
        data.set(
          res.map((x) => ({
            period: x.map_name,
            value: x.count,
            prev: 0,
            diff: 0,
            max_value: 0,
            trend: 0,
          }))
        )
      );
    } catch (err) {}
  }, 100);

  selectedPeriod.subscribe((period) => {
    fetch(period);
  });

  return { selectedPeriod, data };
}
