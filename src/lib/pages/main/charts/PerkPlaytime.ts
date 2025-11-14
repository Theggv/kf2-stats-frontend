import { PerksAnalyticsApiService, type PerkStats } from '$lib/api/analytics';
import { periods } from '$lib/components/charts';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

function sortByValue(a: PerkStats, b: PerkStats) {
  return b.count - a.count;
}

export function getStore() {
  const data = writable<PerkStats[]>([]);

  const fetch = debounce(async () => {
    try {
      await PerksAnalyticsApiService.getPlayTime({
        ...periods.find((x) => x.id === '3-month')!,
      }).then(({ data: res }) => data.set(res.sort(sortByValue)));
    } catch (err) {}
  }, 100);

  fetch();

  return { data };
}
