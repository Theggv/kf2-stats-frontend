import {
  LeaderBoardType,
  LeaderBoardsApiService,
  type LeaderBoardsResponseItem,
} from '$lib/api/leaderboards';
import type { Perk } from '$lib/api/matches';
import { derived, get, writable } from 'svelte/store';

import { periods } from './periods';
import { debounce } from '$lib/util';

export function getStore() {
  const type = writable<LeaderBoardType>(LeaderBoardType.TotalGames);
  const page = writable(0);
  const perk = writable<Perk>(0);
  const period = writable(0);

  const loading = writable(false);
  const users = writable<LeaderBoardsResponseItem[]>([]);
  const abortController = writable(new AbortController());

  const fetch = debounce(
    async (type: number, perk: Perk, period: number, page: number) => {
      if (get(loading)) {
        get(abortController).abort();
        abortController.set(new AbortController());
      }

      try {
        loading.set(true);

        const { data } = await LeaderBoardsApiService.getLeaderboard(
          { type, perk, page, ...periods[period] },
          get(abortController).signal
        );

        users.set(data.items);
      } catch (err) {
      } finally {
        loading.set(false);
      }
    },
    100
  );

  perk.subscribe(() => {
    type.set(LeaderBoardType.TotalGames);
    page.set(0);
  });

  type.subscribe(() => page.set(0));
  period.subscribe(() => page.set(0));

  const args = derived(
    [perk, type, period, page],
    ([perk, type, period, page]) => ({
      perk,
      type,
      period,
      page,
    })
  );

  args.subscribe(({ perk, type, period, page }) =>
    fetch(type, perk, period, page)
  );

  return { type, page, perk, period, users, loading };
}

export const LoaderBoardCtxKey = 'leaderboards';
export type LeaderBoardStore = ReturnType<typeof getStore>;
