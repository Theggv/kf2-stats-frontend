import type { GetPlayedMapsResponseItem } from '$lib/api/analytics';
import type { TableColumn } from '$lib/components/table';
import { getTimeSinceNow } from '$lib/util/date';

export type RowData = GetPlayedMapsResponseItem & {
  key: string;
  winrate: number;
};

export const stickyColumns: TableColumn<RowData>[] = [
  {
    label: '#',
    id: 'key',
    render: (_, index) => index + 1,
    width: 50,
  },
  {
    label: 'Name',
    id: 'name',
    render: (item) => item.name,
    sorting: {
      direction: 'asc',
      compare: (dir) => (a, b) => {
        return dir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      },
    },
    width: 250,
  },
];

export const columns: TableColumn<RowData>[] = [
  {
    label: 'Games',
    id: 'total_games',
    render: (item) => item.total_games,
    sorting: {
      direction: 'desc',
      compare: (dir) => (a, b) => {
        if (a.total_games === b.total_games) {
          return b.winrate - a.winrate;
        }

        return dir === 'asc'
          ? a.total_games - b.total_games
          : b.total_games - a.total_games;
      },
    },
    width: 150,
  },
  {
    label: 'Win rate',
    id: 'winrate',
    render: (item) => `${(item.winrate * 100).toFixed(1)}%`,
    sorting: {
      direction: 'desc',
      compare: (dir) => (a, b) => {
        if (a.winrate === b.winrate) {
          return b.total_games - a.total_games;
        }

        return dir === 'asc' ? a.winrate - b.winrate : b.winrate - a.winrate;
      },
    },
    width: 150,
  },
  {
    label: 'Last Played',
    id: 'last_played',
    sorting: {
      direction: 'desc',
      compare: (dir) => (a, b) => {
        return dir === 'asc'
          ? a.last_played.localeCompare(b.last_played)
          : b.last_played.localeCompare(a.last_played);
      },
    },
    render: (item) => getTimeSinceNow(new Date(item.last_played), true),
    width: 150,
  },
];
