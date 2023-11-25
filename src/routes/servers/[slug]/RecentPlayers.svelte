<script lang="ts">
  import PlayerList from '$lib/components/server-recent-players/PlayerList.svelte';
  import { getStore } from '$lib/components/server-recent-players/store';
  import { groupBy } from '$lib/util';
  import { totalRecentPlayers } from './store';

  export let serverId: number;

  const [page, sessions, total, hasMore, loading] = getStore(serverId);

  $: totalRecentPlayers.set($total);

  $: sortedSessions = groupBy($sessions, (item) =>
    new Date(item.updated_at).toDateString()
  );
</script>

<PlayerList
  data={sortedSessions}
  hasMore={$hasMore}
  loading={$loading}
  on:loadMore={() => page.update((p) => p + 1)}
/>
