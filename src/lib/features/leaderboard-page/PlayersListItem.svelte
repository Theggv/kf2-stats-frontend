<script lang="ts">
  import type { LeaderBoardsResponseItem } from '$lib/api/leaderboards';
  import Player from '$lib/components/player/Player.svelte';
  import { getContext } from 'svelte';
  import { columns } from './PlayersListHeader.data';
  import {
    type LeaderBoardStore,
    LoaderBoardCtxKey,
  } from './Leaderboard.store';

  export let index: number;
  export let data: LeaderBoardsResponseItem;

  const { type, perk } = getContext<LeaderBoardStore>(LoaderBoardCtxKey);

  function getPlaceColor(place: number) {
    if (place === 1) return 'first';
    if (place === 2) return 'second';
    if (place === 3) return 'third';
    return '';
  }
</script>

<div class="root {getPlaceColor(index + 1)}">
  <div class="index">
    {index + 1}
  </div>

  <div class="player">
    <Player profile={data} newTab compact />
  </div>

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

<style>
  :root {
    --color-bg-even: rgba(117, 147, 147, 0.1);
    --color-bg-odd: rgba(175, 215, 215, 0.1);
    --color-first: gold;
    --color-second: silver;
    --color-third: #cd7f32;
  }

  .root {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    padding: 0 0.25rem;
    padding-left: 2rem;
    font-weight: bold;
    min-height: 3rem;
  }

  .root:nth-child(even) {
    background: var(--color-bg-even);
  }

  .root:nth-child(odd) {
    background: var(--color-bg-odd);
  }

  .index {
    color: var(--text-secondary);
    display: flex;
    width: 2rem;
  }

  .player {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 275px;
  }

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .root::before {
    position: absolute;

    content: '';
    left: 0;
    width: 3px;
    top: 0.25rem;
    bottom: 0.25rem;
  }

  .root.first::before {
    background: var(--color-first);
  }

  .root.second::before {
    background: var(--color-second);
  }

  .root.third::before {
    background: var(--color-third);
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
    .root {
      gap: 0.25rem;
      padding-left: 1rem;
    }

    .player {
      min-width: 200px;
      width: 200px;
      overflow: hidden;
    }
  }
</style>
