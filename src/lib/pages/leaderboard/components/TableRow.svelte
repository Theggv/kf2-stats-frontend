<script lang="ts">
  import type { LeaderBoardsResponseItem } from '$lib/api/leaderboards';
  import { getContext } from 'svelte';
  import { columns } from './ColumnHeader.data';
  import { type LeaderBoardStore, LoaderBoardCtxKey } from '../store';

  export let index: number;
  export let data: LeaderBoardsResponseItem;

  const { type, perk } = getContext<LeaderBoardStore>(LoaderBoardCtxKey);
</script>

<div class="root {index % 2 ? 'even' : 'odd'}">
  <div class="row">
    {#each columns as column}
      {#if !column.condition || column.condition($perk)}
        <div class="column" style={`min-width: ${column.width || 100}px`}>
          <div class="title" class:secondary={$type !== column.type}>
            {column.label}
          </div>
          <div class="value">{@html column.render(data)}</div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .root {
    display: table-cell;
  }

  .root.even {
    background: linear-gradient(
      to right,
      rgb(0 0 0 / 0.2) calc(100% - 200px),
      rgb(0 0 0 / 0)
    );
  }

  .root.odd {
    background: linear-gradient(
      to right,
      rgb(0 0 0 / 0.3) calc(100% - 200px),
      rgb(0 0 0 / 0)
    );
  }

  .row {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    padding: 0 0.25rem;
    padding-left: 2rem;
    font-weight: bold;
    height: 48px;
  }

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .row::before {
    position: absolute;

    content: '';
    left: 0;
    width: 3px;
    top: 0.25rem;
    bottom: 0.25rem;
  }

  .title,
  .value {
    white-space: nowrap;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    .row {
      gap: 0.25rem;
      padding-left: 1rem;
    }
  }
</style>
