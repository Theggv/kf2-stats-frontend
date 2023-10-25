<script lang="ts">
  import { onMount } from 'svelte';
  import SessionListItem from './SessionListItem.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import { MatchesApiService, type MatchData } from '$lib/api/matches';
  import type { WithRequired } from '$lib/util/types';

  let sessions: WithRequired<MatchData, 'map' | 'game_data'>[] = [];

  $: sortedSessions = sessions.reduce((map, item) => {
    const key = new Date(item.session.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, WithRequired<MatchData, 'map' | 'game_data'>[]>());

  async function fetchData() {
    try {
      let page = 0;
      const temp: any[] = [];

      do {
        const { data } = await MatchesApiService.filter({
          include_map: true,
          include_cd_data: true,
          include_game_data: true,
          server_id: [serverId],
          reverse_order: true,
          pager: { page, results_per_page: 100 },
        });

        temp.push(...data.items);
        const meta = data.metadata;
        page += 1;

        if (meta.total_results <= page * meta.results_per_page) break;
      } while (true);

      sessions = temp;
    } catch (error) {}
  }

  onMount(async () => {
    await fetchData();
  });

  export let serverId: number;

  function formatDate(str: string) {
    return new Date(str).toLocaleString('en', {
      day: 'numeric',
      month: 'long',
    });
  }
</script>

<AutoScroll>
  <div class="root">
    <div class="index" />
    <div>Map</div>
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

<style>
  .root {
    position: relative;
    display: grid;
    grid-template-columns:
      75px max-content 1fr
      max-content max-content max-content;
    gap: 1rem 2rem;
    align-items: center;
  }

  @media (max-width: 1280px) {
    .root {
      gap: 1rem 1rem;
    }
  }

  .index {
    text-align: right;
  }

  .date {
    grid-column: span 6;
    padding-left: 1rem;
    color: var(--text-secondary);
    user-select: none;
  }

  .wave,
  .status {
    text-align: center;
  }

  .empty {
    grid-column: span 6;
    text-align: center;
  }
</style>
