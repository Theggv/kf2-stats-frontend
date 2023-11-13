import type { SvelteComponent } from 'svelte';
import RecentSessions from './RecentSessions.svelte';
import lodash from 'lodash';
import { type Readable, writable } from 'svelte/store';
import { UsersApiService, type FilterUsersResponseUser } from '$lib/api/users';
import StatsContainer from './StatsContainer.svelte';

type TabData = {
  options?: string[];
  href: string;
  content: string;
  component?: typeof SvelteComponent<{ userId: number }>;
};

export const totalMatches = writable(0);

export function userStore(): [
  Readable<FilterUsersResponseUser>,
  Readable<boolean>,
  Readable<unknown>,
  lodash.DebouncedFunc<(userId: number) => Promise<void>>
] {
  const loading = writable(false);
  const error = writable<unknown>(false);

  const user = writable<FilterUsersResponseUser>();

  const fetch = lodash.debounce(async (userId: number) => {
    try {
      loading.set(true);
      const { data } = await UsersApiService.getUserDetailed(userId);

      user.set(data);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  }, 100);

  return [user, loading, error, fetch];
}

export const tabs: TabData[] = [
  {
    options: ['', '#matches'],
    href: '#matches',
    content: 'Recent Matches',
    component: RecentSessions,
  },
  {
    href: '#stats',
    content: 'Server Stats',
    component: StatsContainer,
  },
];

export const isTabSelected = (current: string, tab: TabData) =>
  tab.href === current || tab.options?.includes(current);
