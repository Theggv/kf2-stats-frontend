<script lang="ts">
  import { SITE_NAME } from '$lib';
  import PlayerList from '$lib/components/player-list/PlayerList.svelte';
</script>

<svelte:head>
  <title>Players | {SITE_NAME}</title>
</svelte:head>

<PlayerList />
