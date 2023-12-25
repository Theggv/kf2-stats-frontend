<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import TiArrowSortedDown from 'svelte-icons-pack/ti/TiArrowSortedDown';
  import { iconSettings } from '../common';
  import { columns } from './PlayersListHeader.data';
  import { getContext } from 'svelte';
  import { type LeaderBoardStore, LoaderBoardCtxKey } from './PlayersTop.store';

  const { type, perk } = getContext<LeaderBoardStore>(LoaderBoardCtxKey);
</script>

<div class="root">
  <div class="index">#</div>

  <div class="player">
    <div class="title">Player</div>
  </div>

  {#each columns as column}
    {#if !column.condition || column.condition($perk)}
      <div
        class="column"
        class:active={$type === column.type}
        role="button"
        tabindex="0"
        on:click={() => type.set(column.type)}
        on:keypress={(e) => e.code === 'Enter' && type.set(column.type)}
      >
        <div class="title">{column.label}</div>
        {#if $type === column.type}
          <Icon src={TiArrowSortedDown} {...iconSettings} />
        {/if}
      </div>
    {/if}
  {/each}
</div>

<style>
  :root {
    --color-bg-even: rgba(117, 147, 147, 0.1);
    --color-bg-odd: rgba(175, 215, 215, 0.1);
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
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    font-weight: bold;
    color: var(--text-secondary);

    cursor: pointer;
  }

  .title {
    white-space: nowrap;
  }

  .active {
    color: var(--text-primary);
  }
</style>
