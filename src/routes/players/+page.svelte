<script lang="ts">
  import { SITE_NAME } from '$lib';
  import PlayerList from '$lib/components/player-list/PlayerList.svelte';
  import { usersStore } from '$lib/components/player-list/store';

  const [page, filter, users, hasMore, loading, error] = usersStore();
</script>

<svelte:head>
  <title>Players | {SITE_NAME}</title>
</svelte:head>

<PlayerList
  data={$users}
  hasMore={$hasMore}
  on:loadMore={() => page.update((p) => p + 1)}
/>
