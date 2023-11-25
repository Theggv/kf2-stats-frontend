<script lang="ts">
  import SessionList from '$lib/components/session-list/SessionList.svelte';
  import { sessionListStore } from '$lib/components/session-list/store';
  import { groupBy } from '$lib/util';
  import { totalMatches } from './store';

  export let serverId: number;

  const [page, filter, sessions, total, hasMore] = sessionListStore();

  $: totalMatches.set($total);

  $: sortedSessions = groupBy($sessions, (item) =>
    new Date(item.session.updated_at).toDateString()
  );

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
