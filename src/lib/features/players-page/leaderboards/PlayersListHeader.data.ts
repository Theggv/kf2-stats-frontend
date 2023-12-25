import {
  LeaderBoardType,
  type LeaderBoardsResponseItem,
} from '$lib/api/leaderboards';
import { Perk } from '$lib/api/matches';
import { shortenNumber } from '$lib/util/shorten-number';

type Column = {
  label: string;
  type: LeaderBoardType;
  condition?: (perk: Perk) => boolean;
  render: (item: LeaderBoardsResponseItem) => number | string;
};

export const columns: Column[] = [
  {
    label: 'Games',
    type: LeaderBoardType.TotalGames,
    render: (item) => item.total_games,
  },
  {
    label: 'Total Kills',
    type: LeaderBoardType.TotalKills,
    render: (item) => shortenNumber(item.total_kills),
  },
  {
    label: 'Total Deaths',
    type: LeaderBoardType.TotalDeaths,
    render: (item) => shortenNumber(item.total_deaths),
  },
  {
    label: 'Total Damage',
    type: LeaderBoardType.TotalDamage,
    render: (item) => shortenNumber(item.total_damage),
  },
  {
    label: 'Large Kills',
    type: LeaderBoardType.TotalLargeKills,
    condition: (perk) => false,
    render: (item) => shortenNumber(item.total_large_kills),
  },
  {
    label: 'Most Damage',
    type: LeaderBoardType.MostDamage,
    render: (item) => `
      <a href="/sessions/${item.most_damage.session_id}" target="_blank" rel="noopener noreferrer">
        ${item.most_damage.value}
      </a>`,
  },
  {
    label: 'Accuracy',
    type: LeaderBoardType.HsAccuracy,
    condition: (perk) => perk === Perk.Gunslinger || perk === Perk.Sharpshooter,
    render: (item) =>
      `${(item.accuracy * 100).toFixed(0)}% (HS ${(
        item.hs_accuracy * 100
      ).toFixed(0)}%)`,
  },
  {
    label: 'Avg Zedtime',
    type: LeaderBoardType.AverageZedtime,
    condition: (perk) => perk === Perk.Commando,
    render: (item) => `${item.avg_zt.toFixed(2)}s`,
  },
  {
    label: 'Most Heals',
    type: LeaderBoardType.TotalHeals,
    condition: (perk) => perk === Perk.Medic,
    render: (item) => shortenNumber(item.total_heals),
  },
  {
    label: 'Playtime',
    type: LeaderBoardType.TotalPlaytime,
    render: (item) => `${item.total_playtime} hrs`,
  },
];
