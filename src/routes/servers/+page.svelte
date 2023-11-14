<script lang="ts">
  import { SITE_NAME } from '$lib';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import ServerList from '$lib/components/server-list/ServerList.svelte';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
</script>

<svelte:head>
  <title>Servers | {SITE_NAME}</title>
</svelte:head>

<ListLayout>
  <div slot="header">
    <h1>Servers</h1>
  </div>
  <svelte:fragment slot="content">
    <ServerList />
  </svelte:fragment>
</ListLayout>

<style>
  h1 {
    font-size: 20px;
    padding: 0.25rem;
    font-weight: bold;
  }
</style>
