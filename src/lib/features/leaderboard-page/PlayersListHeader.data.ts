import {
  LeaderBoardType,
  type LeaderBoardsResponseItem,
} from '$lib/api/leaderboards';
import { Perk } from '$lib/api/matches';
import { shortenNumber } from '$lib/util/shorten-number';

type TableColumn = {
  label: string;
  type: LeaderBoardType;
  condition?: (perk: Perk) => boolean;
  render: (item: LeaderBoardsResponseItem) => number | string;
  width?: number;
};

export const columns: TableColumn[] = [
  {
    label: 'Games',
    type: LeaderBoardType.TotalGames,
    render: (item) => item.total_games,
    width: 80,
  },
  {
    label: 'Avg Zed Time',
    type: LeaderBoardType.AverageZedtime,
    condition: (perk) => perk === Perk.Commando,
    render: (item) => `${item.avg_zt.toFixed(2)}s`,
    width: 130,
  },
  {
    label: 'Most Heals',
    type: LeaderBoardType.TotalHeals,
    condition: (perk) => perk === Perk.Medic,
    render: (item) => shortenNumber(item.total_heals),
  },

  {
    label: 'Accuracy',
    type: LeaderBoardType.Accuracy,
    condition: (perk) => perk === Perk.Gunslinger || perk === Perk.Sharpshooter,
    render: (item) => `${(item.accuracy * 100).toFixed(0)}%`,
  },
  {
    label: 'HS Acc',
    type: LeaderBoardType.HsAccuracy,
    condition: (perk) => perk === Perk.Gunslinger || perk === Perk.Sharpshooter,
    render: (item) => `${(item.hs_accuracy * 100).toFixed(0)}%`,
    width: 80,
  },
  {
    label: 'Total Kills',
    type: LeaderBoardType.TotalKills,
    render: (item) => shortenNumber(item.total_kills),
  },
  {
    label: 'Large Kills',
    type: LeaderBoardType.TotalLargeKills,
    render: (item) => shortenNumber(item.total_large_kills),
    width: 110,
  },
  {
    label: 'Total Damage',
    type: LeaderBoardType.TotalDamage,
    render: (item) => shortenNumber(item.total_damage),
    width: 130,
  },
  {
    label: 'Most Damage',
    type: LeaderBoardType.MostDamage,
    render: (item) => `
      <a href="/sessions/${item.most_damage.session_id}" target="_blank" rel="noopener noreferrer">
        ${item.most_damage.value}
      </a>`,
    width: 130,
  },
  {
    label: 'Deaths',
    type: LeaderBoardType.TotalDeaths,
    render: (item) => shortenNumber(item.total_deaths),
    width: 80,
  },
  {
    label: 'Playtime',
    type: LeaderBoardType.TotalPlaytime,
    render: (item) => `${item.total_playtime} hrs`,
  },
];
