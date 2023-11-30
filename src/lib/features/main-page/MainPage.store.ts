import {
  ServerAnalyticsApiService,
  type PopularServersResponseItem,
} from '$lib/api/analytics';
import lodash from 'lodash';
import { writable } from 'svelte/store';

export function getStore() {
  const currentOnline = writable(0);
  const popularServers = writable<PopularServersResponseItem[]>([]);

  const fetch = lodash.debounce(async () => {
    try {
      await ServerAnalyticsApiService.getCurrentOnline().then(({ data }) =>
        currentOnline.set(data.count)
      );

      await ServerAnalyticsApiService.getPopularServers().then(({ data }) =>
        popularServers.set(data.items)
      );
    } catch (err) {}
  }, 100);

  fetch();

  return { currentOnline, popularServers };
}
