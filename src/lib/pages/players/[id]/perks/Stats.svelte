<script lang="ts">
  import { Perk } from '$lib/api/matches';
  import { shortenNumber } from '$lib/util/shorten-number';
  import type { PerkAnalytics } from './Perks.store';

  export let data: PerkAnalytics;

  function calcWinrate(games: number, wins: number) {
    if (!games) return 0;
    return (100 * wins) / games;
  }

  function calcSurvivalRate(waves: number, deaths: number) {
    if (!waves) return 0;
    return 100 * (1 - deaths / waves);
  }

  function calcPlaytime(minutes: number) {
    if (minutes < 60) return `${minutes} minutes`;
    return `${Math.round(minutes / 60)} hours`;
  }
</script>

<div class="root">
  <div class="section">
    <div class="title secondary">Overall</div>
    <div class="stats">
      <div class="secondary">Playtime</div>
      <div class="value">{calcPlaytime(data.minutes)}</div>

      <div class="secondary">Games Played</div>
      <div class="value">{shortenNumber(data.games)}</div>

      <div class="secondary">Winrate</div>
      <div class="value">{calcWinrate(data.games, data.wins).toFixed(1)}%</div>

      <div class="secondary">Survival Rate</div>
      <div class="value">
        {calcSurvivalRate(data.waves, data.deaths).toFixed(1)}%
      </div>
    </div>
  </div>

  <div class="section">
    <div class="title secondary">Damage & Kills</div>
    <div class="stats">
      <div class="secondary">Damage Dealt</div>
      <div class="value">{shortenNumber(data.damage_dealt)}</div>

      <div class="secondary">Damage Taken</div>
      <div class="value">{shortenNumber(data.damage_taken)}</div>

      <div class="secondary">Total Kills</div>
      <div class="value">{shortenNumber(data.kills)}</div>

      <div class="secondary">Large Kills</div>
      <div class="value">{shortenNumber(data.large_kills)}</div>
    </div>
  </div>

  <div class="section">
    <div class="title secondary">Other</div>
    <div class="stats">
      <div class="secondary">Accuracy</div>
      <div class="value">{(data.accuracy * 100).toFixed(1)}%</div>

      <div class="secondary">HS Accuracy</div>
      <div class="value">{(data.hs_accuracy * 100).toFixed(1)}%</div>

      {#if data.perk === Perk.Commando}
        <div class="secondary">Average Zedtime</div>
        <div class="value">{data.averageZedtime.toFixed(1)}s</div>
      {/if}

      {#if data.perk === Perk.Medic}
        <div class="secondary">Heals Given</div>
        <div class="value">{shortenNumber(data.heals_given)}</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .root {
    padding: 0 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: min-content;
  }

  .section .title {
    font-size: 20px;
  }

  .section .stats {
    display: grid;
    grid-template-columns: 150px 1fr;

    text-wrap: nowrap;

    gap: 0rem 1rem;
  }

  .section .stats .value {
    font-weight: bold;
  }
</style>
