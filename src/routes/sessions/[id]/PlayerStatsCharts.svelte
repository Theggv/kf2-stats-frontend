<script lang="ts">
  import type { PlayerWaveStats, MatchWave } from '$lib/api/matches';
  import ChartLine from './ChartLine.svelte';

  export let playerId: number;
  export let stats: PlayerWaveStats[];
  export let waves: MatchWave[];

  type Data = { id: number; value: number | undefined };

  $: accuracy = stats.map((x) => ({
    id: x.player_stats_id,
    value: x.shots_fired
      ? Math.round((x.shots_hit / x.shots_fired) * 100)
      : undefined,
  }));

  $: hsAccuracy = stats.map((x) => ({
    id: x.player_stats_id,
    value: x.shots_hit
      ? Math.round((x.shots_hs / x.shots_hit) * 100)
      : undefined,
  }));

  $: damageDealt = stats.map((x) => ({
    id: x.player_stats_id,
    value: x.damage_dealt,
  }));

  $: largeKills = stats.map((x) => ({
    id: x.player_stats_id,
    value: x.kills.scrake + x.kills.fp + x.kills.qp,
  }));

  function prepareData(data: Data[]) {
    return waves.map((wave) => {
      const playerStatsId = wave.players.find(
        (x) => x.id === playerId
      )?.player_stats_id;

      const value = data.find((x) => x.id === playerStatsId)?.value;

      return { wave: wave.wave, attempt: wave.attempt, value };
    });
  }

  function percentTooltip(value: number) {
    return value + '%';
  }
</script>

<div class="root">
  <ChartLine
    label="Accuracy"
    data={prepareData(accuracy)}
    tooltip={percentTooltip}
    beginAtZero={true}
  />
  <ChartLine
    label="HS Accuracy"
    data={prepareData(hsAccuracy)}
    tooltip={percentTooltip}
    beginAtZero={true}
  />
  <ChartLine
    label="Damage dealt"
    data={prepareData(damageDealt)}
    beginAtZero={true}
  />
  <ChartLine
    label="Large kills"
    data={prepareData(largeKills)}
    beginAtZero={true}
  />
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 1280px) {
    .root {
      grid-template-columns: 1fr;
    }
  }
</style>
