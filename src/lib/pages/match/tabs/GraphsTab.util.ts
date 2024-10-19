import type { UserProfile } from '$lib/api/common';
import type {
  MatchWave,
  MatchWavePlayer,
  MatchWavePlayerStats,
} from '$lib/api/matches';
import { findUserProfile, groupByUserId, type UserWaveStats } from './util';

export const graphColors = [
  '#d98880',
  '#af7ac5',
  '#52be80',
  '#5499c7',
  '#a9cce3',
  '#f5b041',
  '#7fb3d5',
  '#d1f2eb',
  '#229954',
  '#b3b6b7',
  '#f9e79f',
  '#f8c471',
  '#d98880',
  '#af7ac5',
  '#52be80',
  '#5499c7',
  '#a9cce3',
  '#f5b041',
  '#7fb3d5',
  '#d1f2eb',
  '#229954',
  '#b3b6b7',
  '#f9e79f',
  '#f8c471',
  '#d98880',
  '#af7ac5',
  '#52be80',
  '#5499c7',
  '#a9cce3',
  '#f5b041',
  '#7fb3d5',
  '#d1f2eb',
  '#229954',
  '#b3b6b7',
  '#f9e79f',
  '#f8c471',
];

export function prepareLabels(waves: MatchWave[]): string[] {
  return waves.map((wave) => {
    if (wave.attempt > 1) {
      return `Wave ${wave.wave} (Attempt ${wave.attempt})`;
    }

    return `Wave ${wave.wave}`;
  });
}

export type DataSet = {
  user_id: number;
  profile?: UserProfile;
  color: string;
  values: {
    player?: Pick<MatchWavePlayer, 'perk' | 'level' | 'prestige' | 'is_dead'>;
    value: number;
  }[];
};

export type NormalizedData = {
  user_id: number;
  waves: (UserWaveStats | null)[];
};

export function normalizeData(waves: MatchWave[]): NormalizedData[] {
  const users = groupByUserId(waves);

  const normalizedData: NormalizedData[] = [];

  for (const user of users) {
    const item: NormalizedData = { user_id: user.user_id, waves: [] };

    for (let i = 0, j = 0; i < waves.length; i++) {
      if (
        j < user.waves.length &&
        waves[i].wave_id === user.waves[j].wave.wave_id
      ) {
        item.waves.push(user.waves[j++]);
      } else {
        item.waves.push(null);
      }
    }

    normalizedData.push(item);
  }

  return normalizedData;
}

export function aggregateData(normalized: NormalizedData[]): NormalizedData[] {
  const items = structuredClone(normalized);

  function aggregate(
    prev: MatchWavePlayerStats,
    cur: MatchWavePlayerStats
  ): MatchWavePlayerStats {
    return {
      damage_dealt: prev.damage_dealt + cur.damage_dealt,
      damage_taken: prev.damage_taken + cur.damage_taken,
      dosh_earned: prev.dosh_earned + cur.dosh_earned,
      heals_given: prev.heals_given + cur.heals_given,
      heals_recv: prev.heals_recv + cur.heals_recv,
      shots_fired: prev.shots_fired + cur.shots_fired,
      shots_hit: prev.shots_hit + cur.shots_hit,
      shots_hs: prev.shots_hs + cur.shots_hs,
      zedtime_count: prev.zedtime_count + cur.zedtime_count,
      zedtime_length: prev.zedtime_length + cur.zedtime_length,
      husk_b: prev.husk_b + cur.husk_b,
      husk_r: prev.husk_r + cur.husk_r,
      kills: {
        cyst: prev.kills.cyst + cur.kills.cyst,
        alpha_clot: prev.kills.alpha_clot + cur.kills.alpha_clot,
        slasher: prev.kills.slasher + cur.kills.slasher,
        stalker: prev.kills.stalker + cur.kills.stalker,
        crawler: prev.kills.crawler + cur.kills.crawler,
        gorefast: prev.kills.gorefast + cur.kills.gorefast,
        rioter: prev.kills.rioter + cur.kills.rioter,
        elite_crawler: prev.kills.elite_crawler + cur.kills.elite_crawler,
        gorefiend: prev.kills.gorefiend + cur.kills.gorefiend,

        siren: prev.kills.siren + cur.kills.siren,
        bloat: prev.kills.bloat + cur.kills.bloat,
        edar: prev.kills.edar + cur.kills.edar,
        husk: prev.kills.husk + cur.kills.husk,

        scrake: prev.kills.scrake + cur.kills.scrake,
        fp: prev.kills.fp + cur.kills.fp,
        qp: prev.kills.qp + cur.kills.qp,
        boss: prev.kills.boss + cur.kills.boss,
      },
    };
  }

  for (const item of items) {
    let foundNonNull = false;

    for (let i = 0; i < item.waves.length; i++) {
      if (!foundNonNull && item.waves[i] === null) continue;
      if (i === 0 || !foundNonNull) {
        foundNonNull = true;
        continue;
      }

      if (item.waves[i] === null) {
        item.waves[i] = item.waves[i - 1];
        continue;
      }

      item.waves[i]!.stats = aggregate(
        item.waves[i - 1]!.stats,
        item.waves[i]!.stats
      );
    }
  }

  return items;
}

export function prepareDatasets(
  data: NormalizedData[],
  colors: string[],
  profiles: UserProfile[],
  pickFn: (stats: UserWaveStats | null) => number | undefined
): DataSet[] {
  const datasets: DataSet[] = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const profile = findUserProfile(profiles, item.user_id);

    datasets.push({
      user_id: item.user_id,
      profile,
      color: colors[i],
      values: item.waves.map((x) => ({
        player: x?.player,
        value: pickFn(x) as any,
      })),
    });
  }

  return datasets;
}
