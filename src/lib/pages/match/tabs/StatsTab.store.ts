import { groupZeds } from '$lib/api/common';
import type { UserStats } from './util';

export enum AvailableMetrics {
  TOTAL_KILLS = 1,
  LARGE_KILLS,
  DAMAGE_DEALT,
  DAMAGE_TAKEN,
  FP_KILLS,
  SC_KILLS,
  QP_KILLS,
  HUSK_N,
  HUSK_B,
  HUSK_R,
  ACCURACY,
  HS_ACCURACY,
  HEADSHOTS,
  HEALS_GIVEN,
  HEALS_RECV,
  AVG_ZT_LENGTH,
}

type MetricSelector = {
  key: AvailableMetrics;
  selector: (userStats: UserStats, waveId: number) => number | undefined;
};

const selectWave = (userStats: UserStats, waveId: number) =>
  userStats.waves.find((x) => x.wave.wave_id === waveId)?.stats;

const selectMultipleWaves = (userStats: UserStats, waveId: number) => {
  const items = userStats.waves
    .filter((x) => x.wave.wave_id <= waveId)
    .map((x) => x.stats);

  return items.length ? items : undefined;
};

export const statSelectorsSingle: MetricSelector[] = [
  {
    key: AvailableMetrics.TOTAL_KILLS,
    selector: (userStats, waveId) => {
      const waveStats = selectWave(userStats, waveId);
      if (!waveStats) return undefined;

      return groupZeds(waveStats).total;
    },
  },
  {
    key: AvailableMetrics.LARGE_KILLS,
    selector: (userStats, waveId) => {
      const waveStats = selectWave(userStats, waveId);
      if (!waveStats) return undefined;

      return groupZeds(waveStats).large;
    },
  },
  {
    key: AvailableMetrics.DAMAGE_DEALT,
    selector: (userStats, waveId) =>
      selectWave(userStats, waveId)?.damage_dealt,
  },
  {
    key: AvailableMetrics.DAMAGE_TAKEN,
    selector: (userStats, waveId) =>
      selectWave(userStats, waveId)?.damage_taken,
  },
  {
    key: AvailableMetrics.FP_KILLS,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.kills.fp,
  },
  {
    key: AvailableMetrics.SC_KILLS,
    selector: (userStats, waveId) =>
      selectWave(userStats, waveId)?.kills.scrake,
  },
  {
    key: AvailableMetrics.QP_KILLS,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.kills.qp,
  },
  {
    key: AvailableMetrics.HUSK_N,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.kills.husk,
  },
  {
    key: AvailableMetrics.HUSK_B,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.husk_b,
  },
  {
    key: AvailableMetrics.HUSK_R,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.husk_r,
  },
  {
    key: AvailableMetrics.ACCURACY,
    selector: (userStats, waveId) => {
      const waveStats = selectWave(userStats, waveId);
      if (!waveStats) return undefined;

      return waveStats.shots_hit / (waveStats.shots_fired || 1);
    },
  },
  {
    key: AvailableMetrics.HS_ACCURACY,
    selector: (userStats, waveId) => {
      const waveStats = selectWave(userStats, waveId);
      if (!waveStats) return undefined;

      return waveStats.shots_hs / (waveStats.shots_hit || 1);
    },
  },
  {
    key: AvailableMetrics.HEADSHOTS,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.shots_hs,
  },
  {
    key: AvailableMetrics.HEALS_GIVEN,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.heals_given,
  },
  {
    key: AvailableMetrics.HEALS_RECV,
    selector: (userStats, waveId) => selectWave(userStats, waveId)?.heals_recv,
  },
  {
    key: AvailableMetrics.AVG_ZT_LENGTH,
    selector: (userStats, waveId) => {
      const waveStats = selectWave(userStats, waveId);
      if (!waveStats) return undefined;

      return waveStats.zedtime_length / (waveStats.zedtime_count || 1);
    },
  },
];

export const statSelectorsMultiple: MetricSelector[] = [
  {
    key: AvailableMetrics.TOTAL_KILLS,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)
        ?.map(groupZeds)
        .reduce((acc, x) => acc + x.total, 0),
  },
  {
    key: AvailableMetrics.LARGE_KILLS,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)
        ?.map(groupZeds)
        .reduce((acc, x) => acc + x.large, 0),
  },
  {
    key: AvailableMetrics.DAMAGE_DEALT,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.damage_dealt,
        0
      ),
  },
  {
    key: AvailableMetrics.DAMAGE_TAKEN,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.damage_taken,
        0
      ),
  },
  {
    key: AvailableMetrics.FP_KILLS,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.kills.fp,
        0
      ),
  },
  {
    key: AvailableMetrics.SC_KILLS,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.kills.scrake,
        0
      ),
  },
  {
    key: AvailableMetrics.QP_KILLS,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.kills.qp,
        0
      ),
  },
  {
    key: AvailableMetrics.HUSK_N,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.kills.husk,
        0
      ),
  },
  {
    key: AvailableMetrics.HUSK_B,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.husk_b,
        0
      ),
  },
  {
    key: AvailableMetrics.HUSK_R,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.husk_r,
        0
      ),
  },
  {
    key: AvailableMetrics.ACCURACY,
    selector: (userStats, waveId) => {
      const waves = selectMultipleWaves(userStats, waveId);
      if (!waves) return undefined;

      const data = waves.reduce(
        (acc, x) => {
          acc.shots_hit += x.shots_hit;
          acc.shots_fired += x.shots_fired;
          return acc;
        },
        { shots_hit: 0, shots_fired: 0 }
      );

      return data.shots_hit / (data.shots_fired || 1);
    },
  },
  {
    key: AvailableMetrics.HS_ACCURACY,
    selector: (userStats, waveId) => {
      const waves = selectMultipleWaves(userStats, waveId);
      if (!waves) return undefined;

      const data = waves.reduce(
        (acc, x) => {
          acc.shots_hs += x.shots_hs;
          acc.shots_hit += x.shots_hit;
          return acc;
        },
        { shots_hs: 0, shots_hit: 0 }
      );

      return data.shots_hs / (data.shots_hit || 1);
    },
  },
  {
    key: AvailableMetrics.HEADSHOTS,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.shots_hs,
        0
      ),
  },
  {
    key: AvailableMetrics.HEALS_GIVEN,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.heals_given,
        0
      ),
  },
  {
    key: AvailableMetrics.HEALS_RECV,
    selector: (userStats, waveId) =>
      selectMultipleWaves(userStats, waveId)?.reduce(
        (acc, x) => acc + x.heals_recv,
        0
      ),
  },
  {
    key: AvailableMetrics.AVG_ZT_LENGTH,
    selector: (userStats, waveId) => {
      const waves = selectMultipleWaves(userStats, waveId);
      if (!waves) return undefined;

      const data = waves.reduce(
        (acc, x) => {
          acc.zedtime_count += x.zedtime_count;
          acc.zedtime_length += x.zedtime_length;
          return acc;
        },
        { zedtime_count: 0, zedtime_length: 0 }
      );

      return data.zedtime_length / (data.zedtime_count || 1);
    },
  },
];
