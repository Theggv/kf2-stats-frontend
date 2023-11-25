<script lang="ts">
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import type { LayoutData } from './$types';
  import { userStore } from './store';
  import Header from './Header.svelte';
  import Tabs from './Tabs.svelte';
  import MetaTitle from './meta-title.svelte';

  export let data: LayoutData;

  const { overview, user, userIdStore } = userStore();
  $: userIdStore.set(data.userId);

  $: userName = $user?.name;
</script>

{#if userName}
  <MetaTitle {userName} />
{/if}

<ListLayout>
  <svelte:fragment slot="header">
    {#if $user && $overview}
      <Header user={$user} overview={$overview} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="content">
    <Tabs userId={data.userId} />
    <slot />
  </svelte:fragment>
</ListLayout>
