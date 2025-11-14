<script lang="ts">
  import ServersListItem from './ServersListItem.svelte';
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
    {#if !loading && serverList}
      {#each serverList as server, index (server.address)}
        <ServersListItem {server} {index} />
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

  @media (max-width: 768px) {
    .root {
      grid-template-columns: minmax(max-content, 25px) 1fr;
    }
  }

  .empty {
    grid-column: 1 / span 3;
    text-align: center;
  }
</style>
