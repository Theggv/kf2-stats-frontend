<script lang="ts">
  import type { PlayerWaveStats } from '$lib/api/matches';
  import { tweened } from 'svelte/motion';

  export let isCDGame: boolean = false;
  export let stats: PlayerWaveStats[];

  const damage_dealt = tweened(0, { duration: 200 });
  const damage_taken = tweened(0, { duration: 200 });
  const heals_given = tweened(0, { duration: 200 });
  const heals_recv = tweened(0, { duration: 200 });
  const dosh_earned = tweened(0, { duration: 200 });
  const shots_fired = tweened(0, { duration: 200 });
  const shots_hit = tweened(0, { duration: 200 });
  const shots_hs = tweened(0, { duration: 200 });
  const kills_sc = tweened(0, { duration: 200 });
  const kills_fp = tweened(0, { duration: 200 });
  const kills_qp = tweened(0, { duration: 200 });
  const kills_husk_n = tweened(0, { duration: 200 });
  const kills_husk_b = tweened(0, { duration: 200 });
  const husk_rages = tweened(0, { duration: 200 });
  const kills_boss = tweened(0, { duration: 200 });
  const kills = tweened(0, { duration: 200 });
  const accuracy = tweened(0, { duration: 200 });
  const hs_accuracy = tweened(0, { duration: 200 });
  const average_zedtime = tweened(0, { duration: 200 });

  $: damage_dealt.set(stats.reduce((acc, x) => x.damage_dealt + acc, 0));
  $: damage_taken.set(stats.reduce((acc, x) => x.damage_taken + acc, 0));

  $: heals_given.set(stats.reduce((acc, x) => x.heals_given + acc, 0));
  $: heals_recv.set(stats.reduce((acc, x) => x.heals_recv + acc, 0));

  $: dosh_earned.set(stats.reduce((acc, x) => x.dosh_earned + acc, 0));

  $: shots_fired.set(stats.reduce((acc, x) => x.shots_fired + acc, 0));
  $: shots_hit.set(stats.reduce((acc, x) => x.shots_hit + acc, 0));
  $: shots_hs.set(stats.reduce((acc, x) => x.shots_hs + acc, 0));

  $: accuracy.set($shots_fired ? $shots_hit / $shots_fired : 0);
  $: hs_accuracy.set($shots_hit ? $shots_hs / $shots_hit : 0);

  $: kills_sc.set(stats.reduce((acc, x) => x.kills.scrake + acc, 0));
  $: kills_fp.set(stats.reduce((acc, x) => x.kills.fp + acc, 0));
  $: kills_qp.set(stats.reduce((acc, x) => x.kills.qp + acc, 0));

  $: kills_husk_n.set(stats.reduce((acc, x) => x.kills.husk + acc, 0));
  $: kills_husk_b.set(stats.reduce((acc, x) => x.husk_b + acc, 0));
  $: husk_rages.set(stats.reduce((acc, x) => x.husk_r + acc, 0));

  $: kills_boss.set(stats.reduce((acc, x) => x.kills.boss + acc, 0));

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

  $: zedtime_count = stats.reduce((acc, x) => x.zedtime_count + acc, 0);
  $: zedtime_length = stats.reduce((acc, x) => x.zedtime_length + acc, 0);

  $: average_zedtime.set(zedtime_count ? zedtime_length / zedtime_count : 0);
</script>

<div class="stats">
  <div class="metric">
    <div class="name">Damage Dealt</div>
    <div class="value">
      {$damage_dealt.toFixed(0)}
    </div>
  </div>

  <div class="metric">
    <div class="name">Kills</div>
    <div class="value">
      {$kills.toFixed(0)}
    </div>
  </div>

  <div class="metric">
    <div class="name">Large kills</div>
    <div class="value">
      {($kills_sc + $kills_fp + $kills_qp).toFixed(0)}
      {'('}
      {$kills_sc.toFixed(0)} SC
      {$kills_fp.toFixed(0)} FP
      {$kills_qp.toFixed(0)} QP
      {')'}
    </div>
  </div>

  {#if isCDGame}
    <div class="metric">
      <div class="name">Husk kills</div>
      <div class="value">
        {($kills_husk_n + $kills_husk_b).toFixed(0)}
        {'('}
        <span>N: {$kills_husk_n.toFixed(0)}</span>
        <span>B: {$kills_husk_b.toFixed(0)}</span>
        <span>R: {$husk_rages.toFixed(0)}</span>
        {')'}
      </div>
    </div>
  {/if}

  <div class="metric">
    <div class="name">Accuracy</div>
    <div class="value">
      {($accuracy * 100).toFixed(0)}%
    </div>
  </div>

  <div class="metric">
    <div class="name">HS Accuracy</div>
    <div class="value">
      {($hs_accuracy * 100).toFixed(0)}%
    </div>
  </div>

  <div class="metric">
    <div class="name">Shots Fired</div>
    <div class="value">
      {$shots_fired.toFixed(0)}
    </div>
  </div>

  <div class="metric">
    <div class="name">Headshots</div>
    <div class="value">
      {$shots_hs.toFixed(0)}
    </div>
  </div>

  <div class="metric">
    <div class="name">Heals Given</div>
    <div class="value">
      {$heals_given.toFixed(0)}
    </div>
  </div>

  <div class="metric">
    <div class="name">Damage Taken</div>
    <div class="value">
      {$damage_taken.toFixed(0)}
    </div>
  </div>

  <div class="metric">
    <div class="name">Dosh Earned</div>
    <div class="value">
      {$dosh_earned.toFixed(0)}
    </div>
  </div>

  {#if zedtime_count}
    <div class="metric">
      <div class="name">Average Zed Time</div>
      <div class="value">
        {$average_zedtime.toFixed(1)}s
      </div>
    </div>
  {/if}
</div>

<style>
  .stats {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 1280px) {
    .stats {
      grid-template-columns: 1fr;
    }
  }

  .metric {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .metric .name {
    font-size: 20px;
    color: var(--text-secondary);
    user-select: none;
  }

  .metric .name::after {
    content: ':';
  }

  .metric .value {
    font-size: 20px;
  }
</style>
