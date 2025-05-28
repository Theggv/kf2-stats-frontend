import {
  LeaderBoardType,
  LeaderBoardsApiService,
  type LeaderBoardsResponseItem,
} from '$lib/api/leaderboards';
import type { Perk } from '$lib/api/matches';
import { derived, get, writable } from 'svelte/store';

import { periods } from './periods';
import { debounce } from '$lib/util';
import type { PaginationResponse } from '$lib/api/common';

export function getStore() {
  const type = writable<LeaderBoardType>(LeaderBoardType.TotalGames);
  const page = writable(0);
  const perk = writable<Perk>(0);
  const periodIdx = writable(0);
  const period = writable<{ from: Date; to: Date }>();

  const loading = writable(false);
  const users = writable<LeaderBoardsResponseItem[]>([]);
  const metadata = writable<PaginationResponse>();
  const abortController = writable(new AbortController());

  const fetch = debounce(
    async (
      type: number,
      perk: Perk,
      page: number,
      date_from: Date,
      date_to: Date
    ) => {
      if (get(loading)) {
        get(abortController).abort();
        abortController.set(new AbortController());
      }

      try {
        loading.set(true);

        const { data } = await LeaderBoardsApiService.getLeaderboard(
          {
            type,
            perk,
            page,
            date_from,
            date_to,
          },
          get(abortController).signal
        );

        users.set(data.items);
        metadata.set(data.metadata);
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
  periodIdx.subscribe((idx) => {
    period.set(periods[idx].initialPeriod);

    page.set(0);
  });

  const args = derived(
    [perk, type, periodIdx, period, page],
    ([perk, type, periodIdx, period, page]) => ({
      perk,
      type,
      periodIdx,
      period,
      page,
    })
  );

  args.subscribe(({ perk, type, period, page }) =>
    fetch(type, perk, page, period.from, period.to)
  );

  return {
    type,
    page,
    perk,
    periodIdx,
    period,
    users,
    metadata,
    loading,
  };
}

export const LeaderboardCtxKey = 'leaderboards';
export type LeaderboardStore = ReturnType<typeof getStore>;
