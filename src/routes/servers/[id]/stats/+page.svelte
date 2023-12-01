<script lang="ts">
  import Stats from '$lib/features/server-page/stats/Stats.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Stats server={data.server} />
