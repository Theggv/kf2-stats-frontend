<script lang="ts">
  import PlayersListItem from './PlayersListItem.svelte';
  import PlayersListHeader from './PlayersListHeader.svelte';
  import type { LeaderBoardsResponseItem } from '$lib/api/leaderboards';
  import { getContext } from 'svelte';
  import {
    type LeaderBoardStore,
    LoaderBoardCtxKey,
  } from './Leaderboard.store';

  export let data: LeaderBoardsResponseItem[];

  const { loading } = getContext<LeaderBoardStore>(LoaderBoardCtxKey);
</script>

<div class="session-list" class:loading={$loading}>
  <PlayersListHeader />
  {#each data as player, index (player.id)}
    <PlayersListItem {index} data={player} />
  {:else}
    <div class="empty-list">No matches found</div>
  {/each}
</div>

<style>
  .session-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 0.25rem;
    overflow-x: auto;
    cursor: all-scroll;
    width: 100%;
  }

  @media (max-width: 640px) {
    .session-list {
      max-width: calc(100vw - 1.75rem);
    }
  }
  @media (min-width: 640px) {
    .session-list {
      max-width: 572px;
    }
  }
  @media (min-width: 768px) {
    .session-list {
      max-width: 700px;
    }
  }
  @media (min-width: 1024px) {
    .session-list {
      max-width: 956px;
    }
  }
  @media (min-width: 1280px) {
    .session-list {
      max-width: 896px;
    }
  }
  @media (min-width: 1536px) {
    .session-list {
      max-width: 1150px;
    }
  }

  .empty-list {
    padding: 0.5rem;
    padding-left: 2rem;
    font-weight: bold;
    color: var(--text-secondary);
  }

  .loading {
    filter: brightness(0.6);
  }
</style>
