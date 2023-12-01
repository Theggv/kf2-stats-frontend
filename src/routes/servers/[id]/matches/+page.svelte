<script lang="ts">
  import Matches from '$lib/features/server-page/matches/Matches.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Matches server={data.server} />
