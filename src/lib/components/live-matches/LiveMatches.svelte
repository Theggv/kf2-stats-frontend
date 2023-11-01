<script lang="ts">
  import { onMount } from 'svelte';
  import MatchView from './MatchView.svelte';
  import RefreshIcon from '$lib/ui/icons/RefreshIcon.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import { MatchesApiService, type MatchData } from '$lib/api/matches';
  import { Status } from '$lib/api/sessions';
  import type { WithRequired } from '$lib/util/types';

  let refreshIntervalId: number;
  let matches: WithRequired<MatchData, 'game_data' | 'server' | 'map'>[] = [];

  onMount(() => {
    updateData();

    return () => clearInterval(refreshIntervalId);
  });

  function updateData() {
    clearInterval(refreshIntervalId);
    fetchData();
    refreshIntervalId = setInterval(fetchData, 15000);
  }

  async function fetchData() {
    try {
      let page = 0;
      const temp: any[] = [];

      do {
        const { data } = await MatchesApiService.filter({
          include_server: true,
          include_map: true,
          include_game_data: true,
          include_cd_data: true,
          status: Status.InProgress,
          pager: { page, results_per_page: 100 },
        });

        temp.push(...data.items);
        const meta = data.metadata;
        page += 1;

        if (meta.total_results <= page * meta.results_per_page) break;
      } while (true);

      matches = temp;
    } catch (error) {}
  }
</script>

<aside class="root">
  <div class="header">
    <h3>Live Matches</h3>
    <RefreshIcon class="current-matches-refresh-btn" on:click={updateData} />
  </div>
  <AutoScroll class="current-matches-list">
    {#each matches as match (match.session.session_id)}
      <MatchView {match} />
    {:else}
      <div class="no-matches">No matches available</div>
    {/each}
  </AutoScroll>
</aside>

<style>
  .root {
    min-width: 250px;
    max-width: 400px;
    min-height: 0;
    padding: 0.5rem;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
  }

  @media (max-width: 1024px) {
    .root {
      display: none;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    font-size: 18px;
    font-weight: bold;
    user-select: none;
  }

  h3::before {
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 100px;
    background-color: var(--hover-primary);
  }

  :global(.current-matches-refresh-btn) {
    margin-right: 1rem;
  }

  :global(.current-matches-list) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .no-matches {
    padding: 0.5rem;
  }
</style>
