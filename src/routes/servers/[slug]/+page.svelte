<script lang="ts">
  import type { PageData } from './$types';
  import Tabs from './Tabs.svelte';
  import CurrentSession from './CurrentSession.svelte';
  import { isTabSelected, tabs } from './store';
  import { page } from '$app/stores';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import { SITE_NAME } from '$lib';
  import ListLayout from '$lib/layouts/ListLayout.svelte';

  $: selected = $page.url.hash;

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.name} | Servers | {SITE_NAME}</title>
</svelte:head>

<ListLayout>
  <svelte:fragment slot="header">
    <div class="header">
      <h1>{data.name}</h1>
      <StyledAddress address={data.address}>
        {data.address}
      </StyledAddress>
    </div>
    <CurrentSession serverId={data.id} />
  </svelte:fragment>
  <svelte:fragment slot="content">
    <Tabs />
    {#each tabs as tab (tab.href)}
      {#if isTabSelected(selected, tab) && tab.component}
        <svelte:component this={tab.component} serverId={data.id} />
      {/if}
    {/each}
  </svelte:fragment>
</ListLayout>

<style>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
  }
</style>
