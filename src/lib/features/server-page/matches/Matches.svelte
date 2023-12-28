<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import InfiniteScroll from '$lib/components/infinite-scroll/InfiniteScroll.svelte';
  import { groupBy } from '$lib/util';
  import { getStore } from './Matches.store';
  import AiOutlineHistory from 'svelte-icons-pack/ai/AiOutlineHistory';
  import BsFilter from 'svelte-icons-pack/bs/BsFilter';
  import Filter from './Filter.svelte';
  import type { SelectOption } from './Filter.store';
  import type { ServerData } from '$lib/api/servers';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import MatchesList from './MatchesList.svelte';
  import { iconSettings } from '$lib/ui/icons';
  import ContentLayout from '$lib/layouts/ContentLayout.svelte';

  export let server: ServerData;

  const { serverIdStore, page, filter, matches, total, hasMore } = getStore();
  $: serverIdStore.set(server.id);

  $: groupedMatches = groupBy($matches, (item) =>
    new Date(item.session.updated_at).toDateString()
  );

  let selectedMaps: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];

  $: filter.set({
    map_id: selectedMaps.map((x) => x.id),
    status: selectedStatus.length ? selectedStatus[0].id : undefined,
  });
</script>

<ContentLayout>
  <svelte:fragment slot="sidebar">
    <SectionLayout sticky>
      <svelte:fragment slot="title">Filter</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsFilter} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Filter bind:selectedMaps bind:selectedStatus />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <SectionLayout>
      <svelte:fragment slot="title">Match History</svelte:fragment>
      <svelte:fragment slot="subtitle">
        {#if $total}
          {$total} matches played
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineHistory} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <MatchesList data={groupedMatches} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <InfiniteScroll
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
    threshold={300}
  />
</ContentLayout>
