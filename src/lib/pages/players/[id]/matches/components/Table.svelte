<script lang="ts">
  import { Table } from '$lib/components/table';
  import { getContext } from 'svelte';
  import { columns, stickyColumns, type RowData } from './Table.data';
  import TableRow from './TableRow.svelte';
  import TableRowHeader from './TableRowHeader.svelte';
  import {
    type UserProfileMatchesType,
    UserProfileMatchesName,
  } from '../Matches.store';

  const store = getContext<UserProfileMatchesType>(UserProfileMatchesName);
  const { sortBy, loading, matches } = store;
  const { field, direction } = sortBy;

  $: hover = -1;

  $: formattedData = $matches.map(
    (x): RowData => ({ ...x, key: `${x.session.id}` })
  );
</script>

<Table
  bind:orderField={$field}
  bind:orderDirection={$direction}
  data={formattedData}
  {columns}
  {stickyColumns}
  rowHeight={48}
  loading={$loading}
>
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
</Table>
