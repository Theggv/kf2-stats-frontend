<script lang="ts">
  import RecentSessionsListItem from './RecentSessionsListItem.svelte';
  import RecentSessionsListGroup from './RecentSessionsListGroup.svelte';
  import type { Match } from '$lib/api/matches';

  function sortByDate(a: Match, b: Match) {
    return b.session.updated_at.localeCompare(a.session.updated_at);
  }

  export let data: Map<string, Match[]>;
</script>

<div class="session-list">
  {#each data as [date, sessions] (date)}
    <RecentSessionsListGroup {date} matches={sessions} />
    {#each sessions.sort(sortByDate) as data (data.session.id)}
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
