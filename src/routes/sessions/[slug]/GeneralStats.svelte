<script lang="ts">
  import type { AggregatedPlayerStats, MatchWave } from '$lib/api/matches';
  import { omit } from 'lodash';
  import StatsCard from './StatsCard.svelte';

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
  const accuracy = summary.reduce((a, b) =>
    calcAccuracy(a) < calcAccuracy(b) ? b : a
  );
  const hsAccuracy = summary.reduce((a, b) =>
    calcHSAccuracy(a) < calcHSAccuracy(b) ? b : a
  );
  const healsGiven = summary.reduce((a, b) =>
    a.heals_given < b.heals_given ? b : a
  );
  const healsRecv = summary.reduce((a, b) =>
    a.heals_recv < b.heals_recv ? b : a
  );
  const shotsFired = summary.reduce((a, b) =>
    a.shots_fired < b.shots_fired ? b : a
  );

  const zedTime = summary.reduce((a, b) => (calcZT(a) < calcZT(b) ? b : a));
  const memeGod = summary.reduce((a, b) => (a.husk_r < b.husk_r ? b : a));
</script>

<div class="root">
  <StatsCard
    category="Zed Slayer"
    player={getPlayer(zedSlayer)}
    value={`${zedSlayer.kills} Kills`}
  />
  <StatsCard
    category="Large Slayer"
    player={getPlayer(largeSlayer)}
    value={`${largeSlayer.large_kills} Large Kills`}
  />
  <StatsCard
    category="Damage Dealer"
    player={getPlayer(damageDealer)}
    value={`${damageDealer.damage_dealt} Damage`}
  />
  <StatsCard
    category="Head Popper"
    player={getPlayer(headshots)}
    value={`${headshots.shots_hs} Headshots`}
  />
  <StatsCard
    category="Accuracy"
    player={getPlayer(accuracy)}
    value={`${calcAccuracy(accuracy).toFixed(0)}%`}
  />
  <StatsCard
    category="HS Accuracy"
    player={getPlayer(hsAccuracy)}
    value={`${calcHSAccuracy(hsAccuracy).toFixed(0)}%`}
  />
  {#if healsGiven.heals_given > 0}
    <StatsCard
      category="Babysitter"
      player={getPlayer(healsGiven)}
      value={`${healsGiven.heals_given} Heals Given`}
    />
  {/if}
  {#if healsRecv.heals_recv > 0}
    <StatsCard
      category="Meeeeeeeeedic"
      player={getPlayer(healsRecv)}
      value={`${healsRecv.heals_recv} Heals Received`}
    />
  {/if}
  {#if calcZT(zedTime) >= 1}
    <StatsCard
      category="Zed Time Enjoyer"
      player={getPlayer(zedTime)}
      value={`${calcZT(zedTime).toFixed(0)}s Average Zed Time Length`}
    />
  {/if}
  <StatsCard
    category="Gimme your money"
    player={getPlayer(moneyBag)}
    value={`${moneyBag.dosh_earned} Dosh`}
  />
  {#if memeGod.husk_r > 0}
    <StatsCard
      category="Oops hehe"
      player={getPlayer(memeGod)}
      value={`${memeGod.husk_r} Large Rages From Husks`}
    />
  {/if}
  <StatsCard
    category="I need more boolets!"
    player={getPlayer(shotsFired)}
    value={`${shotsFired.shots_fired} Shots Fired`}
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
