<script lang="ts">
  import PlayerListItem from './PlayersListItem.svelte';
  import PlayerListGroup from './PlayersListGroup.svelte';
  import type { RecentUsersResponseUser } from '$lib/api/servers';

  function sortByDate(a: RecentUsersResponseUser, b: RecentUsersResponseUser) {
    return b.match.details.user_data!.last_seen.localeCompare(
      a.match.details.user_data!.last_seen
    );
  }

  export let data: Map<string, RecentUsersResponseUser[]>;
</script>

<div class="session-list">
  {#each data as [date, players] (date)}
    <PlayerListGroup {date} />
    {#each players.sort(sortByDate) as data (data.user_profile.id)}
      <PlayerListItem {data} />
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
