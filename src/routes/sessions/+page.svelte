<script lang="ts">
  import { SITE_NAME } from '$lib';
  import type { MatchData } from '$lib/api/matches';
  import Filter from '$lib/components/session-list/Filter.svelte';
  import SessionList from '$lib/components/session-list/SessionList.svelte';
  import {
    sessionListStore,
    type SelectOption,
  } from '$lib/components/session-list/store';
  import type { WithRequired } from '$lib/util/types';

  let selectedServers: SelectOption[] = [];
  let selectedMaps: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];
  let selectedDiff: SelectOption[] = [];
  let selectedMode: SelectOption[] = [];
  let selectedLength: SelectOption[] = [];

  const [page, filter, sessions, hasMore, loading, error] = sessionListStore();

  $: sortedSessions = $sessions.reduce((map, item) => {
    const key = new Date(item.session.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, WithRequired<MatchData, 'server' | 'map' | 'game_data'>[]>());

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

<div class="root">
  <Filter
    bind:selectedServers
    bind:selectedMaps
    bind:selectedStatus
    bind:selectedDiff
    bind:selectedMode
    bind:selectedLength
  />
  <SessionList
    withServer
    data={sortedSessions}
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
  />
</div>

<style>
  .root {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
