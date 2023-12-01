<script lang="ts">
  import { getStore } from './ServerPage.store';
  import type { ServerData } from '$lib/api/servers';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import LinkTabs from '$lib/components/tabs/LinkTabs.svelte';
  import { tabs } from './common/tabs';
  import { page } from '$app/stores';

  export let server: ServerData;

  $: selectedTab = $page.url.pathname;

  const {} = getStore();
</script>

<div class="root">
  <div class="header">
    <h1>{server.name}</h1>
    <StyledAddress address={server.address}>
      {server.address}
    </StyledAddress>
  </div>

  <LinkTabs
    tabs={tabs.map((x) => ({ ...x, href: `/servers/${server.id}${x.href}` }))}
    {selectedTab}
  />

  <slot />
</div>

<style>
  .root {
    padding: 0.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .header {
    padding: 0.5rem;
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
