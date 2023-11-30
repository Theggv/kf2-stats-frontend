<script lang="ts">
  import type { PlayerWaveStats, MatchWave } from '$lib/api/matches';
  import LineChart from '$lib/components/charts/LineChart.svelte';

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

  function formatLabel(wave: number, attempt: number) {
    if (attempt > 1) return `Wave ${wave} (${attempt})`;
    return `Wave ${wave}`;
  }

  function percentTooltip(value: number) {
    return value + '%';
  }

  function damageTooltip(value: number) {
    return value + ' damage';
  }

  function largeKillsTooltip(value: number) {
    return value + ' large kills';
  }
</script>

<div class="root">
  <LineChart
    label="Accuracy"
    data={prepareData(accuracy).map((x) => ({
      label: formatLabel(x.wave, x.attempt),
      value: x.value,
    }))}
    tooltop={percentTooltip}
  />

  <LineChart
    label="HS Accuracy"
    data={prepareData(hsAccuracy).map((x) => ({
      label: formatLabel(x.wave, x.attempt),
      value: x.value,
    }))}
    tooltop={percentTooltip}
  />
  <LineChart
    label="Damage dealt"
    data={prepareData(damageDealt).map((x) => ({
      label: formatLabel(x.wave, x.attempt),
      value: x.value,
    }))}
    tooltop={damageTooltip}
  />
  <LineChart
    label="Large kills"
    data={prepareData(largeKills).map((x) => ({
      label: formatLabel(x.wave, x.attempt),
      value: x.value,
    }))}
    tooltop={largeKillsTooltip}
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
