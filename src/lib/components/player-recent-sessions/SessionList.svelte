<script lang="ts">
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import InfiniteScroll from '../infinite-scroll/InfiniteScroll.svelte';
  import Skeleton from './Skeleton.svelte';
  import type { RecentSessionsResponseSession } from '$lib/api/users';
  import Session from './Session.svelte';

  function formatDate(str: string) {
    return new Date(str).toLocaleString('en', {
      day: 'numeric',
      month: 'long',
    });
  }

  export let data: Map<string, RecentSessionsResponseSession[]>;
  export let hasMore: boolean;
  export let loading: boolean;
</script>

<AutoScroll>
  <div class="session-list">
    <div class="index" />
    <div>Server</div>
    <div>Perks</div>
    <div>Settings</div>
    <div class="center">Wave</div>
    <div class="center">Status</div>

    {#each data as [date, sessions] (date)}
      <div class="date">{formatDate(date)}</div>
      {#each sessions as data (data.id)}
        <Session {data} />
      {/each}
    {:else}
      <div class="empty">
        {#if loading}
          <Skeleton />
        {:else}
          No sessions in the list
        {/if}
      </div>
    {/each}
  </div>
  <InfiniteScroll {hasMore} on:loadMore threshold={100} />
</AutoScroll>

<style>
  .session-list {
    position: relative;
    display: grid;
    grid-template-columns:
      75px minmax(150px, auto) minmax(75px, auto) minmax(150px, auto)
      max-content max-content;
    gap: 1rem 2rem;
    align-items: center;
  }

  @media (max-width: 1280px) {
    .session-list {
      gap: 1rem 1rem;
    }
  }

  .index {
    text-align: right;
  }

  .date {
    grid-column: span 6;
    padding-left: 1rem;
    color: var(--text-secondary);
    user-select: none;
  }

  .center {
    text-align: center;
  }

  .empty {
    grid-column: span 6;
    text-align: center;
  }
</style>
