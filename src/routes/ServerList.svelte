<script lang="ts">
  import Server from './Server.svelte';
  import ServerSkeleton from '$lib/components/skeletons/ServerSkeleton.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="root flex flex-col gap-1 p-2 bg-slate-800">
  {#await data.streamed.servers}
    <ServerSkeleton />
    <ServerSkeleton />
    <ServerSkeleton />
  {:then servers}
    {#if servers.type === 'success'}
      {#each servers.data.items as server (server.address)}
        <Server {server} />
      {:else}
        <div>No servers in the list</div>
      {/each}
    {/if}
  {/await}
</div>

<style>
  .root {
    width: 600px;
    height: 400px;
  }
</style>
