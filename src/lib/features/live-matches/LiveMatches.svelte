<script lang="ts">
  import { onMount } from 'svelte';
  import MatchCard from './MatchCard.svelte';
  import { RefreshIcon } from '$lib/ui/icons';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import { getStore } from './LiveMatches.store';

  let refreshIntervalId: NodeJS.Timeout | number;
  const { matches, loading, error, fetch: fetchMatches } = getStore();

  function updateData() {
    clearInterval(refreshIntervalId);
    fetchMatches();
    refreshIntervalId = setInterval(fetchMatches, 15000);
  }

  onMount(() => {
    updateData();
    return () => clearInterval(refreshIntervalId);
  });
</script>

<aside class="root">
  <div class="header">
    <h3>Live Matches</h3>
    <RefreshIcon class="current-matches-refresh-btn" on:click={updateData} />
  </div>
  <AutoScroll>
    <div class="current-matches-list">
      {#each $matches as match, index (index)}
        <MatchCard {match} />

        {#if index !== $matches.length - 1}
          <hr />
        {/if}
      {:else}
        <div class="no-matches">No matches available</div>
      {/each}
    </div>
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

  @media (max-width: 1280px) {
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
    background-color: rgb(255 0 0 / 0.25);
  }

  :global(.current-matches-refresh-btn) {
    margin-right: 1rem;
  }

  .current-matches-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .current-matches-list hr {
    border-top: 1px solid var(--hover-primary);
  }

  .no-matches {
    padding: 0.5rem;
  }
</style>
