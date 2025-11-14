<script lang="ts">
  import { ServerOverviewTab } from '$lib/pages/servers/[id]';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ServerOverviewTab server={data.server} />
