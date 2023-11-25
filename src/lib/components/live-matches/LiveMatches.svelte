<script lang="ts">
  import { onMount } from 'svelte';
  import MatchCard from './MatchCard.svelte';
  import RefreshIcon from '$lib/ui/icons/RefreshIcon.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import { matchesStore } from './store';

  let refreshIntervalId: number;
  const [matches, loading, error, fetchMatches] = matchesStore();

  onMount(() => {
    updateData();
    return () => clearInterval(refreshIntervalId);
  });

  function updateData() {
    clearInterval(refreshIntervalId);
    fetchMatches();
    refreshIntervalId = setInterval(fetchMatches, 15000);
  }
</script>

<aside class="root">
  <div class="header">
    <h3>Live Matches</h3>
    <RefreshIcon class="current-matches-refresh-btn" on:click={updateData} />
  </div>
  <AutoScroll class="current-matches-list">
    {#each $matches as match (match.session.session_id)}
      <MatchCard {match} />
    {:else}
      <div class="no-matches">No matches available</div>
    {/each}
  </AutoScroll>
</aside>

<style>
  .root {
    width: 300px;
    min-height: 0;
    padding: 0.25rem;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;
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
