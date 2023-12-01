<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import type { PerkStats } from '$lib/api/analytics';
  import { barBackgroundColors } from './colors';
  import { perkToString } from '$lib/util/enum-to-text';

  export let data: PerkStats[];

  export let tooltop: (value: number) => string;
</script>

<div class="perk-chart">
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
            mode: 'y',
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
  .perk-chart {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  :global(.perk-chart > canvas) {
    max-width: 100%;
    max-height: 250px;
    min-height: 250px;
  }
</style>
