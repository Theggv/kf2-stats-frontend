<script lang="ts">
  import type { PageData } from './$types';
  import Tabs from './Tabs.svelte';
  import CurrentSession from './CurrentSession.svelte';
  import { isTabSelected, tabs } from './store';
  import { page } from '$app/stores';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import { SITE_NAME } from '$lib';

  $: selected = $page.url.hash;

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.name} | Servers | {SITE_NAME}</title>
</svelte:head>

<div class="root">
  <div class="header">
    <div class="server-name">{data.name}</div>
    <StyledAddress address={data.address}>
      {data.address}
    </StyledAddress>
  </div>
  <CurrentSession serverId={data.id} />
  <Tabs />
  {#each tabs as tab (tab.href)}
    {#if isTabSelected(selected, tab) && tab.component}
      <svelte:component this={tab.component} serverId={data.id} />
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
