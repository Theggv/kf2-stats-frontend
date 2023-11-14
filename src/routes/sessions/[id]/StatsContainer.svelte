<script lang="ts">
  import { page } from '$app/stores';
  import type { MatchWave } from '$lib/api/matches';
  import { Mode } from '$lib/api/sessions';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import PlayerStatsCharts from './PlayerStatsCharts.svelte';
  import PlayerStatsGeneral from './PlayerStatsGeneral.svelte';
  import PlayerCard from './PlayerCard.svelte';
  import PlayerWaveStatsGeneral from './PlayerWaveStatsGeneral.svelte';
  import PlayerWaveStatsKills from './PlayerWaveStatsKills.svelte';
  import {
    type Match,
    playerWavesStatsStore,
    wavePlayersStatsStore,
    playersSummaryStore,
  } from './store';
  import { tabs, shouldRenderTab, isTabSelected } from './tabs';
  import GeneralStats from './GeneralStats.svelte';
  import DetailedStats from './DetailedStats.svelte';

  export let match: Match;
  export let waves: MatchWave[];

  let mounted = false;

  const [playersSummary, , , fetchPlayersSummary] = playersSummaryStore();
  const [horizontalStats, , , fetchPlayerWavesStats] = playerWavesStatsStore();
  const [verticalStats, , , fetchWavePlayersStats] = wavePlayersStatsStore();

  $: fetchPlayersSummary(match.session.session_id);

  const selectedWaveIndex = writable(waves.length - 1);
  $: selectedWave = waves.at($selectedWaveIndex);
  $: selectedWaveIndex.set(waves.length - 1);

  const selectedPlayerId = writable<number | null>(null);
  $: selectedPlayer = selectedWave?.players.find(
    (x) => x.id === $selectedPlayerId
  );
  $: sortedPlayerList =
    selectedWave?.players.sort((a, b) => a.perk - b.perk) || [];

  $: playerWaveStats =
    $horizontalStats.find(
      (x) => x.player_stats_id === selectedPlayer?.player_stats_id
    ) ||
    $verticalStats.find(
      (x) => x.player_stats_id === selectedPlayer?.player_stats_id
    );

  $: {
    isPlayerSelected;
    updateLocation();
  }

  $: $selectedPlayerId &&
    fetchPlayerWavesStats(match.session.session_id, $selectedPlayerId);
  $: selectedWave?.id && fetchWavePlayersStats(selectedWave.id);
  $: selectedTab = $page.url.hash;

  $: isCDGame = match.session.mode === Mode.ControlledDifficulty;

  $: isPlayerSelected = $selectedPlayerId !== null;

  function onPlayerClick(id: number) {
    selectedPlayerId.update((prev) => (prev === id ? null : id));
  }

  function updateLocation() {
    if (!mounted) return;
    window.location.href = '#general';
  }

  onMount(() => (mounted = true));
</script>

<div class="root">
  {#if waves.length > 0}
    <AutoScroll class="player-list">
      {#each sortedPlayerList as player (player.id)}
        <PlayerCard
          {player}
          selected={$selectedPlayerId === player.id}
          on:click={() => onPlayerClick(player.id)}
        />
      {/each}
    </AutoScroll>
    <ul class="tabs">
      {#each tabs as tab, index (tab.href + index)}
        {#if shouldRenderTab(tab, $selectedPlayerId)}
          <li class:selected={isTabSelected(selectedTab, tab)}>
            <a href={tab.href}>{tab.content}</a>
          </li>
        {/if}
      {/each}
    </ul>
    <AutoScroll class="stats">
      {#each tabs as tab, index (tab.href + index)}
        {#if isTabSelected(selectedTab, tab)}
          {#if tab.href === '#general'}
            {#if !selectedPlayer}
              {#if $playersSummary.length}
                <GeneralStats summary={$playersSummary} {waves} />
              {/if}
            {:else if playerWaveStats}
              {#if selectedPlayer}
                <PlayerStatsGeneral {isCDGame} stats={$horizontalStats} />
              {/if}
            {/if}
          {:else if tab.href === '#detailed'}
            {#if !selectedPlayer && $playersSummary.length}
              <DetailedStats summary={$playersSummary} {waves} />
            {/if}
          {:else if tab.href === '#waves'}
            {#if playerWaveStats && selectedPlayer}
              <PlayerWaveStatsGeneral
                stats={playerWaveStats}
                {isCDGame}
                perk={selectedPlayer.perk}
              />
            {/if}
          {:else if tab.href === '#charts'}
            {#if $selectedPlayerId}
              <PlayerStatsCharts
                playerId={$selectedPlayerId}
                stats={$horizontalStats}
                {waves}
              />
            {/if}
          {:else if tab.href === '#kills'}
            {#if playerWaveStats && selectedPlayer}
              <PlayerWaveStatsKills stats={playerWaveStats} {isCDGame} />
            {/if}
          {/if}
        {/if}
      {/each}
    </AutoScroll>
    <div class="slider">
      {#if selectedWave}
        <div>
          Wave {selectedWave.wave}
          {#if selectedWave.attempt && selectedWave.attempt > 1}
            Attempt {selectedWave.attempt}
          {/if}
        </div>
      {/if}
      <input
        type="range"
        min={0}
        max={waves.length - 1}
        bind:value={$selectedWaveIndex}
      />
    </div>
  {:else}
    <div>No stats were found</div>
  {/if}
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template:
      '- tabs' max-content
      'players stats' 1fr
      'players slider' max-content
      / 250px 1fr;

    gap: 1rem;
  }

  :global(.player-list) {
    grid-area: players;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tabs {
    grid-area: tabs;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .tabs li {
    font-weight: bold;
    text-align: center;
    min-width: 6rem;
  }

  .tabs li a {
    display: block;
    width: 100%;
  }

  .tabs .selected {
    border-bottom: 2px solid var(--text-primary);
  }

  :global(.stats) {
    flex: 1;
    grid-area: stats;
    overflow-x: hidden;
  }

  .slider {
    grid-area: slider;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 10% 1rem;
  }

  .slider div {
    align-self: center;
  }
</style>
