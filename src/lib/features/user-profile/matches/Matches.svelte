<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import InfiniteScroll from '$lib/components/infinite-scroll/InfiniteScroll.svelte';
  import { groupBy } from '$lib/util';
  import { notInProgress } from '../common';
  import SectionLayout from '../common/SectionLayout.svelte';
  import { getStore } from './Matches.store';
  import RecentSessionsList from './RecentSessionsList.svelte';
  import AiOutlineHistory from 'svelte-icons-pack/ai/AiOutlineHistory';
  import BsFilter from 'svelte-icons-pack/bs/BsFilter';
  import Layout from '../common/Layout.svelte';
  import Filter from './Filter.svelte';
  import type { SelectOption } from './Filter.store';
  import { iconSettings } from '$lib/ui/icons';

  export let userId: number;
  export let selectedDate: string;

  const { userIdStore, page, filter, matches, total, hasMore } = getStore();
  $: userIdStore.set(userId);

  $: groupedMatches = groupBy($matches.filter(notInProgress), (item) =>
    new Date(item.updated_at).toDateString()
  );

  let selectedPerks: SelectOption[] = [];
  let selectedMaps: SelectOption[] = [];
  let selectedDiff: SelectOption[] = [];
  let selectedMode: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];
  let selectedSpawnCycle: string;
  let minWave: number;
  let minMaxMonsters: number;

  $: filter.set({
    perks: selectedPerks.map((x) => x.id),
    map_ids: selectedMaps.map((x) => x.id),
    diff: selectedDiff.length ? selectedDiff[0].id : undefined,
    status: selectedStatus.length ? selectedStatus[0].id : undefined,
    mode: selectedMode.length ? selectedMode[0].id : undefined,
    spawn_cycle: selectedSpawnCycle || undefined,
    min_wave: minWave || undefined,
    min_mm: minMaxMonsters || undefined,
    date: selectedDate ? new Date(selectedDate) : undefined,
  });
</script>

<Layout>
  <svelte:fragment slot="sidebar">
    <SectionLayout sticky>
      <svelte:fragment slot="title">Filter</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsFilter} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Filter
          bind:selectedPerks
          bind:selectedMaps
          bind:selectedDiff
          bind:selectedMode
          bind:selectedStatus
          bind:selectedSpawnCycle
          bind:minWave
          bind:minMaxMonsters
          bind:selectedDate
        />
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
        <RecentSessionsList data={groupedMatches} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <InfiniteScroll
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
    threshold={300}
  />
</Layout>
