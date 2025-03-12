<script lang="ts">
  import type { DemoRecordAnalysisWave } from '$lib/api/sessions/demo';
  import { tickToTime } from '../../utils';

  export let item: DemoRecordAnalysisWave;
</script>

<div class="wave small">
  Wave {item.meta_data.wave}
  {#if item.meta_data.attempt > 1}
    (#{item.meta_data.attempt})
  {/if}
</div>

<div class="small">
  ({tickToTime(item.meta_data.start_tick)}
  &mdash;
  {tickToTime(item.meta_data.end_tick)})
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
