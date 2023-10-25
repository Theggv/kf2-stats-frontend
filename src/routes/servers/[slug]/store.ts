import type { SvelteComponent } from 'svelte';
import SessionList from './SessionList.svelte';

type TabData = {
  options?: string[];
  href: string;
  content: string;
  component?: typeof SvelteComponent<{ serverId: number }>;
};

export const tabs: TabData[] = [
  {
    options: ['', '#recent'],
    href: '#recent',
    content: 'Recent matches',
    component: SessionList,
  },
  {
    href: '#stats',
    content: 'Server stats',
  },
];

export const isTabSelected = (current: string, tab: TabData) =>
  tab.href === current || tab.options?.includes(current);
