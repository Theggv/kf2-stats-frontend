<script lang="ts">
  import type { MatchData } from '$lib/api/matches';
  import SessionList from '$lib/components/session-list/SessionList.svelte';
  import { sessionListStore } from '$lib/components/session-list/store';
  import type { WithRequired } from '$lib/util/types';

  export let serverId: number;

  const [ page, filter, sessions, hasMore, loading, error] = sessionListStore();

  $: sortedSessions = $sessions.reduce((map, item) => {
    const key = new Date(item.session.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, WithRequired<MatchData, 'server' | 'map' | 'game_data'>[]>());

  $: filter.set({
    include_server: false,
    server_id: [serverId],
  });
</script>

<SessionList
  withServer={false}
  data={sortedSessions}
  hasMore={$hasMore}
  on:loadMore={() => page.update((p) => p + 1)}
/>
