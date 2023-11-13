<script lang="ts">
  import { SITE_NAME } from '$lib';
  import type { FilterUsersResponseUser } from '$lib/api/users';
  import PlayerList from '$lib/components/player-list/PlayerList.svelte';
  import { usersStore } from '$lib/components/player-list/store';

  const [page, filter, users, hasMore, loading, error] = usersStore();

  $: groupedUsers = $users.reduce((map, item) => {
    const key = new Date(item.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, FilterUsersResponseUser[]>());
</script>

<svelte:head>
  <title>Players | {SITE_NAME}</title>
</svelte:head>

<div class="root">
  <div class="header">
    <h1>Recent Players</h1>
    <input bind:value={$filter.search_text} placeholder="Search by name" />
  </div>
  <hr />
  <PlayerList
    data={groupedUsers}
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
  />
</div>

<style>
  .root {
    flex: 1;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    font-size: 20px;
  }

  input {
    padding: 0.5rem;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 0.5rem;
    transition: all 100ms;
  }

  input:focus {
    border: 1px solid var(--selected-primary);
    outline: 1px solid var(--selected-primary);
  }
</style>
