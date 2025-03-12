<script lang="ts">
  import { tickToTime } from '../../utils';

  export let offset: number;
  export let tick: number;
  export let started: boolean;
</script>

<div class="root">
  <div class="time">{tickToTime(tick - offset, true)}</div>
  <div class="name">
    {#if started}
      Wave started
    {:else}
      Wave ended
    {/if}
  </div>
</div>

<style>
  .root {
    padding: 0.25rem 0.25rem;
    display: grid;
    grid-template-columns: min-content auto;
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
</style>
