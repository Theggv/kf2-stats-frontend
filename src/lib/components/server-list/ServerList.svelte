<script lang="ts">
  import ServerListItem from './ServerListItem.svelte';
  import Skeleton from './Skeleton.svelte';
  import { ServersApiService, type ServerData } from '$lib/api/servers';
  import { onMount } from 'svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import { delay } from '$lib/util';

  let loading = false;
  let serverList: ServerData[] = [];

  onMount(() => getData());

  async function getData() {
    try {
      loading = true;
      const { data } = await ServersApiService.getByPattern();
      await delay(500);
      serverList = data.items;
    } catch (error) {
    } finally {
      loading = false;
    }
  }
</script>

<AutoScroll>
  <div class="root">
    <div class="index">#</div>
    <div>Server name</div>
    <div>Address</div>

    {#if loading}
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    {:else if serverList.length}
      {#each serverList as server, index (server.address)}
        <ServerListItem {server} {index} />
      {/each}
    {:else}
      <div class="empty">No servers in the list</div>
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

  .index {
    text-align: right;
  }

  .empty {
    grid-column: 1 / span 3;
    text-align: center;
  }
</style>
