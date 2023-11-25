<script lang="ts">
  import { SITE_NAME } from '$lib';
  import PlayerList from '$lib/components/player-list/PlayerList.svelte';
  import { usersStore } from '$lib/components/player-list/store';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import { groupBy } from '$lib/util';

  const [page, filter, users, _, hasMore] = usersStore();

  $: groupedUsers = groupBy($users, (item) =>
    new Date(item.updated_at).toDateString()
  );
</script>

<svelte:head>
  <title>Players | {SITE_NAME}</title>
</svelte:head>

<ListLayout>
  <div class="header" slot="header">
    <h1>Recent Players</h1>
    <input bind:value={$filter.search_text} placeholder="Search by name" />
  </div>
  <svelte:fragment slot="content">
    <PlayerList
      data={groupedUsers}
      hasMore={$hasMore}
      on:loadMore={() => page.update((p) => p + 1)}
    />
  </svelte:fragment>
</ListLayout>

<style>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .header h1 {
    font-size: 20px;
    padding: 0.25rem;
    padding-top: 0;
    font-weight: bold;
  }

  .header input {
    padding: 0.5rem;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 0.5rem;
    transition: all 100ms;
  }

  .header input:focus {
    border: 1px solid var(--selected-primary);
    outline: 1px solid var(--selected-primary);
  }
</style>
