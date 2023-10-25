<script lang="ts">
  import type { PlayerWaveStats } from '$lib/api/matches';
  import { tweened } from 'svelte/motion';

  export let stats: PlayerWaveStats;
  export let isCDGame: boolean;

  const cyst_kills = tweened(0, { duration: 200 });
  const alpha_clot_kills = tweened(0, { duration: 200 });
  const slasher_kills = tweened(0, { duration: 200 });
  const stalker_kills = tweened(0, { duration: 200 });
  const crawler_kills = tweened(0, { duration: 200 });
  const gorefast_kills = tweened(0, { duration: 200 });
  const rioter_kills = tweened(0, { duration: 200 });
  const elite_crawler_kills = tweened(0, { duration: 200 });
  const gorefiend_kills = tweened(0, { duration: 200 });
  const siren_kills = tweened(0, { duration: 200 });
  const bloat_kills = tweened(0, { duration: 200 });
  const edar_kills = tweened(0, { duration: 200 });
  const husk_n_kills = tweened(0, { duration: 200 });
  const husk_b_kills = tweened(0, { duration: 200 });
  const husk_rages = tweened(0, { duration: 200 });
  const scrake_kills = tweened(0, { duration: 200 });
  const fp_kills = tweened(0, { duration: 200 });
  const qp_kills = tweened(0, { duration: 200 });
  const boss_kills = tweened(0, { duration: 200 });

  $: {
    cyst_kills.set(stats.kills.cyst);
    alpha_clot_kills.set(stats.kills.alpha_clot);
    slasher_kills.set(stats.kills.slasher);
    stalker_kills.set(stats.kills.stalker);
    crawler_kills.set(stats.kills.crawler);
    gorefast_kills.set(stats.kills.gorefast);
    rioter_kills.set(stats.kills.rioter);
    elite_crawler_kills.set(stats.kills.elite_crawler);
    gorefiend_kills.set(stats.kills.gorefiend);
    siren_kills.set(stats.kills.siren);
    bloat_kills.set(stats.kills.bloat);
    edar_kills.set(stats.kills.edar);
    husk_n_kills.set(stats.kills.husk);
    husk_b_kills.set(stats.husk_b);
    husk_rages.set(stats.husk_r);
    scrake_kills.set(stats.kills.scrake);
    fp_kills.set(stats.kills.fp);
    qp_kills.set(stats.kills.qp);
    boss_kills.set(stats.kills.boss);
  }
</script>

<div class="stats">
  <div class="category">
    <div class="title">Larges</div>
    <div class="metric">
      {$fp_kills.toFixed(0)}
      <span>Fleshpounds</span>
    </div>
    <div class="metric">
      {$qp_kills.toFixed(0)}
      <span>Quarted pounds</span>
    </div>
    <div class="metric">
      {$scrake_kills.toFixed(0)}
      <span>Scrakes</span>
    </div>
    <div class="metric">
      {$boss_kills.toFixed(0)}
      <span>Boss</span>
    </div>
  </div>
  <div class="category">
    <div class="title">Mediums</div>
    <div class="metric">
      {$siren_kills.toFixed(0)}
      <span>Sirens</span>
    </div>
    <div class="metric">
      {$bloat_kills.toFixed(0)}
      <span>Bloats</span>
    </div>
    <div class="metric">
      {($husk_n_kills + $husk_b_kills).toFixed(0)}
      <span>Husks</span>
      {#if isCDGame}
        <span>{'('}N: {$husk_n_kills.toFixed(0)}</span>
        <span>B: {$husk_b_kills.toFixed(0)}</span>
        <span>R: {$husk_rages.toFixed(0)}{')'}</span>
      {/if}
    </div>
    <div class="metric">
      {$edar_kills.toFixed(0)}
      <span>Edars</span>
    </div>
  </div>
  <div class="category">
    <div class="title">Trash</div>
    <div class="metric">
      {$cyst_kills.toFixed(0)}
      <span>Cysts</span>
    </div>
    <div class="metric">
      {$alpha_clot_kills.toFixed(0)}
      <span>Alpha Clots</span>
    </div>
    <div class="metric">
      {$slasher_kills.toFixed(0)}
      <span>Slashers</span>
    </div>
    <div class="metric">
      {$stalker_kills.toFixed(0)}
      <span>Stalkers</span>
    </div>
    <div class="metric">
      {$crawler_kills.toFixed(0)}
      <span>Crawlers</span>
    </div>
    <div class="metric">
      {$gorefast_kills.toFixed(0)}
      <span>Gorefasts</span>
    </div>
    <div class="metric">
      {$rioter_kills.toFixed(0)}
      <span>Rioters</span>
    </div>
    <div class="metric">
      {$elite_crawler_kills.toFixed(0)}
      <span>Elite Crawlers</span>
    </div>
    <div class="metric">
      {$gorefiend_kills.toFixed(0)}
      <span>Gorefiends</span>
    </div>
  </div>
</div>

<style>
  .stats {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 1rem;
    justify-content: space-between;
    font-size: 16px;
  }

  .category {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .category .title {
    font-weight: bold;
  }

  .metric span {
    color: var(--text-secondary);
    user-select: none;
  }
</style>
