<script lang="ts">
  import type { Match } from '../common';
  import MatchesListItem from './MatchesListItem.svelte';
  import MatchesListGroup from './MatchesListGroup.svelte';

  function sortByDate(a: Match, b: Match) {
    return b.session.updated_at.localeCompare(a.session.updated_at);
  }

  export let data: Map<string, Match[]>;
</script>

<div class="session-list">
  {#each data as [date, sessions] (date)}
    <MatchesListGroup {date} games={sessions} />
    {#each sessions.sort(sortByDate) as data (data.session.session_id)}
      <MatchesListItem {data} />
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
