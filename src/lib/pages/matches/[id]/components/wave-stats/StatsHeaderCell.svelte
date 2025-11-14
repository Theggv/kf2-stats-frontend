<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { AvailableMetrics as Metrics } from '../../tabs/StatsTab.store';

  export let title: string = '';
  export let metric: Metrics;

  export let primary: boolean = false;
  export let half: boolean = false;
  export let w75: boolean = false;

  const selectedMetric = getContext<Writable<number>>('stats-selected-metric');

  function handleClick(selected: Writable<number>, metric: number) {
    selected.update((prev) => (prev === metric ? 0 : metric));
  }
</script>

<div
  class:primary
  class:half
  class:w75
  class:selected={$selectedMetric === metric}
  role="button"
  tabindex="0"
  on:click={() => handleClick(selectedMetric, metric)}
  on:keypress={(e) => e.key === 'Enter' && handleClick(selectedMetric, metric)}
  {title}
>
  <slot />
</div>

<style>
  .primary {
    justify-self: center;
    align-self: center;
    font-size: 14px;
    width: 100px;
  }

  .half {
    width: 50px;
  }

  .w75 {
    width: 75px;
  }

  .selected {
    color: var(--text-primary);
  }
</style>
