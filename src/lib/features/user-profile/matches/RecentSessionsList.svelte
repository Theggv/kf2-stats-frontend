<script lang="ts">
  import type { RecentSessionsResponseSession } from '$lib/api/users';
  import RecentSessionsListItem from './RecentSessionsListItem.svelte';
  import RecentSessionsListGroup from './RecentSessionsListGroup.svelte';

  function sortByDate(
    a: RecentSessionsResponseSession,
    b: RecentSessionsResponseSession
  ) {
    return b.updated_at.localeCompare(a.updated_at);
  }

  export let data: Map<string, RecentSessionsResponseSession[]>;
</script>

<div class="session-list">
  {#each data as [date, sessions] (date)}
    <RecentSessionsListGroup {date} games={sessions} />
    {#each sessions.sort(sortByDate) as data (data.id)}
      <RecentSessionsListItem {data} />
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
