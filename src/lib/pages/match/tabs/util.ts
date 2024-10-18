import type { UserProfile } from '$lib/api/common';
import type {
  MatchWave,
  MatchWavePlayer,
  MatchWavePlayerStats,
} from '$lib/api/matches';

export type UserWaveStats = {
  wave: Omit<MatchWave, 'players'>;
  player: Omit<MatchWavePlayer, 'stats'>;
  stats: MatchWavePlayerStats;
};

export type UserStats = {
  user_id: number;
  waves: UserWaveStats[];
};

export function groupByUserId(waves: MatchWave[]) {
  const mapper = waves.reduce((map, wave) => {
    const { players, ...waveRest } = wave;
    if (!players) return map;

    for (const player of players) {
      const { user_id, stats, ...playerRest } = player;

      const data = {
        wave: waveRest,
        player: { user_id, ...playerRest },
        stats,
      };

      if (!map.has(user_id)) {
        map.set(user_id, [data]);
      } else {
        map.get(user_id)!.push(data);
      }
    }

    return map;
  }, new Map<number, UserWaveStats[]>());

  const result: UserStats[] = [];
  for (const [user_id, waves] of mapper) {
    result.push({ user_id, waves });
  }

  return result;
}

export function findUserProfile(profiles: UserProfile[], userId: number) {
  return profiles.find((x) => x.id === userId);
}

export function tryGetPlayerData(
  userStats: ReturnType<typeof groupByUserId>[number],
  currentWave: MatchWave | undefined
) {
  if (!currentWave) return undefined;

  const waveId = currentWave.wave_id;

  for (let i = userStats.waves.length - 1; i >= 0; i--) {
    if (userStats.waves[i].wave.wave_id <= waveId)
      return userStats.waves[i].player;
  }

  return undefined;
}
