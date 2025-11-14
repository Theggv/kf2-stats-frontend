<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import { lineHoverPlugin } from '$lib/components/charts';
  import type { DataSet } from '../../tabs/GraphsTab.util';
  import { externalTooltipHandler } from './GraphContainer.util';

  export let labels: string[];
  export let datasets: DataSet[];
  export let formatter: (value: DataSet['values'][number]) => string;

  export let hoverId: number;

  const suppressTypeError = (data: any) => data;
</script>

<div class="line-chart">
  {#if datasets.length}
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
            hoverBorderWidth: 3,
            radius: 0,
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
            external: externalTooltipHandler(formatter),
          },
        },
      }}
      data={{
        xLabels: labels,
        datasets: datasets.map((dataset) => ({
          label: dataset.profile?.name || '',
          data: suppressTypeError(dataset.values),
          fill: false,
          borderColor: dataset.color,
          tension: 0.2,
          borderWidth: dataset.profile?.id === hoverId ? 5 : 2,
          borderDash: dataset.profile?.id === hoverId ? undefined : [4, 1],
          parsing: {
            xAxisKey: 'value',
            yAxisKey: 'value',
          },
        })),
      }}
    />
  {:else}
    <div class="secondary">No Data</div>
  {/if}
</div>

<style>
  .line-chart {
    padding: 0 1rem 0 1rem;
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

  :global(.line-chart > canvas) {
    max-width: 100%;
    max-height: 350px;
    min-height: 350px;
  }
</style>
