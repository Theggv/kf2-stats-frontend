<script lang="ts">
  import { SITE_NAME } from '$lib';
  import Filter from '$lib/components/session-list/Filter.svelte';
  import SessionList from '$lib/components/session-list/SessionList.svelte';
  import {
    sessionListStore,
    type SelectOption,
  } from '$lib/components/session-list/store';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import { groupBy } from '$lib/util';

  let selectedServers: SelectOption[] = [];
  let selectedMaps: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];
  let selectedDiff: SelectOption[] = [];
  let selectedMode: SelectOption[] = [];
  let selectedLength: SelectOption[] = [];

  const [page, filter, sessions, total, hasMore, loading] = sessionListStore();

  $: sortedSessions = groupBy($sessions, (item) =>
    new Date(item.session.updated_at).toDateString()
  );

  $: filter.set({
    include_server: true,
    server_id: selectedServers.map((x) => x.id),
    map_id: selectedMaps.map((x) => x.id),
    diff: selectedDiff.length ? selectedDiff[0].id : undefined,
    status: selectedStatus.length ? selectedStatus[0].id : undefined,
    mode: selectedMode.length ? selectedMode[0].id : undefined,
    length: selectedLength.length ? selectedLength[0].id : undefined,
  });
</script>

<svelte:head>
  <title>Matches | {SITE_NAME}</title>
</svelte:head>

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
    <SessionList
      withServer
      data={sortedSessions}
      hasMore={$hasMore}
      on:loadMore={() => page.update((p) => p + 1)}
    />
  </svelte:fragment>
</ListLayout>
