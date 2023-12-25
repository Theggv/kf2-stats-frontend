<script lang="ts">
  import PlayersListItem from './PlayersListItem.svelte';
  import PlayersListHeader from './PlayersListHeader.svelte';
  import type { LeaderBoardsResponseItem } from '$lib/api/leaderboards';
  import { getContext } from 'svelte';
  import { type LeaderBoardStore, LoaderBoardCtxKey } from './PlayersTop.store';

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
