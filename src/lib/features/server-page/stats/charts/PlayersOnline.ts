import { ServerAnalyticsApiService, type PeriodData } from '$lib/api/analytics';
import type { Period } from '$lib/components/charts';
import lodash from 'lodash';
import { writable } from 'svelte/store';

export function getStore(server_id: number, periods: Period[]) {
  const selectedPeriod = writable(3);
  const data = writable<PeriodData[]>([]);

  const fetch = lodash.debounce(async (period: number) => {
    try {
      await ServerAnalyticsApiService.getPlayersOnline({
        server_id,
        ...periods[period],
      }).then(({ data: res }) => data.set(res));
    } catch (err) {}
  }, 100);

  selectedPeriod.subscribe((period) => {
    fetch(period);
  });

  return { selectedPeriod, data };
}
