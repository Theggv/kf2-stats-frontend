import {
  type MatchData,
  MatchesApiService,
  type MatchWave,
  type PlayerWaveStats,
  type AggregatedPlayerStats,
} from '$lib/api/matches';
import lodash from 'lodash';
import { writable } from 'svelte/store';

import type { WithRequired } from '$lib/util/types';
import type { Readable } from 'svelte/motion';

export type Match = WithRequired<MatchData, 'game_data' | 'map' | 'server'>;

export function matchStore(): [
  Readable<Match | null>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<($sessionId: number) => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const match = writable<Match | null>(null);

  const fetch = lodash.debounce(async ($sessionId: number) => {
    try {
      loading.set(true);
      const { data } = await MatchesApiService.getById($sessionId);
      match.set(data as any);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return [match, loading, error, fetch];
}

export function wavesStore(): [
  Readable<MatchWave[]>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<($sessionId: number) => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);
  const waves = writable<MatchWave[]>([]);

  const fetch = lodash.debounce(async ($sessionId: number) => {
    try {
      loading.set(true);
      const { data } = await MatchesApiService.getMatchWaves($sessionId);
      waves.set(data.waves);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return [waves, loading, error, fetch];
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
