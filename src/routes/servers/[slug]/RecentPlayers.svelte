<script lang="ts">
  import type { RecentUsersResponseUser } from '$lib/api/servers';
  import PlayerList from '$lib/components/server-recent-players/PlayerList.svelte';
  import { getStore } from '$lib/components/server-recent-players/store';

  export let serverId: number;

  const [page, sessions, hasMore, loading, error] = getStore(serverId);

  $: sortedSessions = $sessions.reduce((map, item) => {
    const key = new Date(item.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, RecentUsersResponseUser[]>());
</script>

<PlayerList
  data={sortedSessions}
  hasMore={$hasMore}
  loading={$loading}
  on:loadMore={() => page.update((p) => p + 1)}
/>
