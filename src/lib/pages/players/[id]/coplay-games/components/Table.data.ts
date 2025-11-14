import type { GetLastSessionsWithUserResponseItem } from '$lib/api/analytics';
import type { TableColumn } from '$lib/components/table';
import { getTimeSinceNow } from '$lib/util/date';
import DifficultyWrapper from './DifficultyWrapper.svelte';
import PerkWrapper from './PerkWrapper.svelte';
import SessionWrapper from './SessionWrapper.svelte';

export type RowData = GetLastSessionsWithUserResponseItem & {
  key: string;
};

export const stickyColumns: TableColumn<RowData>[] = [
  {
    label: '',
    id: 'index',
    render: (_, index) => `${index + 1}`,
    width: 50,
  },
  {
    label: '',
    id: 'difficulty',
    render: () => DifficultyWrapper,
    width: 40,
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
    width: 150,
  },
  {
    label: 'Last Played',
    id: 'last_seen',
    render: (item) => getTimeSinceNow(new Date(item.last_seen)),
    width: 100,
  },
];
