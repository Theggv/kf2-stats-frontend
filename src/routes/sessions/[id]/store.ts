import {
  type MatchData,
  MatchesApiService,
  type MatchWave,
  type PlayerWaveStats,
  type AggregatedPlayerStats,
  type GetMatchLiveDataResponse,
} from '$lib/api/matches';
import lodash from 'lodash';
import { writable, type Writable } from 'svelte/store';

import type { WithRequired } from '$lib/util/types';
import type { Readable } from 'svelte/motion';
import { Status } from '$lib/api/sessions';

export type Match = WithRequired<MatchData, 'game_data' | 'map' | 'server'>;

export function isMatchLive(status?: Status) {
  return status === Status.Lobby || status === Status.InProgress;
}

export function getStore(): [
  Writable<number>,
  Readable<Match | null>,
  Readable<MatchWave[]>,
  Readable<GetMatchLiveDataResponse | null>,
  Readable<boolean>
] {
  let intervalId: number;

  const sessionId = writable<number>();

  const loading = writable(false);
  const error = writable<unknown>(false);
  const match = writable<Match | null>(null);
  const waves = writable<MatchWave[]>([]);
  const liveData = writable<GetMatchLiveDataResponse | null>(null);

  const fetch = lodash.debounce(async ($sessionId: number) => {
    try {
      loading.set(true);

      const status = await MatchesApiService.getById($sessionId).then(
        ({ data }) => {
          match.set(data as any);
          return data.session.status;
        }
      );

      if (isMatchLive(status)) {
        intervalId = setTimeout(() => fetch($sessionId), 10000);

        await MatchesApiService.getMatchLive($sessionId).then(({ data }) => {
          liveData.set(data);
        });
      } else {
        liveData.set(null);
      }

      await MatchesApiService.getMatchWaves($sessionId).then(({ data }) => {
        waves.set(data.waves);
      });
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  sessionId.subscribe((id) => {
    if (!id) return;
    clearTimeout(intervalId);
    fetch(id);
  });

  return [sessionId, match, waves, liveData, loading];
}

export function playersSummaryStore(): [
  Readable<AggregatedPlayerStats[]>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<($sessionId: number) => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const players = writable<AggregatedPlayerStats[]>([]);

  const fetch = lodash.debounce(async ($sessionId: number) => {
    try {
      loading.set(true);
      const { data } = await MatchesApiService.getMatchSummary($sessionId);
      players.set(data.players);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return [players, loading, error, fetch];
}

export function wavePlayersStatsStore(): [
  Readable<PlayerWaveStats[]>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<($waveId: number) => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const wavePlayersStats = writable<PlayerWaveStats[]>([]);

  const fetch = lodash.debounce(async ($waveId: number) => {
    try {
      loading.set(true);
      const { data } = await MatchesApiService.getWavePlayersStats($waveId);
      wavePlayersStats.set(data.players);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 250);

  return [wavePlayersStats, loading, error, fetch];
}

export function playerWavesStatsStore(): [
  Readable<PlayerWaveStats[]>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<($sessionId: number, $userId: number) => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const playerWavesStats = writable<PlayerWaveStats[]>([]);

  const fetch = lodash.debounce(async ($sessionId: number, $userId: number) => {
    try {
      loading.set(true);
      const { data } = await MatchesApiService.getMatchPlayerStats(
        $sessionId,
        $userId
      );
      playerWavesStats.set(data.waves);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return [playerWavesStats, loading, error, fetch];
}
