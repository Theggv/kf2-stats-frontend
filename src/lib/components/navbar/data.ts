import IoPodium from 'svelte-icons-pack/io/IoPodium';
import FaSolidUsers from 'svelte-icons-pack/fa/FaSolidUsers';
import FaSolidServer from 'svelte-icons-pack/fa/FaSolidServer';
import AiOutlineHistory from 'svelte-icons-pack/ai/AiOutlineHistory';

type Link = { href: string; title: string; icon: any };

export const links: Link[] = [
  { title: 'Servers', href: '/servers', icon: FaSolidServer },
  { title: 'Matches', href: '/sessions', icon: AiOutlineHistory },
  { title: 'Players', href: '/players', icon: FaSolidUsers },
  { title: 'Leaderboard', href: '/leaderboards', icon: IoPodium },
];
