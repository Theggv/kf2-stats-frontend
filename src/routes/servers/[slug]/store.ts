import type { SvelteComponent } from 'svelte';
import AnalyticsContainer from './AnalyticsContainer.svelte';
import RecentMatches from './RecentMatches.svelte';
import RecentPlayers from './RecentPlayers.svelte';

type TabData = {
  options?: string[];
  href: string;
  content: string;
  component?: typeof SvelteComponent<{ serverId: number }>;
};

export const tabs: TabData[] = [
  {
    options: ['', '#matches'],
    href: '#matches',
    content: 'Recent Matches',
    component: RecentMatches,
  },
  {
    href: '#players',
    content: 'Recent Players',
    component: RecentPlayers,
  },
  {
    href: '#stats',
    content: 'Server Stats',
    component: AnalyticsContainer,
  },
];

export const isTabSelected = (current: string, tab: TabData) =>
  tab.href === current || tab.options?.includes(current);
