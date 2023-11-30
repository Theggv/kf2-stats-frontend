<script lang="ts">
  import type { PageData } from './$types';
  import Tabs from './Tabs.svelte';
  import CurrentSession from './CurrentSession.svelte';
  import { isTabSelected, tabs } from './store';
  import { page } from '$app/stores';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import { MetaTags } from 'svelte-meta-tags';

  $: selected = $page.url.hash;

  export let data: PageData;
</script>

<MetaTags {...$page.data.metatags} />

<ListLayout>
  <svelte:fragment slot="header">
    <div class="header">
      <h1>{data.server.name}</h1>
      <StyledAddress address={data.server.address}>
        {data.server.address}
      </StyledAddress>
    </div>
    <CurrentSession serverId={data.server.id} />
  </svelte:fragment>
  <svelte:fragment slot="content">
    <Tabs />
    {#each tabs as tab (tab.href)}
      {#if isTabSelected(selected, tab) && tab.component}
        <svelte:component this={tab.component} serverId={data.server.id} />
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
