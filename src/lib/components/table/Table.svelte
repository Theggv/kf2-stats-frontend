<script lang="ts">
  import type { TableColumn } from './Table.data';

  import { AutoScroll } from '$lib/components/auto-scroll';
  import ColumnHeader from './ColumnHeader.svelte';
  import TableRow from './TableRow.svelte';
  import ColumnRowHeader from './ColumnRowHeader.svelte';
  import TableRowHeader from './TableRowHeader.svelte';

  type T = $$Generic<{ key: string }>;

  export let orderField: string = '';
  export let orderDirection: 'asc' | 'desc' = 'asc';
  export let data: T[];

  export let columns: TableColumn<T>[];
  export let stickyColumns: TableColumn<T>[] = [];

  export let useLeaderboardStyle: boolean = false;
  export let rowHeight: number = 40;
  export let rowBackgroundColor:
    | ((item: T, index: number) => [string, string])
    | undefined = undefined;

  export let loading: boolean = false;

  let el: HTMLElement;
  $: data && el && el.scrollTo({ top: 0, behavior: 'instant' });

  $: tableColumns = [...stickyColumns, ...columns];
  $: sortingColumn = tableColumns.find((x) => x.id === orderField)!;

  $: sortedData =
    sortingColumn && sortingColumn.sorting
      ? data.sort(sortingColumn.sorting.compare(orderDirection))
      : data;

  $: stickyWidth = stickyColumns.length
    ? stickyColumns.reduce((a, x) => a + (x.width || 100), 0) + 8
    : 50;
</script>

<AutoScroll bind:root={el}>
  <div
    class="table"
    class:loading
    style="grid-template-columns: {stickyWidth}px 1fr;"
  >
    {#if sortedData.length}
      <div class="header">
        <div class="first">
          <ColumnRowHeader
            bind:order={orderField}
            bind:sortingDir={orderDirection}
            {stickyColumns}
          />
        </div>

        {#each sortedData as item, index (item.key)}
          {#if $$slots.rowSticky}
            <slot name="rowSticky" {index} {item} {stickyColumns} />
          {:else}
            <TableRowHeader
              {index}
              {item}
              {stickyColumns}
              {useLeaderboardStyle}
              {rowHeight}
              {rowBackgroundColor}
            />
          {/if}
        {/each}
      </div>

      <div class="rows">
        <div class="item">
          <ColumnHeader
            bind:order={orderField}
            bind:sortingDir={orderDirection}
            {columns}
          />
        </div>

        {#each sortedData as item, index (item.key)}
          <div class="item">
            {#if $$slots.row}
              <slot name="row" {index} {item} {columns} />
            {:else}
              <TableRow
                {index}
                {item}
                {columns}
                {rowHeight}
                {rowBackgroundColor}
              />
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <div class="empty-list">No data.</div>
    {/if}
  </div>
</AutoScroll>

<style>
  .table {
    position: relative;

    display: grid;
    overflow-x: hidden;

    transition: all 200ms;
  }

  @media (max-width: 640px) {
    .table {
      max-width: calc(100vw - 1.75rem);
    }
  }
  @media (min-width: 640px) {
    .table {
      max-width: 572px;
    }
  }
  @media (min-width: 768px) {
    .table {
      max-width: 700px;
    }
  }
  @media (min-width: 1024px) {
    .table {
      max-width: 956px;
    }
  }
  @media (min-width: 1280px) {
    .table {
      max-width: 896px;
    }
  }
  @media (min-width: 1536px) {
    .table {
      max-width: 1150px;
    }
  }

  .table > .header,
  .table > .rows {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .table > .header > .first {
    display: grid;
    grid-template-columns: 2rem auto;
    align-items: center;
    gap: 0.5rem;

    padding: 0 0.25rem;
    height: 48px;

    font-weight: bold;
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.1));
  }

  @media (max-width: 768px) {
    .table > .header > .first {
      grid-template-columns: auto;
      padding-left: 1rem;
    }
  }

  .table > .rows {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 0.5rem;
  }

  .table > .rows::-webkit-scrollbar {
    height: 12px;
  }

  .table > .rows::-webkit-scrollbar-track {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  .table > .rows::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #9ca3af;
  }

  .empty-list {
    grid-column: 1 / span 2;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;
    padding-left: 2rem;
    font-weight: bold;
    color: var(--text-secondary);
  }

  .loading {
    filter: brightness(0.6);
  }
</style>
