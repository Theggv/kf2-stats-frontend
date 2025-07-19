<script lang="ts">
  import type { TableColumn } from './Table.data';

  type T = $$Generic<{ key: string }>;

  export let index: number;
  export let item: T;
  export let columns: TableColumn<T>[];
  export let rowHeight: number;
  export let rowBackgroundColor:
    | ((item: T, index: number) => [string, string])
    | undefined = undefined;

  $: backgroundStyleCss = rowBackgroundColor
    ? rowBackgroundColor(item, index)[1]
    : '';
</script>

<div
  class="row {index % 2 ? 'even' : 'odd'}"
  class:custom={!!rowBackgroundColor}
  style={backgroundStyleCss}
>
  <div class="content" style="height: {rowHeight}px;">
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
</div>

<style>
  :root {
    --row-bg-even: rgb(0 0 0 / 0.2);
    --row-bg-odd: rgb(0 0 0 / 0.3);
  }

  .row {
    display: table-cell;
  }

  .row.even:not(.custom) {
    background: linear-gradient(
      to right,
      var(--row-bg-even) calc(100% - 200px),
      rgb(0 0 0 / 0)
    );
  }

  .row.odd:not(.custom) {
    background: linear-gradient(
      to right,
      var(--row-bg-odd) calc(100% - 200px),
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
