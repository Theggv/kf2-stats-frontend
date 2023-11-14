type TabData = {
  options?: string[];
  href: string;
  content: string;
  showIfUserSelected?: boolean;
};

export const tabs: TabData[] = [
  {
    options: ['', '#general'],
    href: '#general',
    content: 'General',
  },
  {
    href: '#detailed',
    content: 'Detailed',
    showIfUserSelected: false,
  },
  {
    href: '#waves',
    content: 'Waves',
    showIfUserSelected: true,
  },
  {
    href: '#kills',
    content: 'Kills',
    showIfUserSelected: true,
  },
  {
    href: '#charts',
    content: 'Charts',
    showIfUserSelected: true,
  },
];

export const isTabSelected = (current: string, tab: TabData) =>
  tab.href === current || tab.options?.includes(current);

export const shouldRenderTab = (tab: TabData, userId: number | null) => {
  if (tab.showIfUserSelected === undefined) return true;
  if (tab.showIfUserSelected && userId != null) return true;
  if (!tab.showIfUserSelected && userId == null) return true;

  return false;
};
