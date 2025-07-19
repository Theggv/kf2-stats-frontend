<script lang="ts">
  import type { TableColumn } from './Table.data';

  import { Icon } from 'svelte-icons-pack';
  import { TiArrowSortedDown, TiArrowSortedUp } from 'svelte-icons-pack/ti';

  import { iconSettings } from '$lib/ui/icons';

  type T = $$Generic<{ key: string }>;

  export let order: string;
  export let sortingDir: 'asc' | 'desc';
  export let stickyColumns: TableColumn<T>[];

  function handleClick(column: (typeof stickyColumns)[number]) {
    if (!column.sorting) return;

    if (order !== column.id) {
      order = column.id;
      sortingDir = column.sorting.direction;
    } else {
      sortingDir = sortingDir === 'asc' ? 'desc' : 'asc';
    }
  }
</script>

<div class="header-sticky">
  <div class="content">
    {#each stickyColumns as column}
      <div
        class="column"
        class:active={order === column.id}
        class:clickable={!!column.sorting}
        role="button"
        tabindex="0"
        on:click={() => handleClick(column)}
        on:keypress={(e) => e.code === 'Enter' && handleClick(column)}
        style={`min-width: ${column.width || 100}px`}
      >
        <div class="title">{column.label}</div>
        {#if order === column.id}
          {#if sortingDir === 'asc'}
            <Icon src={TiArrowSortedUp} {...iconSettings} />
          {:else}
            <Icon src={TiArrowSortedDown} {...iconSettings} />
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .header-sticky {
    display: table-cell;
  }

  .content {
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

    cursor: default;
  }

  .title {
    white-space: nowrap;
  }

  .active {
    color: var(--text-primary);
  }

  .clickable {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .content {
      gap: 0.25rem;
      padding-left: 1rem;
    }
  }
</style>
