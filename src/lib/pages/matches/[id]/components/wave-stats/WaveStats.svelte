<script lang="ts">
  import { getContext } from 'svelte';
  import {
    ContextName,
    getWaveStatsStore,
    type ContextType,
  } from '../../Match.store';
  import type { UserStats } from '../../tabs/util';
  import type { MatchWave } from '$lib/api/matches';

  export let userStats: UserStats;
  export let showOnlyCurrentWave: boolean;
  export let hover = false;

  const store = getContext<ContextType>(ContextName);
  const { wave: currentWave } = store.waveInput;

  const stats = getWaveStatsStore();
  const {
    damage_dealt,
    damage_taken,
    heals_given,
    heals_recv,
    accuracy,
    hsAccuracy,
    headshots,
    avgZTLength,
    kills,
    updateSingle,
    updateMultiple,
  } = stats;
  const { fp, husk_b, husk_n, husk_r, qp, scrake, total } = kills;

  function updateStats(
    userStats: UserStats,
    currentWave: MatchWave | undefined,
    showOnlyCurrentWave: boolean
  ) {
    if (!currentWave) return;

    if (showOnlyCurrentWave) {
      const stats = userStats.waves.find(
        (wave) => wave.wave.wave_id === currentWave?.wave_id
      )?.stats;

      if (stats) updateSingle(stats);
    } else {
      const stats = userStats.waves
        .filter((wave) => wave.wave.wave_id <= currentWave.wave_id)
        .map((wave) => wave.stats);

      if (stats.length) updateMultiple(stats);
    }
  }

  $: updateStats(userStats, $currentWave, showOnlyCurrentWave);
</script>

<div class="root">
  <div
    class="row"
    class:hover
    on:mouseenter
    on:mouseleave
    role="row"
    tabindex="-1"
  >
    <div class="category">
      <div class="cell primary w75">{$total.toFixed(0)}</div>
      <div class="cell primary w75">{($scrake + $fp + $qp).toFixed(0)}</div>
    </div>

    <div class="category">
      <div class="cell primary">{$damage_dealt.toFixed(0)}</div>
      <div class="cell secondary w75">{$damage_taken.toFixed(0)}</div>
    </div>

    <div class="category">
      <div class="cell secondary half">{$fp.toFixed(0)}</div>
      <div class="cell secondary half">{$scrake.toFixed(0)}</div>
      <div class="cell secondary half">{$qp.toFixed(0)}</div>
    </div>

    <div class="category">
      <div class="cell secondary half">{$husk_n.toFixed(0)}</div>
      <div class="cell secondary half">{$husk_b.toFixed(0)}</div>
      <div
        class="cell {$husk_r.toFixed(0) !== '0' ? 'primary' : 'secondary'} half"
      >
        {$husk_r.toFixed(0)}
      </div>
    </div>

    <div class="category">
      <div class="cell secondary w75">{($accuracy * 100).toFixed(0)}%</div>
      <div class="cell secondary half">{($hsAccuracy * 100).toFixed(0)}%</div>
    </div>

    <div class="category">
      <div class="cell secondary">{$headshots.toFixed(0)}</div>
    </div>

    <div class="category">
      <div class="cell w75">{$heals_given.toFixed(0)}</div>
      <div class="cell w75">{$heals_recv.toFixed(0)}</div>
    </div>

    <div class="category">
      {#if $avgZTLength > 0}
        <div class="cell primary">{$avgZTLength.toFixed(2)}s</div>
      {:else}
        <div class="cell secondary">—</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .root {
    display: table-cell;
  }

  .row {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    gap: 1rem;

    height: 52px;
    background-color: rgb(0 0 0 / 0.25);
    outline: none;
  }

  .row.hover {
    background-color: var(--hover-primary);
  }

  .category {
    display: flex;
    flex-direction: row;
  }

  .cell {
    text-align: center;
    font-size: 16px;
    width: 100px;
  }

  .w75 {
    width: 75px;
  }

  .half {
    width: 50px;
  }

  .primary {
    font-weight: bold;
  }

  .secondary {
    color: var(--text-secondary);
  }
</style>
