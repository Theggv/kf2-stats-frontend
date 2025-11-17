<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import { GameStatus } from '$lib/api/sessions';
  import { Table } from '$lib/components/table';
  import { columns, stickyColumns, type RowData } from './Table.data';
  import TableRow from './TableRow.svelte';
  import TableRowHeader from './TableRowHeader.svelte';

  export let data: Match[];
  export let loading: boolean;

  $: hover = -1;

  $: formattedData = data.map(
    (x): RowData => ({ ...x, key: `${x.session.id}` })
  );

  function getBgColor(item: RowData): [string, string] {
    const pattern = (color: string): [string, string] => [
      `background: linear-gradient(to right, rgb(0 0 0 / 0), ${color}`,
      `background: linear-gradient(to right, ${color} calc(100% - 200px), rgb(0 0 0 / 0)`,
    ];

    if (item.session.status === GameStatus.Win)
      return pattern('var(--color-grad-win)');

    return pattern('var(--color-grad-lose)');
  }
</script>

<Table
  data={formattedData}
  {columns}
  {stickyColumns}
  rowHeight={48}
  {loading}
  rowBackgroundColor={(item) => getBgColor(item)}
>
  <TableRow
    slot="row"
    let:item
    let:index
    let:columns
    {item}
    {index}
    {columns}
    on:mouseenter={() => (hover = index)}
    on:mouseleave={() => (hover = -1)}
    hover={hover === index}
  />

  <TableRowHeader
    slot="rowSticky"
    let:item
    let:index
    let:stickyColumns
    {item}
    {index}
    {stickyColumns}
    on:mouseenter={() => (hover = index)}
    on:mouseleave={() => (hover = -1)}
    hover={hover === index}
  />
</Table>
