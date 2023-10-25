<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { ServersApiService, type ServerData } from '$lib/api/servers';
  import HeaderSkeleton from './HeaderSkeleton.svelte';
  import Tabs from './Tabs.svelte';
  import Session from './Session.svelte';
  import { isTabSelected, tabs } from './store';
  import { page } from '$app/stores';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import { SITE_NAME } from '$lib';

  let loading: boolean = false;
  let server: ServerData;

  async function getServerInfo() {
    try {
      loading = true;
      const { data: serverData } = await ServersApiService.getById(
        data.serverId
      );
      server = serverData;
    } catch (error) {
    } finally {
      loading = false;
    }
  }

  onMount(() => getServerInfo());

  $: selected = $page.url.hash;

  export let data: PageData;
</script>

<svelte:head>
  {#if server}
    <title>{SITE_NAME} | Servers | {server.name}</title>
  {:else}
    <title>{SITE_NAME} | Servers</title>
  {/if}
</svelte:head>

<div class="root">
  <div class="header">
    {#if loading}
      <HeaderSkeleton />
    {:else if server}
      <div class="server-name">{server.name}</div>
      <StyledAddress address={server.address}>
        {server.address}
      </StyledAddress>
    {/if}
  </div>
  <Session serverId={data.serverId} />
  <Tabs />
  {#each tabs as tab (tab.href)}
    {#if isTabSelected(selected, tab) && tab.component}
      <svelte:component this={tab.component} serverId={data.serverId} />
    {/if}
  {/each}
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;

    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .server-name {
    font-size: 20px;
  }
</style>
