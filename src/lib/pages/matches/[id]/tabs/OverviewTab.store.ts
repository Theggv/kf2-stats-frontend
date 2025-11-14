import { type UserProfile, type ZedGroups, groupZeds } from '$lib/api/common';
import type { MatchWave, MatchWavePlayerStats } from '$lib/api/matches';
import { derived, type Writable } from 'svelte/store';
import type { Match } from '../Match.store';
import { findUserProfile, groupByUserId } from './util';

function getWavesZedGroups(waves: MatchWave[]): ZedGroups[] {
  return waves.map((wave) => {
    if (!wave.players || !wave.players.length)
      return { trash: 0, medium: 0, large: 0, boss: 0, total: 0 };

    const waveZeds = wave.players
      .map((x) => x.stats)
      .map(groupZeds)
      .reduce(
        (acc, cur) => ({
          trash: acc.trash + cur.trash,
          medium: acc.medium + cur.medium,
          large: acc.large + cur.large,
          boss: acc.boss + cur.boss,
          total: acc.total + cur.total,
        }),
        { trash: 0, medium: 0, large: 0, boss: 0, total: 0 }
      );

    return waveZeds;
  });
}

function getMatchZedGroups(waves: ZedGroups[]) {
  if (!waves.length)
    return { trash: 0, medium: 0, large: 0, boss: 0, total: 0 };

  return waves.reduce((acc, cur) => ({
    trash: acc.trash + cur.trash,
    medium: acc.medium + cur.medium,
    large: acc.large + cur.large,
    boss: acc.boss + cur.boss,
    total: acc.total + cur.total,
  }));
}

function calcDifficulty(match: Match | null, zeds: ZedGroups): number {
  const largePercent = zeds.large / (zeds.total || 1);
  const mediumPercent = zeds.medium / (zeds.total || 1);

  let baseDiff = (largePercent * 2 + mediumPercent) * 15;

  if (match?.cd_data?.zeds_type === 'harder') baseDiff *= 1.2;
  if (match?.cd_data?.zeds_type === 'nightcore') baseDiff *= 1.3;

  return baseDiff;
}

export type AggregatedUserStats = {
  user_id: number;
  kills: ZedGroups;
  deaths: number;
  stats: Omit<MatchWavePlayerStats, 'kills'>;
};

function aggregateStats(waves: MatchWave[]): AggregatedUserStats[] {
  const users = groupByUserId(waves);

  return users.map((user) => ({
    user_id: user.user_id,
    kills: user.waves
      .map((x) => groupZeds(x.stats))
      .reduce(
        (acc, cur) => ({
          trash: acc.trash + cur.trash,
          medium: acc.medium + cur.medium,
          large: acc.large + cur.large,
          boss: acc.boss + cur.boss,
          total: acc.total + cur.total,
        }),
        { trash: 0, medium: 0, large: 0, boss: 0, total: 0 }
      ),
    deaths: user.waves.filter((x) => x.player.is_dead).length,
    stats: user.waves
      .map((x) => x.stats)
      .reduce(
        (acc, cur) => ({
          shots_fired: acc.shots_fired + cur.shots_fired,
          shots_hit: acc.shots_hit + cur.shots_hit,
          shots_hs: acc.shots_hs + cur.shots_hs,
          dosh_earned: acc.dosh_earned + cur.dosh_earned,
          heals_given: acc.heals_given + cur.heals_given,
          heals_recv: acc.heals_recv + cur.heals_recv,
          damage_dealt: acc.damage_dealt + cur.damage_dealt,
          damage_taken: acc.damage_taken + cur.damage_taken,
          zedtime_count: acc.zedtime_count + cur.zedtime_count,
          zedtime_length: acc.zedtime_length + cur.zedtime_length,
          husk_b: acc.husk_b + cur.husk_b,
          husk_r: acc.husk_r + cur.husk_r,
        }),
        {
          shots_fired: 0,
          shots_hit: 0,
          shots_hs: 0,
          dosh_earned: 0,
          heals_given: 0,
          heals_recv: 0,
          damage_dealt: 0,
          damage_taken: 0,
          zedtime_count: 0,
          zedtime_length: 0,
          husk_b: 0,
          husk_r: 0,
        }
      ),
  }));
}

export function matchAnalysisStore(
  match: Writable<Match | null>,
  waves: Writable<MatchWave[]>
) {
  const wavesZedGroups = derived([waves], ([data]) => getWavesZedGroups(data));

  const matchZedGroups = derived([wavesZedGroups], ([data]) =>
    getMatchZedGroups(data)
  );

  return {
    wavesZedGroups,
    matchZedGroups,
    difficulty: derived([match, matchZedGroups], ([match, data]) =>
      calcDifficulty(match, data)
    ),
    calculatedDiff: derived([match], ([match]) =>
      Math.pow(match?.metadata.diff?.summary.final_score || 0, 2)
    ),
    aggregatedUserStats: derived([waves], ([data]) => aggregateStats(data)),
  };
}

