type TabData = {
  options?: string[];
  id: string;
  href: string;
  content: string;
};

export const tabs: TabData[] = [
  {
    id: 'overview',
    href: '',
    content: 'Overview',
  },
  {
    id: 'matches',
    href: '/matches',
    content: 'Matches',
  },
  {
    id: 'perks',
    href: '/perks',
    content: 'Perks',
  },
];
