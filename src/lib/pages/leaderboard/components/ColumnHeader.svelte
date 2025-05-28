<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { TiArrowSortedDown } from 'svelte-icons-pack/ti';

  import { columns } from './ColumnHeader.data';
  import { getContext } from 'svelte';

  import { iconSettings } from '$lib/ui/icons';
  import { LeaderboardCtxKey, type LeaderboardStore } from '../store';

  const { type, perk } = getContext<LeaderboardStore>(LeaderboardCtxKey);
</script>

<div class="root">
  <div class="row">
    {#each columns as column}
      {#if !column.condition || column.condition($perk)}
        <div
          class="column"
          class:active={$type === column.type}
          role="button"
          tabindex="0"
          on:click={() => type.set(column.type)}
          on:keypress={(e) => e.code === 'Enter' && type.set(column.type)}
          style={`min-width: ${column.width || 100}px`}
        >
          <div class="title">{column.label}</div>
          {#if $type === column.type}
            <Icon src={TiArrowSortedDown} {...iconSettings} />
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .root {
    display: table-cell;
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
    min-height: 48px;

    background: linear-gradient(
      to right,
      rgb(0 0 0 / 0.1) calc(100% - 200px),
      rgb(0 0 0 / 0)
    );
  }

  .column {
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

  @media (max-width: 768px) {
    .row {
      gap: 0.25rem;
      padding-left: 1rem;
    }
  }
</style>
