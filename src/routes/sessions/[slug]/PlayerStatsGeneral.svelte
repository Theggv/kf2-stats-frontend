<script lang="ts">
  import type { PlayerWaveStats } from '$lib/api/matches';
  import { tweened } from 'svelte/motion';

  export let playerId: number;
  export let stats: PlayerWaveStats[];

  const totalDamage = tweened(0, { duration: 200 });
  const headShots = tweened(0, { duration: 200 });
  const accuracy = tweened(0, { duration: 200 });
  const hsAccuracy = tweened(0, { duration: 200 });
  const kills = tweened(0, { duration: 200 });
  const largeKills = tweened(0, { duration: 200 });

  $: shotsFired = stats.reduce((acc, x) => x.shots_fired + acc, 0);
  $: shotsHit = stats.reduce((acc, x) => x.shots_hit + acc, 0);

  $: totalDamage.set(stats.reduce((acc, x) => x.damage_dealt + acc, 0));
  $: headShots.set(stats.reduce((acc, x) => x.shots_hs + acc, 0));
  $: accuracy.set(shotsFired ? shotsHit / shotsFired : 0);
  $: hsAccuracy.set(shotsHit ? $headShots / shotsHit : 0);
  $: largeKills.set(
    stats.reduce((acc, { kills: k }) => acc + k.scrake + k.fp + k.qp, 0)
  );
  $: kills.set(
    stats.reduce(
      (acc, { kills: k, husk_b }) =>
        acc +
        husk_b +
        k.cyst +
        k.alpha_clot +
        k.slasher +
        k.stalker +
        k.crawler +
        k.gorefast +
        k.rioter +
        k.elite_crawler +
        k.gorefiend +
        k.siren +
        k.bloat +
        k.edar +
        k.husk +
        k.scrake +
        k.fp +
        k.qp +
        k.boss,
      0
    )
  );
</script>

<div class="root">
  <div>Total damage: {$totalDamage.toFixed(0)}</div>
  <div>Head shots: {$headShots.toFixed(0)}</div>
  <div>Accuracy: {($accuracy * 100).toFixed(0)}%</div>
  <div>HS Accuracy: {($hsAccuracy * 100).toFixed(0)}%</div>
  <div>Kills: {$kills.toFixed(0)}</div>
  <div>Shots fired: {shotsFired.toFixed(0)}</div>
  <div>Shots hit: {shotsHit.toFixed(0)}</div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
