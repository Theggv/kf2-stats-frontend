<script lang="ts">
  import { ServerMatchesTab } from '$lib/pages/servers/[id]';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ServerMatchesTab server={data.server} />
