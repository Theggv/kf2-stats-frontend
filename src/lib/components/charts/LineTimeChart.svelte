<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import type { PeriodData } from '$lib/api/analytics';
  import Tabs from '$lib/components/tabs/Tabs.svelte';
  import { lineHoverPlugin } from './plugins';
  import type { Period } from './periods';

  export let data: PeriodData[];

  export let periods: Period[];
  export let selectedPeriod: number;

  export let tooltop: (value: number) => string;
</script>

<div class="line-time-chart">
  <Tabs tabs={periods.map((x) => x.label)} bind:selectedTab={selectedPeriod} />
  {#if data.length}
    <Line
      plugins={[lineHoverPlugin]}
      options={{
        maintainAspectRatio: false,
        resizeDelay: 0,
        interaction: {
          mode: 'x',
          intersect: true,
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
        elements: {
          point: {
            pointStyle: 'circle',
            hoverRadius: 3,
            hoverBorderWidth: 5,
            radius: 0,
          },
        },
        scales: {
          x: {
            display: true,
            type: 'time',
            time: {
              ...periods[selectedPeriod].chartData,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            yAlign: 'center',
            caretPadding: 8,
            callbacks: {
              label: (context) => tooltop(context.parsed.y ?? 0),
            },
          },
        },
      }}
      data={{
        xLabels: data.map((x) => new Date(x.period)),
        datasets: [
          {
            data: data.map((x) => x.count),
            fill: false,
            borderColor: 'rgb(200 200 120 / 0.9)',
            tension: 0.1,
          },
        ],
      }}
    />
  {:else}
    <div class="secondary">No Data</div>
  {/if}
</div>

<style>
  .line-time-chart {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  :global(.line-time-chart > canvas) {
    max-width: 100%;
    max-height: 150px;
    min-height: 150px;
  }
</style>
