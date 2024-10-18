import { AiOutlineHistory } from 'svelte-icons-pack/ai';
import { FaSolidServer, FaSolidUsers } from 'svelte-icons-pack/fa';
import { IoPodium } from 'svelte-icons-pack/io';

type Link = { href: string; title: string; icon: any };

export const links: Link[] = [
  { title: 'Servers', href: '/servers', icon: FaSolidServer },
  { title: 'Matches', href: '/sessions', icon: AiOutlineHistory },
  { title: 'Players', href: '/players', icon: FaSolidUsers },
  { title: 'Leaderboard', href: '/leaderboards', icon: IoPodium },
];
