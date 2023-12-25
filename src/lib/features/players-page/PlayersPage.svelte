<script lang="ts">
  import { page } from '$app/stores';
  import LinkTabs from '$lib/components/tabs/LinkTabs.svelte';
  import { tabs } from './common';

  $: selectedTab = $page.url.pathname;
</script>

<div class="root">
  <div class="header">
    <h1>Players</h1>
  </div>

  <LinkTabs
    tabs={tabs.map((x) => ({ ...x, href: `/players${x.href}` }))}
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
