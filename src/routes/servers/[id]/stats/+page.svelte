<script lang="ts">
  import { ServerStatsTab } from '$lib/pages/servers/[id]';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ServerStatsTab server={data.server} />
