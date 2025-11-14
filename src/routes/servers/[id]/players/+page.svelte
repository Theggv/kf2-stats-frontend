<script lang="ts">
  import { ServerPlayersTab } from '$lib/pages/servers/[id]';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ServerPlayersTab server={data.server} />
