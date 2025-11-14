<script lang="ts">
  import type { RowData } from './Table.data';

  import type { TableColumn } from '$lib/components/table';

  export let index: number;
  export let item: RowData;
  export let columns: TableColumn<RowData>[];

  export let hover: boolean = false;
</script>

<div
  class="row"
  class:even={index % 2 === 0}
  class:odd={index % 2 === 1}
  class:hover
  role="row"
  tabindex="-1"
  on:mouseenter
  on:mouseleave
>
  <div class="content">
    {#each columns as column}
      {@const Comp = column.render(item, index)}

      <div class="column" style={`min-width: ${column.width || 100}px`}>
        <div class="value">
          {#if typeof Comp === 'number' || typeof Comp === 'string'}
            <div class="title secondary">{column.label}</div>
            <div class="value">{@html column.render(item, index)}</div>
          {:else}
            <svelte:component this={Comp} data={item} {index} />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  :root {
    --color-bg-even: rgba(117, 147, 147, 0.1);
    --color-bg-odd: rgba(175, 215, 215, 0.1);
  }

  .row {
    display: table-cell;
  }

  .row.hover {
    opacity: 0.75;
  }

  .row.even {
    background-color: var(--color-bg-even);
  }

  .row.odd {
    background-color: var(--color-bg-odd);
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
    height: 48px;
  }

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .content::before {
    position: absolute;

    content: '';
    left: 0;
    width: 3px;
    top: 0.25rem;
    bottom: 0.25rem;
  }

  .secondary {
    color: var(--text-secondary);
  }

  .value {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .content {
      gap: 0.25rem;
      padding-left: 1rem;
    }
  }
</style>
