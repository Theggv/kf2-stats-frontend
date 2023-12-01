<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import type { PerkStats } from '$lib/api/analytics';
  import Tabs from '$lib/components/tabs/Tabs.svelte';
  import type { Period } from './periods';
  import { barBackgroundColors } from './colors';
  import { perkToString } from '$lib/util/enum-to-text';

  export let data: PerkStats[];

  export let periods: Period[];
  export let selectedPeriod: number;

  export let tooltop: (value: number) => string;
</script>

<div class="perk-time-chart">
  <Tabs tabs={periods.map((x) => x.label)} bind:selectedTab={selectedPeriod} />
  {#if data.length}
    <Bar
      options={{
        indexAxis: 'y',
        maintainAspectRatio: false,
        resizeDelay: 0,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'nearest',
            intersect: false,
            yAlign: 'center',
            caretPadding: 8,
            callbacks: {
              label: (context) => tooltop(context.parsed.x ?? 0),
            },
          },
        },
      }}
      data={{
        labels: data.map((x) => perkToString(x.perk)),
        datasets: [
          {
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
  .perk-time-chart {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  :global(.perk-time-chart > canvas) {
    max-width: 100%;
    max-height: 250px;
    min-height: 250px;
  }
</style>
