<script lang="ts">
  import Player from './Player.svelte';
  import AutoScroll from '../auto-scroll/AutoScroll.svelte';
  import InfiniteScroll from '../infinite-scroll/InfiniteScroll.svelte';
  import type { FilterUsersResponseUser } from '$lib/api/users';
  import { getDayAndMonth } from '$lib/util/date';

  export let data: Map<string, FilterUsersResponseUser[]>;
  export let hasMore: boolean;

  function sortByDate(a: FilterUsersResponseUser, b: FilterUsersResponseUser) {
    return b.updated_at.localeCompare(a.updated_at);
  }
</script>

<AutoScroll>
  <div class="root">
    <div class="index" />
    <div>Player</div>
    <div>Game Info</div>
    <div class="center">Wave</div>
    <div class="center">Status</div>

    {#each data as [date, users] (date)}
      <div class="date">{getDayAndMonth(date)}</div>
      {#each users.sort(sortByDate) as item (item.id)}
        <Player {item} />
      {/each}
    {:else}
      <div class="empty">No users in the list</div>
    {/each}
  </div>
  <InfiniteScroll {hasMore} on:loadMore threshold={100} />
</AutoScroll>

<style>
  .root {
    position: relative;
    display: grid;
    grid-template-columns: 75px 300px 1fr max-content max-content;
    gap: 1rem 2rem;
    align-items: center;
  }

  @media (max-width: 1280px) {
    .root {
      gap: 1rem 1rem;
    }
  }

  .index {
    text-align: right;
  }

  .date {
    grid-column: span 5;
    padding-left: 1rem;
    color: var(--text-secondary);
    user-select: none;
  }

  .center {
    text-align: center;
  }

  .empty {
    grid-column: span 5;
    text-align: center;
  }
</style>
