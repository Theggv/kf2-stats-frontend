<script lang="ts">
  import PlayersListItem from './PlayersListItem.svelte';
  import PlayersListGroup from './PlayersListGroup.svelte';
  import type { FilterUsersResponseUser } from '$lib/api/users';

  function sortByDate(a: FilterUsersResponseUser, b: FilterUsersResponseUser) {
    return b.updated_at.localeCompare(a.updated_at);
  }

  export let data: Map<string, FilterUsersResponseUser[]>;
</script>

<div class="session-list">
  {#each data as [date, sessions] (date)}
    <PlayersListGroup {date} />
    {#each sessions.sort(sortByDate) as data (data.id)}
      <PlayersListItem {data} />
    {/each}
  {:else}
    <div class="empty-list">No matches found</div>
  {/each}
</div>

<style>
  .session-list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .empty-list {
    padding: 0.5rem;
    padding-left: 2rem;
    font-weight: bold;
    color: var(--text-secondary);
  }
</style>
