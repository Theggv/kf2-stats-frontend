<script lang="ts">
  import type { DemoRecordAnalysisZedtime } from '$lib/api/sessions/demo';
  import { tickToTime } from '../../utils';

  export let tick: number;
  export let offset: number;
  export let event: DemoRecordAnalysisZedtime;

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

  $: completed = tick > event.meta_data.end_tick;

  $: duration = completed
    ? event.meta_data.duration
    : (tick - event.meta_data.start_tick) / 100;
  $: extends_count = getExtendsCount(event, tick);
  $: ticks = getTicks(event, tick);
</script>

<div class="root">
  <div class="time">
    {#if completed}
      {tickToTime(event.meta_data.start_tick - offset, true)}
      -
      {tickToTime(event.meta_data.end_tick - offset, true)}
    {:else}
      {tickToTime(event.meta_data.start_tick - offset, true)}
    {/if}
  </div>
  <div class="content">
    <div class="item">
      <div class="name">
        Zed time
        {#if completed}
          ended
        {:else}
          started
        {/if}
      </div>
    </div>
    <div class="item">
      <div>{duration.toFixed(2)}s,</div>
      <div>{extends_count} extends</div>
      {#if ticks.length}
        ({ticks.map((x) => `${x.toFixed(2)}`).join(', ')})
      {/if}
    </div>
    <div class="item">
      <div>Kills: {event.large_kills} larges,</div>
      <div>{event.husk_kills} husks,</div>
      <div>{event.total_kills} total</div>
    </div>
  </div>
</div>

<style>
  .root {
    padding: 0.25rem 0.25rem;
    display: grid;
    grid-template-columns: max-content 1fr auto;
    gap: 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
    background-color: rgb(255 255 255 / 0.1);
  }

  .time {
    font-size: 12px;
    font-weight: bold;
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
