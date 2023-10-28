<script lang="ts">
  import { groupZeds } from '$lib/api/common';
  import { Perk, type PlayerWaveStats } from '$lib/api/matches';
  import { tweened } from 'svelte/motion';

  export let stats: PlayerWaveStats;
  export let isCDGame: boolean;
  export let perk: Perk;

  const damage_dealt = tweened(0, { duration: 200 });
  const damage_taken = tweened(0, { duration: 200 });
  const kills = tweened(0, { duration: 200 });
  const scrakeKills = tweened(0, { duration: 200 });
  const fpKills = tweened(0, { duration: 200 });
  const qpKills = tweened(0, { duration: 200 });
  const bossKills = tweened(0, { duration: 200 });
  const husk_n_kills = tweened(0, { duration: 200 });
  const husk_b_kills = tweened(0, { duration: 200 });
  const husk_rages = tweened(0, { duration: 200 });
  const accuracy = tweened(0, { duration: 200 });
  const hsAccuracy = tweened(0, { duration: 200 });
  const headshots = tweened(0, { duration: 200 });
  const avgZTLength = tweened(0, { duration: 200 });

  $: {
    damage_dealt.set(stats.damage_dealt);
    damage_taken.set(stats.damage_taken);

    const zeds = groupZeds(stats.kills);

    kills.set(zeds.trash + zeds.medium + zeds.large + zeds.boss + stats.husk_b);
    scrakeKills.set(stats.kills.scrake);
    fpKills.set(stats.kills.fp);
    qpKills.set(stats.kills.qp);
    bossKills.set(stats.kills.boss);
    accuracy.set(stats.shots_fired ? stats.shots_hit / stats.shots_fired : 0);
    hsAccuracy.set(stats.shots_hit ? stats.shots_hs / stats.shots_hit : 0);
    headshots.set(stats.shots_hs);
    avgZTLength.set(
      stats.zedtime_count ? stats.zedtime_length / stats.zedtime_count : 0
    );
    husk_n_kills.set(stats.kills.husk);
    husk_b_kills.set(stats.husk_b);
    husk_rages.set(stats.husk_r);
  }
</script>

<div class="stats">
  <div class="metric">
    <div class="name">Kills</div>
    <div class="value">
      {$kills.toFixed(0)}
    </div>
  </div>
  <div class="metric">
    <div class="name">Large kills</div>
    <div class="value compact">
      {#if isCDGame}
        {$scrakeKills.toFixed(0)} SC
        {$fpKills.toFixed(0)} FP
        {$qpKills.toFixed(0)} QP
      {:else}
        {($scrakeKills + $fpKills + $qpKills).toFixed(0)}
      {/if}
    </div>
  </div>
  <div class="metric">
    {#if isCDGame}
      <div class="name">Husk kills</div>
      <div class="value compact">
        <span>N: {$husk_n_kills.toFixed(0)}</span>
        <span>B: {$husk_b_kills.toFixed(0)}</span>
        <span>R: {$husk_rages.toFixed(0)}</span>
      </div>
    {/if}
  </div>
  <div class="metric">
    <div class="name">Accuracy</div>
    <div class="value">
      {($accuracy * 100).toFixed(0)}%
    </div>
  </div>
  <div class="metric">
    <div class="name">HS Accuracy</div>
    <div class="value">
      {($hsAccuracy * 100).toFixed(0)}%
    </div>
  </div>
  <div class="metric">
    <div class="name">Head shots</div>
    <div class="value">
      {$headshots.toFixed(0)}
    </div>
  </div>
  <div class="metric">
    <div class="name">Damage Dealt</div>
    <div class="value">
      {$damage_dealt.toFixed(0)}
    </div>
  </div>
  <div class="metric">
    <div class="name">Damage Taken</div>
    <div class="value">
      {$damage_taken.toFixed(0)}
    </div>
  </div>
  <div class="metric">
    {#if perk === Perk.Commando}
      <div class="name">Average Zed time</div>
      <div class="value">
        {$avgZTLength.toFixed(0)}s
      </div>
    {/if}
  </div>
</div>

<style>
  .stats {
    flex: 1;
    display: grid;

    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row dense;
    gap: 1rem;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 8rem;
  }

  .metric .name {
    font-size: 20px;
    color: var(--text-secondary);
    user-select: none;
  }

  .metric .value {
    font-size: 36px;
  }

  .compact.value {
    font-size: 30px;
  }
</style>
