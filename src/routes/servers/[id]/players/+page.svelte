<script lang="ts">
  import Players from '$lib/features/server-page/players/Players.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Players server={data.server} />
