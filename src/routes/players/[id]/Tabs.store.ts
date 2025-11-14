type TabData = {
  options?: string[];
  id: string;
  href: string;
  content: string;
  show?: 'user-profile' | 'another-user';
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
  {
    id: 'maps',
    href: '/maps',
    content: 'Most Played Maps',
  },
  {
    id: 'last-seen',
    href: '/coplay',
    content: 'Last Seen',
    show: 'user-profile',
  },
  {
    id: 'coplay',
    href: '/coplay/games',
    content: 'Last Games Together',
    show: 'another-user',
  },
];
