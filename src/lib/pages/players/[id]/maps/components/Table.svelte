<script lang="ts">
  import type { GetPlayedMapsResponseItem } from '$lib/api/analytics';
  import { Table } from '$lib/components/table';
  import { columns, stickyColumns, type RowData } from './Table.data';

  export let data: GetPlayedMapsResponseItem[];

  $: formattedData = data.map(
    (x): RowData => ({
      ...x,
      key: x.name,
      winrate: x.total_wins / x.total_games,
    })
  );
</script>

<Table
  data={formattedData}
  {columns}
  {stickyColumns}
  orderField="total_games"
  orderDirection="desc"
/>
