<script lang="ts">
  import { SITE_NAME } from '$lib';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import ServerList from '$lib/components/server-list/ServerList.svelte';
</script>

<AutoScroll>
  <ServerList />
</AutoScroll>

<svelte:head>
  <title>{SITE_NAME} | Servers</title>
</svelte:head>
