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
  const serverIds = writable<number[]>([]);

  const loading = writable(false);
  const users = writable<LeaderBoardsResponseItem[]>([]);
  const metadata = writable<PaginationResponse>();
  const abortController = writable(new AbortController());

  const fetch = debounce(
    async (
      server_id: number[],
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
            server_id,
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

  periodIdx.subscribe((idx) => period.set(periods[idx].initialPeriod));

  perk.subscribe(() => {
    type.set(LeaderBoardType.TotalGames);
    page.set(0);
  });

  type.subscribe(() => page.set(0));
  serverIds.subscribe(() => page.set(0));
  period.subscribe(() => page.set(0));

  const args = derived(
    [serverIds, perk, type, periodIdx, period, page],
    ([serverIds, perk, type, periodIdx, period, page]) => ({
      serverIds,
      perk,
      type,
      periodIdx,
      period,
      page,
    })
  );

  args.subscribe(({ serverIds, perk, type, period, page }) =>
    fetch(serverIds, type, perk, page, period.from, period.to)
  );

  return {
    serverIds,
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
