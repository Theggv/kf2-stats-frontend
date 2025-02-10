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
  const perk = writable<Perk>(0);
  const period = writable(0);

  const loading = writable(false);
  const users = writable<LeaderBoardsResponseItem[]>([]);
  const abortController = writable(new AbortController());

  const fetch = debounce(async (type: number, perk: Perk, period: number) => {
    if (get(loading)) {
      get(abortController).abort();
      abortController.set(new AbortController());
    }

    try {
      loading.set(true);

      const { data } = await LeaderBoardsApiService.getLeaderboard(
        { type, perk, ...periods[period] },
        get(abortController).signal
      );

      users.set(data.items);
    } catch (err) {
    } finally {
      loading.set(false);
    }
  }, 100);

  perk.subscribe((_) => type.set(LeaderBoardType.TotalGames));

  const args = derived([perk, type, period], ([perk, type, period]) => ({
    perk,
    type,
    period,
  }));

  args.subscribe(({ perk, type, period }) => fetch(type, perk, period));

  return { type, perk, period, users, loading };
}

export const LoaderBoardCtxKey = 'leaderboards';
export type LeaderBoardStore = ReturnType<typeof getStore>;
