<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineHistory } from 'svelte-icons-pack/ai';

  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import InfiniteScroll from '$lib/components/infinite-scroll/InfiniteScroll.svelte';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import { groupBy } from '$lib/util';
  import { getStore } from './Matches.store';
  import Filter from './filter/Filter.svelte';
  import type { SelectOption } from './filter/Filter.store';
  import MatchesList from './matches/MatchesList.svelte';
  import { iconSettings } from '$lib/ui/icons';

  const { page, filter, matches, total, hasMore } = getStore();

  $: groupedMatches = groupBy($matches, (item) =>
    new Date(item.session.updated_at).toDateString()
  );

  let selectedServers: SelectOption[] = [];
  let selectedMaps: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];
  let selectedDiff: SelectOption[] = [];
  let selectedMode: SelectOption[] = [];
  let selectedLength: SelectOption[] = [];

  $: filter.set({
    server_ids: selectedServers.map((x) => x.id),
    map_ids: selectedMaps.map((x) => x.id),
    diff: selectedDiff.length ? selectedDiff[0].id : undefined,
    statuses: selectedStatus.length ? [selectedStatus[0].id] : undefined,
    mode: selectedMode.length ? selectedMode[0].id : undefined,
    length: selectedLength.length ? selectedLength[0].id : undefined,
  });
</script>

<ListLayout>
  <svelte:fragment slot="header">
    <Filter
      bind:selectedServers
      bind:selectedMaps
      bind:selectedStatus
      bind:selectedDiff
      bind:selectedMode
      bind:selectedLength
    />
  </svelte:fragment>
  <svelte:fragment slot="content">
    <AutoScroll>
      <SectionLayout>
        <svelte:fragment slot="title">Search results</svelte:fragment>
        <svelte:fragment slot="subtitle">
          {#if $total}
            {$total} matches found
          {/if}
        </svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={AiOutlineHistory} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <MatchesList data={groupedMatches} />
        </svelte:fragment>
      </SectionLayout>

      <InfiniteScroll
        hasMore={$hasMore}
        on:loadMore={() => page.update((p) => p + 1)}
        threshold={300}
      />
    </AutoScroll>
  </svelte:fragment>
</ListLayout>
