<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineHistory } from 'svelte-icons-pack/ai';
  import { BsFilter } from 'svelte-icons-pack/bs';

  import SectionLayout from '../common/SectionLayout.svelte';
  import { getStore, LastSeenFilterName } from './store';
  import Layout from '../common/Layout.svelte';
  import Filter from './Filter.svelte';
  import { iconSettings } from '$lib/ui/icons';
  import { setContext } from 'svelte';
  import Table from './components/Table.svelte';
  import { InfiniteScroll } from '$lib/components/infinite-scroll';

  export let userId: number;
  export let otherUserId: number;

  const store = getStore();
  const { filter, items, hasMore, page, metadata, loading } = store;
  $: store.userIdStore.set(userId);
  $: store.otherUserIdStore.set(otherUserId);

  setContext(LastSeenFilterName, filter);
</script>

<Layout>
  <svelte:fragment slot="sidebar">
    <SectionLayout sticky>
      <svelte:fragment slot="title">Filter</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsFilter} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Filter />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <SectionLayout>
      <svelte:fragment slot="title">Playtime History</svelte:fragment>
      <svelte:fragment slot="subtitle">
        {#if $metadata}
          {$metadata.total_results} games found
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineHistory} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Table data={$items} loading={$loading} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <InfiniteScroll
    hasMore={$hasMore}
    on:loadMore={() => page.update((x) => x + 1)}
    threshold={250}
  />
</Layout>
