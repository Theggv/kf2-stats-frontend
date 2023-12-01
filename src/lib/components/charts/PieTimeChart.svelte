<script lang="ts">
  import { Pie } from 'svelte-chartjs';
  import type { PeriodData } from '$lib/api/analytics';
  import Tabs from '$lib/components/tabs/Tabs.svelte';
  import type { Period } from './periods';
  import { barBackgroundColors } from './colors';

  export let data: PeriodData[];
  export let label = '';

  export let periods: Period[];
  export let selectedPeriod: number;
</script>

<div class="pie-time-chart">
  <Tabs tabs={periods.map((x) => x.label)} bind:selectedTab={selectedPeriod} />
  {#if data.length}
    <Pie
      options={{
        maintainAspectRatio: false,
      }}
      data={{
        labels: data.map((x) => x.period),
        datasets: [
          {
            label,
            data: data.map((x) => x.count),
            backgroundColor: barBackgroundColors,
          },
        ],
      }}
    />
  {:else}
    <div class="secondary">No Data</div>
  {/if}
</div>

<style>
  .pie-time-chart {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  :global(.pie-time-chart > canvas) {
    max-width: 100%;
    max-height: 300px;
    min-height: 300px;
  }
</style>
