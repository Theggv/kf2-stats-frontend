<script lang="ts">
  import Overview from '$lib/features/server-page/overview/Overview.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Overview server={data.server} />
