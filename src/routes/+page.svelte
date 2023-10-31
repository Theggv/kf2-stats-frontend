<script lang="ts">
  import { SITE_NAME } from '$lib';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import ServerList from '$lib/components/server-list/ServerList.svelte';
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
</svelte:head>

<AutoScroll>
  <ServerList />
</AutoScroll>
