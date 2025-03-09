<script lang="ts">
  import type { MajorEventsData } from './MatchDemoPlayer.data';
  import { tickToTime } from './utils';

  export let event: MajorEventsData['zedtime'];
</script>

{#if event.current}
  <div class="root">
    <div class="time">{tickToTime(event.current.start_tick, true)}</div>
    <div class="name">Zedtime Started</div>
    <div class="zed">{event.largesKilled} Larges killed</div>
  </div>

  <div class="root since-last">
    <div class="name">Time since last zedtime</div>
    <div class="time">{tickToTime(event.ticksSinceLast, true)}</div>
  </div>
{:else if event.previous}
  <div class="root since-last">
    <div class="name">Time since last zedtime</div>
    <div class="time">{tickToTime(event.ticksSinceLast, true)}</div>
  </div>

  <div class="root">
    <div class="time">{tickToTime(event.previous.end_tick, true)}</div>
    <div class="name">Zedtime Ended</div>
    <div class="zed">{event.previous.large_kills} Larges killed</div>
  </div>

  <div class="root">
    <div class="time">{tickToTime(event.previous.start_tick, true)}</div>
    <div class="name">Zedtime Started</div>
  </div>
{/if}

<style>
  .root {
    display: grid;
    grid-template-columns: min-content 1fr auto;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
  }

  .since-last {
    grid-template-columns: auto min-content;
  }

  .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
  }
</style>
