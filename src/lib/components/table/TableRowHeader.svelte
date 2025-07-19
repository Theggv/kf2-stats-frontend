<script lang="ts">
  import type { TableColumn } from './Table.data';

  type T = $$Generic<{ key: string }>;

  export let index: number;
  export let item: T;
  export let stickyColumns: TableColumn<T>[];
  export let useLeaderboardStyle: boolean;
  export let rowHeight: number;
  export let rowBackgroundColor:
    | ((item: T, index: number) => [string, string])
    | undefined = undefined;

  function getPlaceColor(place: number, useLeaderboardStyle: boolean) {
    if (!useLeaderboardStyle) return '';
    if (place === 1) return 'first';
    if (place === 2) return 'second';
    if (place === 3) return 'third';
    return '';
  }

  $: backgroundStyleCss = rowBackgroundColor
    ? rowBackgroundColor(item, index)[0]
    : '';
</script>

<div
  class="row-sticky {index % 2 ? 'even' : 'odd'}"
  class:custom={!!rowBackgroundColor}
  style={backgroundStyleCss}
>
  <div
    class="content {getPlaceColor(index + 1, useLeaderboardStyle)}"
    style="height: {rowHeight}px;"
  >
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
    --color-first: gold;
    --color-second: silver;
    --color-third: #cd7f32;
  }

  .row-sticky {
    display: table-cell;
  }

  .row-sticky.even:not(.custom) {
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.2));
  }

  .row-sticky.odd:not(.custom) {
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.3));
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

  .content.first::before {
    background: var(--color-first);
  }

  .content.second::before {
    background: var(--color-second);
  }

  .content.third::before {
    background: var(--color-third);
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
