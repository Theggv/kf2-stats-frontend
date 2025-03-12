<script lang="ts">
  import type { DemoRecordAnalysisZedtime } from '$lib/api/sessions/demo';
  import type { MajorEventsData } from '../../MatchDemoPlayer.data';
  import { tickToTime } from '../../utils';

  export let tick: number;
  export let offset: number;
  export let event: MajorEventsData['zedtime'];

  function getExtendsCount(zt: DemoRecordAnalysisZedtime, tick: number) {
    const meta = zt.meta_data;

    return meta.ticks.filter(
      (x) => x !== meta.start_tick && x != meta.end_tick && tick >= x
    ).length;
  }

  function getTicks(zt: DemoRecordAnalysisZedtime, tick: number) {
    const ticks: number[] = [];

    for (let i = 1; i < zt.meta_data.ticks.length - 1; i++) {
      if (tick < zt.meta_data.ticks[i]) break;
      ticks.push((zt.meta_data.ticks[i] - zt.meta_data.ticks[i - 1]) / 100);
    }

    return ticks;
  }
</script>

{#if event.current}
  {@const zt = event.current}
  {@const duration = (tick - zt.meta_data.start_tick) / 100}
  {@const extends_count = getExtendsCount(zt, tick)}
  {@const ticks = getTicks(zt, tick)}

  <div class="root">
    <div class="time">
      {tickToTime(zt.meta_data.start_tick - offset, true)}
    </div>
    <div class="content">
      <div class="item">
        <div class="name">Zedtime Started</div>
        {#if event.ticksSinceLast > 0}
          <div class="since-last">
            <div class="name">Time since last zedtime</div>
            <div class="time">{tickToTime(event.ticksSinceLast, true)}</div>
          </div>
        {/if}
      </div>
      <div class="item">
        <div>{duration.toFixed(2)}s,</div>
        <div>{extends_count} extends</div>
        {#if ticks.length}
          ({ticks.map((x) => `${x.toFixed(2)}`).join(', ')})
        {/if}
      </div>
      <div class="item">
        <div>Kills: {zt.large_kills} larges,</div>
        <div>{zt.husk_kills} husks,</div>
        <div>{zt.total_kills} total</div>
      </div>
    </div>
  </div>
{:else if event.previous}
  {@const zt = event.previous}
  {@const ticks = getTicks(zt, tick)}

  <div class="root">
    <div class="time">
      {tickToTime(zt.meta_data.end_tick - offset, true)}
    </div>
    <div class="content">
      <div class="item">
        <div class="name">Zedtime Ended</div>
        <div class="since-last">
          <div class="name">Time since last zedtime</div>
          <div class="time">{tickToTime(event.ticksSinceLast, true)}</div>
        </div>
      </div>
      <div class="item">
        <div>{zt.meta_data.duration.toFixed(2)}s,</div>
        <div>{zt.meta_data.extends_count} extends</div>
        {#if ticks.length}
          ({ticks.map((x) => `${x.toFixed(2)}`).join(', ')})
        {/if}
      </div>
      <div class="item">
        <div>Kills: {zt.large_kills} larges,</div>
        <div>{zt.husk_kills} husks,</div>
        <div>{zt.total_kills} total</div>
      </div>
    </div>
  </div>

  <div class="root">
    <div class="time">
      {tickToTime(event.previous.meta_data.start_tick - offset, true)}
    </div>
    <div class="name">Zedtime Started</div>
  </div>
{/if}

<style>
  .root {
    display: grid;
    grid-template-columns: min-content 1fr auto;
    gap: 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
  }

  .since-last {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    justify-content: flex-end;
    flex: 1;
  }

  .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .content > .item {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }
</style>
