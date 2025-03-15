<script lang="ts">
  import { tickToTime } from '../../utils';

  export let offset: number;
  export let tick: number;
  export let ticksSinceLastZt: number;
  export let zedsLeft: number;
</script>

<div class="root">
  <div class="time">{tickToTime(Math.max(0, tick - offset), true)}</div>
  <div class="name">
    Zeds Left: <span class="bold">{zedsLeft}</span>
  </div>

  {#if ticksSinceLastZt > 0}
    <div class="last-zt">
      <span> Time since last Zed Time: </span>
      <span class="time">{tickToTime(ticksSinceLastZt, true)} </span>
    </div>
  {/if}
</div>

<style>
  .root {
    padding: 0.25rem 0.25rem;
    display: grid;
    grid-template-columns: min-content auto auto;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
  }

  .time {
    font-size: 12px;
    font-weight: bold;
  }

  .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .bold {
    font-weight: bold;
  }

  .last-zt {
    font-size: 12px;
    justify-self: flex-end;
  }
</style>
