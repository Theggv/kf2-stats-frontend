<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineHistory } from 'svelte-icons-pack/ai';
  import { BsFilter } from 'svelte-icons-pack/bs';

  import InfiniteScroll from '$lib/components/infinite-scroll/InfiniteScroll.svelte';
  import { groupBy } from '$lib/util';
  import { getStore, ServerPageMatchesName } from './Matches.store';

  import Filter from './Filter.svelte';
  import type { SelectOption } from './Filter.store';
  import type { ServerData } from '$lib/api/servers';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import MatchesList from './MatchesList.svelte';
  import { iconSettings } from '$lib/ui/icons';
  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import { setContext } from 'svelte';
  import { YearSelector } from '$lib/components/year-selector';
  import ServerActivity from './ServerActivity.svelte';

  export let server: ServerData;

  const store = getStore();
  const { filter, total, year, matches } = store;
  const { page, hasMore } = store;

  $: store.serverIdStore.set(server.id);

  setContext(ServerPageMatchesName, store);

  $: groupedMatches = groupBy($matches, (item) =>
    new Date(item.session.updated_at).toDateString()
  );

  let selectedMaps: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];

  $: filter.set({
    map_ids: selectedMaps.map((x) => x.id),
    statuses: selectedStatus.length ? [selectedStatus[0].id] : undefined,
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
      <svelte:fragment slot="subtitle">
        <div class="activity-filter">
          <YearSelector bind:year={$year} />
        </div>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <ServerActivity />
      </svelte:fragment>
    </SectionLayout>

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