export type OverviewCardData = {
  title: string;
  selector: (stats: AggregatedUserStats) => number;
  condition?: (stats: AggregatedUserStats) => boolean;
  formatter: (stats: AggregatedUserStats) => string;
};

function calcAccuracy({ stats }: AggregatedUserStats): number {
  if (stats.shots_fired <= 0) return 0;
  return stats.shots_hit / stats.shots_fired;
}

function calcHsAccuracy({ stats }: AggregatedUserStats): number {
  if (stats.shots_hit <= 0) return 0;
  return stats.shots_hs / stats.shots_hit;
}

function calcZedtime({ stats }: AggregatedUserStats): number {
  if (stats.zedtime_count <= 0) return 0;
  return stats.zedtime_length / stats.zedtime_count;
}

export const overviewCards: OverviewCardData[] = [
  {
    title: 'Zed Slayer',
    selector: (stats) => stats.kills.total,
    condition: (stats) => stats.kills.total > 0,
    formatter: (stats) => `${stats.kills.total} Kills`,
  },
  {
    title: 'Large Slayer',
    selector: (stats) => stats.kills.large,
    condition: (stats) => stats.kills.large > 0,
    formatter: (stats) => `${stats.kills.large} Large Kills`,
  },
  {
    title: 'Damage Dealer',
    selector: (stats) => stats.stats.damage_dealt,
    condition: (stats) => stats.stats.damage_dealt > 0,
    formatter: (stats) => `${stats.stats.damage_dealt} Damage`,
  },
  {
    title: 'Head Popper',
    selector: (stats) => stats.stats.shots_hs,
    condition: (stats) => stats.stats.shots_hs > 0,
    formatter: (stats) => `${stats.stats.shots_hs} Headshots`,
  },
  {
    title: 'Accuracy',
    selector: (stats) => calcAccuracy(stats),
    condition: (stats) => calcAccuracy(stats) > 0,
    formatter: (stats) => `${(calcAccuracy(stats) * 100).toFixed(0)}%`,
  },
  {
    title: 'HS Accuracy',
    selector: (stats) => calcHsAccuracy(stats),
    condition: (stats) => calcHsAccuracy(stats) > 0,
    formatter: (stats) => `${(calcHsAccuracy(stats) * 100).toFixed(0)}%`,
  },
  {
    title: 'Medic Main',
    selector: (stats) => stats.stats.heals_given,
    condition: (stats) => stats.stats.heals_given > 0,
    formatter: (stats) => `${stats.stats.heals_given} Heals Given`,
  },
  {
    title: 'Berserker Main',
    selector: (stats) => stats.stats.damage_taken,
    condition: (stats) => stats.stats.damage_taken > 0,
    formatter: (stats) => `${stats.stats.damage_taken} Damage Taken`,
  },
  {
    title: 'Zed Time Enjoyer',
    selector: (stats) => calcZedtime(stats),
    condition: (stats) => calcZedtime(stats) > 0,
    formatter: (stats) =>
      `${calcZedtime(stats).toFixed(1)}s Average Zed Time Length`,
  },
  {
    title: 'Gimme your money',
    selector: (stats) => stats.stats.dosh_earned,
    condition: (stats) => stats.stats.dosh_earned > 0,
    formatter: (stats) => `${stats.stats.dosh_earned} Dosh`,
  },
  {
    title: 'I need more boolets!',
    selector: (stats) => stats.stats.shots_fired,
    condition: (stats) => stats.stats.shots_fired > 0,
    formatter: (stats) => `${stats.stats.shots_fired} Shots fired`,
  },
  {
    title: 'Dead man',
    selector: (stats) => stats.deaths,
    condition: (stats) => stats.deaths > 0,
    formatter: (stats) =>
      `${stats.deaths} ${stats.deaths === 1 ? 'Death' : 'Deaths'}`,
  },
  {
    title: 'Oops hehe',
    selector: (stats) => stats.stats.husk_r,
    condition: (stats) => stats.stats.husk_r > 0,
    formatter: (stats) => `${stats.stats.husk_r} FP Rages From Husk Backpacks`,
  },
];

export function getCardContent(
  data: AggregatedUserStats[],
  profiles: UserProfile[],
  card: OverviewCardData
) {
  const winner = data
    .filter((x) => !card.condition || card.condition(x))
    .map((x) => ({
      user_id: x.user_id,
      value: card.selector(x),
    }))
    .sort((a, b) => b.value - a.value)
    .at(0);

  if (!winner) return null;

  const content = data.find((x) => x.user_id === winner.user_id)!;

  return {
    title: card.title,
    value: card.formatter(content),
    profile: findUserProfile(profiles, winner.user_id),
  };
}
