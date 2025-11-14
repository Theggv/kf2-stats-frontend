<script lang="ts">
  import type { DemoRecordAnalysisWave } from '$lib/api/sessions/demo';
  import { tickToTime } from '../../utils';

  export let item: DemoRecordAnalysisWave;
</script>

<div class="wave small">
  Wave {item.metadata.wave}
  {#if item.metadata.attempt > 1}
    (#{item.metadata.attempt})
  {/if}
</div>

<div class="small">
  ({tickToTime(item.metadata.start_tick)}
  &mdash;
  {tickToTime(item.metadata.end_tick)})
</div>

{#if item.analytics.summary.zeds_left > 1}
  <div class="small">
    {item.analytics.summary.zeds_left} zeds left
  </div>
{/if}

<style>
  .wave {
    min-width: 7ch;
  }

  .small {
    font-size: 12px;
  }
</style>
