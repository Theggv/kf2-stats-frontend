<script lang="ts">
  import { Mode, Status } from '$lib/api/sessions';
  import type { TableColumn } from '$lib/components/table';
  import type { RowData } from './Table.data';

  export let index: number;
  export let item: RowData;
  export let stickyColumns: TableColumn<RowData>[];

  export let hover: boolean = false;

  function getBgColor(item: RowData, index: number): string {
    const mainColor =
      index % 2 ? 'var(--color-bg-odd)' : 'var(--color-bg-even)';

    const pattern = (color: string): string =>
      `background: linear-gradient(to right, ${color}, ${mainColor}`;

    if (item.session.status === Status.Win)
      return pattern('var(--color-grad-win)');

    return pattern('var(--color-grad-lose)');
  }

  function getMatchClass(data: RowData) {
    if (data.session.status === Status.InProgress) return 'in-progress';

    if (data.session.mode === Mode.Endless) return '';

    if (data.session.status === Status.Lose) return 'lose';
    if (data.session.status === Status.Win) return 'win';

    return '';
  }
</script>

<div
  class="row-sticky {getMatchClass(item)}"
  style={getBgColor(item, index)}
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
  :root {
    --color-bg-even: rgba(117, 147, 147, 0.1);
    --color-bg-odd: rgba(175, 215, 215, 0.1);
  }

  .row-sticky {
    position: relative;
    display: table-cell;
    border-right: 4px solid rgb(0 0 0 / 0.1);
    border-bottom-right-radius: 1.5rem;
  }

  .row-sticky.hover {
    opacity: 0.75;
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

  .value {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .row-sticky::before {
    position: absolute;
    content: '';
    background: var(--text-secondary);
    left: 0;
    width: 3px;
    top: 0.25rem;
    bottom: 0.25rem;
  }

  .row-sticky.win::before {
    background: var(--color-win);
  }

  .row-sticky.lose::before {
    background: var(--color-lose);
  }

  .row-sticky.in-progress::before {
    background: var(--color-in-progress);
  }

  @media (max-width: 768px) {
    .content {
      gap: 0.25rem;
      padding-left: 1rem;
    }
  }
</style>
