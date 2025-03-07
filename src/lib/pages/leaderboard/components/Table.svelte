<script lang="ts">
  import RowHeader from './RowHeader.svelte';
  import type { LeaderBoardsResponseItem } from '$lib/api/leaderboards';
  import { getContext } from 'svelte';
  import { type LeaderBoardStore, LoaderBoardCtxKey } from '../store';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import ColumnHeader from './ColumnHeader.svelte';
  import TableRow from './TableRow.svelte';

  export let data: LeaderBoardsResponseItem[];

  const { loading } = getContext<LeaderBoardStore>(LoaderBoardCtxKey);
</script>

<AutoScroll>
  <img
    class="loader"
    class:visible={$loading}
    src="/assets/pivozavr-loader.gif"
    alt=""
  />

  <div class="table" class:loading={$loading}>
    {#if data.length}
      <div class="header">
        <div class="first">
          <div class="index">#</div>

          <div class="player">
            <div class="title">Player</div>
          </div>
        </div>

        {#each data as player, index (player.id)}
          <RowHeader {index} data={player} />
        {/each}
      </div>

      <div class="rows">
        <div class="item">
          <ColumnHeader />
        </div>

        {#each data as player, index (player.id)}
          <div class="item">
            <TableRow data={player} {index} />
          </div>
        {/each}
      </div>
    {:else}
      <div class="empty-list">No data.</div>
    {/if}
  </div>
</AutoScroll>

<style>
  .table {
    position: relative;

    display: grid;
    grid-template-columns: 200px 1fr;
    overflow-x: hidden;

    transition: all 200ms;
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto auto;
    opacity: 0;
    width: 150px;
    aspect-ratio: 1;
    z-index: 1;
    transition-property: opacity;
    transition-duration: 200ms;
    transition-delay: 0;
    transition-timing-function: ease-in-out;
  }

  .loader.visible {
    transition-delay: 1s;
    opacity: 0.75;
  }

  @media (max-width: 640px) {
    .table {
      max-width: calc(100vw - 1.75rem);
    }
  }
  @media (min-width: 640px) {
    .table {
      max-width: 572px;
    }
  }
  @media (min-width: 768px) {
    .table {
      grid-template-columns: 250px 1fr;
      max-width: 700px;
    }
  }
  @media (min-width: 1024px) {
    .table {
      max-width: 956px;
      grid-template-columns: 300px 1fr;
    }
  }
  @media (min-width: 1280px) {
    .table {
      max-width: 896px;
    }
  }
  @media (min-width: 1536px) {
    .table {
      max-width: 1150px;
    }
  }

  .table > .header,
  .table > .rows {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .table > .header > .first {
    display: grid;
    grid-template-columns: 2rem auto;
    align-items: center;
    gap: 0.5rem;

    padding: 0 0.25rem;
    padding-left: 2rem;
    height: 48px;

    font-weight: bold;
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.1));
  }

  .table > .header > .first > .index {
    color: var(--text-secondary);
    display: flex;
    width: 2rem;
  }

  @media (max-width: 768px) {
    .table > .header > .first {
      grid-template-columns: 2ch auto;
      padding-left: 1rem;
    }
  }

  .table > .header > .first > .player {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .table > .rows {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 0.5rem;
  }

  .table > .rows::-webkit-scrollbar {
    height: 12px;
  }

  .table > .rows::-webkit-scrollbar-track {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  .table > .rows::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #9ca3af;
  }

  .empty-list {
    grid-column: 1 / span 2;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;
    padding-left: 2rem;
    font-weight: bold;
    color: var(--text-secondary);
  }

  .loading {
    filter: brightness(0.6);
  }
</style>
