<script lang="ts">
  import type { RowData } from './Table.data';

  import type { TableColumn } from '$lib/components/table';
  import { Status } from '$lib/api/sessions';

  export let index: number;
  export let item: RowData;
  export let columns: TableColumn<RowData>[];

  export let hover: boolean = false;
</script>

<a
  href="/players/{item.id}/coplay/games"
  class="row"
  class:win={item.session.status === Status.Win}
  class:lose={item.session.status !== Status.Win}
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
            {@html column.render(item, index)}
          {:else}
            <svelte:component this={Comp} data={item} {index} />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</a>

<style>
  :root {
    --row-bg-even: rgb(0 0 0 / 0.2);
    --row-bg-odd: rgb(0 0 0 / 0.3);
  }

  .row {
    display: table-cell;
  }

  .row.hover {
    opacity: 0.75;
  }

  .row.win {
    background: linear-gradient(
      to right,
      var(--color-grad-win) calc(100% - 200px),
      rgb(0 0 0 / 0)
    );
  }

  .row.lose {
    background: linear-gradient(
      to right,
      var(--color-grad-lose) calc(100% - 200px),
      rgb(0 0 0 / 0)
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
