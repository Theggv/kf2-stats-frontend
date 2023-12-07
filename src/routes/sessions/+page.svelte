<script lang="ts">
  import { SITE_NAME } from '$lib';
  import Matches from '$lib/features/matches-page/Matches.svelte';
</script>

<svelte:head>
  <title>Matches | {SITE_NAME}</title>
</svelte:head>

<Matches />
