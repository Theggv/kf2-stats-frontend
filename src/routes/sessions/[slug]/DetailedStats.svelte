<script lang="ts">
  import type { AggregatedPlayerStats, MatchWave } from '$lib/api/matches';
  import { omit } from 'lodash';

  export let summary: AggregatedPlayerStats[];
  export let waves: MatchWave[];

  $: players = new Map(
    waves
      .flatMap((x) => x.players)
      .map((x) => [x.id, omit(x, 'player_stats_id')])
  );

  function getPlayer(stats: AggregatedPlayerStats) {
    return players.get(stats.user_id)!;
  }

  function calcAccuracy(a: AggregatedPlayerStats) {
    return a.shots_fired ? (100 * a.shots_hit) / a.shots_fired : 0;
  }

  function calcHSAccuracy(a: AggregatedPlayerStats) {
    return a.shots_hit ? (100 * a.shots_hs) / a.shots_hit : 0;
  }

  function calcZT(a: AggregatedPlayerStats) {
    return a.zedtime_count ? a.zedtime_length / a.zedtime_count : 0;
  }

  type PlayerStats = [ReturnType<typeof getPlayer>, number];

  function prepareStats(stats: PlayerStats[]) {
    return stats.sort((a, b) => b[1] - a[1]);
  }

  const damageDealer = summary.reduce((a, b) =>
    a.damage_dealt < b.damage_dealt ? b : a
  );
  const zedSlayer = summary.reduce((a, b) => (a.kills < b.kills ? b : a));
  const largeSlayer = summary.reduce((a, b) =>
    a.large_kills < b.large_kills ? b : a
  );
  const moneyBag = summary.reduce((a, b) =>
    a.dosh_earned < b.dosh_earned ? b : a
  );
  const headshots = summary.reduce((a, b) => (a.shots_hs < b.shots_hs ? b : a));

  const shotsFired = summary.reduce((a, b) =>
    a.shots_fired < b.shots_fired ? b : a
  );

  const zedTime = summary.reduce((a, b) => (calcZT(a) < calcZT(b) ? b : a));
  const memeGod = summary.reduce((a, b) => (a.husk_r < b.husk_r ? b : a));

  $: damageDealt = summary.map(
    (x): PlayerStats => [getPlayer(x), x.damage_dealt]
  );
  $: damageTaken = summary.map(
    (x): PlayerStats => [getPlayer(x), x.damage_taken]
  );

  $: kills = summary.map((x): PlayerStats => [getPlayer(x), x.kills]);
  $: largeKills = summary.map(
    (x): PlayerStats => [getPlayer(x), x.large_kills]
  );

  $: healsGiven = summary.map(
    (x): PlayerStats => [getPlayer(x), x.heals_given]
  );
  $: healsRecv = summary.map((x): PlayerStats => [getPlayer(x), x.heals_recv]);
  $: accuracy = summary.map(
    (x): PlayerStats => [getPlayer(x), calcAccuracy(x)]
  );
  $: hsAccuracy = summary.map(
    (x): PlayerStats => [getPlayer(x), calcHSAccuracy(x)]
  );
</script>

<div class="root">
  <div class="card">
    <div class="title">Damage Dealt</div>
    {#each prepareStats(damageDealt) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value}</div>
    {/each}
  </div>

  <div class="card">
    <div class="title">Large Kills</div>
    {#each prepareStats(largeKills) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value}</div>
    {/each}
  </div>

  <div class="card">
    <div class="title">Accuracy</div>
    {#each prepareStats(accuracy) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value.toFixed(0)}%</div>
    {/each}
  </div>

  <div class="card">
    <div class="title">HS Accuracy</div>
    {#each prepareStats(hsAccuracy) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value.toFixed(0)}%</div>
    {/each}
  </div>

  <div class="card">
    <div class="title">Heals Given</div>
    {#each prepareStats(healsGiven) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value}</div>
    {/each}
  </div>

  <div class="card">
    <div class="title">Damage Taken</div>
    {#each prepareStats(damageTaken) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value}</div>
    {/each}
  </div>

  <div class="card">
    <div class="title">Kills</div>
    {#each prepareStats(kills) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value}</div>
    {/each}
  </div>

  <div class="card">
    <div class="title">Heals Received</div>
    {#each prepareStats(healsRecv) as [user, value] (user.id)}
      <div>{user.name}</div>
      <div>{value}</div>
    {/each}
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1rem;
  }

  .card {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 0.25rem 1rem;
  }

  .card .title {
    grid-column: span 2;
    user-select: none;
    font-size: 20px;
    color: var(--text-secondary);
  }

  @media (max-width: 1280px) {
    .root {
      grid-template-columns: 1fr;
    }
  }
</style>
