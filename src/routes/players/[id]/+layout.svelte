<script lang="ts">
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import type { LayoutData } from './$types';
  import { userStore } from './store';
  import Header from './Header.svelte';
  import MetaData from './MetaData.svelte';
  import Tabs from './Tabs.svelte';

  export let data: LayoutData;

  const { overview, userIdStore } = userStore();
  $: userIdStore.set(data.user.id);
</script>

<MetaData />

<div class="root">
  <ListLayout>
    <svelte:fragment slot="header">
      {#if $overview}
        <Header user={data.user} overview={$overview} />
      {/if}
    </svelte:fragment>

    <svelte:fragment slot="content">
      <Tabs userId={data.user.id} />
      <slot />
    </svelte:fragment>
  </ListLayout>
</div>

<style>
  .root {
    flex: 1;
    position: relative;
    display: flex;
    padding: 0.5rem;
  }
</style>
