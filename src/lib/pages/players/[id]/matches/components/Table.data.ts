import type { Match } from '$lib/api/matches/filter';
import type { TableColumn } from '$lib/components/table';
import DateWrapper from './DateWrapper.svelte';
import DifficultyWrapper from './DifficultyWrapper.svelte';
import PerkWrapper from './PerkWrapper.svelte';
import SessionWrapper from './SessionWrapper.svelte';
import SettingsWrapper from './SettingsWrapper.svelte';
import WaveWrapper from './WaveWrapper.svelte';

export type RowData = Match & {
  key: string;
};

export const stickyColumns: TableColumn<RowData>[] = [
  {
    label: 'Updated At',
    id: 'updated_at',
    render: () => DateWrapper,
    width: 120,
    sorting: {
      compare: (dir) => (a, b) => {
        return dir === 'asc'
          ? a.session.updated_at.localeCompare(b.session.updated_at)
          : b.session.updated_at.localeCompare(a.session.updated_at);
      },
      direction: 'desc',
    },
  },
  {
    label: 'Match',
    id: 'server',
    render: () => SessionWrapper,
    width: 250,
  },
];

export const columns: TableColumn<RowData>[] = [
  {
    label: 'Perks',
    id: 'perks',
    render: () => PerkWrapper,
    width: 80,
  },
  {
    label: '',
    id: 'difficulty',
    render: () => DifficultyWrapper,
    width: 40,
  },
  {
    label: 'Settings',
    id: 'calc_difficulty',
    render: () => SettingsWrapper,
    width: 240,
    sorting: {
      compare: (dir) => (a, b) => {
        let a_diff = a.metadata.diff?.summary.final_score || 0;
        let b_diff = b.metadata.diff?.summary.final_score || 0;

        return dir === 'asc' ? a_diff - b_diff : b_diff - a_diff;
      },
      direction: 'desc',
    },
  },
  {
    label: 'Wave',
    id: 'wave',
    render: () => WaveWrapper,
    width: 100,
  },

  {
    label: 'Total Damage',
    id: 'damage_dealt',
    render: (item) => item.details.user_data!.stats.damage_dealt,
    width: 130,
    sorting: {
      compare: (dir) => (a, b) => {
        return dir === 'asc'
          ? a.details.user_data!.stats.damage_dealt -
              b.details.user_data!.stats.damage_dealt
          : b.details.user_data!.stats.damage_dealt -
              a.details.user_data!.stats.damage_dealt;
      },
      direction: 'desc',
    },
  },
];
