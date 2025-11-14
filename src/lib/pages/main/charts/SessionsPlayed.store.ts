import { ServerAnalyticsApiService, type PeriodData } from '$lib/api/analytics';
import { periods } from '$lib/components/charts';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

export function getStore() {
  const selectedPeriod = writable(2);
  const data = writable<PeriodData[]>([]);

  const fetch = debounce(async (period: number) => {
    try {
      await ServerAnalyticsApiService.getSessionCount({
        ...periods[period],
      }).then(({ data: res }) => data.set(res));
    } catch (err) {}
  }, 100);

  selectedPeriod.subscribe((period) => fetch(period));

  return { selectedPeriod, data };
}
