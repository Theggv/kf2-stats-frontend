<script lang="ts">
  import type { RecentSessionsResponseSession } from '$lib/api/users';
  import SessionList from '$lib/components/player-recent-sessions/SessionList.svelte';
  import { recentSessionsStore as getStore } from '$lib/components/player-recent-sessions/store';
  import { totalMatches } from './store';

  export let userId: number;

  const [page, sessions, total, hasMore, loading] = getStore(userId);

  $: totalMatches.set($total);

  $: groupedSessions = $sessions.reduce((map, item) => {
    const key = new Date(item.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, RecentSessionsResponseSession[]>());
</script>

<SessionList
  data={groupedSessions}
  hasMore={$hasMore}
  loading={$loading}
  on:loadMore={() => page.update((p) => p + 1)}
/>
