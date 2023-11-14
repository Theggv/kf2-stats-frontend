<script lang="ts">
  import Server from './Server.svelte';
  import ServerSkeleton from './ServerSkeleton.svelte';
  import { ServersApiService, type ServerData } from '$lib/api/servers';
  import { onMount } from 'svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';

  let loading = false;
  let serverList: ServerData[] = [];

  onMount(() => getData());

  async function getData() {
    try {
      loading = true;
      const { data } = await ServersApiService.getByPattern();
      serverList = data;
    } catch (error) {
    } finally {
      loading = false;
    }
  }
</script>

<AutoScroll>
  <div class="root">
    {#if loading}
      <ServerSkeleton />
      <ServerSkeleton />
      <ServerSkeleton />
      <ServerSkeleton />
      <ServerSkeleton />
      <ServerSkeleton />
      <ServerSkeleton />
      <ServerSkeleton />
    {:else if serverList}
      {#each serverList as server, index (server.address)}
        <Server {server} {index} />
      {:else}
        <div class="empty">No servers in the list</div>
      {/each}
    {/if}
  </div>
</AutoScroll>

<style>
  .root {
    position: relative;
    display: grid;
    grid-template-columns: minmax(max-content, 25px) 7fr 200px;
    gap: 1rem;
    align-items: center;
  }

  .empty {
    grid-column: 1 / span 3;
    text-align: center;
  }
</style>
