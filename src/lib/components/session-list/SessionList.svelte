<script lang="ts">
  import SessionListItem from './SessionListItem.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import type { WithRequired } from '$lib/util/types';
  import Filter from './Filter.svelte';
  import { sessionListStore, type SelectOption } from './store';
  import type { MatchData } from '$lib/api/matches';

  let selectedServers: SelectOption[] = [];
  let selectedMaps: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];
  let selectedDiff: SelectOption[] = [];
  let selectedMode: SelectOption[] = [];
  let selectedLength: SelectOption[] = [];
  let page = 0;

  const [sessions, loading, , fetchSessions] = sessionListStore();

  $: sortedSessions = $sessions.reduce((map, item) => {
    const key = new Date(item.session.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, WithRequired<MatchData, 'server' | 'map' | 'game_data'>[]>());

  $: {
    page = 0;
  }

  $: fetchSessions(page, {
    server_id: selectedServers.map((x) => x.id),
    map_id: selectedMaps.map((x) => x.id),
    diff: selectedDiff.length ? selectedDiff[0].id : undefined,
    status: selectedStatus.length ? selectedStatus[0].id : undefined,
    mode: selectedMode.length ? selectedMode[0].id : undefined,
    length: selectedLength.length ? selectedLength[0].id : undefined,
  });

  function formatDate(str: string) {
    return new Date(str).toLocaleString('en', {
      day: 'numeric',
      month: 'long',
    });
  }
</script>

<div class="root">
  <Filter
    bind:selectedServers
    bind:selectedMaps
    bind:selectedStatus
    bind:selectedDiff
    bind:selectedMode
    bind:selectedLength
  />
  <AutoScroll>
    <div class="session-list">
      <div class="index" />
      <div>Server</div>
      <div>Game Info</div>
      <div class="wave">Wave</div>
      <div class="status">Status</div>
      <div>Match Length</div>

      {#each sortedSessions as [date, sessions] (date)}
        <div class="date">{formatDate(date)}</div>
        {#each sessions as data (data.session.session_id)}
          <SessionListItem {data} />
        {/each}
      {:else}
        <div class="empty">No sessions in the list</div>
      {/each}
    </div>
  </AutoScroll>
</div>

<style>
  .root {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .session-list {
    position: relative;
    display: grid;
    grid-template-columns: 75px max-content 1fr max-content max-content max-content;
    gap: 1rem 2rem;
    align-items: center;
  }

  @media (max-width: 1280px) {
    .session-list {
      gap: 1rem 1rem;
    }
  }

  .index {
    text-align: right;
  }

  .date {
    grid-column: span 7;
    padding-left: 1rem;
    color: var(--text-secondary);
    user-select: none;
  }

  .wave,
  .status {
    text-align: center;
  }

  .empty {
    grid-column: span 7;
    text-align: center;
  }
</style>
