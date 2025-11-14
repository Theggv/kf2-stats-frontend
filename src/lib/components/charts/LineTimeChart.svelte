<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import type { PeriodData } from '$lib/api/analytics';
  import { Tabs } from '$lib/components/tabs';
  import { lineHoverPlugin } from './plugins';
  import type { Period } from './periods';
  import { externalTooltipHandler } from './LineTimeChart.tooltip';

  export let data: PeriodData[];

  export let periods: Period[];
  export let selectedPeriod: number;
  export let label: string;

  export let renderValue: (item: number) => string = (item) => item.toFixed(0);

  const suppressTypeError = (data: any) => data;
</script>

<div class="line-time-chart">
  <Tabs tabs={periods.map((x) => x.label)} bind:selectedTab={selectedPeriod} />

  <div class="container">
    {#if data.length}
      <Line
        plugins={[lineHoverPlugin]}
        options={{
          animation: {
            duration: 0,
          },
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
              enabled: false,
              mode: 'index',
              intersect: false,
              yAlign: 'bottom',
              position: 'nearest',
              caretPadding: 8,
              external: externalTooltipHandler(label, renderValue),
            },
          },
        }}
        data={{
          xLabels: data.map((x) => new Date(x.period)),
          datasets: [
            {
              label: 'value',
              data: suppressTypeError(data),
              fill: false,
              borderColor: 'rgb(200 200 120 / 0.9)',
              tension: 0.1,
              parsing: {
                xAxisKey: 'period',
                yAxisKey: 'value',
              },
            },
            {
              label: 'trend',
              data: suppressTypeError(data),
              borderColor: 'rgb(200 200 120 / 0.3)',
              borderDash: [5, 5],
              tension: 0.5,
              parsing: {
                xAxisKey: 'period',
                yAxisKey: 'trend',
              },
            },
          ],
        }}
      />
    {:else}
      <div class="secondary">No Data</div>
    {/if}
  </div>
</div>

<style>
  .line-time-chart {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .container {
    position: relative;
    flex: 1;
    display: flex;
  }

  .secondary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--text-secondary);
  }

  :global(.line-time-chart > canvas) {
    max-width: 100%;
    max-height: 200px;
    min-height: 200px;
  }
</style>
