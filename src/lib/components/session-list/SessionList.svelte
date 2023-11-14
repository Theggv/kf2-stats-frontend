<script lang="ts">
  import Session from './Session.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import type { WithRequired } from '$lib/util/types';
  import type { MatchData } from '$lib/api/matches';
  import InfiniteScroll from '../infinite-scroll/InfiniteScroll.svelte';

  function formatDate(str: string) {
    return new Date(str).toLocaleString('en', {
      day: 'numeric',
      month: 'long',
    });
  }

  export let data: Map<
    string,
    WithRequired<MatchData, 'server' | 'map' | 'game_data'>[]
  >;
  export let withServer: boolean = false;
  export let hasMore: boolean;
</script>

<AutoScroll>
  <div class="session-list">
    {#each data as [date, sessions] (date)}
      <div class="date">{formatDate(date)}</div>
      {#each sessions as data (data.session.session_id)}
        <Session {data} {withServer} />
      {/each}
    {:else}
      <div class="empty">No sessions in the list</div>
    {/each}
  </div>
  <InfiniteScroll {hasMore} on:loadMore threshold={100} />
</AutoScroll>

<style>
  .session-list {
    position: relative;
    display: grid;
    grid-template-columns: 75px minmax(200px, 300px) 1fr max-content max-content max-content;
    gap: 1rem 2rem;
    align-items: center;
  }

  @media (max-width: 1280px) {
    .session-list {
      gap: 1rem 1rem;
    }
  }

  .date {
    grid-column: span 7;
    padding-left: 1rem;
    color: var(--text-secondary);
    user-select: none;
  }

  .empty {
    grid-column: span 7;
    text-align: center;
  }
</style>
