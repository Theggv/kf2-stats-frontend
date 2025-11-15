<script lang="ts">
  import { GameStatus } from '$lib/api/sessions';
  import type { TableColumn } from '$lib/components/table';
  import type { RowData } from './Table.data';

  export let index: number;
  export let item: RowData;
  export let stickyColumns: TableColumn<RowData>[];

  export let hover: boolean = false;
</script>

<div
  class="row-sticky"
  class:win={item.session.status === GameStatus.Win}
  class:lose={item.session.status !== GameStatus.Win}
  class:hover
  role="row"
  tabindex="-1"
  on:mouseenter
  on:mouseleave
>
  <div class="content">
    {#each stickyColumns as column}
      {@const Comp = column.render(item, index)}

      <div class="column" style={`min-width: ${column.width || 100}px`}>
        <div class="value">
          {#if typeof Comp === 'number' || typeof Comp === 'string'}
            {@html Comp}
          {:else}
            <svelte:component this={Comp} data={item} {index} />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .row-sticky {
    display: table-cell;
  }

  .row-sticky.hover {
    opacity: 0.75;
  }

  .row-sticky.win {
    background: linear-gradient(
      to right,
      rgb(0 0 0 / 0),
      var(--color-grad-win)
    );
  }

  .row-sticky.lose {
    background: linear-gradient(
      to right,
      rgb(0 0 0 / 0),
      var(--color-grad-lose)
    );
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
    height: 40px;
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
