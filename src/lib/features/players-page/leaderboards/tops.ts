import { LeaderBoardType } from '$lib/api/leaderboards';
import { shortenNumber } from '$lib/util/shorten-number';

type TopData = {
  label: string;
  type: LeaderBoardType;
  format: (value: number) => string;
};

export const tops: TopData[] = [
  {
    label: 'Average HS Accuracy',
    type: LeaderBoardType.HsAccuracy,
    format: (value) => `${(value * 100).toFixed(1)}%`,
  },
  {
    label: 'Most Deaths',
    type: LeaderBoardType.TotalDeaths,
    format: (value) => `${shortenNumber(value)} Deaths`,
  },
  {
    label: 'Most Playtime',
    type: LeaderBoardType.TotalPlaytime,
    format: (value) => `${value} Hours`,
  },

  {
    label: 'Average Zedtime',
    type: LeaderBoardType.AverageZedtime,
    format: (value) => `${value.toFixed(2)}s`,
  },
  {
    label: 'Most Damage',
    type: LeaderBoardType.MostDamage,
    format: (value) => `${shortenNumber(value)} Damage`,
  },

  {
    label: 'Most Heals',
    type: LeaderBoardType.TotalHeals,
    format: (value) => `${shortenNumber(value)} Heals`,
  },

  {
    label: 'Most Kills',
    type: LeaderBoardType.TotalKills,
    format: (value) => `${shortenNumber(value)} Kills`,
  },
];
