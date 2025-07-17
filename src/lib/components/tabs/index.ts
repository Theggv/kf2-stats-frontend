export type TabData = {
  options?: string[];
  href: string;
  content: string;
};

export const isTabSelected = (current: string, tab: TabData) =>
  tab.href === current || tab.options?.includes(current);

import Tabs from './Tabs.svelte';

export { Tabs };
